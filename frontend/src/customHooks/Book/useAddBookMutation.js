import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
const addBook = async (newBookData) => {
  try {
    const response = await CustomAxios.post("/api/admin/books", newBookData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useAddBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      console.log("Book added successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error adding the book:", error);
    },
  });
};
