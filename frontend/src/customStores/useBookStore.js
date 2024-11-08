import { create } from "zustand";

export const useBookStore = create((set) => ({
  book: null,
  relevantBooks: [],
  ratingData: null,
  reviews: [],
  quantity: 1,

  setBook: (book) =>
    set((state) => {
      return {
        book,
        relevantBooks: [],
        ratingData: null,
        reviews: [],
        quantity: 1,
      };
    }),
  setRelevantBooks: (books) => set({ relevantBooks: books }),
  setRatingData: (data) => set({ ratingData: data }),
  setReviews: (reviews) => set({ reviews }),
  setQuantity: (quantity) => set({ quantity }),
  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrementQuantity: () =>
    set((state) => ({
      quantity: Math.max(state.quantity - 1, 1),
    })),
}));
