import React, { useState } from 'react';
import ProductCard from '../Cards/Card';


// PaginatedGrid Component
const PaginatedGrid = ({ allData = [], maxPageNumbers = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allData.slice(startIndex, endIndex);

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = [];
    const halfMax = Math.floor(maxPageNumbers / 2);
    let startPage = Math.max(0, currentPage - halfMax);
    let endPage = Math.min(totalPages - 1, startPage + maxPageNumbers - 1);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(0, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentItems.map((item, index) => (
          <ProductCard
            key={index}
            image={item.image}
            category={item.category}
            name={item.name}
            price={item.price}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        ))}
      </div>

      {allData.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`text-lg transition-all ${
              currentPage === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:font-bold hover:text-gray-900'
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className="relative"
            >
              <span className={`text-lg transition-all ${
                currentPage === pageIndex
                  ? 'font-bold text-gray-900'
                  : 'text-gray-600 hover:font-bold hover:text-gray-900'
              }`}>
                {pageIndex + 1}
              </span>
              {currentPage === pageIndex && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900"></span>
              )}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`text-lg transition-all ${
              currentPage === totalPages - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:font-bold hover:text-gray-900'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Demo App
const Mainmarket = () => {
  const productData = [
    {
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Jackets",
      name: "Cropped Faux Leather Jacket",
      price: 29,
      rating: 4,
      reviewCount: "8k+"
    },
    {
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      category: "Dresses",
      name: "Floral Summer Dress",
      price: 45,
      rating: 5,
      reviewCount: "12k+"
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      category: "Accessories",
      name: "Designer Handbag",
      price: 89,
      rating: 4,
      reviewCount: "5k+"
    },
    {
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
      category: "Footwear",
      name: "Classic White Sneakers",
      price: 65,
      rating: 5,
      reviewCount: "15k+"
    },
    {
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      category: "Tops",
      name: "Casual Cotton T-Shirt",
      price: 19,
      rating: 3,
      reviewCount: "3k+"
    },
    {
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Pants",
      name: "Slim Fit Jeans",
      price: 55,
      rating: 4,
      reviewCount: "9k+"
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      category: "Accessories",
      name: "Leather Belt",
      price: 25,
      rating: 4,
      reviewCount: "2k+"
    },
    {
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
      category: "Outerwear",
      name: "Wool Coat",
      price: 120,
      rating: 5,
      reviewCount: "7k+"
    },
    {
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      category: "Dresses",
      name: "Evening Gown",
      price: 95,
      rating: 5,
      reviewCount: "6k+"
    },
    {
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Tops",
      name: "Silk Blouse",
      price: 68,
      rating: 4,
      reviewCount: "4k+"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Product Collection
      </h1>
      <PaginatedGrid allData={productData} maxPageNumbers={5} />
    </div>
  );
};

export default Mainmarket;