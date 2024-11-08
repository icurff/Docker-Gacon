import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { MyTextInput } from "../components/MyTextInput.jsx";
import { Table, Checkbox, Button, Label, Radio } from "flowbite-react";
import { useFetchCartItems } from "../customHooks/Cart/useFetchCartItems";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MySection } from "../components/MySection";
import { FormatNumber } from "../utils/FormatNumber";
import { useDeleteBookFromCartMutation } from "../customHooks/Cart/useDeleteBookFromCartMutation";
import { useUpdateCartMutation } from "../customHooks/Cart/useUpdateCartMutation.js";
import { useCheckout } from "../customHooks/Order/useCheckout";
import { toast } from "react-toastify";
import { useVnpPaymentMutation } from "../customHooks/Order/useVnpPaymentMutation.js";
import { usePayosPaymentMutation } from "../customHooks/Order/usePayosPaymentMutation.js";
import { useFetchAddresses } from "../customHooks/Address/useFetchAddresses";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../customStores/useCartStore.js";

export function CartPage() {
  const {
    cartItems,
    checkedItems,
    toggleItemCheck,
    toggleAllItemsCheck,
    setCartItems,
    updateQuantity,
  } = useCartStore();
  const navigate = useNavigate();
  const { data: fetchedCartData } = useFetchCartItems();
  const { data: addressesData } = useFetchAddresses();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { mutate: deleteBookFromCart } = useDeleteBookFromCartMutation();
  const { mutateAsync: checkout } = useCheckout();
  const customTableTheme = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative",
    },
    body: {
      base: "group/body",
      cell: {
        base: "  px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
      },
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
      cell: {
        base: "text-center bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
      },
    },
    row: {
      base: "group/row",
      hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
      striped:
        "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
    },
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const { mutateAsync: getVnpRedirectUrl } = useVnpPaymentMutation();
  const { mutateAsync: getPayosRedirectUrl } = usePayosPaymentMutation();

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const myAddresses = addressesData || [];
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const { mutate: updateCartItem } = useUpdateCartMutation();
  useEffect(() => {
    if (fetchedCartData) {
      setCartItems(fetchedCartData.cartItems);
      toggleAllItemsCheck(isAllChecked); // init object of unchecked items
    }
  }, [fetchedCartData]);
  function incrementQuantity(item) {
    const newQuantity = (item.quantity || 1) + 1;
    updateQuantity(item, newQuantity);
    updateCartItem({ itemId: item.id, quantity: newQuantity });
  }

  function decrementQuantity(item) {
    const newQuantity = Math.max((item.quantity || 1) - 1, 1);
    updateQuantity(item, newQuantity);
    updateCartItem({ itemId: item.id, quantity: newQuantity });
  }
  async function handleCheckout() {
    const selectedCartItems = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId],
    );

    if (selectedCartItems.length === 0) {
      toast.error("Please select items to proceed to checkout.");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select an address to proceed to checkout.");
      return;
    }

    const temp = myAddresses.find(
      (address) => address.id === Number(selectedAddress),
    );

    const shipAddress =
      temp.address +
      ", " +
      temp.ward +
      ", " +
      temp.district +
      ", " +
      temp.province +
      ", Recipient: " +
      temp.recipientName +
      ", Phone: " +
      temp.phone;
    const order = await checkout({
      cartItemIds: selectedCartItems,
      shipAddress: shipAddress,
      paymentMethod: selectedPaymentMethod,
    });

    if (selectedPaymentMethod === "VNPAY") {
      const url = await getVnpRedirectUrl({ orderId: order.id, total });
      window.location.href = url;
    } else if (selectedPaymentMethod === "PAYOS") {
      const orderItemsData = cartItems.filter((item) => {
        return checkedItems[item.id];
      });
      const url = await getPayosRedirectUrl({
        orderId: order.id,
        orderItemsData,
        total,
      });
      console.log(url);
      window.location.href = url;
    } else {
      toast.success("Order placed successfully");
      navigate("/cart");
    }
  }
  const total = cartItems.reduce((sum, item) => {
    if (checkedItems[item.id]) {
      return sum + item.book.price * (item.quantity || 0);
    }
    return sum;
  }, 0);

  function handleSelectAll() {
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);
    toggleAllItemsCheck(newCheckedState);
  }

  return (
    <>
      <MyNavbar />
      {
        <div>
          {/* Cart Items */}
          <MySection>
            <h1 className="text-2xl font-bold">Cart</h1>
            <hr className="my-5 h-px border-0 bg-black"></hr>
            <div className="overflow-x-auto">
              <Table hoverable theme={customTableTheme}>
                <Table.Head>
                  <Table.HeadCell className="p-4">
                    <Checkbox
                      checked={isAllChecked}
                      onChange={handleSelectAll}
                    />
                  </Table.HeadCell>
                  <Table.HeadCell>Product</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Subtotal</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {cartItems.map((cartItem) => (
                    <Table.Row
                      key={cartItem.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="p-4 text-center">
                        <Checkbox
                          checked={checkedItems[cartItem.id] ?? false} // Ensure a default of false
                          onChange={() => toggleItemCheck(cartItem.id)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <div className="flex">
                          <img
                            src={cartItem.book.thumbnail}
                            alt={cartItem.book.title}
                            className="h-16 w-16 object-cover"
                          />
                          <div className="ml-4 flex items-center justify-center">
                            <div className="flex flex-col">
                              <span>{cartItem.book.title}</span>
                              <span>{FormatNumber(cartItem.book.price)}</span>
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-center">
                          <div className="relative flex max-w-[8rem] items-center">
                            <button
                              type="button"
                              className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              onClick={() => decrementQuantity(cartItem)}
                            >
                              <HiMinus className="h-5 w-5" />
                            </button>
                            {/* Ensure that the quantity is always defined */}
                            <span className="block h-11 w-full border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              onClick={() => incrementQuantity(cartItem)}
                            >
                              <HiPlus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {FormatNumber(cartItem.book.price * cartItem.quantity)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-center">
                          <Button
                            onClick={() => deleteBookFromCart(cartItem.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </MySection>

          {/* Address */}
          <MySection>
            <div>
              <h1 className="text-2xl font-bold">Shipping Address</h1>
              <hr className="my-5 h-px border-0 bg-black"></hr>
              {myAddresses.length <= 0 ? (
                <div>You don't have any address, please add one</div>
              ) : (
                myAddresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex flex-col gap-2 rounded-lg p-5 transition-transform duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <Radio
                          name="address"
                          value={address.id}
                          checked={selectedAddress === String(address.id)}
                          onChange={handleAddressChange}
                        />
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-semibold">
                            {address.addressAlias}
                          </h2>
                          <span>Recipient: {address.recipientName}</span>
                          <span>Phone Number: {address.phone}</span>
                          <span>
                            Address: {address.address}, {address.ward},{" "}
                            {address.district}, {address.province}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="my-5 h-px border-0 bg-black"></hr>
                  </div>
                ))
              )}
            </div>
          </MySection>

          {/* Payment Method*/}
          <MySection>
            <div>
              <h1 className="text-2xl font-bold">Payment Method</h1>
              <hr className="my-5 h-px border-0 bg-black"></hr>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <Radio
                    name="pMethod"
                    value="COD"
                    checked={selectedPaymentMethod === "COD"}
                    onChange={handlePaymentMethodChange}
                  />
                  <Label> Cash on delivery </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    name="pMethod"
                    value="VNPAY"
                    checked={selectedPaymentMethod === "VNPAY"}
                    onChange={handlePaymentMethodChange}
                  />
                  <Label>VNPAY</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    name="pMethod"
                    value="PAYOS"
                    checked={selectedPaymentMethod === "PAYOS"}
                    onChange={handlePaymentMethodChange}
                  />
                  <Label>PAYOS</Label>
                </div>
              </div>
            </div>
          </MySection>
          {/* Checkout */}
          <MySection>
            <div className="flex justify-between">
              <span className="flex items-center">Total</span>
              <span className="flex items-center">{FormatNumber(total)}</span>
              <Button onClick={handleCheckout}>Proceed to checkout</Button>
            </div>
          </MySection>
        </div>
      }

      <MyFooter />
    </>
  );
}
