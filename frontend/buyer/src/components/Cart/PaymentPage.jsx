import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TruckIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import useCartStore from '../../Stores/ProductStore';
import useUserStore from '../../Stores/UserStore';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const isVerified = useUserStore(state => state.isVerified);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (isLoggedIn && !isVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [isLoggedIn, isVerified, navigate]);

  const address = location.state?.address || null;
  const total = location.state?.total || 0;

  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('Time expired!', {
            description: 'Please complete your checkout.',
          });
          navigate('/cart');
          return 15 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();

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
            navigate("/current-orders")
          }
        },
        duration: 5000,
      });

      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <CheckCircleIcon className="w-8 h-8" />
            Payment
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Timer Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-red-600" />
              <div className="flex-1">
                <p className="font-semibold text-red-900">Complete your purchase soon!</p>
                <p className="text-sm text-red-700">Your cart will expire in <span className="font-bold">{formatTime(timeLeft)}</span> minutes.</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete</h2>
            <p className="text-gray-600">Your order total is</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">${total.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Including tax and shipping</p>
          </div>

          {address && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <TruckIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
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
              onClick={() => navigate('/cart')}
              disabled={isProcessing}
              className="w-full bg-gray-100  disabled:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}