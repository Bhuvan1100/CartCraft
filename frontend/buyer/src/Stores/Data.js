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
    reviewCount: `${Math.floor(Math.random() * 10 + 1)}k+`,
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
  // Main product
  const productRes = await axios.get(
    `https://dummyjson.com/products/${id}`
  );
  const p = productRes.data;

  return {
    product: {
      id: p.id,
      name: p.title,
      price: p.price,
      originalPrice: Math.round(
        p.price / (1 - p.discountPercentage / 100)
      ),
      rating: p.rating,
      totalReviews: Math.floor(p.rating * 70),
      description: p.description,
      images: p.images,
      inStock: p.stock > 0,

      // ✅ ADD THIS
      features: [
        `Brand: ${p.brand}`,
        `Category: ${p.category}`,
        "High quality build",
        "Fast delivery available",
        "Warranty included",
      ],
    },

    // 👇 extra info (for ProductInfo tab)
    additionalInfo: {
      brand: p.brand,
      category: p.category,
      warranty: "1 Year Manufacturer Warranty",
      returnPolicy: "7 Days Replacement",
      delivery: "Free Delivery in 3-5 days",
    },

    // 👇 reviews (mocked but deterministic)
    reviews: Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      user: `User ${i + 1}`,
      rating: Math.max(3, Math.floor(p.rating)),
      comment: "Good quality product, worth the price.",
    })),
    category:p.category,

  };
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

export const fetchProductsByCategory = async (category,limit) => {
  if (!category) return [];

  const res = await axios.get(
    `https://dummyjson.com/products/category/${category}?limit${limit}`
  );

  return res.data.products.map(p => ({
    id:p.id,
    image: p.thumbnail,
    category: p.category,
    name: p.title,
    price: p.price,
    rating: Math.round(p.rating),
    reviewCount: `${Math.floor(Math.random() * 10 + 1)}k+`,
  }));
};