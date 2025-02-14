import React, { useEffect } from 'react'
import getFetch from '../../hooks/getFetch'
import { OrderListCard } from '../../components/user/CardsUser'
import { saveOrderDetails } from '../../redux/features/orderSlice'
import { useSelector } from 'react-redux'

function Order() {

    const [orderData, isOrderLoading, orderError] = getFetch('order/get-all-order', saveOrderDetails)
    const { orderDetails } = useSelector((state) => state.order)
    return (
        <div>
            <div className='text-3xl font-semibold text-center'>
                Orders
            </div>
            <div className='sm:m-7'>
                {
                    orderDetails?.orderList?.map((items, index) => <OrderListCard items={items}key={index} />)
                }
            </div>
        </div>
    )
}

export default Order
