import { Modal, Button, TextInput, Textarea, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useUpdateOrderMutation } from "../../customHooks/Order/useUpdateOrderMutation";
import { toast } from "react-toastify";
import { FormatNumber } from "../../utils/FormatNumber";

export function EditOrderModal({ show, onClose, order }) {
  const [status, setStatus] = useState("");
  const orderId = order?.id || "";
  const paymentMethod = order?.paymentMethod || "";
  const shipAddress = order?.shipAddress || "";
  const total = Number(order?.total) || "";
  const items = order?.order_items || [];

  const { mutateAsync: updateOrder } = useUpdateOrderMutation();

  const handleSave = async () => {
    try {
      await updateOrder({ orderId, status });
      onClose();
      toast.success("Order updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error during the save process: " + error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Order</Modal.Header>
      <Modal.Body>
        <form className="dark:text-white">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Order ID</label>
            <TextInput type="text" value={orderId} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Shipping Address
            </label>
            <TextInput type="text" value={shipAddress} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>
            <TextInput type="text" value={paymentMethod} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Order Status
            </label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Failed">Failed</option>
              <option value="Success">Success</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Total Price
            </label>
            <TextInput type="text" value={FormatNumber(total)} disabled />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Ordered Items
            </label>
            <Textarea
              placeholder="Enter ordered items"
              value={items.map((item) => item.book.title).join("\n")}
              disabled
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
