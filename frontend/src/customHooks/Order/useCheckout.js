import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
const checkout = async (orderItems) => {
  try {
    const response = await CustomAxios.post("/api/orders/checkout", orderItems);
    return response.data.order;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      console.log("ordered added successfully");
    },
    onError: (error) => {
      console.error("Error adding the book:", error);
    },
  });
};
