import { useQueryClient } from "@tanstack/react-query";
import accessToken from "../../utils/LocalStorage";
const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    accessToken.removeAccessToken();
    queryClient.invalidateQueries(["authUser"]);
    window.location.href = "/";
    window.location.reload();
  };

  return { logout };
};

export default useLogout;
