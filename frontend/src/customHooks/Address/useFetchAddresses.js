import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
const fetchAddress = async () => {
  const response = await CustomAxios.get("/api/addresses");
  return response.data;
};

export function useFetchAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddress,
    retry: false,
  });
}
