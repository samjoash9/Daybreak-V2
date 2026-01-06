import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const coffeeItems = [
    {
        id: 1,
        title: 'ICED COFFEE',
        items: [
            {
                name: 'CHOCOLATE',
                position: 'left-[26%] top-[10%]',
                image: 'Coffees/chocolate_coffee.png',
            },
            {
                name: 'ICED CARAMEL LATTE',
                position: 'left-[37%] top-[12%]',
                image: 'Coffees/iced_caramel.png',
            },
            {
                name: 'SPANISH LATTE',
                position: 'right-[37%] top-[12%]',
                image: 'Coffees/spanish_latte.png',
            },
            {
                name: 'SALTED CARAMEL',
                position: 'right-[26%] top-[10%]',
                image: 'Coffees/salted_caramel.png',
            },
        ],
        background: 'Coffees/iced_coffee_bg.svg',
        gradient: 'bg-[radial-gradient(circle,#fffbe9_0%,#f9deb3_70%,#d6a96c_100%)]'
    },
    {
        id: 2,
        title: 'BERRY SERIES',
        items: [
            {
                name: 'WHITE CHOCOLATE BERRY',
                position: 'left-[26%] top-[10%]',
                image: 'Coffees/white_chocolate.png',
            },
            {
                name: 'CHOCOLATE BERRY',
                position: 'left-[37%] top-[12%]',
                image: 'Coffees/chocolate_berry.png',
            },
            {
                name: 'STRAWBERRY MILK',
                position: 'right-[37%] top-[12%]',
                image: 'Coffees/strawberry_milk.png',
            },
            {
                name: 'MACHA BERRY',
                position: 'right-[26%] top-[10%]',
                image: 'Coffees/macha_berry.png',
            },
        ],
        background: 'Coffees/strawberry_bg.svg',
        gradient: 'bg-[radial-gradient(circle,#ffffff_0%,#ff797e_70%,#ff797e_100%)]'
    },
    {
        id: 3,
        title: 'SODA SERIES',
        items: [
            {
                name: 'STRAWBERRY',
                position: 'left-[26%] top-[10%]',
                image: 'Coffees/strawberry.png',
            },
            {
                name: 'PASSION FRUIT',
                position: 'left-[37%] top-[12%]',
                image: 'Coffees/passion_fruit.png',
            },
            {
                name: 'BLUE BERRY',
                position: 'right-[37%] top-[12%]',
                image: 'Coffees/blue_berry.png',
            },
            {
                name: 'GREEN APPLE',
                position: 'right-[26%] top-[10%]',
                image: 'Coffees/green_apple.png',
            },
        ],
        background: 'Coffees/soda_bg.svg',
        gradient: 'bg-[radial-gradient(circle,#ffffff_0%,#829aff_70%,#829aff_100%)]'
    },
]

export function CoffeeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()
    const autoSlideIntervalRef = useRef<number | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Preload all images
    useEffect(() => {
        const imagesToPreload: string[] = []
        
        coffeeItems.forEach((item) => {
            // Preload background images
            if (item.background) {
                imagesToPreload.push(`/${item.background}`)
            }
            // Preload product images
            item.items.forEach((product) => {
                imagesToPreload.push(`/${product.image}`)
            })
        })

        imagesToPreload.forEach((src) => {
            const img = document.createElement('img')
            img.src = src
        })
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        // Clear any existing interval
        if (autoSlideIntervalRef.current !== null) {
            window.clearInterval(autoSlideIntervalRef.current)
            autoSlideIntervalRef.current = null
        }

        // Only auto-slide if not hovered
        if (!isHovered) {
            autoSlideIntervalRef.current = window.setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === coffeeItems.length - 1 ? 0 : prevIndex + 1
                )
            }, 5000) // Change slide every 5 seconds
        }

        // Cleanup on unmount or when hover state changes
        return () => {
            if (autoSlideIntervalRef.current !== null) {
                window.clearInterval(autoSlideIntervalRef.current)
                autoSlideIntervalRef.current = null
            }
        }
    }, [isHovered])

    const prevSlide = () => {
        setCurrentIndex((prev) => prev === 0 ? coffeeItems.length - 1 : prev - 1)
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => prev === coffeeItems.length - 1 ? 0 : prev + 1)
    }

    const handleAddToCartNow = () => {
        const currentItem = coffeeItems[currentIndex]
        if (!currentItem) return
        
        let sectionId = ''
        
        // Map carousel titles to section IDs on the store page
        if (currentItem.title === 'ICED COFFEE') {
            sectionId = 'iced-coffee'
        } else if (currentItem.title === 'BERRY SERIES') {
            sectionId = 'berry-series'
        } else if (currentItem.title === 'SODA SERIES') {
            sectionId = 'soda-series'
        }
        
        // Navigate to store page with hash for scrolling
        navigate(`/store#${sectionId}`)
        
        // Scroll to section after navigation (small delay to ensure page loads)
        window.setTimeout(() => {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)
    }

    return (
        <div 
            className="relative w-screen"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* CAROUSEL */}

            <div className="relative w-full h-[700px] overflow-hidden">
                {coffeeItems[currentIndex] && (
                    <>
                        {/* Dynamic gradient */}
                        <div className={`absolute inset-0 z-0 ${coffeeItems[currentIndex].gradient}`} />

                        {/* Optional splash background */}
                        {coffeeItems[currentIndex].background && (
                            <img
                                src={coffeeItems[currentIndex].background}
                                alt=""
                                className="absolute inset-0 w-full h-full z-0"
                            />
                        )}

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center pt-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c09] mt-4">
                                {coffeeItems[currentIndex].title}
                            </h1>

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

                            <button
                                onClick={handleAddToCartNow}
                                className="absolute bottom-20 right-[35%] bg-[#4a2c09] text-white 
                                py-3 px-6 rounded-full flex items-center gap-2
                                hover:bg-[#3a2208] transition-colors text-2xl cursor-pointer"
                            >
                                Add to Cart Now
                                <ArrowRightIcon size={30} />
                            </button>
                        </div>
                    </>
                )}

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
