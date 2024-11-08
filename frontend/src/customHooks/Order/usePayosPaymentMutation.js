import { useMutation } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const getRedirectUrl = async (orderData) => {
  try {
    const response = await CustomAxios.post(
      "/api/orders/payos_payment",
      orderData,
    );
    console.log(response.data);
    return response.data.checkoutUrl;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const usePayosPaymentMutation = () => {
  return useMutation({
    mutationFn: getRedirectUrl,
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error ", error);
    },
  });
};
