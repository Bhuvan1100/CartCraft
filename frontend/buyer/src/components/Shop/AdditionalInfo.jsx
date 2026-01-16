import React, { useState } from 'react';
import { ShoppingCartIcon, StarIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const product = {
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    totalReviews: 328,
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop"
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort padding",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone"
    ],
    inStock: true
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    // Function called when add to cart is clicked
    setQuantity(1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log({ reviewerName, reviewRating, reviewText });
    // Reset form
    setReviewerName('');
    setReviewRating(0);
    setReviewText('');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400' 
            : index < rating 
            ? 'text-yellow-400 opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className={`grid gap-4 ${
                  product.images.length === 2 ? 'grid-cols-2' :
                  product.images.length === 3 ? 'grid-cols-3' :
                  'grid-cols-4'
                }`}>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-blue-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  {product.rating >= 4 ? 'Excellent' : product.rating >= 3 ? 'Good' : 'Average'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <PlusIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm mt-8">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-8 py-4 font-semibold text-lg relative transition-colors ${
                activeTab === 'description' 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              DESCRIPTION
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-8 py-4 font-semibold text-lg relative transition-colors ${
                activeTab === 'additional' 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              ADDITIONAL INFORMATION
              {activeTab === 'additional' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-4 font-semibold text-lg relative transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              REVIEWS (2)
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Sed do eiusmod tempor incididunt ut labore</h2>
                
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Why choose product?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black mt-1">•</span>
                        <span>Creat by cotton fibric with soft and smooth</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black mt-1">•</span>
                        <span>Simple, Configurable (e.g. size, color, etc.), bundled</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black mt-1">•</span>
                        <span>Downloadable/Digital Products, Virtual Products</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Number List</h3>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black font-medium">1.</span>
                        <span>Creat by cotton fibric with soft and smooth</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black font-medium">2.</span>
                        <span>Simple, Configurable (e.g. size, color, etc.), bundled</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <span className="text-black font-medium">3.</span>
                        <span>Downloadable/Digital Products, Virtual Products</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lining</h3>
                  <p className="text-gray-700">100% Polyester, Main: 100% Polyester.</p>
                </div>
              </div>
            )}

            {/* Additional Information Tab */}
            {activeTab === 'additional' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
                <div className="space-y-3">
                  <div className="flex border-b border-gray-200 py-3">
                    <span className="font-semibold text-gray-900 w-48">Weight</span>
                    <span className="text-gray-700">1.2 kg</span>
                  </div>
                  <div className="flex border-b border-gray-200 py-3">
                    <span className="font-semibold text-gray-900 w-48">Dimensions</span>
                    <span className="text-gray-700">20 × 15 × 8 cm</span>
                  </div>
                  <div className="flex border-b border-gray-200 py-3">
                    <span className="font-semibold text-gray-900 w-48">Material</span>
                    <span className="text-gray-700">Premium Plastic & Metal</span>
                  </div>
                  <div className="flex border-b border-gray-200 py-3">
                    <span className="font-semibold text-gray-900 w-48">Color</span>
                    <span className="text-gray-700">Black, Silver</span>
                  </div>
                  <div className="flex border-b border-gray-200 py-3">
                    <span className="font-semibold text-gray-900 w-48">Battery Life</span>
                    <span className="text-gray-700">Up to 30 hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

                {/* Existing Reviews */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">John Doe</span>
                      <div className="flex">{renderStars(5)}</div>
                    </div>
                    <p className="text-gray-700">
                      Excellent product! The sound quality is amazing and the battery life is exactly as advertised. Highly recommend!
                    </p>
                    <span className="text-sm text-gray-500 mt-2 block">January 10, 2026</span>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">Sarah Smith</span>
                      <div className="flex">{renderStars(4)}</div>
                    </div>
                    <p className="text-gray-700">
                      Great headphones for the price. Comfortable to wear for long periods. Only minor issue is the noise cancellation could be slightly better.
                    </p>
                    <span className="text-sm text-gray-500 mt-2 block">January 8, 2026</span>
                  </div>
                </div>

                {/* Write Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
                  
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Rating Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none"
                          >
                            <StarIcon
                              className={`w-8 h-8 transition-colors ${
                                star <= (hoverRating || reviewRating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        placeholder="Share your experience with this product..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}