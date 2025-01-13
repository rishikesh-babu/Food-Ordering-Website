const jwt = require('jsonwebtoken')
const { Admin } = require('../model/adminModel')

async function adminAuth(req, res, next) {
    try {
        console.log('Routes: admin auth')
        
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        const adminId = decodedToken.id
        const adminExist = await Admin.findById(adminId).select('-password')

        if (!adminExist) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        req.user = decodedToken
        
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = { adminAuth }