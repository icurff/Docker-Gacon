import { useState } from "react";
import { useFetchUsers } from "../../customHooks/User/useFetchUsers";
import { Table, Pagination, Select, TextInput } from "flowbite-react";
import { FormatDateTime } from "../../utils/FormatDatetime";
import { Button } from "flowbite-react";
import { EditUserModal } from "./EditUserModal";
export function UserTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminFilter, setIsAdminFilter] = useState("All");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const { data } = useFetchUsers(currentPage, searchQuery, isAdminFilter);

  const users = data?.data || [];
  const totalPages = data?.last_page || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterChange();
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditFormOpen(true);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Search Form and Filters */}
      <div className="mb-4 flex items-center justify-between">
        {/* Search Form */}
        <div className="mx-8 flex-grow">
          <form>
            <TextInput
              type="search"
              placeholder="Search users by email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
              required
            />
          </form>
        </div>

        {/* Status and Price Range Filters */}
        <div className="flex gap-4">
          <Select
            value={isAdminFilter}
            onChange={(e) => {
              setIsAdminFilter(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="All">Role</option>
            <option value="Admin">Admin</option>
          </Select>
        </div>
      </div>

      {/* Table and Pagination */}
      <div className="overflow-x-auto">
        <Table hoverable className="min-w-full">
          <Table.Head>
            <Table.HeadCell>User ID</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>Updated At</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user) => (
              <Table.Row
                key={user.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {user.id}
                </Table.Cell>

                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell
                  className={`font-bold ${
                    user.isAdmin == true ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </Table.Cell>
                <Table.Cell>{FormatDateTime(user.created_at)}</Table.Cell>
                <Table.Cell>{FormatDateTime(user.updated_at)}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEditClick(user)}>Edit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="mt-4">
          <Pagination
            className="flex justify-center"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Edit User Form */}
      <EditUserModal
        show={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        user={userToEdit}
      />
    </div>
  );
}
