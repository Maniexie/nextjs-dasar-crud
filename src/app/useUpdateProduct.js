import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const responseProduct = await axiosInstance.patch(
        `/barang/${body.id}`,
        body
      );
      return responseProduct;
    },
    onSuccess,
  });
};
