import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MySection } from "../components/MySection";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFetchMyOrders } from "../customHooks/Order/useFetchMyOrders";
import { FormatDateTime } from "../utils/FormatDatetime";
import { FormatNumber } from "../utils/FormatNumber";
import { useState } from "react";
import { Pagination } from "flowbite-react";
export function SettingOrderPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders, isLoading } = useFetchMyOrders(currentPage);
  const totalPages = orders?.last_page || 1;
  const myOrders = orders?.data || [];
  const navigate = useNavigate();

  const backToSetting = () => {
    navigate("/settings");
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <MyNavbar />
      <div className="min-h-screen">
        <MySection>
          <div className="flex flex-row items-center">
            <IoIosArrowBack
              className="cursor-pointer text-2xl"
              onClick={backToSetting}
            />
            <h1 className="pl-3 text-xl font-semibold">Orders</h1>
          </div>
          <hr className="my-5 h-px border-0 bg-black" />

          {/* Loading State */}
          {isLoading && <p>Loading your orders...</p>}

          {/* Orders List */}
          {myOrders && myOrders.length > 0 ? (
            <div className="mt-5">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  className="mb-4 rounded-lg border p-4 shadow-sm"
                >
                  <h2 className="font-bold">Order ID: {order.id}</h2>
                  <p
                    className={`font-bold ${
                      order.status === "Success" || order.status === "Paid"
                        ? "text-green-500"
                        : order.status === "Pending" ||
                            order.status === "Shipped"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                  <p>Date: {FormatDateTime(order.created_at)}</p>
                  <p>Items in order: </p>

                  <ul className="list-disc pl-5">
                    {order.order_items.map((item) => (
                      <li key={item.id}>
                        {item.book.title} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>

                  <p>Total: {FormatNumber(order.total)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p></p>
          )}
          <div className="mt-4">
            <Pagination
              className="flex justify-center"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </MySection>
      </div>

      <MyFooter />
    </>
  );
}
