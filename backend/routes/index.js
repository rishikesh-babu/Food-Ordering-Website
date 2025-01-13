const express = require('express')
const { userRouter } = require('./userRoutes')
const { adminRouter } = require('./adminRoutes')
const { hotelRouter } = require('./hotelRoutes')
const { wishListRouter } = require('./wishListRouter')
const { cartRouter } = require('./cartRoutes')
const router = express.Router()

router.use((req, res, next) => {
    console.log("Routes: api")
    next()
})

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/hotel', hotelRouter)
router.use('/wishlist', wishListRouter)
router.use('/cart', cartRouter)

const apiRouter = router
module.exports = { apiRouter }