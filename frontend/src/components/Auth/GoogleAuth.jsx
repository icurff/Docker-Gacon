import { useLocation } from "react-router-dom";

import { useEffect } from "react";
import { useGoogleLoginMutation } from "../../customHooks/Auth/useGoogleLoginMutation";
export function GoogleAuth() {
  const { mutate: googleLogin } = useGoogleLoginMutation();
  const location = useLocation();

  useEffect(() => {
    googleLogin(location.search);
  }, [googleLogin, location.search]);

  return <div>Loading...</div>;
}
