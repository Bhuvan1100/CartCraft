import React from 'react';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function ProductCard({ 
  image = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  category = "Dresses",
  name = "Cropped Faux Leather Jacket",
  price = 29,
  rating = 3,
  reviewCount = "8k+"
}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="relative bg-gray-50 aspect-4/5 mb-1">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div>
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{category}</p>

        {/* Product Name */}
        <h3 className="text-l text-gray-900 ">
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
}