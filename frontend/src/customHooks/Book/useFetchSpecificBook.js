import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchBooks = async (bookId) => {
  const response = await CustomAxios.get(`/api/books/${bookId}`, {});
  return response.data.book;
};

export function useFetchSpecificBook(bookId) {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBooks(bookId),
    retry: false,
  });
}
