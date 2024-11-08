import bookshelf from "../assets/images/bookshelf.jpg";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

import { useState } from "react";
export function LoginPage() {
  const [currentForm, setCurrentForm] = useState("login");
  const forms = {
    login: <LoginForm onSwitchForm={setCurrentForm} />,
    register: <RegisterForm onSwitchForm={setCurrentForm} />,
    resetPassword: <ResetPasswordForm onSwitchForm={setCurrentForm} />,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="rounded-3xl border-2 border-gray-100 bg-gray-300 px-10 py-20">
          <h1 className="text-center text-3xl font-bold">
            Welcome to BookStore
          </h1>
          <div className="mt-8">{forms[currentForm]}</div>
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
