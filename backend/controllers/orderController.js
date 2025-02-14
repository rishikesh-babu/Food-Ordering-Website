const { Order } = require("../model/orderModel")

async function addOrder(req, res, next) {
    try {
        console.log('Routes: add order')

        const userId = req.user.id
        const { price, address } = req.body
        let orderExist = await Order.findOne({ userId })

        console.log('req.body :>> ', req.body);

        if (!price || !address) {
            return res.status(404).json({ message: 'Price and address is required' })
        }
        
        if (!orderExist) {
            orderExist = new Order({
                userId,
                orderList: []
            })
        }

        orderExist.orderList.push({
            price,
            address,
        })

        await orderExist.save()

        res.status(200).json({ message: 'Order added', data: orderExist })

    } catch (err) {
        next(err)
    }
}

async function getOrder(req, res, next) {
    try {
        console.log('Router: get order')

        const userId = req.user.id 
        
        const orderExist = await Order.findOne({ userId })

        if (!orderExist) {
            return res.status(404).json({ message:'Not ordered yet' })
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
        
        res.status(200).json({ message:'Order list deleted', data: orderExist })
        
    } catch (err) {
        next(err)
    }
}

module.exports = { addOrder, getOrder, deleteOrder }