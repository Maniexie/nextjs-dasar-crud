import axios from "axios";

// export default productApi = () => {
//   const getProducts = async (req, res) => {
//     try {
//       const product = await axios.get("http://localhost:3000/api/barang");
//       console.log(product);
//       return product;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return {
//     getProducts,
//   };
// };

// Fungsi untuk mendapatkan data produk
const getProducts = async (data) => {
  try {
    const response = await axios
      .get("http://localhost:3000/api/barang")
      .then((res) => res.data);
    return response.data; // Kembalikan data produk
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getProducts;
