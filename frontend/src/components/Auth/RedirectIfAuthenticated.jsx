import { Navigate } from "react-router-dom";
import { useFetchAuthUser } from "../../customHooks/Auth/useFetchAuthUser";
const RedirectIfAuthenticated = ({ children }) => {
  const { data: authUser } = useFetchAuthUser();

  if (authUser) {
    if (authUser.isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return children;
};

export default RedirectIfAuthenticated;
