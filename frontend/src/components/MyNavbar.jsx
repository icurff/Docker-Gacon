import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import logo from "../assets/images/logo.png";
import useLogout from "../customHooks/Auth/useLogout";
import { HiShoppingCart, HiSearch } from "react-icons/hi";
import { SearchModal } from "../components/SearchModal";
import { useState, useContext } from "react";
import { useFetchAuthUser } from "../customHooks/Auth/useFetchAuthUser";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../contexts/MyContext";
export function MyNavbar() {
  const navigate = useNavigate();
  const { data: authUser } = useFetchAuthUser();
  const isLoggedIn = !!authUser;
  const { logout } = useLogout();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  function showSearchModal() {
    setIsSearchModalOpen(true);
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleSetting() {
    navigate("/settings");
  }
  function handleAdminPanel() {
    navigate("/admin");
  }
  const { theme, toggleDarkMode } = useContext(MyContext);
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} className="mr-3 h-8 sm:h-12" alt="React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            BookStore
          </span>
        </Navbar.Brand>
        <div className="flex items-center gap-4 md:order-2">
          <button
            id="theme-toggle"
            type="button"
            className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={toggleDarkMode}
          >
            <svg
              id="theme-toggle-dark-icon"
              className={theme === "dark" ? "h-5 w-5" : "hidden"}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={theme === "light" ? "h-5 w-5" : "hidden"}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {/* Cart Icon */}
          <button className="text-gray-500" onClick={showSearchModal}>
            <HiSearch className="h-6 w-6" />
          </button>
          {/* Cart Icon */}
          <button className="text-gray-500" onClick={() => navigate("/cart")}>
            <HiShoppingCart className="h-6 w-6" />
          </button>

          {/* User Actions */}
          {isLoggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={
                    authUser.avatar ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Hello </span>
                <span className="block truncate text-sm font-medium">
                  {authUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleSetting}>Setting</Dropdown.Item>
              {authUser.isAdmin && (
                <Dropdown.Item onClick={handleAdminPanel}>
                  Admin Panel
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
          <Navbar.Toggle />
        </div>

        {/* Collapsed Links */}
        <Navbar.Collapse>
          <button>
            <Navbar.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Navbar.Link>
          </button>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {/* search modal */}
      <SearchModal
        show={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
