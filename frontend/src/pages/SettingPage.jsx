import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MySection } from "../components/MySection";
import { FaShieldAlt } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { MdPinDrop } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
export function SettingPage() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const sectionItemClasses =
    "flex h-12 flex-row gap-3 rounded-lg p-5 transition-transform duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 cursor-pointer";

  return (
    <div className="flex min-h-screen flex-col">
      <MyNavbar />
      <div className="flex-grow bg-gray-100 dark:bg-gray-900">
        <MySection>
          <div className="flex flex-col items-stretch space-y-4">
            <div
              onClick={() => navigateTo("/settings/profile")}
              className={sectionItemClasses}
            >
              <span className="flex items-center">
                <ImProfile />
              </span>
              <span className="flex items-center font-semibold">Profile</span>
            </div>
            <div
              onClick={() => navigateTo("/settings/security")}
              className={sectionItemClasses}
            >
              <span className="flex items-center">
                <FaShieldAlt />
              </span>
              <span className="flex items-center font-semibold">
                Login And Security
              </span>
            </div>
            <div
              onClick={() => navigateTo("/settings/address")}
              className={sectionItemClasses}
            >
              <span className="flex items-center">
                <MdPinDrop />
              </span>
              <span className="flex items-center font-semibold">
                My Addresses
              </span>
            </div>
            <div
              onClick={() => navigateTo("/settings/order")}
              className={sectionItemClasses}
            >
              <span className="flex items-center">
                <TbNotes />
              </span>
              <span className="flex items-center font-semibold">My Orders</span>
            </div>
          </div>
        </MySection>
      </div>
      <MyFooter />
    </div>
  );
}
