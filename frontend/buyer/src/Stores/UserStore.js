import { create } from "zustand";
import { fetchUserData as fetchUserDataFromAPI } from './Data';
import axios from 'axios';

const DUMMY_API_BASE = "https://dummyjson.com";

const useUserStore = create((set, get) => ({
  // --------------------
  // CORE USER DATA
  // --------------------
  email: "", // backend provides email
  isLoggedIn: false, // true if user logged in, false otherwise
  isVerified: false, // email verification status
  address: {
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    phone: "",
  },

  previousOrders: [],
  currentOrders: [],

  isLoading: false,
  error: null,

  // --------------------
  // CART DATA (NEW)
  // --------------------
  cartData: null,
  cartItems: [],
  cartTotalPrice: 0,
  cartId: null,
  cartStatus: null,

  // --------------------
  // ORDERS DATA (NEW)
  // --------------------
  orders: [],

  // --------------------
  // LOADING STATES (NEW)
  // --------------------
  isLoadingUserData: false,
  userDataLoaded: false,

  // --------------------
  // AUTH / LOGIN STATE
  // --------------------
  setLoginStatus: (status, email = null, isVerified = false) => {
    set((state) => ({
      isLoggedIn: status,
      email: status ? email || state.email : "",
      isVerified: status ? isVerified : false,
    }));
  },

  // --------------------
  // FETCH USER DATA (CART + ORDERS) - NEW
  // --------------------
  fetchUserData: async () => {
    const userId = localStorage.getItem('id');
    const { email } = get(); // Get email from store

    if (!userId) {
      console.error('[USER_STORE] No userId found in localStorage');
      return;
    }

    console.log('[USER_STORE] Starting data fetch for userId:', userId);
    set({ isLoadingUserData: true });

    try {
      // Call the fetchUserData function from Data.js and pass email
      const userData = await fetchUserDataFromAPI(email);

      console.log('[USER_STORE] Received user data:', userData);

      // Update store with fetched data
      set({
        // Cart data
        cartData: userData.cart,
        cartItems: userData.cart.items || [],
        cartTotalPrice: userData.cart.totalPrice || 0,
        cartId: userData.cart.cartId || null,
        cartStatus: userData.cart.status || null,
        
        // Orders data
        orders: userData.orders || [],
        
        // Loading states
        isLoadingUserData: false,
        userDataLoaded: true,
      });

      console.log('[USER_STORE] ✅ Successfully loaded user data into store');
    } catch (error) {
      console.error('[USER_STORE] ❌ Failed to fetch user data:', error);
      set({
        isLoadingUserData: false,
        userDataLoaded: false,
      });
    }
  },

  // --------------------
  // UPDATE CART DATA LOCALLY (NEW)
  // --------------------
  updateCartData: (cartData) => {
    set({
      cartData,
      cartItems: cartData.items || [],
      cartTotalPrice: cartData.totalPrice || 0,
      cartId: cartData.cartId || null,
      cartStatus: cartData.status || null,
    });
  },

  // --------------------
  // UPDATE ORDERS LOCALLY (NEW)
  // --------------------
  updateOrders: (orders) => {
    set({ orders });
  },

  // --------------------
  // REFETCH CART ONLY (NEW)
  // --------------------
  refetchCart: async () => {
    const userId = localStorage.getItem('id');
    const { email } = get();

    if (!userId) {
      console.error('[USER_STORE] No userId found in localStorage');
      return;
    }

    console.log('[USER_STORE] Refetching cart data for userId:', userId);

    try {
      const response = await axios.post(
        '/api/buyer/cart/getcart',
        { userId, email },
        { withCredentials: true }
      );

      console.log('[USER_STORE] Cart refetched:', response.data);

      set({
        cartItems: response.data.items || [],
        cartTotalPrice: response.data.totalPrice || 0,
        cartId: response.data.cartId || null,
        cartStatus: response.data.status || null,
      });

      console.log('[USER_STORE] ✅ Cart data updated');
    } catch (error) {
      console.error('[USER_STORE] ❌ Failed to refetch cart:', error);
    }
  },

  // --------------------
  // ADD ITEM TO CART (LOCAL UPDATE)
  // --------------------
  addItemToCart: (newItem) => {
    const currentItems = get().cartItems || [];
    
    // Check if item already exists (same productId + productVariantId)
    const existingItemIndex = currentItems.findIndex(
      item => item.productId === newItem.productId && 
              item.productVariantId === newItem.productVariantId
    );

    let updatedItems;
    let updatedTotalPrice = get().cartTotalPrice || 0;

    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      updatedItems = currentItems.map((item, index) => {
        if (index === existingItemIndex) {
          const newQuantity = item.quantity + newItem.quantity;
          const newTotalPrice = newItem.priceSnapshot * newQuantity;
          
          // Update total price
          updatedTotalPrice = updatedTotalPrice - item.totalPrice + newTotalPrice;
          
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newTotalPrice
          };
        }
        return item;
      });
    } else {
      // New item, add to array
      updatedItems = [...currentItems, newItem];
      updatedTotalPrice += newItem.totalPrice;
    }

    set({
      cartItems: updatedItems,
      cartTotalPrice: updatedTotalPrice
    });

    console.log('[USER_STORE] ✅ Cart item added locally:', newItem);
  },

  // --------------------
  // ADDRESS
  // --------------------
  fetchUserAddress: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${DUMMY_API_BASE}/users/1`);
      const data = await res.json();

      set({
        email: data.email || "",
        isLoggedIn: !!data.email,
        address: {
          streetAddress: data.address?.address || "123 Main St",
          city: data.address?.city || "New York",
          state: data.address?.state || "NY",
          zipCode: data.address?.postalCode || "10001",
          country: data.address?.country || "USA",
          phone: data.phone || "",
        },
      });
    } catch (err) {
      set({ error: "Failed to fetch user address" });
    } finally {
      set({ isLoading: false });
    }
  },

  addAddress: (newAddress) => {
    set({
      address: {
        streetAddress: newAddress.streetAddress || "",
        city: newAddress.city || "",
        state: newAddress.state || "",
        zipCode: newAddress.zipCode || "",
        country: newAddress.country || "",
      },
    });
  },

  // --------------------
  // ORDERS (DUMMY API - OLD)
  // --------------------
  fetchPreviousOrders: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${DUMMY_API_BASE}/carts/1`);
      const data = await res.json();

      set({
        previousOrders: data.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
          total: p.total,
          status: "DELIVERED",
        })),
      });
    } catch (err) {
      set({ error: "Failed to fetch previous orders" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCurrentOrders: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${DUMMY_API_BASE}/carts/2`);
      const data = await res.json();

      set({
        currentOrders: data.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
          total: p.total,
          status: "IN_TRANSIT",
        })),
      });
    } catch (err) {
      set({ error: "Failed to fetch current orders" });
    } finally {
      set({ isLoading: false });
    }
  },

  // --------------------
  // CLEAR STORE
  // --------------------
  clearUserData: () => {
    set({
      email: "",
      isLoggedIn: false,
      isVerified: false,
      address: {
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        phone: "",
      },
      previousOrders: [],
      currentOrders: [],
      
      // Clear new cart and orders data
      cartData: null,
      cartItems: [],
      cartTotalPrice: 0,
      cartId: null,
      cartStatus: null,
      orders: [],
      
      isLoadingUserData: false,
      userDataLoaded: false,
      error: null,
    });
  },
}));

export default useUserStore;