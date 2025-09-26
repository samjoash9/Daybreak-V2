import React, { useEffect, useState, useRef } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { motion } from "motion/react"

type Size = 'SMALL' | 'LARGE'

interface ProductCardProps {
    name: string
    price: number
    image: string
    reviews?: number
    onAddToCart?: (size: Size) => void
}

export function ProductCard({
    name,
    price,
    image,
    reviews = 0,
    onAddToCart,
}: ProductCardProps) {
    const [size, setSize] = useState<Size>('SMALL')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSizeSelect = (selectedSize: Size) => {
        setSize(selectedSize)
        setIsDropdownOpen(false)
    }

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(size)
        }
        console.log(`Added ${name} (${size}) to cart`)
    }

    return (
        <div className="w-full max-w-xs bg-[#fce7c7] rounded-lg overflow-hidden shadow-md" >
            <div className="p-4 flex flex-col items-center">
                {/* Product Image */}
                <img src={image} alt={name} className="w-48 h-auto object-contain mb-2" />

                {/* Product Name */}
                <h2 className="text-xl font-bold text-[#3a2a18] mt-2">{name}</h2>

                {/* Reviews */}
                <div className="flex items-center mt-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                            ★
                        </span>
                    ))}
                    <span className="ml-2 text-gray-700 text-sm">({reviews} REVIEWS)</span>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-[#3a2a18] mt-1 mb-4">₱{price}</div>

                {/* Size Dropdown */}
                <div className="w-full mb-3 relative" ref={dropdownRef}>
                    <button
                        className="w-full py-2 px-4 border-2 border-[#3a2a18] text-[#3a2a18] font-semibold flex justify-between items-center"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                    >
                        {size} <ChevronDownIcon size={20} />
                    </button>

                    {isDropdownOpen && (
                        <div
                            className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#3a2a18] z-10 origin-top scale-y-100 transition-transform"
                            role="menu"
                        >
                            {(['SMALL', 'LARGE'] as Size[]).map((s) => (
                                <button
                                    key={s}
                                    className={`w-full py-2 px-4 text-left font-semibold hover:bg-[#fce7c7] ${size === s ? 'bg-[#fce7c7]' : ''
                                        }`}
                                    onClick={() => handleSizeSelect(s)}
                                    role="menuitem"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full py-3 bg-[#5e341c] text-white font-bold uppercase hover:bg-[#4e2a14] transition-colors"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
} 
