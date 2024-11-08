import { useState, useEffect } from "react";
import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MySection } from "../components/MySection";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFetchAuthUser } from "../customHooks/Auth/useFetchAuthUser";
import { FileInput, Button } from "flowbite-react";
import { uploadAvatar } from "../config/Firebase";
import { useUpdateProfileMutation } from "../customHooks/User/useUpdateProfileMutation";
export function SettingProfilePage() {
  const navigate = useNavigate();
  const { mutateAsync: updateProfile } = useUpdateProfileMutation();
  const backToSetting = () => {
    navigate("/settings");
  };
  const { data: authUser } = useFetchAuthUser();
  const [userAvatar, setUserAvatar] = useState(authUser?.avatar || "");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUserAvatar(
        authUser.avatar ||
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      );
    }
  }, [authUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserAvatar(reader.result); // Set the preview URL for the avatar
      };
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (imageFile) {
      const folderPath = `${authUser.id}.${authUser.email}/avatar/${imageFile.name}`;
      const avatarUrl = await uploadAvatar(imageFile, folderPath);
      await updateProfile({ avatarUrl });
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="min-h-screen">
        <MySection>
          <div className="flex flex-row items-center">
            <IoIosArrowBack className="text-2xl" onClick={backToSetting} />
            <h1 className="pl-3 text-xl font-semibold">Profile</h1>
          </div>
          <hr className="my-5 h-px border-0 bg-black" />

          {/* Avt Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-center">
              <img
                src={userAvatar}
                alt="user avatar"
                className="h-60 w-60 rounded-full"
              />
            </div>

            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
            <Button
              type="button"
              className="bg-[#0a68ff] font-bold text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </MySection>
      </div>

      <MyFooter />
    </>
  );
}
