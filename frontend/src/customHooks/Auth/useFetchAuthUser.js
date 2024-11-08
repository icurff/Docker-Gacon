import { useQuery } from "@tanstack/react-query";
import accessToken from "../../utils/LocalStorage";
import CustomAxios from "../../config/CustomAxios";
export async function fetchAuthUser() {
  const token = accessToken.getAccessToken();
  if (token) {
    return CustomAxios.get("/api/user").then((res) => res.data.user);
  }
  return Promise.reject("No access token available");
}

export function useFetchAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
  });
}
