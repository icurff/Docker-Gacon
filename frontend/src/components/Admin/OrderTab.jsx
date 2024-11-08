import { useState } from "react";
import { useFetchOrders } from "../../customHooks/Order/useFetchOrders"; // Custom hook for fetching orders
import { Table, Pagination, Select, TextInput } from "flowbite-react";
import { FormatNumber } from "../../utils/FormatNumber";
import { FormatDateTime } from "../../utils/FormatDatetime";
import { EditOrderModal } from "./EditOrderModal";
import { Button } from "flowbite-react";
export function OrderTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  // Fetch orders with search query, status, and price range
  const { data } = useFetchOrders(currentPage, status, priceRange, searchQuery);

  const orders = data?.data || [];
  const totalPages = data?.last_page || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterChange(); // Reset page to 1 when search changes
  };

  const handleEditClick = (order) => {
    setOrderToEdit(order);
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
              placeholder="Search orders by book title..."
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
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="All">Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped</option>
            <option value="Failed">Failed</option>
            <option value="Success">Success</option>
          </Select>

          <Select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="All">All Price Ranges</option>
            <option value="0-100000">0 - 100.000</option>
            <option value="100000-500000">100.000 - 500.000</option>
            <option value="500000-1000000">500.000 - 1.000.000</option>
            <option value="1000000+">1.000.000+</option>
          </Select>
        </div>
      </div>

      {/* Table and Pagination */}
      <div className="overflow-x-auto">
        <Table hoverable className="min-w-full">
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Book Titles</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Updated At</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => (
              <Table.Row
                key={order.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {order.id}
                </Table.Cell>
                <Table.Cell>
                  {order.order_items.map((item, index) => (
                    <div key={index}>
                      - {item.book.title}
                      <br />
                    </div>
                  ))}
                </Table.Cell>

                <Table.Cell>{FormatNumber(order.total)}</Table.Cell>
                <Table.Cell>{order.paymentMethod}</Table.Cell>
                <Table.Cell
                  className={`font-bold ${
                    order.status === "Success" || order.status === "Paid"
                      ? "text-green-500"
                      : order.status === "Pending" || order.status === "Shipped"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {order.status}
                </Table.Cell>
                <Table.Cell>{FormatDateTime(order.updated_at)}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEditClick(order)}>Edit</Button>
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

      {/* Edit Order Form */}
      <EditOrderModal
        show={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        order={orderToEdit}
      />
    </div>
  );
}
