const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: cart')
    next()
})

router.post('/add-to-cart', userAuth, addToCart)
router.get('/get-cart-items', userAuth, getCartItems)
router.delete('/remove-cart-item', userAuth, removeFromCart)

const cartRouter = router
module.exports = { cartRouter }