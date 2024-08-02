// src/app/page.js
"use client"; // Menandai ini sebagai Client Component
import { useEffect, useState } from "react";
import LinksHome from "../links";
// import { getProducts } from "./services/product.js";
import { axiosInstance } from "@/lib/axios";
import { Spinner } from "@chakra-ui/react";
import { useProducts } from "./useProducts";

export default function Page() {
  const { data: products, isLoading } = useProducts();

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <ul key={product.id}>
          <li>{product.id}</li>
          <li>{product.kode}</li>
          <li>{product.nama}</li>
          <li>{product.harga}</li>
        </ul>
      );
    });
  };

  return (
    <div>
      <h1>Hello, Product Next.js!</h1>
      <div>
        <LinksHome />
      </div>
      {/* buat tabelnya */}
      <div>
        {renderProducts()}
        <div>{isLoading ? <Spinner size="xl" /> : null}</div>
      </div>
    </div>
  );
}
