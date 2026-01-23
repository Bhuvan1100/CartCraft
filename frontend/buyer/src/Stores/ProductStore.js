import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [
    /*
      {
        id: "p1",
        name: "T-Shirt",
        price: 499,
        image: "https://example.com/tshirt.png",
        quantity: 2
      }
    */
  ],

  // add item (quantity comes from caller)
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({
        items: [...items, item],
      });
    }
  },

  // increase quantity by 1
  increaseQty: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    });
  },

  // decrease quantity by 1 (remove if 0)
  decreaseQty: (id) => {
    set({
      items: get().items
        .map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    });
  },

  // remove item completely
  removeItem: (id) => {
    set({
      items: get().items.filter((i) => i.id !== id),
    });
  },

  // clear cart
  clearCart: () => set({ items: [] }),

  // derived values
  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

export default useCartStore;
