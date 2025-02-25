import React from 'react'
import getFetch from '../../hooks/getFetch'
import { ViewOrderCard } from '../../components/admin/CardsAdmin';

function ViewOrder() {

    const [orderData, isOrderLoading, orderError] = getFetch('/order/get-all-order-admin')

    return (
        <div>
            <div className='my-10 text-3xl font-semibold text-center'>
                Orders
            </div>
            <div>
                {
                    orderData?.map((item, index) => (
                        <ViewOrderCard 
                            name={item?.userId?.name}
                            image={item?.userId?.image}
                            address={item?.userId?.address}
                            price={item?.total}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ViewOrder
