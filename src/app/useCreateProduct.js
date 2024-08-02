import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.post("/barang", body);
      return productResponse;
    },
    onSuccess,
  });
};
