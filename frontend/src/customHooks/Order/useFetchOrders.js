import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

// Function to fetch orders
const fetchOrders = async (currentPage, status, priceRange, searchQuery) => {
  const response = await CustomAxios.get("/api/admin/orders", {
    params: {
      page: currentPage,
      status: status !== "All" ? status : undefined,
      priceRange: priceRange !== "All" ? priceRange : undefined,
      search: searchQuery || undefined,
    },
  });
 
  return response.data;
};

// Custom hook for fetching orders
export function useFetchOrders(currentPage, status, priceRange, searchQuery) {
  return useQuery({
    queryKey: ["orders", currentPage, status, priceRange, searchQuery],
    queryFn: () => fetchOrders(currentPage, status, priceRange, searchQuery),
    retry: false,
  });
}
