import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const updateCartItem = async ({ itemId, quantity }) => {
  try {
    const response = await CustomAxios.put(`/api/carts/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.error("Error updating the cart item:", error);
      toast.error("Failed to update cart item");
    },
  });
};
