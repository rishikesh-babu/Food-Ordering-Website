const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { addToWishList, getWishlist, removeFromWishlist } = require('../controllers/wishlistController')
const router = express.Router()

router.use((req, res, next) => {
    console.log("Routes: wishlist")
    next()
})

router.post('/add-to-wishlist', userAuth, addToWishList)
router.get('/get-wishlist', userAuth, getWishlist)
router.post('/remove-from-wishlist', userAuth, removeFromWishlist)

const wishListRouter = router
module.exports = { wishListRouter }