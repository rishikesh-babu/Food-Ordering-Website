const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        foodItems: [{
            foodId: {
                type: mongoose.Types.ObjectId,
                ref: 'Food',
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        totalPrice: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'complete', 'cancel'],
            default: 'pending',
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = { Order }