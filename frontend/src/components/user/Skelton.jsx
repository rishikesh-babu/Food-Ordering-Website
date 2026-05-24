function CartSkelton() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10 transition-colors duration-300 animate-pulse relative">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Placeholder */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                </div>

                {/* Main Content Layout Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Cart Items list */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="py-4 first:pt-0 flex justify-between items-center gap-4 border-b border-slate-100 dark:border-slate-800/40 last:border-0 last:pb-0">
                                    {/* Image block */}
                                    <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-200 dark:bg-gray-800 rounded-2xl flex-shrink-0"></div>

                                    {/* Details block */}
                                    <div className="flex-grow flex flex-col space-y-2">
                                        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                        <div className="h-5 w-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    </div>

                                    {/* Quantity controls block */}
                                    <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Summaries */}
                    <div className="space-y-6">
                        {/* Address Card Placeholder */}
                        <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                            </div>
                            <div className="h-16 w-full bg-gray-200 dark:bg-gray-800/40 rounded-2xl"></div>
                        </div>

                        {/* Order Summary Card Placeholder */}
                        <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded border-b border-slate-100 dark:border-slate-800 pb-3"></div>
                            <div className="space-y-2.5">
                                <div className="flex justify-between">
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                </div>
                                <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 flex justify-between">
                                    <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                </div>
                            </div>
                            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
        <div className="container mx-auto px-4 max-w-6xl py-6 animate-pulse z-10 relative">
            {/* Title Section Placeholder */}
            <div className="text-center mb-10 flex flex-col items-center">
                <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="h-4 w-80 bg-gray-200 dark:bg-gray-800 rounded mt-3"></div>
            </div>

            {/* Grid Placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md flex flex-col justify-between h-[380px] overflow-hidden"
                        >
                            {/* Image Placeholder */}
                            <div className="h-48 w-full bg-gray-200 dark:bg-gray-800/60"></div>

                            {/* Content Placeholder */}
                            <div className="p-4 flex flex-col flex-grow justify-between">
                                <div className="space-y-2">
                                    {/* Title */}
                                    <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                    {/* Description */}
                                    <div className="space-y-1.5 mt-2">
                                        <div className="h-3 w-full bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                    </div>
                                </div>

                                {/* Price and Action Placeholder */}
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40">
                                    <div className="space-y-1">
                                        <div className="h-2 w-8 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                    </div>
                                    <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800/60 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function SingleHotelSkelton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Hero Banner Skeleton */}
            <div className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800/80 animate-pulse h-64 sm:h-80 mb-10 flex flex-col justify-end p-6 sm:p-8">
                <div className="h-8 sm:h-12 w-1/2 sm:w-1/3 bg-gray-300 dark:bg-gray-700/60 rounded-2xl mb-3"></div>
                <div className="h-4 sm:h-6 w-1/3 sm:w-1/4 bg-gray-300 dark:bg-gray-700/60 rounded-xl"></div>
            </div>

            {/* Menu Header Skeleton */}
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800/80 rounded-xl mb-6 animate-pulse"></div>

            {/* Food Items Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-800/80 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 flex justify-between gap-4 relative overflow-hidden animate-pulse"
                    >
                        {/* Left Section: Details */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                {/* Veg/Non-Veg & Rating Badge Skeleton */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>

                                {/* Food Name Skeleton */}
                                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>

                                {/* Description Skeleton */}
                                <div className="space-y-1.5 mt-2">
                                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>

                            {/* Price & Action Skeleton */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                            </div>
                        </div>

                        {/* Right Section: Image */}
                        <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SingleFoodSkelton() {
    return (
        <div className="container mx-auto px-4 max-w-6xl relative z-10 animate-pulse">
            {/* Back Button Link Placeholder */}
            <div className="mb-6 h-6 w-24 bg-gray-200 dark:bg-gray-800/60 rounded-md"></div>

            {/* Main Card Placeholder */}
            <div className="bg-white/50 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-200/40 dark:border-slate-800/40 shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Image Area */}
                    <div className="lg:col-span-6 flex flex-col justify-start">
                        <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-gray-200 dark:bg-gray-800/60 rounded-2xl"></div>
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                            {/* Category tag */}
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800/60 rounded-md"></div>
                            {/* Food Name */}
                            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800/60 rounded-lg"></div>
                            {/* Rating row */}
                            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800/60 rounded-md"></div>
                        </div>

                        {/* Food Metadata Badges */}
                        <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 dark:border-slate-800/40">
                            <div className="h-16 bg-gray-100 dark:bg-slate-800/30 rounded-2xl"></div>
                            <div className="h-16 bg-gray-100 dark:bg-slate-800/30 rounded-2xl"></div>
                            <div className="h-16 bg-gray-100 dark:bg-slate-800/30 rounded-2xl"></div>
                        </div>

                        {/* Price and Add-to-cart layout */}
                        <div className="bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-2">
                                <div className="h-3 w-10 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800/60 rounded-md"></div>
                            </div>
                            <div className="h-12 w-full sm:w-36 bg-gray-200 dark:bg-gray-800/60 rounded-xl"></div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-2">
                            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                <div className="h-3.5 w-5/6 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                                <div className="h-3.5 w-2/3 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                            </div>
                        </div>

                        {/* Quality Checks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/40">
                            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { WishlistSkelton, PopularHotelSkelton, PopularFoodSkelton, CartSkelton, ProfilePicSkelton, SingleHotelSkelton, SingleFoodSkelton }