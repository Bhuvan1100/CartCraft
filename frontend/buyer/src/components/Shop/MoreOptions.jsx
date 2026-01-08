import React from 'react';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// ProductCard Component (same as yours)
const ProductCard = ({ 
  image = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  category = "Dresses",
  name = "Cropped Faux Leather Jacket",
  price = 29,
  rating = 3,
  reviewCount = "8k+"
}) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden cursor-pointer">
      {/* Product Image */}
      <div className="relative bg-gray-50 mb-1">
        <img
          src={image}
          alt={name}
          className="w-full h-3/4 object-cover"
        />
      </div>

      {/* Product Details */}
      <div>
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{category}</p>

        {/* Product Name */}
        <h3 className="text-l text-gray-900">
          {name}
        </h3>

        {/* Price */}
        <p className="text-l text-gray-900 font-semibold">${price}</p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">{reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );
};

// MoreOptions Component
const MoreOptions = ({ name }) => {
  const categories = {
    Kids: {
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80',
      category: 'Kids Collection',
      name: 'Kids Fashion',
      price: 35,
      rating: 5,
      reviewCount: '10k+'
    },
    Mens: {
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80',
      category: 'Mens Collection',
      name: 'Mens Fashion',
      price: 65,
      rating: 4,
      reviewCount: '15k+'
    },
    Womens: {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
      category: 'Womens Collection',
      name: 'Womens Fashion',
      price: 55,
      rating: 5,
      reviewCount: '20k+'
    }
  };

  // Get all categories except the passed one
  const otherCategories = Object.keys(categories).filter(
    cat => cat.toLowerCase() !== name.toLowerCase()
  );

  const handleCategoryClick = (categoryName) => {
    console.log(`Navigating to ${categoryName}`);
    // Add your navigation logic here
  };

  return (
    <div className="w-1/2 max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Explore More Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
        {otherCategories.map((categoryKey) => {
          const categoryData = categories[categoryKey];
          return (
            <div key={categoryKey} onClick={() => handleCategoryClick(categoryKey)}>
              <ProductCard
                image={categoryData.image}
                category={categoryData.category}
                name={categoryData.name}
                price={categoryData.price}
                rating={categoryData.rating}
                reviewCount={categoryData.reviewCount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreOptions;