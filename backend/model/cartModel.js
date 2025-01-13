const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        cartItems: [{
            foodId: {
                type: mongoose.Types.ObjectId,
                ref: 'Food',
                required: true,
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
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

cartSchema.methods.calculateTotalPrice = function () {
    let total = 0

    this.cartItems.forEach((item) => {
        total += item.price * item.quantity;
    });    

    return total
}

cartSchema.pre('save', function (next) {
    this.totalPrice = this.calculateTotalPrice()
    next();
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = { Cart }