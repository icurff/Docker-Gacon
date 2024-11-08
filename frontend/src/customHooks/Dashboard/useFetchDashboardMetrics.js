import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchDashboardMetrics = async () => {
  const response = await CustomAxios.get(`/api/admin/dashboard`);
  return response.data;
};
export function useFetchDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardMetrics(),
    retry: false,
  });
}
