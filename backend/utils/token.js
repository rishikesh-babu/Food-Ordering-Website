const jwt = require('jsonwebtoken')

function generateToken(user, role) {
        console.log('user :>> ', user);
        console.log('role :>> ', role);

        const payload = {
            id: user._id,
            role: role,
        }
        const secretKey = process.env.JWT_SECRET_KEY
        const options = {
            expiresIn: '1d'
        }

        const token = jwt.sign(payload, secretKey, options)

        return token
}

module.exports = { generateToken }