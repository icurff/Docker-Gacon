import { useState } from "react";
import { useForgotPasswordMutation } from "../customHooks/Auth/useForgotPasswordMutation";
export function ResetPasswordForm({ onSwitchForm }) {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword } = useForgotPasswordMutation();
  const handleForgotPassword = () => {
    forgotPassword(email);
  };
  return (
    <form>
      <div>
        <label className="block text-lg">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className="mt-2 w-full rounded-xl border-2 border-gray-100 bg-transparent p-3"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex py-2">
        <button type="button" onClick={() => onSwitchForm("login")}>
          Back to login
        </button>
      </div>

      <button
        type="button"
        className="w-full rounded-xl bg-orange-300 py-1 text-center text-xl transition-all hover:scale-[1.05]"
        onClick={handleForgotPassword}
      >
        Sent reset link to my email
      </button>
    </form>
  );
}
