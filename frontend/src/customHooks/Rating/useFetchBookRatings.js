import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

// Function to fetch both user rating and average rating
const fetchRatings = async (bookId) => {
  const response = await CustomAxios.get(`/api/books/${bookId}/rating`);
  return response.data;
};

// Custom hook for fetching ratings
export function useFetchBookRatings(bookId) {
  return useQuery({
    queryKey: ["ratings",bookId],
    queryFn: () => fetchRatings(bookId),
    retry: false,
  });
}
