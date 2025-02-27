const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { addOrder, getOrder, deleteOrder, getAllOrderAdmin, completeOrder, cancelOrder } = require('../controllers/orderController')
const { adminAuth } = require('../middlewares/adminAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: order')
    next()
})

router.post('/add-order', userAuth, addOrder)
router.get('/get-all-order', userAuth, getOrder)
router.put('/complete-order', adminAuth, completeOrder)
router.put('/cancel-order', adminAuth, cancelOrder)
router.get('/get-all-order-admin', adminAuth, getAllOrderAdmin)
router.delete('/delete-order/:orderId', userAuth, deleteOrder)

const orderRouter = router
module.exports = { orderRouter } 