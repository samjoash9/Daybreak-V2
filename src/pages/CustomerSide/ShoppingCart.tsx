import Header from '../../components/layout/Header';
import { Button } from '../../components/common/button';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, size: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, size as 'SMALL' | 'LARGE', newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fce7c7]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <ShoppingBag className="text-[#3a2a18]" size={80} />
            <h1 className="text-4xl font-bold text-[#3a2a18]">Your Cart is Empty</h1>
            <p className="text-[#3a2a18] text-lg text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button
              onClick={() => navigate('/store')}
              className="bg-[#5e341c] text-white hover:bg-[#e5c570] hover:text-[#3a2a18] px-8 py-3 text-lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fce7c7]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/store')}
              variant="ghost"
              className="text-[#3a2a18] hover:text-[#e5c570] hover:bg-transparent"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Button>
            <h1 className="text-4xl font-bold text-[#3a2a18]">Shopping Cart</h1>
          </div>
          <Button
            onClick={clearCart}
            variant="outline"
            className="text-[#3a2a18] border-[#3a2a18] hover:bg-[#e5c570]"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-[#fce7c7] rounded-lg p-2"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#3a2a18] mb-2">{item.name}</h3>
                    <div className="flex items-center gap-4 text-[#3a2a18]">
                      <span className="font-semibold">Size: {item.size}</span>
                      <span className="text-lg font-bold">₱{item.price}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                        className="w-10 h-10 rounded-full border-2 border-[#3a2a18] text-[#3a2a18] flex items-center justify-center hover:bg-[#e5c570] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-xl font-semibold text-[#3a2a18] w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                        className="w-10 h-10 rounded-full border-2 border-[#3a2a18] text-[#3a2a18] flex items-center justify-center hover:bg-[#e5c570] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2"
                        aria-label="Increase quantity"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex-shrink-0 flex flex-col justify-between items-end">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Subtotal</div>
                    <div className="text-2xl font-bold text-[#3a2a18]">
                      ₱{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#3a2a18] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#3a2a18]">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">₱{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-[#3a2a18]">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-2xl font-bold text-[#3a2a18]">
                    <span>Total</span>
                    <span>₱{getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#5e341c] text-white font-bold text-lg uppercase hover:bg-[#e5c570] hover:text-[#3a2a18] transition-all duration-300"
              >
                Proceed to Checkout
              </Button>

              <Button
                onClick={() => navigate('/store')}
                variant="outline"
                className="w-full mt-4 py-3 border-2 border-[#3a2a18] text-[#3a2a18] font-semibold hover:bg-[#e5c570] transition-colors"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
