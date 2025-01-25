import React from "react";

export default function HomePageCarousel() {
    return (
        <div className="carousel w-full h-[500px] relative overflow-hidden bg-gray-900 rounded-lg shadow-lg">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    alt="Slide 1"
                    className="w-full h-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                    <a href="#slide4" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❯
                    </a>
                </div>
            </div>

            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="src/assets/Images/images.jpg"
                    alt="Slide 2"
                    className="w-full h-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                    <a href="#slide1" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❮
                    </a>
                    <a href="#slide3" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❯
                    </a>
                </div>
            </div>

            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="src/assets/Images/images (1).jpg"
                    alt="Slide 3"
                    className="w-full h-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                    <a href="#slide2" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❮
                    </a>
                    <a href="#slide4" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❯
                    </a>
                </div>
            </div>

            {/* Slide 4 */}
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="src/assets/Images/images (1).jpg"
                    alt="Slide 4"
                    className="w-full h-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                    <a href="#slide3" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❮
                    </a>
                    <a href="#slide1" className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">
                        ❯
                    </a>
                </div>
            </div>
        </div>
    );
}
