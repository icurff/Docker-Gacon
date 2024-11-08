import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

// Function to fetch the current user's orders
const fetchMyOrders = async (currentPage) => {
  const response = await CustomAxios.get("/api/orders", {
    params: {
      page: currentPage,
    },
  });
  return response.data;
};

// Custom hook for fetching the current user's orders
export function useFetchMyOrders(currentPage) {
  return useQuery({
    queryKey: ["myOrders", currentPage],
    queryFn: () => fetchMyOrders(currentPage),
    retry: false,
  });
}
