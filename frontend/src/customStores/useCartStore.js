import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  checkedItems: {},
  setCartItems: (items) => set({ cartItems: items }),
  setCheckedItems: (items) => set({ checkedItems: items }),

  toggleItemCheck: (id) => {
    const { checkedItems } = get();
    set({ checkedItems: { ...checkedItems, [id]: !checkedItems[id] } });
  },
  toggleAllItemsCheck: (newCheckedState) => {
    const { cartItems } = get();
    const newCheckedItems = cartItems.reduce((acc, item) => {
      acc[item.id] = newCheckedState;
      return acc;
    }, {});
    set({ checkedItems: newCheckedItems });
  },

  updateQuantity: (item, newQuantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    }));
  },
}));
