import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { TrashIcon, ShoppingCartIcon, TruckIcon, HomeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

const CartCard = ({ item, onRemove }) => {
    return (
        <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
            <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-24 h-24 object-cover rounded-md bg-gray-100"
            />

            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                <p className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>

                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove(item.id);
                        }}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                        <TrashIcon className="w-4 h-4" />
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 79.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
        },
        {
            id: 3,
            name: 'Laptop Sleeve',
            price: 29.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop'
        }
    ]);

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

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
            setCartItems([]);
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
                        <div className="flex items-center gap-2">
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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {checkoutStep === 'cart' && 'Shopping Cart'}
                                {checkoutStep === 'address' && 'Delivery Address'}
                                {checkoutStep === 'payment' && 'Payment'}
                            </h1>
                            {checkoutStep === 'cart' && (
                                <span className="ml-auto text-sm text-gray-500">{cartItems.length} items</span>
                            )}
                        </div>
                    </div>

                    {/* Cart View */}
                    {checkoutStep === 'cart' && (
                        <>
                            <div className="px-6 py-4">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                                        <button
                                            onClick={handleContinueShopping}
                                            className="inline-flex items-center gap-2 px-6 py-2 bg-black  text-white font-medium rounded-md transition-colors"
                                        >
                                            <HomeIcon className="w-5 h-5" />
                                            Go to Homepage
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/product/${item.id}`}
                                                className="block"
                                            >
                                                <CartCard
                                                    item={item}
                                                    onRemove={removeItem}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cartItems.length > 0 && (
                                <>
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-gray-700">
                                                <span>Subtotal</span>
                                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-700">
                                                <span>Tax (8%)</span>
                                                <span className="font-medium">${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-700">
                                                <span>Shipping</span>
                                                <span className="font-medium">
                                                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                                </span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-300">
                                                <div className="flex justify-between text-lg font-semibold text-gray-900">
                                                    <span>Total</span>
                                                    <span>${total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-white">
                                        <button
                                            onClick={handleProceedToCheckout}
                                            className="w-full bg-black  text-white font-semibold py-3 px-6 rounded-md transition-colors"
                                        >
                                            Proceed to Checkout
                                        </button>
                                        <button
                                            onClick={handleContinueShopping}
                                            className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors"
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
                        <div className="px-6 py-6">
                            <form onSubmit={handleSaveAddress} className="space-y-4 max-w-2xl mx-auto">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.state}
                                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="NY"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.zipCode}
                                            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="10001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.country}
                                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="USA"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setCheckoutStep('cart')}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Back to Cart
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-black text-white rounded-lg  transition-colors font-semibold"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Payment View */}
                    {checkoutStep === 'payment' && (
                        <div className="px-6 py-6">
                            <div className="max-w-md mx-auto text-center">
                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6">
                                    <CheckCircleIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete</h3>
                                    <p className="text-gray-600 mb-6">Your order total is</p>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">${total.toFixed(2)}</div>
                                    <p className="text-sm text-gray-500">Including tax and shipping</p>
                                </div>

                                {savedAddress && (
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Delivery Address</p>
                                        <p className="text-gray-900">{savedAddress.street}</p>
                                        <p className="text-gray-900">
                                            {savedAddress.city}, {savedAddress.state} {savedAddress.zipCode}
                                        </p>
                                        <p className="text-gray-900">{savedAddress.country}</p>
                                    </div>
                                )}

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full bg-black  disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg mb-3"
                                >
                                    {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
                                </button>
                                <button
                                    onClick={() => setCheckoutStep('cart')}
                                    disabled={isProcessing}
                                    className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Back to Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}