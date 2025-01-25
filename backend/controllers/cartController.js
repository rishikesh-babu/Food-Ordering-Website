const { Cart } = require("../model/cartModel");
const { Food } = require("../model/foodModel");

async function addToCart(req, res, next) {
    try {
        console.log("Routes: add to cart")
        
        const { foodId } = req.body
        const userId = req.user.id

        console.log('req.user :>> ', req.user);
        console.log('foodId :>> ', foodId);
        console.log('userId :>> ', userId);

        if (!foodId) {
            return res.status(400).json({ message: 'FoodId is required' })
        }
        
        const foodExist = await Food.findById({ _id: foodId })

        if (!foodExist) {
            return res.status(404).json({ message: 'Food does not exist' })
        }
        
        let cartExist = await Cart.findOne({ userId }).populate('cartItems.foodId')

        if (!cartExist) {
            cartExist = new Cart({
                userId,
                foodItems: []
            })
        }

        const itemIndex = cartExist.cartItems.findIndex(item => item.foodId.equals(foodId));
        if (itemIndex !== -1) {
            cartExist.cartItems[itemIndex].quantity += 1;
        } else {
            cartExist.cartItems.push({
                foodId,
                // name: foodExist.name,
                price: foodExist.price,
            });
        }

        await cartExist.save()

        let updatedCart = await Cart.findOne({ userId }).populate('cartItems.foodId')

        res.status(200).json({ message: `${foodExist.name} add to cart`, data: updatedCart })
        
    } catch (err) {
        next(err)
    }
}

async function getCartItems(req, res, next) {
    try {
        console.log('Routes: get cart items')
        
        const userId = req.user.id
        const cartExist = await Cart.findOne({ userId }).populate('cartItems.foodId')

        if (!cartExist) {
            return res.status(200).json({ message: 'Cart is empty' })
        }

        return res.status(200).json({ message: 'Cart item fetched', data: cartExist })
    } catch (err) {
        next(err)
    }
}

async function removeFromCart(req, res, next) {
    try {
        console.log('Routes: remove from cart')

        const userId = req.user.id
        const { foodId } = req.body

        if (!foodId) {
            return res.status(400).json({ message: 'FoodId not found' })
        }

        const foodExist = await Food.findById(foodId)

        if (!foodExist) {
            return res.status(404).json({ message: 'Food not found' })
        }

        const cartExist = await Cart.findOne({ userId }).populate('cartItems.foodId')

        if (!cartExist) {
            return res.status(404).json({ message: 'Cart does not exist' })
        }
        
        const itemIndex = cartExist.cartItems.findIndex(
            item => item.foodId.equals(foodId)
        )        

        if (itemIndex === -1) {
            return res.status(404).json({ message: `${foodExist.name} not found in cart` })
        }

        if (cartExist.cartItems[itemIndex].quantity == 1) {
            cartExist.cartItems.splice(itemIndex, 1)
        } else {
            cartExist.cartItems[itemIndex].quantity -= 1
        }

        if (cartExist.cartItems.length === 0) {
            await Cart.deleteOne({ userId });
            return res.status(200).json({ message: "Cart is now empty" });
        }

        await cartExist.save()

        return res.status(200).json({ message: `${foodExist.name} removed from cart`, data: cartExist })
        
    } catch (err) {
        next(err)
    }
}

async function deleteCart(req, res, next) {
    try {
        console.log('Routes: Delete cart')

        const userId = req.user.id
        
        console.log('userId :>> ', userId);

        const cartExist = await Cart.findOne({ userId })

        console.log('cartExist :>> ', cartExist);
        if (!cartExist) {
            return res.status(404).json({ message: 'Cart does not exist' })
        }

        await Cart.deleteOne({ userId })
        
        return res.status(200).json({ message: 'Cart Cleard Successfully' })
    } catch (err) {
        next(err)
    }
}

module.exports = { addToCart, getCartItems, removeFromCart, deleteCart }