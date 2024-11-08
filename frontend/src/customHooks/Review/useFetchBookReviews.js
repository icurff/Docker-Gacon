import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchBookReviews = async (bookId) => {
  const response = await CustomAxios.get(`/api/books/${bookId}/reviews`);
  return response.data;
};
export function useFetchBookReviews(bookId) {
  return useQuery({
    queryKey: ["reviews", bookId],
    queryFn: () => fetchBookReviews(bookId),
    retry: false,
  });
}
