import { useMutation } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";

const getRedirectUrl = async (orderData) => {
  try {
    const response = await CustomAxios.post(
      "/api/orders/vnp_payment",
      orderData,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useVnpPaymentMutation = () => {
  return useMutation({
    mutationFn: getRedirectUrl,
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error ", error);
    },
  });
};
