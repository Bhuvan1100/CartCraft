// ShopPage.jsx
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
    { label: 'Price: High to Low', value: 'high-to-low' },
  ];

  // Sort data based on selected order
  const sortedData = [...allData].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    if (sortOrder === 'popularity') {
      for (let i = allData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allData[i], allData[j]] = [allData[j], allData[i]];
      }
      return 0;
    }
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
      130;

    const duration = 500;
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

// ShopPage
const ShopPage = ({ heading = "Shop Collection", productData }) => {
  const headingRef = useRef(null);
  const words = heading.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  // Default product data if none provided
  const defaultProductData = [
    {
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Jackets",
      name: "Cropped Faux Leather Jacket",
      price: 129,
      rating: 4,
      reviewCount: "8k+"
    },
    {
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      category: "Dresses",
      name: "Floral Summer Dress",
      price: 85,
      rating: 5,
      reviewCount: "12k+"
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      category: "Accessories",
      name: "Designer Handbag",
      price: 199,
      rating: 4,
      reviewCount: "5k+"
    },
    {
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
      category: "Footwear",
      name: "Classic White Sneakers",
      price: 95,
      rating: 5,
      reviewCount: "15k+"
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      category: "Tops",
      name: "Casual Cotton T-Shirt",
      price: 35,
      rating: 3,
      reviewCount: "3k+"
    },
    {
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
      category: "Pants",
      name: "Slim Fit Jeans",
      price: 79,
      rating: 4,
      reviewCount: "9k+"
    },
    {
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      category: "Accessories",
      name: "Leather Belt",
      price: 45,
      rating: 4,
      reviewCount: "2k+"
    },
    {
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
      category: "Outerwear",
      name: "Wool Coat",
      price: 249,
      rating: 5,
      reviewCount: "7k+"
    },
    {
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
      category: "Dresses",
      name: "Evening Gown",
      price: 179,
      rating: 5,
      reviewCount: "6k+"
    },
    {
      image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&q=80",
      category: "Tops",
      name: "Silk Blouse",
      price: 99,
      rating: 4,
      reviewCount: "4k+"
    },
    {
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
      category: "Jackets",
      name: "Bomber Jacket",
      price: 159,
      rating: 5,
      reviewCount: "11k+"
    },
    {
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
      category: "Shorts",
      name: "Cotton Chino Shorts",
      price: 55,
      rating: 4,
      reviewCount: "7k+"
    },
    {
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      category: "Hoodies",
      name: "Pullover Fleece Hoodie",
      price: 69,
      rating: 5,
      reviewCount: "22k+"
    },
    {
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
      category: "Sweaters",
      name: "Merino Wool Sweater",
      price: 119,
      rating: 4,
      reviewCount: "10k+"
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      category: "Blazers",
      name: "Tailored Navy Blazer",
      price: 229,
      rating: 5,
      reviewCount: "8k+"
    },
    {
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
      category: "Shirts",
      name: "Cotton Dress Shirt",
      price: 65,
      rating: 5,
      reviewCount: "18k+"
    }
  ];

  const dataToUse = productData || defaultProductData;

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
        allData={dataToUse}
        maxPageNumbers={5}
        scrollRef={headingRef}
      />
      <MoreOptions />
    </div>
  );
};

export default ShopPage;