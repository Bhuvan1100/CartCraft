import React, { useState } from 'react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Highly recommended.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Good quality, fast delivery.',
      date: '2024-01-10'
    }
  ]);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = () => {
    if (newReview.name && newReview.comment) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-8 py-5 text-lg font-medium transition-colors duration-200 focus:outline-none"
            style={{
              color: activeTab === tab.id ? '#000' : '#666'
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span
                className="absolute bottom-0 left-1/2 h-0.5 bg-black transition-all duration-300 ease-out"
                style={{
                  width: '75%',
                  transform: 'translateX(-50%)',
                  animation: 'expandLine 0.3s ease-out'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-opacity duration-200">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">
              This premium product is crafted with the finest materials to ensure durability and 
              exceptional performance. Designed with attention to detail, it combines functionality 
              with elegant aesthetics to meet the highest standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're a professional or an enthusiast, this product delivers outstanding 
              results every time. Its innovative features and user-friendly design make it the 
              perfect choice for your needs.
            </p>
          </div>
        )}

        {activeTab === 'additional' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Weight:</span>
                <span className="ml-2 text-gray-700">2.5 kg</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Dimensions:</span>
                <span className="ml-2 text-gray-700">30 × 20 × 15 cm</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Material:</span>
                <span className="ml-2 text-gray-700">Premium Steel</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Color:</span>
                <span className="ml-2 text-gray-700">Black</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Warranty:</span>
                <span className="ml-2 text-gray-700">2 Years</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Country:</span>
                <span className="ml-2 text-gray-700">Made in USA</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
            
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Submit Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 mt-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < review.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes expandLine {
          from {
            width: 0%;
          }
          to {
            width: 75%;
          }
        }
      `}</style>
    </div>
  );
}