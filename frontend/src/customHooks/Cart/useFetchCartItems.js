import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchCartItems = async () => {
  const response = await CustomAxios.get("/api/carts");
  return response.data;
};

export function useFetchCartItems() {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: () => fetchCartItems(),
    retry: false,
  });
}
