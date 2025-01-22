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

function PopularHotelSkelton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-pulse"
                >
                    {/* Image Skeleton */}
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-300 rounded-xl"></div>
                    </div>

                    {/* Text Skeleton */}
                    <div className="flex flex-col gap-4 w-full">
                        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PopularFoodSkelton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-pulse"
                >
                    {/* Image Skeleton */}
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-300 rounded-xl"></div>
                    </div>

                    {/* Text Skeleton */}
                    <div className="text-center md:text-left w-full">
                        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div> {/* Name Skeleton */}
                        <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div> {/* Price Skeleton */}

                        {/* Wishlist and Add to Cart Skeletons */}
                        <div className="flex flex-row items-center justify-around my-3">
                            <div className="h-6 w-6 bg-gray-300 rounded-full"></div> {/* Wishlist button skeleton */}
                            <div className="h-6 w-20 bg-gray-300 rounded-lg"></div> {/* Add to Cart button skeleton */}
                        </div>

                        {/* Quantity controls skeleton */}
                        <div className="h-6 w-32 bg-gray-300 rounded-lg"></div> {/* Quantity controls skeleton */}
                    </div>
                </div>
            ))}
        </div>

    )
}

function ProfilePicSkelton() {
    return (
        <div className="flex justify-center items-center gap-4 mb-6 relative">
            {/* <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div> */}

            <div className="relative">
                <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-gray-200 shadow-lg animate-pulse"></div>
            </div>
        </div>

    )
}

function WishlistSkelton() {
    return (
        <div className="max-w-screen-lg mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Cart</h1>

            {/* Skeleton loader for the cart items */}
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-pulse"
                    >
                        {/* Image Skeleton */}
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 bg-gray-300 rounded-xl"></div>
                        </div>

                        {/* Cart Item Details Skeleton */}
                        <div className="text-center md:text-left w-full">
                            {/* Name Skeleton */}
                            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>

                            {/* Price Skeleton */}
                            <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>

                            {/* Quantity Selector Skeleton */}
                            <div className="flex flex-row items-center justify-around my-3">
                                <div className="h-6 w-12 bg-gray-300 rounded"></div>
                                <div className="h-6 w-12 bg-gray-300 rounded mx-3"></div>
                                <div className="h-6 w-12 bg-gray-300 rounded"></div>
                            </div>

                            {/* Remove from cart button skeleton */}
                            <div className="h-6 w-24 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skeleton for the total amount and checkout section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg flex justify-between items-center animate-pulse">
                <div className="h-6 w-1/4 bg-gray-300 rounded"></div> {/* Total Price Skeleton */}
                <div className="h-8 w-32 bg-gray-300 rounded-lg"></div> {/* Checkout Button Skeleton */}
            </div>
        </div>
    )
}

export { WishlistSkelton, PopularHotelSkelton, PopularFoodSkelton, CartSkelton, ProfilePicSkelton }