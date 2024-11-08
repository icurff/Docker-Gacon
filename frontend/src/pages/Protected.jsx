import useLogout from "../customHooks/Auth/useLogout";
import { useFetchAuthUser } from "../customHooks/Auth/useFetchAuthUser";
export function Protected() {
  const { logout } = useLogout();
  const { data: authUser } = useFetchAuthUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <h1 className="text-red-500">Protected Page</h1>
      {authUser ? (
        <div>
          <p>Email: {authUser.email}</p>
          <p>First Name: {authUser.firstName}</p>
          <p>Last Name: {authUser.lastName}</p>
          <button onClick={handleLogout}>logout </button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
