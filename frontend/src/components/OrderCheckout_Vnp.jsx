import { useLocation } from "react-router-dom";
import { MyNavbar } from "./MyNavbar";
import { MyFooter } from "./MyFooter";
import { MySection } from "./MySection";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import success from "../assets/images/success.png";
import failed from "../assets/images/failed.png";
import { useUpdateOrderMutation } from "../customHooks/Order/useUpdateOrderMutation";
import { FormatNumber } from "../utils/FormatNumber";

export function OrderCheckout_Vnp() {
  const [transactionStatus, setTransactionStatus] = useState("failed");
  const { orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vnpAmount = FormatNumber(
    parseInt(searchParams.get("vnp_Amount"), 10) / 100,
  );

  const vnpResponseCode = searchParams.get("vnp_ResponseCode");
  const vnpTransactionStatus = searchParams.get("vnp_TransactionStatus");
  const { mutate: updateOrder } = useUpdateOrderMutation();

  useEffect(() => {
    if (vnpResponseCode === "00" && vnpTransactionStatus === "00") {
      setTransactionStatus("success");
      updateOrder({ orderId, status: "Paid" });
    } else {
      updateOrder({ orderId, status: "Failed" });
    }
  }, [vnpResponseCode, vnpTransactionStatus, orderId, updateOrder]);

  return (
    <>
      <MyNavbar />
      <MySection>
        {transactionStatus === "success" ? (
          <div className="flex flex-col items-center">
            <img className="max-h-80 max-w-80" src={success} alt="success" />
            <h1 className="text-2xl font-bold">You have paid {vnpAmount}</h1>
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
