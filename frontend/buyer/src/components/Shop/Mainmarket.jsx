import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '../Cards/Card';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import MoreOptions from './MoreOptions';

// PaginatedGrid Component
const PaginatedGrid = ({ allData = [], maxPageNumbers = 5, scrollRef }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('none');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 8;

  const options = [
    { label: 'Price: Low to High', value: 'low-to-high' },
    { label: 'Price: High to Low', value: 'high-to-low' }
  ];

  // Sort data based on selected order
  const sortedData = [...allData].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData.slice(startIndex, endIndex);

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

  const handleSelect = (option) => {
    setSortOrder(option.value);
    setIsOpen(false);
    setCurrentPage(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const startY = window.scrollY;
    const targetY =
      scrollRef.current.getBoundingClientRect().top +
      window.scrollY -
      125; // matches scroll-mt-35 (~35 * 4px)

    const duration = 500; // ⬅️ increase = slower scroll
    let startTime = null;

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateScroll = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOut(progress);
      const currentY =
        startY + (targetY - startY) * easedProgress;

      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [currentPage, scrollRef]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-50 transition-colors duration-200 min-w-55 text-gray-800"
          >
            <span className="text-[15px]">Sort by Price</span>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-10 transition-all duration-300 origin-top ${
            isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}>
            {options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-6 py-3 text-[15px] text-gray-800 hover:bg-gray-100 transition-colors duration-150 ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

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
            className="text-[18px] font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-black transition-colors relative group"
          >
            Previous
            {currentPage > 0 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-current w-1/2"></span>
            )}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-current w-0 group-hover:w-full transition-all duration-300"></span>
          </button>

          <span className="text-[18px] font-semibold">{currentPage + 1}</span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="text-[18px] font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-black transition-colors relative group"
          >
            Next
            {currentPage < totalPages - 1 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-current w-1/2"></span>
            )}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-current w-0 group-hover:w-[85%] transition-all duration-300"></span>
          </button>
        </div>
      )}

    </div>
  );
};

// Mainmarket
const Mainmarket = ({ heading = "Kids Collection" }) => {
  const headingRef = useRef(null);
  const words = heading.split(' ');
  const firstWord = words[0]; // Mens
  const restWords = words.slice(1).join(' ');
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
    <div className="min-h-screen py-8">
      <h1
        ref={headingRef}
        className="text-4xl text-center mb-9 text-gray-900 scroll-mt-35"
      >
        {/* First word bold with underline */}
        <span className="font-bold relative inline-block">
          {firstWord}
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-black"></span>
        </span>{' '}
        {/* Remaining words light */}
        <span className="font-light text-gray-500">{restWords}</span>
      </h1>

      <PaginatedGrid
        allData={productData}
        maxPageNumbers={5}
        scrollRef={headingRef}
      />
      <MoreOptions name={firstWord}/>
    </div>
  );
};

export default Mainmarket;