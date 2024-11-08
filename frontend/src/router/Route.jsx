import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { BookPage } from "../pages/BookPage.jsx";
import Authenticated from "../components/Auth/Authenticated.jsx";
import { GoogleAuth } from "../components/Auth/GoogleAuth.jsx";
import RedirectIfAuthenticated from "../components/Auth/RedirectIfAuthenticated.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";
import { SearchPage } from "../pages/SearchPage.jsx";
import { CartPage } from "../pages/CartPage.jsx";
import { OrderCheckout_Vnp } from "../components/OrderCheckout_Vnp.jsx";
import { OrderCheckout_Payos } from "../components/OrderCheckout_Payos.jsx";
import { SettingPage } from "../pages/SettingPage.jsx";
import { SettingAddressPage } from "../pages/SettingAddressPage.jsx";
import { SettingSecurityPage } from "../pages/SettingSecurityPage.jsx";
import { SettingOrderPage } from "../pages/SettingOrderPage.jsx";
import { PasswordResetPage } from "../pages/PasswordResetPage.jsx";
import { SettingProfilePage } from "../pages/SettingProfilePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/books/:bookId",
    element: <BookPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/cart",
    element: (
      <Authenticated>
        <CartPage />
      </Authenticated>
    ),
  },
  {
    path: "/settings",
    element: (
      <Authenticated>
        <SettingPage />
      </Authenticated>
    ),
  },
  {
    path: "/settings/security",
    element: (
      <Authenticated>
        <SettingSecurityPage />
      </Authenticated>
    ),
  },
  {
    path: "/settings/address",
    element: (
      <Authenticated>
        <SettingAddressPage />
      </Authenticated>
    ),
  },
  {
    path: "/settings/profile",
    element: (
      <Authenticated>
        <SettingProfilePage />
      </Authenticated>
    ),
  },
  {
    path: "/settings/order",
    element: (
      <Authenticated>
        <SettingOrderPage />
      </Authenticated>
    ),
  },
  {
    path: "/order/:orderId/vnp_checkout",
    element: <OrderCheckout_Vnp />,
  },
  {
    path: "/order/:orderId/payos_checkout",
    element: <OrderCheckout_Payos />,
  },

  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/reset-password",
    element: <PasswordResetPage />,
  },
  {
    path: "/auth/google",
    element: (
      <RedirectIfAuthenticated>
        <GoogleAuth />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/admin",
    element: (
      <Authenticated forAdmin={true}>
        <AdminPage />
      </Authenticated>
    ),
  },
]);

const PageRoute = () => {
  return <RouterProvider router={router} />;
};

export default PageRoute;
