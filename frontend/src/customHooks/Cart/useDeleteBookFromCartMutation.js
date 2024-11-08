import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";
const deleteBook = async (itemId) => {
  try {
    const response = await CustomAxios.delete(`/api/carts/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useDeleteBookFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success("Book deleted from cart successfully");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.error("Error deleting the book:", error);
    },
  });
};
