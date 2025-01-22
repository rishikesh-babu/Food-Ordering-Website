const { Food } = require("../model/foodModel");
const { Wishlist } = require("../model/wishlistModel");

async function addToWishList(req, res, next) {
    try {
        console.log('Routes: add to wishlist')

        const { foodId } = req.body
        const userId = req.user.id

        console.log('userId :>> ', userId);
        console.log('foodId :>> ', foodId);

        const foodExist = await Food.findById(foodId)

        if (!foodExist) {
            return res.status(404).json({ message: 'Food item not found' })
        }

        let wishlist = await Wishlist.findOne({ userId })

        if (!wishlist) {
            wishlist = new Wishlist({
                userId,
                foodItems: [],
            })
        }

        const alreadyExist = wishlist.foodItems.some(
            item => item.foodId.toString() === foodId
        )
        if (alreadyExist) {
            return res.status(400).json({ message: `Food ${foodExist.name} already in the wishlist` })
        }

        wishlist.foodItems.push({
            foodId,
            name: foodExist.name,
        })

        await wishlist.save()

        const updatedWishlist = await Wishlist.findOne({ userId }).populate('foodItems.foodId')
        res.status(200).json({ message: `${foodExist.name} added to wishlist`, data: updatedWishlist })

    } catch (err) {
        next(err)
    }
}

async function getWishlist(req, res, next) {
    try {
        console.log('Routes: get wishlist')

        const userId = req.user.id
        console.log('userId :>> ', userId);

        const wishlist = await Wishlist.findOne({ userId }).populate('foodItems.foodId')

        if (!wishlist) {
            return res.status(404).json({ message: 'Wish List is empty' })
        }

        if (wishlist.foodItems.length === 0) {
            return res.status(400).json({ message: 'Wish List is empty' })
        }

        return res.status(200).json({ message: 'Wish list fetched', data: wishlist })

    } catch (err) {
        next(err)
    }
}

async function removeFromWishlist(req, res, next) {
    try {
        console.log('Routes: remove from wishlist')

        const { foodId } = req.body
        const userId = req.user.id
        const foodExist = await Food.findById(foodId)

        console.log('foodExist.name :>> ', foodExist.name);
        console.log('userId :>> ', userId);
        console.log('foodId :>> ', foodId);

        if (!foodId) {
            return res.status(400).json({ message: 'Required foodId' })
        }

        if (!foodExist) {
            return res.status(400).json({ message: 'Food not found' })
        }

        const wishlist = await Wishlist.findOne({ userId }).populate('foodItems.foodId')
        if (!wishlist) {
            return res.status(400).json({ message: 'Wish list not found' })
        }

        console.log('wishlist :>> ', wishlist);
        console.log('wishlist.foodItems :>> ', wishlist.foodItems);

        if (wishlist.foodItems.length === 0) {
            return res.status(400).json({ message: 'Wish list is empty' })
        }

        const foodItems = wishlist.foodItems.filter(
            item => item.foodId._id.toString() !== foodId
        )

        wishlist.foodItems = foodItems
        console.log('wishlist :>> ', wishlist);
        await wishlist.save()

        res.status(200).json({ message: `${foodExist.name} removed from wish`, data: wishlist })

    } catch (err) {
        next(err)
    }
}

module.exports = { addToWishList, getWishlist, removeFromWishlist }