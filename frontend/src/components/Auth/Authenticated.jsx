import { Navigate } from "react-router-dom";
import { useFetchAuthUser } from "../../customHooks/Auth/useFetchAuthUser";

const Authenticated = ({ forAdmin, children }) => {
  const { data: authUser, isLoading } = useFetchAuthUser();

  // If the user is not authenticated and loading is done, redirect to home
  if (!authUser && !isLoading) {
    return <Navigate to="/login" />;
  }
  // If the user is not an admin and `forAdmin` is true, redirect to home or another route
  if (forAdmin && authUser && !authUser.isAdmin) {
    return <Navigate to="/" />;
  }
  // Show the content when the user is authenticated (and isAdmin if required)
  return children;
};

export default Authenticated;
