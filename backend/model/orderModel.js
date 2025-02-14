const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderList: [{
            orderItems: [{
                foodId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Food',
                    required: true,
                }
            }],
            price: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            address: {
                type : String,
                required: true,
            }
        }],
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = { Order }