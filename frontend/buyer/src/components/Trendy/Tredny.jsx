import React, { useState } from 'react';

// Your existing ProductCard component (import this from your file)
import ProductCard from '../Cards/Card';

export default function TrendyProductsSection() {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filters = ['ALL', 'NEW ARRIVALS', 'BEST SELLER', 'TOP RATED'];

    const allProducts = [
        {
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
            category: "Dresses",
            name: "Cableknit Shawl",
            price: 100,
            rating: 4,
            reviewCount: "9k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=400&q=80",
            category: "Dresses",
            name: "Cropped Faux Leather Jacket",
            price: 29,
            rating: 4,
            reviewCount: "8k+",
            tags: ['ALL', 'BEST SELLER']
        },
        {
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
            category: "Dresses",
            name: "Shirt In Botanical Cheetah Print",
            price: 60,
            rating: 3,
            reviewCount: "7k+",
            tags: ['ALL', 'BEST SELLER', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
            category: "Dresses",
            name: "Cotton Jersey T-Shirt",
            price: 17,
            rating: 5,
            reviewCount: "5k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
            category: "Dresses",
            name: "Cotton Jersey T-Shirt",
            price: 17,
            rating: 5,
            reviewCount: "5k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
            category: "Dresses",
            name: "Cotton Jersey T-Shirt",
            price: 17,
            rating: 5,
            reviewCount: "5k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
            category: "Dresses",
            name: "Cotton Jersey T-Shirt",
            price: 17,
            rating: 5,
            reviewCount: "5k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        },
        {
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
            category: "Dresses",
            name: "Cotton Jersey T-Shirt",
            price: 17,
            rating: 5,
            reviewCount: "5k+",
            tags: ['ALL', 'NEW ARRIVALS', 'TOP RATED']
        }
    ];

    const filteredProducts = activeFilter === 'ALL'
        ? allProducts
        : allProducts.filter(product => product.tags.includes(activeFilter));

    return (
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-16">
            {/* Header */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
                OUR TRENDY PRODUCTS
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`relative text-sm md:text-base font-medium transition-colors group ${activeFilter === filter
                            ? 'text-black'
                            : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        {filter}
                        <span
                            className={`absolute top-6 left-0 h-0.5 bg-black transition-all duration-500 ${activeFilter === filter
                                ? 'w-3/4'
                                : 'w-0 group-hover:w-3/4'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        image={product.image}
                        category={product.category}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                ))}
            </div>
            <div className="relative mx-auto my-10 w-fit text-sm font-semibold cursor-pointer group">
                DISCOVER MORE
                <span
                    className="absolute left-0 -bottom-1 h-0.5 w-1/2 bg-black transition-all duration-300 group-hover:w-3/4"
                />
            </div>

        </div>
    );
}