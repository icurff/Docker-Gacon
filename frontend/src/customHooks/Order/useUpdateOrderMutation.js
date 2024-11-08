import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const updateOrder = async ({ orderId, status }) => {
  try {
    const response = await CustomAxios.put(`/api/admin/orders/${orderId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error updating the cart item:", error);
      toast.error("Failed to update cart item");
    },
  });
};
