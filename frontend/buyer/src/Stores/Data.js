import axios from 'axios';

export const fetchProductsByTags = async () => {
  const res = await axios.get('https://dummyjson.com/products?limit=32');
  const products = res.data.products;

  const transform = p => ({
    id: p.id,
    image: p.thumbnail,
    category: p.category,
    name: p.title,
    price: p.price,
    rating: p.rating,
    ratingCount: `${Math.floor(Math.random() * 10 + 1)}k+`,
    tags: ['ALL', 'NEW ARRIVALS', 'BEST SELLER', 'TOP RATED'],
  });

  // Shuffle products randomly
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const totalProducts = shuffled.length;

  // If we have 32 or more products, split into 4 groups of 8
  if (totalProducts >= 32) {
    return {
      ALL: shuffled.slice(0, 8).map(transform),
      NEW_ARRIVALS: shuffled.slice(8, 16).map(transform),
      BEST_SELLER: shuffled.slice(16, 24).map(transform),
      TOP_RATED: shuffled.slice(24, 32).map(transform),
    };
  }

  // If less than 32, distribute products without repeating
  // Each category gets a unique subset, some may get fewer than 8 or even 0
  const productsPerCategory = Math.floor(totalProducts / 4);
  const remainder = totalProducts % 4;

  let index = 0;
  const categories = ['ALL', 'NEW_ARRIVALS', 'BEST_SELLER', 'TOP_RATED'];
  const result = {};

  categories.forEach((category, i) => {
    // Distribute remainder to first few categories
    const count = productsPerCategory + (i < remainder ? 1 : 0);
    result[category] = shuffled.slice(index, index + count).map(transform);
    index += count;
  });

  return result;
};

export const fetchProductById = async (id) => {
  try {
    // Fetch product from your backend
    const productRes = await axios.get(
      `http://localhost:4000/product/productdetail/${id}`,
      {
        withCredentials:true
      }
    );
    
    const p = productRes.data.product;

    // Calculate original price from discount if available
    const originalPrice = p.price; // You can add discount logic if needed
    
    return {
      product: {
        id: p.id,
        name: p.title,
        price: p.price,
        originalPrice: originalPrice,
        rating: p.avgRating || 0,
        totalReviews: p.ratingCount || 0,
        description: p.description,
        images: p.images?.map(img => img.url) || [],
        inStock: p.totalQuantity > 0,
        
        // ✅ ADD THESE FIELDS
        category: p.category,
        subCategory: p.subCategory,
        
        // Include variants if needed
        variants: p.variants || [],
      },

      // Additional info
      additionalInfo: {
        category: p.category,
        subCategory: p.subCategory,
        warranty: "1 Year Manufacturer Warranty",
        returnPolicy: "7 Days Replacement",
        delivery: "Free Delivery in 3-5 days",
        totalQuantity: p.totalQuantity,
      },

      // Map comments to reviews format
      reviews: (p.comments || []).map((comment, i) => ({
        id: i + 1,
        user: comment.userEmail || `User ${i + 1}`,
        userId: comment.userId,
        rating: p.avgRating || 4, // Use product's avg rating
        comment: comment.comment,
        createdAt: comment.createdAt,
      })),
      
      category: p.category,
    };
  } catch (error) {
    console.error('[FETCH_PRODUCT_BY_ID] Error:', error);
    throw error;
  }
};


export const fetchSimilarProducts = async ({ category, excludeId }) => {
  if (!category) return [];

  const res = await axios.get(`https://dummyjson.com/products/category/${category}/`);

  // Filter out the main product and take max 8
  const filtered = res.data.products
    .filter(p => p.id !== excludeId)
    .slice(0, 8)
    .map(p => ({
      id: p.id,
      image: p.thumbnail,
      category: p.category,
      name: p.title,
      price: p.price,
      rating: p.rating,
      reviewCount: `${Math.floor(Math.random() * 10 + 1)}k+`,
    }));

  return filtered;
};

