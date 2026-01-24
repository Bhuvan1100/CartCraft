import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon, StarIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';
import ProductInfo from './ProductInfo';
import SimilarProducts from './SimilarProducts';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Spinner/Spinner';
import { fetchProductById } from '../../Stores/Data';
import { useQuery } from '@tanstack/react-query';
import useCartStore from '../../Stores/ProductStore';

export default function ProductPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const {
    items,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-lg font-semibold text-gray-900">
          ❌ Failed to load product
        </p>
        <p className="text-sm text-gray-500">
          The product may not exist or something went wrong.
        </p>

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 text-sm font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }


  const { product, additionalInfo, reviews, category } = data;

  const handleQuantityChange = (type) => {
    if (quantity === 10 && type === 'increase') {
      toast.info("Cannot buy more than 10 same item in one time", {
        style: {
          fontSize: "15px",
        },
      });
      return;
    }
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    const isInCart = items.some((item) => item.id === product.id);
    if (isInCart) {
      toast.info("Product already in cart", {
        style: {
          fontSize: "15px",
        },
      });
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });
    toast(
      <div className="flex items-center justify-between gap-4 mt-3 w-full px-5 py-3 bg-white border border-gray-200 rounded-md shadow-md">
        <div>
          <p className="font-semibold text-base text-gray-900">
            ✅ Added to cart
          </p>
          <p className="text-sm text-gray-500">
            Item ready for checkout
          </p>
        </div>

        <button
          onClick={() => navigate("/cart")}
          className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-black rounded-lg cursor-pointer hover:bg-gray-900 transition"
        >
          Go to cart
        </button>
      </div>,
      {
        duration: 2000,
        unstyled: true,
      }
    );

  };



  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
          ? 'text-yellow-400'
          : index < rating
            ? 'text-yellow-400 opacity-50'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen  py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Product Section */}
        <div className="rounded-lg  p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Images */}
            <div className="lg:col-span-3 flex gap-4">
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-3 w-24">
                  {product.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
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

              {/* Main Image */}
              <div className="flex-1 rounded-lg overflow-hidden bg-gray-100" style={{ height: '500px' }}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="lg:col-span-2 space-y-4">
              {/* Product Name */}
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

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
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium text-sm">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium text-sm">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h3>
                <ul className="space-y-1.5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
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
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-4 py-2 text-base font-semibold border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={addToCart}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='m-10'>
        <ProductInfo
          description={product.description}
          additionalInfo={additionalInfo}
          reviews={reviews}
        />
      </div>
      <SimilarProducts category={category}
        excludeId={product.id} />
    </div>
  );
}