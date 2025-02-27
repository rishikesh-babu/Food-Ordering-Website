const { Order } = require("../model/orderModel")

async function addOrder(req, res, next) {
    try {
        console.log('Routes: add order')

        const userId = req.user.id
        const { totalPrice, address, foodItems } = req.body

        if (!totalPrice) {
            return res.status(400).json({ message: 'Total price is required' })
        }
        if (!address) {
            return res.status(400).json({ message: 'Address is required ' })
        }
        if (!foodItems) {
            return res.status(400).json({ message: 'Food items is required ' })
        }

        const newOrder = new Order({
            userId,
            totalPrice,
            address,
            foodItems,
        })

        await newOrder.save()
        res.status(201).json({ message: 'Order placed successfully', data: newOrder })

    } catch (err) {
        next(err)
    }
}

async function getOrder(req, res, next) {
    try {
        console.log('Router: get order')

        const userId = req.user.id

        const orderExist = await Order.find({ userId }).populate('foodItems.foodId')

        if (!orderExist) {
            return res.status(404).json({ message: 'Not ordered yet' })
        }

        res.status(200).json({ message: 'Orders fetched', data: orderExist })

    } catch (err) {
        next(err)
    }
}

async function deleteOrder(req, res, next) {
    try {
        console.log('Routes: delete order')

        const { orderId } = req.params
        const userId = req.user.id
        let orderExist = await Order.findOne({ userId })

        orderExist.orderList = orderExist.orderList.filter(item => !(item._id.equals(orderId)))
        console.log('orderExist :>> ', orderExist);
        await orderExist.save()

        res.status(200).json({ message: 'Order list deleted', data: orderExist })

    } catch (err) {
        next(err)
    }
}

async function getAllOrderAdmin(req, res, next) {
    try {
        console.log('Routes: Get all Order Admin')

        const orderExist = await Order.find().populate('userId', '-password').populate('foodItems.foodId').sort({ createdAt: -1 })
        if (!orderExist) {
            return res.status(400).json({ message: 'Order not found' })
        }

        res.status(200).json({ message: 'Order fetched', data: orderExist })
    } catch (err) {
        next(err)
    }
}

async function completeOrder(req, res, next) {
    try {
        console.log("Routes: complete order")

        const { orderId } = req.body

        if (!orderId) {
            return res.status(400).json({ message: 'Order id is required' })
        }

        const orderExist = await Order.findOne({ _id: orderId })
        
        if (!orderExist) {
            return res.status(400).json({ message: 'Order does not exist ' })
        }
        
        orderExist.orderStatus = 'complete'

        await orderExist.save()

        res.status(200).json({ message: 'Order completed', data: orderExist })
    } catch (err) {
        next(err)
    }
}

async function cancelOrder(req, res, next) {
    try {
        console.log("Routes: cancel order")

        const { orderId } = req.body

        if (!orderId) {
            return res.status(400).json({ message: 'Order id is required' })
        }

        const orderExist = await Order.findOne({ _id: orderId })

        if (!orderExist) {
            return res.status(400).json({ message: 'Order does not exist ' })
        }

        orderExist.orderStatus = 'cancel'

        await orderExist.save()

        res.status(200).json({ message: 'Order cancelled', data: orderExist })
    } catch (err) {
        next(err)
    }
}

module.exports = { addOrder, getOrder, deleteOrder, getAllOrderAdmin, completeOrder, cancelOrder }