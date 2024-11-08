import { Table, Checkbox, Button } from "flowbite-react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { FormatNumber } from "../utils/FormatNumber";
export function MyCart() {
  return (
    <>
      <div className="min-h-screen">
        {/* Cart Items */}
        <MySection>
          <div className="overflow-x-auto">
            <Table hoverable theme={customTableTheme}>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox checked={isAllChecked} onChange={handleSelectAll} />
                </Table.HeadCell>
                <Table.HeadCell>Product</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Subtotal</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {cartDetail?.cartItems.map((cartItem) => (
                  <Table.Row
                    key={cartItem.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="p-4 text-center">
                      <Checkbox
                        checked={checkedItems[cartItem.id] ?? false} // Ensure a default of false
                        onChange={() => handleCheckboxChange(cartItem.id)}
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
                            onClick={() => decrementQuantity(cartItem.id)}
                          >
                            <HiMinus className="h-5 w-5" />
                          </button>
                          {/* Ensure that the quantity is always defined */}
                          <span className="block h-11 w-full border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                            {quantities[cartItem.id]}
                          </span>
                          <button
                            type="button"
                            className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            onClick={() => incrementQuantity(cartItem.id)}
                          >
                            <HiPlus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {FormatNumber(
                        cartItem.book.price * quantities[cartItem.id],
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center">
                        <Button onClick={() => deleteBookFromCart(cartItem.id)}>
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

        {/* Checkout */}
        <MySection>
          <div className="flex justify-between">
            <span>Total</span>
            <span>{FormatNumber(total)}</span>
            <Button onClick={handleCheckout}>Proceed to checkout</Button>
          </div>
        </MySection>
      </div>
    </>
  );
}
