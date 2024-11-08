import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchBooks = async (bookId) => {
  const response = await CustomAxios.get(`/api/books/${bookId}/relevant`, {});
  return response.data;
};

export function useFetchRelevantBooks(bookId) {
  return useQuery({
    queryKey: ["relevantBook", bookId],
    queryFn: () => fetchBooks(bookId),
    retry: false,
  });
}
