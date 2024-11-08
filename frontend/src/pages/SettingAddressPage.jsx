import { useState } from "react";
import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MySection } from "../components/MySection";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MyTextInput } from "../components/MyTextInput";
import { Button } from "flowbite-react";
import { useAddAddressMutation } from "../customHooks/Address/useAddAddressMutation";
import { useFetchAddresses } from "../customHooks/Address/useFetchAddresses";
import { useDeleteAddressMutation } from "../customHooks/Address/useDeleteAddressMutation";
import { FaRegTrashAlt } from "react-icons/fa";
export function SettingAddressPage() {
  const { data } = useFetchAddresses();
  const { mutateAsync: addAddress } = useAddAddressMutation();
  const { mutateAsync: deleteAddress } = useDeleteAddressMutation();
  const navigate = useNavigate();

  const myAddresses = data || [];
  // State for form fields
  const [addressAlias, setAddressAlias] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  const backToSetting = () => {
    navigate("/settings");
  };
  async function handleDeleteAddress(addressId) {
    await deleteAddress(addressId);
  }

  const handleAddAddress = async () => {
    try {
      await addAddress({
        addressAlias,
        recipientName: fullName,
        phone: phoneNumber,
        province,
        district,
        ward,
        address,
      });
    } catch (error) {
      console.error("Failed to add address", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="min-h-screen">
        
        <MySection>
          <div className="flex flex-row items-center">
            <IoIosArrowBack className="text-2xl" onClick={backToSetting} />
            <h1 className="pl-3 text-xl font-semibold"> My Addresses</h1>
          </div>
          <hr className="my-5 h-px border-0 bg-black"></hr>
          {myAddresses.length <= 0 ? (
            <div> You don't have any address, plz add one</div>
          ) : (
            myAddresses.map((address) => (
              <div
                key={address.id}
                className="flex flex-col gap-2 rounded-lg p-5 transition-transform duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="pl-5 text-lg font-semibold">
                      {address.addressAlias}
                    </h2>
                    <span className="pl-5">
                      Recipient: {address.recipientName}
                    </span>
                    <span className="pl-5">Phone Number: {address.phone}</span>
                    <span className="pl-5">
                      Address: {address.address}, {address.ward},{" "}
                      {address.district}, {address.province}
                    </span>
                  </div>
                  <div className="flex items-center p-10">
                    <button onClick={() => handleDeleteAddress(address.id)}>
                      <FaRegTrashAlt className="text-2xl" />
                    </button>
                  </div>
                </div>
                <hr className="my-5 h-px border-0 bg-black"></hr>
              </div>
            ))
          )}
        </MySection>
        <MySection>
          <div className="flex flex-row items-center">
            <h1 className="pl-3 text-xl font-semibold"> Information</h1>
          </div>
          <hr className="my-5 h-px border-0 bg-black"></hr>

          <div className="flex flex-col gap-5">
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Address Alias"
              placeholderText="Enter An Alias For This Address"
              value={addressAlias}
              onChange={(e) => setAddressAlias(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Full Name"
              placeholderText="Enter Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Phone Number"
              placeholderText="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Province"
              placeholderText="Enter Your Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="District"
              placeholderText="Enter Your District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Ward"
              placeholderText="Enter Your Ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            />
            <MyTextInput
              className="font-semibold lg:pl-20"
              labelText="Address"
              placeholderText="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex flex-row-reverse">
              <Button onClick={handleAddAddress}>Add New Address</Button>
            </div>
          </div>
        </MySection>
      </div>

      <MyFooter />
    </>
  );
}
