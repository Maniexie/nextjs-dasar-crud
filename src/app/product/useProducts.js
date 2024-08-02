import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const productsResponse = await axiosInstance.get("/barang"); // Ambil data produk dari API
        setProducts(productsResponse.data);
        console.log(productsResponse);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    data: products,
    isLoading: isLoading,
  };
};
