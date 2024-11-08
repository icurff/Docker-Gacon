import { HiMenuAlt2, HiChartPie, HiViewBoards } from "react-icons/hi";
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { useState, useContext } from "react";
import { BookTab } from "../components/Admin/BookTab";
import { OrderTab } from "../components/Admin/OrderTab";
import { UserTab } from "../components/Admin/UserTab";
import useLogout from "../customHooks/Auth/useLogout";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useFetchAuthUser } from "../customHooks/Auth/useFetchAuthUser";
import { DashboardTab } from "../components/Admin/DashboardTab";
import { FaBookOpen } from "react-icons/fa6";
import { MyContext } from "../contexts/MyContext";
import { FaUser } from "react-icons/fa";
export function AdminPage() {
  const { data: authUser } = useFetchAuthUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const tabs = {
    book: <BookTab />,
    order: <OrderTab />,
    dashboard: <DashboardTab />,
    user: <UserTab />,
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleTabClick = (tab) => {
    return () => {
      setCurrentTab(tab);
      toggleSidebar();
    };
  };
  function handleSetting() {
    navigate("/settings");
  }
  const { theme, toggleDarkMode } = useContext(MyContext);
  const { logout } = useLogout();
  return (
    <>
      {/* navbar */}
      <div className="fixed z-40 w-full">
        <Navbar className="bg-[#1c2251]" fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            href="#"
            className="hidden md:flex"
          >
            <img src={logo} className="mr-3 h-6 sm:h-9" alt=" Logo" />
            <span className="self-center text-xl font-semibold text-white">
              BookStore
            </span>
          </Navbar.Brand>
          {/* toggle side bar */}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 md:hidden"
            aria-controls="sidebar"
            aria-expanded={false}
          >
            <HiMenuAlt2 className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4 md:order-2">
            {/* toggle dark mode */}
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
            {/* drop drop avt */}
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar img={authUser?.avatar} rounded />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">Hello </span>
                  <span className="block truncate text-sm font-medium">
                    {authUser?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleSetting}>Setting</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </Navbar>
      </div>
      {/* end navbar  */}
      <div className="flex">
        {/* sidebar */}
        <Sidebar
          className={`fixed left-0 top-[4rem] z-40 h-[calc(100vh-4rem)] bg-white shadow-lg transition-transform md:block md:translate-x-0 dark:bg-gray-800 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiChartPie}
                onClick={handleTabClick("dashboard")}
                className={`${currentTab === "dashboard" ? "bg-gray-200" : ""}`}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaBookOpen}
                onClick={handleTabClick("book")}
                className={`${currentTab === "book" ? "bg-gray-200" : ""}`}
              >
                Book
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
                onClick={handleTabClick("order")}
                className={`${currentTab === "order" ? "bg-gray-200" : ""}`}
              >
                Order
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaUser}
                onClick={handleTabClick("user")}
                className={`${currentTab === "user" ? "bg-gray-200" : ""}`}
              >
                User
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        {/* end sidebar */}

        <main className="flex-1 p-4 pt-[5rem] md:ml-64">
          {tabs[currentTab]}
        </main>
      </div>
    </>
  );
}
