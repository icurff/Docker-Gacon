import { useState } from "react";
import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MySection } from "../components/MySection";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MyTextInput } from "../components/MyTextInput";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../customHooks/User/useUpdatePasswordMutation"; // Assuming you have this hook

export function SettingSecurityPage() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNotification, setErrorNotification] = useState("");
  const { mutate: updatePassword } = useUpdatePasswordMutation();
  const backToSetting = () => {
    navigate("/settings");
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (newPassword && value && newPassword !== value) {
      setErrorNotification("Passwords do not match.");
    } else {
      setErrorNotification("");
    }
  };

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      setErrorNotification("New password and confirm password do not match!");
      return;
    }
    updatePassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <>
      <MyNavbar />
      <div className="min-h-screen">
        {" "}
        <MySection>
          <div className="flex flex-row items-center">
            <IoIosArrowBack className="text-2xl" onClick={backToSetting} />
            <h1 className="pl-3 text-xl font-semibold">Login And Security</h1>
          </div>
          <hr className="my-5 h-px border-0 bg-black" />

          {/* Password Section */}
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold lg:pl-16">Password</h1>
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Old Password"
              placeholderText="Enter Your Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="New Password"
              placeholderText="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Display real-time error message */}
            {errorNotification && (
              <p className="flex justify-center text-red-500">
                {errorNotification}
              </p>
            )}
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Confirm Password"
              placeholderText="Re-Enter Your New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange} // Real-time check
            />

            <div className="flex flex-row-reverse">
              <Button onClick={handlePasswordUpdate}>Save Changes</Button>
            </div>
          </div>
        </MySection>
      </div>

      <MyFooter />
    </>
  );
}
