import React from 'react'
import { useParams } from 'react-router-dom'
import getFetch from '../../hooks/getFetch'

function SingleOrder() {
    const { orderId } = useParams()
    const [orderDetails, isOrderLoading, orderError] = getFetch('order/get-all-order')
    return (
        <div>
            {
                orderDetails?.orderList?.filter(item => item?._id === orderId).orderItems.map((items, index))
            }
        </div>
    )
}

export default SingleOrder
