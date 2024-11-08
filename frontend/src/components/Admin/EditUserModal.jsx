import { Modal, Button, TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "../../customHooks/User/useUpdateUserMutaion";
import { toast } from "react-toastify";

export function EditUserModal({ show, onClose, user }) {
  const [isAdminFilter, setIsAdminFilter] = useState(false);
  const [password, setPassword] = useState("");
  const userId = user?.id || "";
  const email = user?.email || "";

  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const handleSave = async () => {
    const data = { userId, isAdmin: isAdminFilter };
    if (password) {
      data.password = password;
    }
    await updateUser(data);
    onClose();
  };
  useEffect(() => {
    if (user) {
      setPassword("");
      setIsAdminFilter(false);
    }
  }, [user]);

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Body>
        <form className="dark:text-white">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">User ID</label>
            <TextInput type="text" value={userId} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <TextInput type="text" value={email} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Is Admin</label>
            <Select
              value={isAdminFilter}
              onChange={(e) => setIsAdminFilter(e.target.value === "true")}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Password</label>
            <TextInput
              type="password" // Changed to password type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="bg-[#f2f3f4] text-black"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
