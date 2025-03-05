const { User } = require("../model/userModel");
const bcrycpt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { setCookies, clearCookies } = require("../utils/cookies");
const { cloudinaryInstance } = require("../config/cloudinary");

async function userSignup(req, res, next) {
    try {
        console.log('Routes: signup')

        const { name, email, password, address, mobile } = req.body

        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        const saltRound = 10
        const hashedPassword = await bcrycpt.hash(password, saltRound)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            mobile
        })

        await newUser.save()

        const token = generateToken(newUser, 'user')

        setCookies(res, token)

        res.status(201).json({ message: 'Signup successfully' })

    } catch (err) {
        next(err)
    }
}

async function userLogin(req, res, next) {
    try {
        console.log('Routes: login')

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ message: 'All fields are required' })
        }

        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        if (userExist.userStatus === 'blocked') {
            return res.status(400).json({ message: 'User is blocked by admin' })
        }

        const hashedPassword = userExist.password

        const isMatch = await bcrycpt.compare(password, hashedPassword)

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const token = generateToken(userExist, 'user')

        setCookies(res, token)

        res.status(200).json({ message: 'Login successful', data: userExist })
    } catch (err) {
        next(err)
    }
}

async function checkUser(req, res, next) {
    try {
        console.log('Routes: check user')

        const userId = req.user.id
        const userExist = await User.findById(userId).select('-password')

        if (!userExist) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        console.log('userExist :>> ', userExist);

        res.status(200).json({ message: 'User checked', data: userExist })

    } catch (err) {
        next(err)
    }
}

async function userLogout(req, res, next) {
    try {
        console.log('Routes: logout')

        console.log('req.cookies.token :>> ', req.cookies.token);
        clearCookies(res)

        res.status(200).json({ message: 'Logout successfully' })
    } catch (err) {
        next(err)
    }
}

async function userProfile(req, res, next) {
    try {
        console.log('Routes: profile')

        console.log('req.user.id :>> ', req.user.id);

        const userId = req.user.id
        const userExist = await User.findById(userId).select('-password')

        res.status(200).json({ message: 'User profile fetched', data: userExist })

    } catch (err) {
        next(err)
    }
}

async function userProfilePicUpdate(req, res, next) {
    try {
        console.log('Routes: update profile')

        let { name, email, mobile, address } = req.body
        const userId = req.user.id
        const userExist = await User.findById(userId).select('-password')

        const uniqueName = `${userExist.name}_${userId}`

        if (!name) {
            name = userExist.name
        }
        if (!email) {
            email = userExist.email
        } else {
            const emailExist = await User.findOne({ email })
            if (emailExist) {
                return res.status(400).json({ message: `${email} already exist` })
            }
        }
        if (!mobile) {
            mobile = userExist.mobile
        }
        if (!address) {
            address = userExist.address
        }

        userExist.name = name
        userExist.email = email
        userExist.mobile = mobile
        userExist.address = address

        console.log('req.file :>> ', req.file);

        if (req.file) {
            const imageExist = userExist.image

            // console.log('imageExist :>> ', imageExist);

            if (imageExist) {
                const publicIdMatch = imageExist.match(/\/([^/]+)\.[^.]+$/);

                console.log('publicIdMatch :>> ', publicIdMatch);
                if (publicIdMatch) {

                    const publicId = `FoodOrderingWebSite/User/${publicIdMatch[1]}`;

                    console.log('publicId :>> ', publicId);

                    const uniqueIdentifier = Date.now()
                    const movedImage = await cloudinaryInstance.uploader.upload(imageExist, {
                        folder: 'FoodOrderingWebSite/ProfileArchieve',
                        public_id: `${userExist.name}_${uniqueIdentifier}`
                    })
                    console.log('movedImage.url :>> ', movedImage.url);

                    // await cloudinaryInstance.uploader.destroy(publicId)
                    // console.log('Existing image deleted')
                }
            }

            const newImageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
                folder: 'FoodOrderingWebSite/User',
                public_id: uniqueName
            })).url

            // console.log('newImageUrl :>> ', newImageUrl);   

            userExist.image = newImageUrl
            // console.log('userExist :>> ', userExist);

        }

        await userExist.save()
        res.status(200).json({ message: 'Profile Updated', data: userExist })

    } catch (err) {
        next(err)
    }
}

module.exports = { userSignup, userLogin, checkUser, userLogout, userProfile, userProfilePicUpdate }