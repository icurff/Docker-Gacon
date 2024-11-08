import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const addToCart = async (bookData) => {
  try {
    const response = await CustomAxios.post("/api/carts", bookData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useAddBookToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Book added to cart successfully");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.error("Error adding book to cart:", error);
    },
  });
};
