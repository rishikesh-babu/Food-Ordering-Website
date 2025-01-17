function CartSkelton() {
    return (
        <div className="max-w-screen-lg mx-auto p-6">
            {/* Title Section */}
            <div className="animate-pulse mb-8">
                <div className="h-8 w-48 bg-gray-300 mx-auto rounded"></div>
            </div>

            {/* Cart Items Skeleton */}
            <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white w-full max-w-4xl mx-auto animate-pulse"
                    >
                        <div className="flex justify-center sm:justify-start">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-lg"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center sm:ml-4">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                            <div className="h-5 w-20 bg-gray-300 rounded"></div>
                        </div>

                        <div className="flex flex-row justify-center items-center gap-3">
                            <div className="h-8 w-8 bg-gray-300 rounded"></div>
                            <div className="h-6 w-8 bg-gray-300 rounded"></div>
                            <div className="h-8 w-8 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Price Section Skeleton */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center animate-pulse">
                <div className="text-center sm:text-left">
                    <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                </div>
                <div className="btn bg-gray-300 w-36 h-10 mt-4 sm:mt-0 rounded-lg shadow-md"></div>
            </div>
        </div>
    )
}

function HomeSkelton() {
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            {/* Popular Restaurants Section */}
            <div className="text-2xl font-bold text-gray-800 mb-6">
                Popular Restaurants
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-pulse"
                    >
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                            <div className="h-5 w-48 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popular Food Section */}
            <div className="text-2xl font-bold text-gray-800 mb-6 mt-8">
                Popular Food
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-pulse"
                    >
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                            <div className="h-5 w-16 bg-gray-300 rounded mb-4"></div>
                            <div className="h-10 w-24 bg-gray-400 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { CartSkelton, HomeSkelton }