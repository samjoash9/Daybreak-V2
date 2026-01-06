import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Button } from '../../components/common/button';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ArrowLeft, Star, Check } from 'lucide-react';
import type { Size } from '../../context/CartContext';

// dummy data
const allProducts = [
  { id: 1, name: "CARAMEL ICED LATTE", price: 39, image: "/Products/caramel_iced_latte.png", description: "A refreshing blend of espresso, caramel syrup, and cold milk over ice. Perfect for those who love a sweet, creamy coffee experience.", category: "ICED COFFEE" },
  { id: 2, name: "FRENCH VANILLA", price: 39, image: "/Products/french_vanilla.png", description: "Smooth and creamy French vanilla coffee with a hint of sweetness. A classic favorite that never disappoints.", category: "ICED COFFEE" },
  { id: 3, name: "MATCHA LATTE", price: 39, image: "/Products/matcha_latte.png", description: "Premium matcha green tea powder mixed with steamed milk. A healthy and energizing alternative to coffee.", category: "ICED COFFEE" },
  { id: 4, name: "SALTED CARAMEL", price: 39, image: "/Products/salted_caramel.png", description: "The perfect balance of sweet caramel and a touch of salt. A sophisticated flavor profile that delights the palate.", category: "ICED COFFEE" },
  { id: 5, name: "SPANISH LATTE", price: 39, image: "/Products/spanish_latte.png", description: "Rich espresso combined with condensed milk for a uniquely sweet and creamy Spanish-style coffee.", category: "ICED COFFEE" },
  { id: 6, name: "CHOCOLATE BERRY", price: 39, image: "/Products/chocolate_berry.png", description: "A delightful combination of rich chocolate and fresh berries. A perfect blend of sweetness and tartness that will satisfy your cravings.", category: "BERRY SERIES" },
  { id: 7, name: "MATCHA BERRY", price: 39, image: "/Products/matcha_berry.png", description: "Premium matcha green tea paired with sweet berries. A refreshing and healthy drink with a unique flavor profile.", category: "BERRY SERIES" },
  { id: 8, name: "STRAWBERRY", price: 39, image: "/Products/strawberry.png", description: "Fresh, juicy strawberries blended to perfection. A classic fruity drink that's both refreshing and delicious.", category: "BERRY SERIES" },
  { id: 9, name: "STRAWBERRY MILK", price: 39, image: "/Products/strawberry_milk.png", description: "Creamy milk infused with sweet strawberry flavor. A nostalgic favorite that brings back childhood memories.", category: "BERRY SERIES" },
  { id: 10, name: "WHITE CHOCOLATE BERRY", price: 39, image: "/Products/white_chocolate_berry.png", description: "Smooth white chocolate combined with fresh berries. An indulgent treat that's both creamy and fruity.", category: "BERRY SERIES" },
  { id: 11, name: "BLUE BERRY", price: 39, image: "/Products/blue_berry.png", description: "Refreshing blueberry soda with a burst of fruity flavor. Perfect for a hot day when you need something cool and invigorating.", category: "SODA SERIES" },
  { id: 12, name: "GREEN APPLE", price: 39, image: "/Products/green_apple.png", description: "Crisp and tangy green apple soda. A refreshing drink that combines the sweetness of apples with a fizzy twist.", category: "SODA SERIES" },
  { id: 13, name: "PASSION FRUIT", price: 39, image: "/Products/passion_fruit.png", description: "Tropical passion fruit soda with an exotic flavor. A unique and refreshing drink that transports you to paradise.", category: "SODA SERIES" },
  { id: 14, name: "STRAWBERRY", price: 39, image: "/Products/strawberry.png", description: "Sweet strawberry soda with a bubbly fizz. A classic fruity drink that's perfect for any occasion.", category: "SODA SERIES" },
  { id: 15, name: "KIWI", price: 39, image: "/Products/kiwi.png", description: "Fresh kiwi soda with a tropical twist. A unique and refreshing drink that's both sweet and tangy.", category: "SODA SERIES" },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [size, setSize] = useState<Size>('SMALL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = allProducts.find((p) => p.id === parseInt(id || '0'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fce7c7]">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-4xl font-bold text-[#3a2a18] mb-4">Product Not Found</h1>
          <Button
            onClick={() => navigate('/store')}
            className="bg-[#5e341c] text-white hover:bg-[#e5c570]"
          >
            Back to Store
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      description: product.description,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSizeSelect = (selectedSize: Size) => {
    setSize(selectedSize);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fce7c7]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/store')}
          variant="ghost"
          className="mb-6 text-[#3a2a18] hover:text-[#e5c570] hover:bg-transparent"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Store
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block bg-[#e5c570] text-[#3a2a18] px-4 py-2 rounded-full text-sm font-semibold">
              {product.category}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#3a2a18]">
              {product.name}
            </h1>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                ))}
              </div>
              <span className="text-[#3a2a18] text-sm">(4.8 - 120 Reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-[#3a2a18]">
              ₱{product.price}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#3a2a18]">Description</h2>
              <p className="text-[#3a2a18] text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-xl font-semibold text-[#3a2a18] block">
                Select Size
              </label>
              <div className="relative">
                <button
                  className="w-full py-3 px-4 border-2 border-[#3a2a18] text-[#3a2a18] font-semibold flex justify-between items-center bg-white hover:bg-[#fce7c7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  {size} <ChevronDownIcon size={20} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#3a2a18] z-10 shadow-lg">
                    {(['SMALL', 'LARGE'] as Size[]).map((s) => (
                      <button
                        key={s}
                        className={`w-full py-3 px-4 text-left font-semibold hover:bg-[#fce7c7] transition-colors ${
                          size === s ? 'bg-[#fce7c7]' : ''
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
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#5e341c] text-white font-bold text-lg uppercase hover:bg-[#e5c570] hover:text-[#3a2a18] transition-all duration-300 flex items-center justify-center gap-2"
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-[#3a2a18]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#3a2a18]">
                <span className="font-semibold">Availability:</span>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
              <div className="flex items-center gap-2 text-[#3a2a18]">
                <span className="font-semibold">Category:</span>
                <span>{product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
