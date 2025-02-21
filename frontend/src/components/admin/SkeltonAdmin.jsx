import React from 'react'

function SingleHotelSkelton() {
    return (
        <div className="p-3">
            {/* Hotel Info Skeleton */}
            <div className="bg-gray-700 p-2 grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl animate-pulse">
                <div className="flex justify-center items-center">
                    <div className="w-full h-64 bg-gray-600 rounded-xl"></div>
                </div>
                <div className="text-white flex flex-col text-center md:text-left justify-center m-7 space-y-4">
                    <div className="w-3/4 h-8 bg-gray-500 rounded"></div>
                    <div className="w-1/2 h-6 bg-gray-500 rounded"></div>
                </div>
            </div>

            {/* Add Food Item Skeleton */}
            <div className="m-7">
                <div className="w-40 h-10 bg-gray-500 rounded-lg animate-pulse"></div>
            </div>

            {/* Food Items Skeleton */}
            <div className="m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {Array(4).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden p-4 animate-pulse"
                    >
                        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
                        <div className="mt-4 space-y-2">
                            <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
                            <div className="w-1/2 h-5 bg-gray-400 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { SingleHotelSkelton }