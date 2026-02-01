import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { TrashIcon, ShoppingCartIcon, HomeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import useCartStore from '../../Stores/ProductStore';
import useUserStore from '../../Stores/UserStore';
import { useEffect } from 'react';

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

                  // 🔒 BLOCK MORE THAN 10
                  if (item.quantity >= 10) {
                    toast.info("Cannot buy more than 10 same items in one time", {
                      style: { fontSize: "15px" },
                    });
                    return;
                  }

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
  const { items, totalItems, totalPrice } = useCartStore();
  const navigate = useNavigate();
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const isVerified = useUserStore(state => state.isVerified);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (!isVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [isLoggedIn, isVerified, navigate]);

  const subtotal = totalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleProceedToCheckout = () => {
    navigate('/checkout/address', { state: { total } });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCartIcon className="w-8 h-8" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">{totalItems()} items</p>
        </div>

        {/* Cart View */}
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
      </div>
    </div>
  );
}