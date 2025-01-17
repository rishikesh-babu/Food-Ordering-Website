const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { createCheckout } = require('../controllers/paymentController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: payment')
    next()
})

router.post('/create-checkout-session', userAuth, createCheckout)

const paymentRouter = router
module.exports = { paymentRouter }