import { create } from "zustand";

const DUMMY_API_BASE = "https://dummyjson.com";

const useUserStore = create((set, get) => ({
  // --------------------
  // CORE USER DATA
  // --------------------
  email: "", // backend provides email
  isLoggedIn: false, // true if user logged in, false otherwise
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
  // ORDERS
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
      address: {
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        phone: "",
      },
      previousOrders: [],
      currentOrders: [],
      error: null,
    });
  },
}));

export default useUserStore;
