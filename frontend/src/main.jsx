import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PageRoute from "./router/Route.jsx";
import "./index.css";
import MyContextProvider from "./contexts/MyContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <PageRoute />
        <ToastContainer autoClose={1000} />
      </MyContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
