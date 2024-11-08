import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const addAddress = async (addressData) => {
  try {
    const response = await CustomAxios.post("/api/addresses", addressData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useAddAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      console.error("Error while  adding address", error);
    },
  });
};
