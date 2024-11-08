import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";
const deleteBook = async (bookId) => {
  try {
    const response = await CustomAxios.delete(`/api/admin/books/${bookId}`);

    return response.data;
  } catch (error) {
    toast.error("This book sticks to some orders.");
  }
};

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error deleting the book:", error);
    },
  });
};
