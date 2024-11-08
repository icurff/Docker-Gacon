import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { useBookStore } from "../../customStores/useBookStore";
const submitReview = async ({ bookId, content, rating }) => {
  const response = await CustomAxios.post(`/api/books/${bookId}/reviews`, {
    content,
    rating,
  });
  return response.data;
};

export const useSubmitReviewMutation = () => {
  const queryClient = useQueryClient();
  const { book } = useBookStore();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
    onError: (error) => {
      console.error("Error submitting the review:", error);
    },
  });
};
