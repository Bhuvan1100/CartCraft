import { create } from "zustand";

const useSellerInfoStore = create((set, get) => ({
  // ===== Seller Info Fields =====
  businessName: "",
  gstNumber: "",
  contactName: "",
  phone: "",
  address: "",

  // ===== Status Flags =====
  loading: false,
  error: null,

  // ===== Derived Flag =====
  isComplete: false,

  // ===== Set single field =====
  setField: (field, value) => {
    set({ [field]: value });
    get().checkCompletion();
  },

  // ===== Set all fields at once =====
  setSellerInfo: (data) => {
    set({
      businessName: data.businessName || "",
      gstNumber: data.gstNumber || "",
      contactName: data.contactName || "",
      phone: data.phone || "",
      address: data.address || "",
      error: null,
    });
    get().checkCompletion();
  },

  // ===== Check if all fields are filled =====
  checkCompletion: () => {
    const {
      businessName,
      gstNumber,
      contactName,
      phone,
      address,
    } = get();

    const isComplete =
      !!businessName &&
      !!gstNumber &&
      !!contactName &&
      !!phone &&
      !!address;

    set({ isComplete });
  },

  fetchSellerInfo: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("https://dummyjson.com/users/1");
      if (!res.ok) {
        throw new Error("Failed to fetch seller info");
      }

      const data = await res.json();

      set({
        businessName: data.company?.name || "",
        gstNumber: "22AAAAA0000A1Z5", // dummy GST (dummyjson doesn't provide GST)
        contactName: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        phone: data.phone || "",
        address: `${data.address?.address || ""}, ${data.address?.city || ""}, ${data.address?.state || ""}, ${data.address?.postalCode || ""}`,
        loading: false,
      });

      get().checkCompletion();
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Something went wrong",
      });
    }
  },

  // ===== Reset store (optional but useful) =====
  resetSellerInfo: () =>
    set({
      businessName: "",
      gstNumber: "",
      contactName: "",
      phone: "",
      address: "",
      isComplete: false,
      loading: false,
      error: null,
    }),
}));

export default useSellerInfoStore;
