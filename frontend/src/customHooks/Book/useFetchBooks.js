import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchBooks = async (currentPage, category, priceRange, searchQuery) => {
  const response = await CustomAxios.get("/api/books", {
    params: {
      page: currentPage,
      category: category !== "All" ? category : undefined,
      priceRange: priceRange !== "All" ? priceRange : undefined,
      search: searchQuery || undefined,
    },
  });

  return response.data;
};

export function useFetchBooks(currentPage, category, priceRange, searchQuery) {
  return useQuery({
    queryKey: ["books", currentPage, category, priceRange, searchQuery],
    queryFn: () => fetchBooks(currentPage, category, priceRange, searchQuery),
    retry: false,
  });
}
