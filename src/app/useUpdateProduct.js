import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (product) => {
      const responseProduct = await axiosInstance.patch(
        `/barang/${product.id}`,
        product
      );
      return responseProduct;
    },
    onSuccess,
  });
};
