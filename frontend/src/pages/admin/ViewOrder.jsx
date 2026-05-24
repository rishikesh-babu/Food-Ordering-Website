import React from 'react'
import getFetch from '../../hooks/getFetch'
import { ViewOrderCard } from '../../components/admin/CardsAdmin';
import { ClipboardList } from 'lucide-react';

function ViewOrder() {

    const [orderData, isOrderLoading, orderError] = getFetch('/order/get-all-order-admin')

    return (
        <div className="min-h-screen py-10 transition-colors duration-300 relative overflow-hidden w-full">
            <div className="container mx-auto px-4 max-w-4xl ">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className='mx-auto '>
                        <h1 className="mx-auto text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
                            <ClipboardList className="w-8 h-8 text-orange-500" />
                            <span>Incoming Orders</span>
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Monitor customer requests, change delivery state indicators, and review transaction totals.
                        </p>
                    </div>
                </div>

                {isOrderLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm animate-pulse space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                </div>
                                <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : orderData?.length ? (
                    <div className="space-y-5 flex flex-col">
                        {orderData?.map((item) => (
                            <ViewOrderCard
                                name={item?.userId?.name}
                                image={item?.userId?.image}
                                totalPrice={item?.totalPrice}
                                address={item?.address}
                                foodItems={item?.foodItems}
                                orderStatus={item?.orderStatus}
                                orderId={item?._id}
                                key={item?._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-center shadow-sm">
                        <ClipboardList size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 font-outfit">No Orders Found</h3>
                        <p className="text-sm text-slate-450 dark:text-slate-500 mt-1 max-w-xs px-4">
                            There are no orders submitted in the database currently.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewOrder
