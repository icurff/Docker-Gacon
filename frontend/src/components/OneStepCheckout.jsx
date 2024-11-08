import { MyFooter } from "./MyFooter";
import { Label, TextInput, Radio, Table } from "flowbite-react";
import { useState } from "react";
export function OneStepCheckout({ orderItems }) {
  

  return (
    <>
      {/* Address */}
      <MySection>
        <div>
          <h1 className="text-2xl font-bold">Shipping Address</h1>
          <hr className="my-5 h-px border-0 bg-black"></hr>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="Full name of recipient" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="Phone number" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="Province" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter your "
                required
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="District" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter "
                required
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="Ward" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter your "
                required
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label className="w-1/5" value="Shipping Address" />
              <TextInput
                className="w-4/5"
                id="input-gray"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
        </div>
      </MySection>

      {/* Payment Method*/}
      <MySection>
        <div>
          <h1 className="text-2xl font-bold">Payment Method</h1>
          <hr className="my-5 h-px border-0 bg-black"></hr>
          <div>
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
                value="Bank"
                checked={selectedPaymentMethod === "Bank"}
                onChange={handlePaymentMethodChange}
              />
              <Label>Bank</Label>
            </div>
          </div>
        </div>
      </MySection>
      {/* Check order again */}
      <MySection>
        <div>
          <h1 className="text-2xl font-bold">Check your order again</h1>
          <hr className="my-5 h-px border-0 bg-black"></hr>
          <div>
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head></Table.Head>
                <Table.Body className="divide-y">
                  {cartDetail?.cartItems.map((cartItem) => (
                    <Table.Row
                      key={cartItem.book.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
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

                      <Table.Cell className="text-center">
                        {FormatNumber(
                          cartItem.book.price * quantities[cartItem.id],
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </MySection>
    </>
  );
}