export const fetchProductsByCategory = async (category, subCategory, page = 1) => {
  if (!category || !subCategory) return { products: [], pagination: {} };
  // console.log(page*page);
  try {
    // Convert to match Prisma enum format
    // category: "men" -> "MEN"
    // subCategory: "kurta" -> "MEN_KURTA"
    const formattedCategory =
      category.toLowerCase() === "mens"
        ? "men"
        : category.toLowerCase() === "womens"
          ? "women"
          : category.toLowerCase() === "kids"
            ? "kids"
            : category.toLowerCase();
    // "MEN", "WOMEN", "KIDS"
    const formattedSubCategory = `${subCategory.toLowerCase()}`; // "MEN_KURTA", "WOMEN_SAREE"

    const res = await axios.get(  
      `http://localhost:4000/products/${formattedCategory}/${subCategory}?page=${page}`,
      {
        withCredentials: true
      }
    );


    console.log(page, res.data);

    return {
      products: res.data.products.map(p => ({
        id: p.id,
        image: p.image,
        category: subCategory,
        name: p.title,
        price: p.price,
        rating: Math.round(p.avgRating || 0),
        ratingCount: p.ratingCount ? `${p.ratingCount}+` : '0',
        description: p.description,
        totalQuantity: p.totalQuantity,
        isInStock: p.isInStock
      })),
      pagination: res.data.pagination
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { products: [], pagination: {} };
  }
};

// ✅ NEW FUNCTIONS FOR CART AND ORDERS

/**
 * Fetch cart items for the logged-in user
 * @returns {Promise<Object>} Cart data with items and total price
 */
export const fetchCartItems = async (email) => {
  try {
    const userId = localStorage.getItem('id');

    if (!userId) {
      console.error('[FETCH_CART_ITEMS] No userId found in localStorage');
      return {
        cartId: null,
        status: null,
        totalPrice: 0,
        items: []
      };
    }

    console.log('[FETCH_CART_ITEMS] Fetching cart for userId:', userId);

    const response = await axios.post(
      '/api/buyer/cart/getcart',
      { userId, email },
      { withCredentials: true }
    );

    console.log('[FETCH_CART_ITEMS] Success:', response.data);

    return {
      cartId: response.data.cartId || null,
      status: response.data.status || null,
      totalPrice: response.data.totalPrice || 0,
      items: response.data.items || []
    };

  } catch (error) {
    console.error('[FETCH_CART_ITEMS] Error:', error);
    return {
      cartId: null,
      status: null,
      totalPrice: 0,
      items: []
    };
  }
};

/**
 * Fetch buyer orders for the logged-in user
 * @returns {Promise<Array>} Array of orders
 */
export const fetchBuyerOrders = async () => {
  try {
    const userId = localStorage.getItem('id');

    if (!userId) {
      console.error('[FETCH_BUYER_ORDERS] No userId found in localStorage');
      return [];
    }

    console.log('[FETCH_BUYER_ORDERS] Fetching orders for userId:', userId);

    const response = await axios.post(
      '/api/buyer/orders',
      { userId },
      { withCredentials: true }
    );

    console.log('[FETCH_BUYER_ORDERS] Success:', response.data);

    return response.data.orders || [];

  } catch (error) {
    console.error('[FETCH_BUYER_ORDERS] Error:', error);
    return [];
  }
};

/**
 * Main function to fetch all user data (cart + orders) in parallel
 * This is the function you'll call from App.jsx after login confirmation
 * @param {string} email - User's email from UserStore
 * @returns {Promise<Object>} Object containing cart and orders data
 */
export const fetchUserData = async (email) => {
  console.log('[FETCH_USER_DATA] Starting parallel fetch of cart and orders...');

  try {
    // Fetch both cart and orders in parallel for better performance
    const [cartData, ordersData] = await Promise.all([
      fetchCartItems(email),
      fetchBuyerOrders()
    ]);

    console.log('[FETCH_USER_DATA] ✅ Successfully fetched all user data');

    return {
      cart: cartData,
      orders: ordersData
    };

  } catch (error) {
    console.error('[FETCH_USER_DATA] ❌ Failed to fetch user data:', error);
    
    // Return empty data structure on error
    return {
      cart: {
        cartId: null,
        status: null,
        totalPrice: 0,
        items: []
      },
      orders: []
    };
  }
};