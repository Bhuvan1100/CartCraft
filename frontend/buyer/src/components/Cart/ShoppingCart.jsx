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
    navigate(`/product/${item.productId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg"
        />
        {/* Stock Badge */}
        {item.availableQuantity < 10 && item.availableQuantity > 0 && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.availableQuantity} left
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">{item.name}</h3>
          
          {/* Size Display */}
          {item.size && (
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="text-xs font-medium text-gray-500">Size:</span>
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-semibold rounded-md">
                {item.size}
              </span>
            </div>
          )}

          {/* Price Display */}
          <div className="flex items-center gap-2 mb-3">
            {item.salePrice && item.salePrice < item.originalPrice ? (
              <>
                <p className="text-xl font-bold text-gray-900">${item.salePrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</p>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                  SALE
                </span>
              </>
            ) : (
              <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  decreaseQty(item.id);
                  if (item.quantity === 1) {
                    toast.success("Item removed from cart");
                  }
                }}
                className="px-3 py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700"
              >
                −
              </button>

              <span className="px-5 py-2 border-x-2 border-gray-300 min-w-12.5 text-center font-bold text-gray-900">
                {item.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // 🔒 BLOCK MORE THAN 10
                  if (item.quantity >= 10) {
                    toast.info("Maximum 10 items per product", {
                      style: { fontSize: "15px" },
                    });
                    return;
                  }

                  // 🔒 CHECK AVAILABLE QUANTITY
                  if (item.quantity >= item.availableQuantity) {
                    toast.warning(`Only ${item.availableQuantity} available in stock`, {
                      style: { fontSize: "15px" },
                    });
                    return;
                  }

                  increaseQty(item.id);
                }}
                className="px-3 py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700"
              >
                +
              </button>
            </div>

            {/* Low Stock Warning */}
            {item.availableQuantity < 10 && item.availableQuantity > 0 && (
              <span className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Low stock
              </span>
            )}
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeItem(item.id);
            toast.success("Item removed from cart");
          }}
          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-semibold transition-colors mt-2 w-fit"
        >
          <TrashIcon className="w-4 h-4" />
          Remove
        </button>
      </div>

      {/* Item Total Price */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
          <p className="text-xl font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ShoppingCart() {
  const { items, totalItems, totalPrice, fetchCartUIData, isLoadingUI } = useCartStore();
  const { cartItems } = useUserStore();
  const navigate = useNavigate();
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const isVerified = useUserStore(state => state.isVerified);

  // Redirect if not logged in or verified
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (!isVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [isLoggedIn, isVerified, navigate]);

  // Fetch cart UI data when component mounts
  useEffect(() => {
    if (isLoggedIn && isVerified && cartItems && cartItems.length > 0) {
      console.log('[SHOPPING_CART] Fetching UI data for cart items');
      fetchCartUIData(cartItems);
    } else if (isLoggedIn && isVerified && (!cartItems || cartItems.length === 0)) {
      // Set empty state if no cart items
      console.log('[SHOPPING_CART] No cart items found');
    }
  }, [isLoggedIn, isVerified, cartItems, fetchCartUIData]);

  const subtotal = totalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    navigate('/checkout/address', { state: { total } });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  // Show loading state
  if (isLoadingUI) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black mx-auto"></div>
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCartIcon className="w-10 h-10" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {totalItems()} {totalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <ShoppingCartIcon className="w-20 h-20 mx-auto text-gray-300 mb-6" />
                <p className="text-gray-600 text-xl font-semibold mb-3">Your cart is empty</p>
                <p className="text-gray-500 mb-8">Add some products to get started!</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  <HomeIcon className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {items.map(item => (
                  <CartCard key={item.id} item={item} />
                ))}
              </>
            )}
          </div>

          {/* Order Summary - Takes 1 column */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({totalItems()} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-green-600">FREE</span>
                    ) : (
                      <span className="font-semibold">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}