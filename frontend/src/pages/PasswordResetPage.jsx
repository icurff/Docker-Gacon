import bookshelf from "../assets/images/bookshelf.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../customHooks/Auth/useResetPasswordMutation";
import { toast } from "react-toastify";
export function PasswordResetPage() {
  const [password, setPassword] = useState("");
  const [errorNotification, setErrorNotification] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { mutate: resetPassword } = useResetPasswordMutation();
  const navigate = useNavigate();
  const tokenPram = new URLSearchParams(location.search);
  const token = tokenPram.get("token") || "";
  const handleResetPassword = () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }
    resetPassword({ password, passwordConfirmation, token });
  };
  const handlePasswordConfirmationChange = (e) => {
    const value = e.target.value;
    setPasswordConfirmation(value);
    // Check if the passwords match in real-time
    if (password && value && password !== value) {
      setErrorNotification("Passwords do not match.");
    } else {
      setErrorNotification("");
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="rounded-3xl border-2 border-gray-100 bg-gray-300 px-10 py-20">
          <h1 className="text-center text-3xl font-bold">
            Welcome to BookStore
          </h1>
          <div className="mt-8">
            <form>
              <div>
                <label className="block text-lg">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-xl border-2 border-gray-100 bg-transparent p-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Display real-time error message  */}
              {errorNotification && (
                <p className="mt-2 text-red-500">{errorNotification}</p>
              )}
              <div>
                <label className="block text-lg">Password Confirmation</label>
                <input
                  type="password"
                  placeholder="Enter your password again"
                  className="mt-2 w-full rounded-xl border-2 border-gray-100 bg-transparent p-3"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                />
              </div>

              <div className="flex py-2">
                <button type="button" onClick={() => navigate("/login")}>
                  Back to login
                </button>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-orange-300 py-1 text-center text-xl transition-all hover:scale-[1.05]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <img
        className="hidden h-screen w-full md:block"
        src={bookshelf}
        alt="bookshelf"
      />
    </div>
  );
}
