import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TruckIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../Stores/ProductStore';
import useUserStore from '../../Stores/UserStore';

export default function AddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCartStore();
  const { address: storedAddress, fetchUserAddress } = useUserStore();
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const isVerified = useUserStore(state => state.isVerified);
  const total = location.state?.total || 0;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (isLoggedIn && !isVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [isLoggedIn, isVerified, navigate]);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch user address on page load
  useEffect(() => {
    fetchUserAddress();
  }, [fetchUserAddress]);

  // Fill form when address is fetched
  useEffect(() => {
    if (storedAddress?.streetAddress) {
      setAddress({
        street: storedAddress.streetAddress,
        city: storedAddress.city,
        state: storedAddress.state,
        zipCode: storedAddress.zipCode,
        country: storedAddress.country,
      });
    }
  }, [storedAddress]);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const calculatedTotal = subtotal + tax + shipping;

  const handleSaveAddress = (e) => {
    e.preventDefault();
    navigate('/checkout/payment', { state: { address, total: calculatedTotal } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <TruckIcon className="w-8 h-8" />
            Delivery Address
          </h1>
        </div>

        <div className="space-y-6">
          {/* Products Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pb-3 border-b border-gray-100 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${calculatedTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Address Form */}
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
                  onClick={() => navigate('/cart')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
