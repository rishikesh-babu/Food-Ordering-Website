const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { addOrder, getOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: order')
    next()
})

router.post('/add-order', userAuth, addOrder)
router.get('/get-all-order', userAuth, getOrder)
router.delete('/delete-order/:orderId', userAuth, deleteOrder)

const orderRouter = router
module.exports = { orderRouter } 