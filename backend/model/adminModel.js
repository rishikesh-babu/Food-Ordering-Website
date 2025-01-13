const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'admin'
        },
        address: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
    },
    {
        timestamps: true,
    }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = { Admin }