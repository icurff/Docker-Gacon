import { useState } from "react";
import { useLoginMutation } from "../customHooks/Auth/useLoginMutation";

export function LoginForm({ onSwitchForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useLoginMutation();
  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };
  const handleContinueWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/redirect`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="mt-2 w-full rounded-xl border-2 bg-transparent p-3 focus:border-b-[#55c57a] focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
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
      <div className="flex justify-between py-2">
        <button type="button" onClick={() => onSwitchForm("register")}>
          Don't have an account?
        </button>

        <button type="button" onClick={() => onSwitchForm("resetPassword")}>
          Forgot password
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-orange-300 py-1 text-center text-xl transition-all hover:scale-[1.05]"
      >
        Login
      </button>
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 bg-white py-1 text-center text-xl transition-all duration-300 hover:scale-[1.05]"
        onClick={handleContinueWithGoogle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fbc02d"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#e53935"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4caf50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1565c0"
            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Continue with Google
      </button>
    </form>
  );
}
