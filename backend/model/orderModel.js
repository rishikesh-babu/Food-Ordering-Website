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
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }],
            total: {
                type: Number,
                required: true,
            }
        }],
    },
    {
        timestamps: true,
    }
)