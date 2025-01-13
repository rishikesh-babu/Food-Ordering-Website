const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema(
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
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        }]
    },
    {
        timestamps: true,
    }
)

const Wishlist = mongoose.model('Wishlist', wishlistSchema)
module.exports = { Wishlist }