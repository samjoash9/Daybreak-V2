import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from 'lucide-react'

const coffeeItems = [
    {
        id: 1,
        title: 'ICED COFFEE',
        items: [
            {
                name: 'CHOCOLATE',
                position: 'left-[25%] top-[10%]',
                image: 'Coffees/chocolate_coffee.png',
            },
            {
                name: 'ICED CARAMEL LATTE',
                position: 'left-[36%] top-[12%]',
                image: 'Coffees/iced_caramel.png',
            },
            {
                name: 'SPANISH LATTE',
                position: 'right-[36%] top-[12%]',
                image: 'Coffees/spanish_latte.png',
            },
            {
                name: 'SALTED CARAMEL',
                position: 'right-[25%] top-[10%]',
                image: 'Coffees/salted_caramel.png',
            },
        ],
        background: 'Coffees/iced_coffee_bg.png',
    },
    {
        id: 2,
        title: 'BERRY SERIES',
        items: [
            {
                name: 'WHITE CHOCOLATE BERRY',
                position: 'left-[25%] top-[10%]',
                image: 'Coffees/white_chocolate.png',
            },
            {
                name: 'CHOCOLATE BERRY',
                position: 'left-[36%] top-[12%]',
                image: 'Coffees/chocolate_berry.png',
            },
            {
                name: 'STRAWBERRY MILK',
                position: 'right-[36%] top-[12%]',
                image: 'Coffees/strawberry_milk.png',
            },
            {
                name: 'MACHA BERRY',
                position: 'right-[25%] top-[10%]',
                image: 'Coffees/macha_berry.png',
            },
        ],
        background: 'Coffees/berry_series_bg.png',
    },
]

export function CoffeeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        setCurrentIndex(
            currentIndex === 0 ? coffeeItems.length - 1 : currentIndex - 1
        )
    }
    const nextSlide = () => {
        setCurrentIndex(
            currentIndex === coffeeItems.length - 1 ? 0 : currentIndex + 1
        )
    }

    return (
        <div className="relative w-screen">
            <div className="relative w-full h-[700px] overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0
                    bg-[radial-gradient(circle,#fffbe9_0%,#f9deb3_70%,#d6a96c_100%)]">
                </div>

                {/* Optional splash background image */}
                {coffeeItems[currentIndex].background && (
                    <img
                        src={coffeeItems[currentIndex].background}
                        alt=""
                        className="absolute inset-0 w-full h-full z-0"
                    />
                )}

                {/* Coffee splash shadow */}
                {/* <div className="absolute inset-0 z-10 overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[70%] bg-[#8b5a2b]/20 rounded-[100%] blur-md"></div>
                </div> */}

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center pt-8">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c09] mt-4">
                        {coffeeItems[currentIndex].title}
                    </h1>

                    {/* Each coffee image + label */}
                    <div className="relative w-full h-[500px] md:h-[600px]">
                        {coffeeItems[currentIndex].items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`absolute flex flex-col items-center ${item.position}`}
                            >
                                <p className="mb-2 text-xs md:text-sm font-bold text-[#4a2c09]">
                                    {item.name}
                                </p>
                                <img
                                    alt={item.name}
                                    src={item.image}
                                    className="max-h-[70%] w-auto object-contain drop-shadow-xl"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Add to cart button – move to bottom-right */}
                    <button
                        className="absolute bottom-20 right-[35%] bg-[#4a2c09] text-white 
                        py-3 px-6 rounded-full flex items-center gap-2
                        hover:bg-[#3a2208] transition-colors text-2xl"
                    >
                        Add to Cart Now
                        <ArrowRightIcon size={30} />
                    </button>
                </div>


                {/* Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm"
                >
                    <ChevronLeftIcon size={30} className="text-[#4a2c09]" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm"
                >
                    <ChevronRightIcon size={30} className="text-[#4a2c09]" />
                </button>
            </div>
        </div>
    )
}
