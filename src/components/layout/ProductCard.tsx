import React, { useEffect, useState, useRef } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '../common/button.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { Check } from 'lucide-react'

type Size = 'SMALL' | 'LARGE'

interface ProductCardProps {
    id: number
    name: string
    price: number
    image: string
    reviews?: number
    onAddToCart?: (size: Size) => void
}

export function ProductCard({
    id,
    name,
    price,
    image,
    reviews = 0,
    onAddToCart,
}: ProductCardProps) {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [size, setSize] = useState<Size>('SMALL')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent navigation when clicking add to cart
        addToCart({
            id,
            name,
            price,
            image,
            size,
        })
        if (onAddToCart) {
            onAddToCart(size)
        }
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const handleCardClick = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className="w-full max-w-xs bg-[#fce7c7] rounded-lg overflow-visible shadow-md hover:shadow-lg transition-shadow cursor-pointer" >
            <div className="p-4 flex flex-col items-center">
                {/* Product Image - Clickable */}
                <div onClick={handleCardClick} className="cursor-pointer">
                    <img src={image} alt={name} className="w-48 h-auto object-contain mb-2 hover:scale-105 transition-transform" />
                </div>

                {/* Product Name - Clickable */}
                <h2 
                    onClick={handleCardClick} 
                    className="text-xl font-bold text-[#3a2a18] mt-2 cursor-pointer hover:text-[#e5c570] transition-colors"
                >
                    {name}
                </h2>

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

                <Button
                    className="w-full py-3 bg-[#5e341c] text-white font-bold uppercase hover:bg-[#e5c570] transition-colors flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                >
                    {addedToCart ? (
                        <>
                            <Check size={18} />
                            Added!
                        </>
                    ) : (
                        'Add to Cart'
                    )}
                </Button>
            </div>
        </div>
    )
} 
