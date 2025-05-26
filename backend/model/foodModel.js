const mongoose = require('mongoose')

const foodSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            // default: 'https://media.istockphoto.com/id/937483290/photo/server-holding-a-tray-of-appetizers-at-a-banquet.jpg?s=612x612&w=0&k=20&c=npgO7U825B6xuIehGCcmVCTGPo56HCHvw4_q_u3mmKU='
        },
        hotelId: {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel',
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Food = mongoose.model('Food', foodSchema)
module.exports = { Food }