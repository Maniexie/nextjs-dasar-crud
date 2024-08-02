import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const useDeleteProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const responseProduct = await axiosInstance.delete(`/barang/${id}`);
      return responseProduct;
    },
    onSuccess,
  });
};
