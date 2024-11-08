import { useLocation } from "react-router-dom";
import { MyNavbar } from "./MyNavbar";
import { MyFooter } from "./MyFooter";
import { MySection } from "./MySection";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import success from "../assets/images/success.png";
import failed from "../assets/images/failed.png";
import { useUpdateOrderMutation } from "../customHooks/Order/useUpdateOrderMutation";

export function OrderCheckout_Payos() {
  const [transactionStatus, setTransactionStatus] = useState("failed");
  const { orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const payosResponseCode = searchParams.get("code");
  const payosTransactionStatus = searchParams.get("status");
  const { mutate: updateOrder } = useUpdateOrderMutation();

  useEffect(() => {
    if (payosResponseCode === "00" && payosTransactionStatus === "PAID") {
      setTransactionStatus("success");
      updateOrder({ orderId, status: "Paid" });
    } else {
      updateOrder({ orderId, status: "Failed" });
    }
  }, [payosResponseCode, payosTransactionStatus, orderId, updateOrder]);

  return (
    <>
      <MyNavbar />
      <MySection>
        {transactionStatus === "success" ? (
          <div className="flex flex-col items-center">
            <img className="max-h-80 max-w-80" src={success} alt="success" />
            <h1 className="text-2xl font-bold">
              Order id: {orderId} <br />
              You have paid successfully
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img className="max-h-80 max-w-80" src={failed} alt="failed" />
            <h1 className="text-2xl font-bold">
              There is some errors in your transaction
            </h1>
          </div>
        )}
      </MySection>
      <MyFooter />
    </>
  );
}
