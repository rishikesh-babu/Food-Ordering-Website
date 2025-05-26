const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true
        },
        image: {
            type: String,
            required: true,
            // default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEaCERtHT4SbUVufKRaxOmxJ4aUHuNHwqqA&s'
        },
        // foodItems: [{
        //     foodId: {
        //         type: mongoose.Types.ObjectId,
        //         ref: 'Food',
        //         required: true,
        //     }
        // }]
    },
    {
        timestamps: true
    }
)

const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = { Hotel }