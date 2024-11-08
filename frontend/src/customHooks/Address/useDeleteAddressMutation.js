import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";
const deleteAddress = async (addressId) => {
  try {
    const response = await CustomAxios.delete(`/api/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      console.error("Error while deleting the address:", error);
    },
  });
};
