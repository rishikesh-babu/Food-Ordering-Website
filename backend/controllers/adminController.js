const { cloudinaryInstance } = require("../config/cloudinary")
const { Admin } = require("../model/adminModel")
const { setCookies, clearCookies } = require("../utils/cookies")
const { generateToken } = require("../utils/token")
const bcrycpt = require('bcrypt')

async function adminSignup(req, res, next) {
    try {
        console.log('Routes: signup')

        const { name, email, password, address, mobile } = req.body

        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const adminExist = await Admin.findOne({ email })

        if (adminExist) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        const saltRound = 10
        const hashedPassword = await bcrycpt.hash(password, saltRound)

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            address,
            mobile
        })

        await newAdmin.save()

        const token = generateToken(newAdmin, 'admin')

        setCookies(res, token)

        res.status(201).json({ message: 'Signup successfully' })
    } catch (err) {
        next(err)
    }
}

async function adminLogin(req, res, next) {
    try {
        console.log('Routes: login')

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ message: 'All fields are required' })
        }

        const adminExist = await Admin.findOne({ email })

        if (!adminExist) {
            return res.status(404).json({ message: 'Admin does not exist' })
        }

        const hashedPassword = adminExist.password

        const isMatch = await bcrycpt.compare(password, hashedPassword)

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const token = generateToken(adminExist, 'admin')

        setCookies(res, token)

        res.status(200).json({ message: 'Login successful', data: adminExist })
    } catch (err) {
        next(err)
    }
}

async function checkAdmin(req, res, next) {
    try {
        console.log('Routes: check admin')

        const adminId = req.user.id
        const adminExist = await Admin.findById(adminId).select('-password')

        console.log('adminExist :>> ', adminExist);

        res.status(200).json({ message: 'Admin checked', data: adminExist })

    } catch (err) {
        next(err)
    }
}

async function adminLogout(req, res, next) {
    try {
        console.log('Routes: logout')

        console.log('req.cookies.token :>> ', req.cookies.token);
        clearCookies(res)

        res.status(200).json({ message: 'Logout successfully' })
    } catch (err) {
        next(err)
    }
}

async function adminProfile(req, res, next) {
    try {
        console.log('Routes: profile')

        console.log('req.user.id :>> ', req.user.id);

        const adminId = req.user.id
        const adminExist = await Admin.findById(adminId).select('-password')

        res.status(200).json({ message: 'Admin profile fetched', data: adminExist })

    } catch (err) {
        next(err)
    }
}

async function adminProfilePicUpdate(req, res, next) {
    try {
        console.log('Routes: update profile pic')

        const adminId = req.user.id
        const adminExist = await Admin.findById(adminId).select('-password')
        const uniqueName = `${adminExist.name}_${adminId}`

        if (req.file) {
            const imageExist = adminExist.image

            if (imageExist) {
                const publicIdMatch = imageExist.match(/\/([^/]+)\.[^.]+$/);

                if (publicIdMatch) {

                    const publicId = `FoodOrderingWebSite/Admin/${publicIdMatch[1]}`;
                    
                    const uniqueIdentifier = Date.now()
                    const movedImage = await cloudinaryInstance.uploader.upload(imageExist, {
                        folder: 'FoodOrderingWebSite/ProfileArchieve',
                        public_id: `${adminExist.name}_${uniqueIdentifier}`
                    })
                    console.log('movedImage.url :>> ', movedImage.url);

                    // await cloudinaryInstance.uploader.destroy(publicId)
                    // console.log('Existing image deleted')
                }
            }

            const newImageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
                folder: 'FoodOrderingWebSite/Admin',
            })).url

            console.log('newImageUrl :>> ', newImageUrl);   

            adminExist.image = newImageUrl
            console.log('adminExist :>> ', adminExist);

            await adminExist.save()

            return res.status(200).json({ message: 'Profile updated', data: adminExist })
        }

        res.status(200).json({ message: 'Profile pic not updated', data: adminExist })

    } catch (err) {
        next(err)
    }
}

module.exports = { adminSignup, adminLogin, checkAdmin, adminLogout, adminProfile, adminProfilePicUpdate }