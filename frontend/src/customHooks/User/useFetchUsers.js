import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const fetchUser = async (currentPage, searchQuery, isAdmin) => {
  const response = await CustomAxios.get("/api/admin/users", {
    params: {
      page: currentPage,
      search: searchQuery || undefined,
      isAdmin: isAdmin || undefined,
    },
  });
  return response.data;
};

export function useFetchUsers(currentPage, searchQuery, isAdmin) {
  return useQuery({
    queryKey: ["users", currentPage, searchQuery, isAdmin],
    queryFn: () => fetchUser(currentPage, searchQuery, isAdmin),
    retry: false,
  });
}
