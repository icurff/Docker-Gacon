import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchChartMetrics = async () => {
  const response = await CustomAxios.get(`/api/admin/dashboard/chart`);
  return response.data;
};
export function useFetchChartMetrics() {
  return useQuery({
    queryKey: ["chart"],
    queryFn: () => fetchChartMetrics(),
    retry: false,
  });
}
