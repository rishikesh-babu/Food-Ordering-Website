const jwt = require('jsonwebtoken')
const { User } = require('../model/userModel')

async function userAuth(req, res, next) {
    try {
        console.log('Routes: user auth')
        
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized user' })
        }

        const userId = decodedToken.id
        const userExist = await User.findById(userId).select('-password')

        if (!userExist) {
            return res.status(401).json({ message: 'Unauthorized user' })
        }

        req.user = decodedToken
        
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = { userAuth }