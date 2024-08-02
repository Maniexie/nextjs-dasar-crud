// import { axiosInstance } from "../lib/axios";
// import { useQuery } from "@tanstack/react-query";

// export const useProductsHome = () => {
//   return useQuery({
//     queryFn: async () => {
//       const productsResponse = await axiosInstance.get("/barang"); // Ambil data produk dari API
//       return productsResponse.data;
//     },
//   });
// };

// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/lib/axios"; // Sesuaikan dengan lokasi axiosInstance

// export const useProductsHome = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/barang");
//       return response.data;
//     },
//     staleTime: 60000, // Sesuaikan dengan kebutuhan
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios"; // Sesuaikan dengan lokasi axiosInstance

export const useProductsHome = () => {
  return useQuery({
    queryFn: async () => {
      const productsResponse = await axiosInstance.get("/barang");
      console.log(productsResponse.data);
      return productsResponse;
    },
    // queryKey: ["fetch.products"],
  });
};
