import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TrashIcon, ShoppingCartIcon, TruckIcon, HomeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import useCartStore from '../../Stores/ProductStore';

const CartCard = ({ item }) => {
  const navigate = useNavigate();

  const {
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCartStore();

  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 ransition-shadow cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-500">Quantity:</span>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  decreaseQty(item.id);
                }}
                className="px-3 py-1 transition-colors font-semibold text-gray-700"
              >
                −
              </button>

              <span className="px-4 py-1 border-x border-gray-300 min-w-12 text-center font-medium">
                {item.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  increaseQty(item.id);
                }}
                className="px-3 py-1 transition-colors font-semibold text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeItem(item.id);
          }}
          className="flex items-center gap-1 text-red-600 text-sm font-medium transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
          Remove
        </button>
      </div>

      <div className="flex items-center font-semibold text-gray-900">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};


export default function ShoppingCart() {
  const { items, clearCart, totalItems, totalPrice } = useCartStore();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'address', 'payment'
  const [savedAddress, setSavedAddress] = useState(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Scroll to top whenever checkout step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [checkoutStep]);

  const subtotal = totalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleProceedToCheckout = () => {
    if (savedAddress) {
      setCheckoutStep('payment');
    } else {
      setCheckoutStep('address');
    }
  };

  const handleContinueShopping = () => {
    // Navigate to homepage
    navigate("/");
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setSavedAddress(address);
    setCheckoutStep('payment');
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setCheckoutStep('cart');
      setSavedAddress(null);
      setAddress({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });

      toast.success('Purchase Successful!', {
        description: 'Your order has been placed successfully.',
        action: {
          label: (
            <div className="flex items-center gap-1">
              <TruckIcon className="w-4 h-4" />
              Track Order
            </div>
          ),
          onClick: () => {
            console.log('Navigate to order tracking');
            // Navigate to tracking page
          }
        },
        duration: 5000,
      });

      // Return to homepage after toast
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCartIcon className="w-8 h-8" />
            {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'address' && 'Delivery Address'}
            {checkoutStep === 'payment' && 'Payment'}
          </h1>
          {checkoutStep === 'cart' && (
            <p className="text-gray-600 mt-2">{totalItems()} items</p>
          )}
        </div>

        {/* Cart View */}
        {checkoutStep === 'cart' && (
          <>
            <div className="space-y-4 mb-8">
              {items.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-black  text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    <HomeIcon className="w-5 h-5" />
                    Go to Homepage
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <CartCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <>
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 bg-black  text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleContinueShopping}
                    className="flex-1 bg-gray-100  text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Address View */}
        {checkoutStep === 'address' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="USA"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black  text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment View */}
        {checkoutStep === 'payment' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete</h2>
              <p className="text-gray-600">Your order total is</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">${total.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">Including tax and shipping</p>
            </div>

            {savedAddress && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <TruckIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Delivery Address</p>
                    <p className="text-sm text-gray-600">{savedAddress.street}</p>
                    <p className="text-sm text-gray-600">
                      {savedAddress.city}, {savedAddress.state} {savedAddress.zipCode}
                    </p>
                    <p className="text-sm text-gray-600">{savedAddress.country}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-black  disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
              </button>
              <button
                onClick={() => setCheckoutStep('cart')}
                disabled={isProcessing}
                className="w-full bg-gray-100  disabled:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}