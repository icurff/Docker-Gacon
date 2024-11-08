import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
const updateBook = async ([bookId, bookData]) => {
  try {
    const response = await CustomAxios.put(
      `/api/admin/books/${bookId}`,
      bookData,
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error updating the book:", error);
    },
  });
};
