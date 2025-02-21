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
        total: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

orderSchema.methods.calculateTotal = function () {
    let total = 0

    this.orderList.forEach((item) => {
        total += item.price
    })

    return total
}

orderSchema.pre('save', function (next) {
    this.total = this.calculateTotal()
    next()
})

const Order = mongoose.model('Order', orderSchema)
module.exports = { Order }