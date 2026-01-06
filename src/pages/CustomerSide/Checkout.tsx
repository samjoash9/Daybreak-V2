import { useState } from 'react';
import Header from '../../components/layout/Header';
import { Button } from '../../components/common/button';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, CreditCard, Wallet, Smartphone } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'cod' | 'gcash' | 'card' | '';
}

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: 'pickup',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.deliveryMethod === 'delivery') {
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required for delivery';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required for delivery';
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'Zip code is required for delivery';
      }
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please choose a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fce7c7]">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-6" size={80} />
            <h1 className="text-4xl font-bold text-[#3a2a18] mb-4">Order Placed Successfully!</h1>
            <p className="text-[#3a2a18] text-lg mb-8">
              Thank you for your order. We've sent a confirmation email to <strong>{formData.email}</strong>
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/store')}
                className="bg-[#5e341c] text-white hover:bg-[#e5c570] hover:text-[#3a2a18] px-8 py-3 text-lg"
              >
                Continue Shopping
              </Button>
              <div>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-2 border-[#3a2a18] text-[#3a2a18] hover:bg-[#e5c570] px-8 py-3 text-lg"
                >
                  Back to Home
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => navigate('/my-checkout')}
                  variant="outline"
                  className="border-2 border-[#3a2a18] text-[#3a2a18] hover:bg-[#e5c570] px-8 py-3 text-lg"
                >
                  View My Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fce7c7]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/cart')}
          variant="ghost"
          className="mb-6 text-[#3a2a18] hover:text-[#e5c570] hover:bg-transparent"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Cart
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-bold text-[#3a2a18] mb-6">Checkout Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Delivery Method */}
                <div>
                  <label className="block text-lg font-semibold text-[#3a2a18] mb-3">
                    Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, deliveryMethod: 'pickup' }));
                        setErrors((prev) => ({ ...prev, address: '', city: '', zipCode: '' }));
                      }}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        formData.deliveryMethod === 'pickup'
                          ? 'border-[#5e341c] bg-[#fce7c7] text-[#3a2a18]'
                          : 'border-gray-300 text-gray-600 hover:border-[#e5c570]'
                      }`}
                    >
                      Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, deliveryMethod: 'delivery' }))}
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        formData.deliveryMethod === 'delivery'
                          ? 'border-[#5e341c] bg-[#fce7c7] text-[#3a2a18]'
                          : 'border-gray-300 text-gray-600 hover:border-[#e5c570]'
                      }`}
                    >
                      Delivery
                    </button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Delivery Address (only if delivery is selected) */}
                {formData.deliveryMethod === 'delivery' && (
                  <>
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                        Address <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                      />
                      {errors.address && (
                        <p id="address-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                          City <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          aria-invalid={!!errors.city}
                          aria-describedby={errors.city ? 'city-error' : undefined}
                        />
                        {errors.city && (
                          <p id="city-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-semibold text-[#3a2a18] mb-2">
                          Zip Code <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5c570] focus:ring-offset-2 ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          aria-invalid={!!errors.zipCode}
                          aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                        />
                        {errors.zipCode && (
                          <p id="zipCode-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-[#3a2a18]">
                    Payment Method <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', icon: Wallet, description: 'Pay when you receive' },
                      { id: 'gcash', label: 'GCash', icon: Smartphone, description: 'Instant confirmation' },
                      { id: 'card', label: 'Card', icon: CreditCard, description: 'Visa / Mastercard' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id as FormData['paymentMethod'] }))}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-[#e5c570] focus:outline-none focus:ring-2 focus:ring-[#e5c570] ${
                          formData.paymentMethod === method.id
                            ? 'border-[#5e341c] bg-[#fce7c7] text-[#3a2a18]'
                            : 'border-gray-300 text-[#3a2a18]'
                        }`}
                        aria-pressed={formData.paymentMethod === method.id}
                      >
                        <div className="flex items-center gap-3">
                          <method.icon size={22} className="text-[#5e341c]" />
                          <div>
                            <p className="font-semibold">{method.label}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#5e341c] text-white font-bold text-lg uppercase hover:bg-[#e5c570] hover:text-[#3a2a18] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#3a2a18] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-[#3a2a18]">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-[#3a2a18]">₱{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-3">
                <div className="flex justify-between text-[#3a2a18]">
                  <span>Subtotal</span>
                  <span className="font-semibold">₱{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-[#3a2a18]">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-2xl font-bold text-[#3a2a18]">
                    <span>Total</span>
                    <span>₱{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
