"use client"; // Menandai ini sebagai Client Component
import {
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Container,
  Button,
  Text,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import LinksHome from "./links";

import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProductsHome } from "./useProductsHome";
import { axiosInstance } from "@/lib/axios";
import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";
import { useUpdateProduct } from "./useUpdateProduct";

export default function Page() {
  const {
    data,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
  } = useProductsHome();
  const toast = useToast();

  // const { data, isLoading } = useQuery({
  //   queryFn: async () => {
  //     const response = await axiosInstance.get("/barang");
  //     return response.data;
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      nama: "",
      kode: "",
      harga: "",
    },
    onSubmit: () => {
      const { nama, kode, harga } = formik.values;
      mutate({
        nama,
        kode,
        harga,
      });
      // console.log(values);
      console.log("onSubmit dari function formik");

      formik.setFieldValue("nama", "");
      formik.setFieldValue("kode", "");
      formik.setFieldValue("harga", "");
    },

    validate: (values) => {
      const errors = {};
      if (!values.nama) {
        errors.nama = "Required";
      }
      if (!values.kode) {
        errors.kode = "Required";
      }
      if (!values.harga) {
        errors.harga = "Required";
      }
      return errors;
    },
  });

  const { mutate, isLoading: createProductIsLoading } = useCreateProduct({
    onMutate: () => {
      console.log("onMutate dari useMutation");
    },
    onSuccess: () => {
      // console.log(data);
      toast({
        title: "Product added ",
        status: "success",
        duration: 7000,
      });

      refetchProducts();
    },
    // onError: (error) => {
    //   console.log(error);
    // },
  });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast({
        title: "Produk Berhasil di Hapus ",
        status: "info",
        duration: 7000,
      });
      refetchProducts();
    },
  });

  const confirmDeleteProduct = (prductId) => {
    const shouldDelete = confirm("Are you sure?");
    if (shouldDelete) {
      deleteProduct(prductId);
      toast({
        title: "Product deleted",
        status: "info",
        duration: 7000,
      });
    }
  };

  const { mutate: updateProduct, isLoading: updateProductIsLoading } =
    useUpdateProduct({
      onSuccess: () => {
        toast({
          title: "Product di edit ",
          status: "success",
          duration: 7000,
        });
        refetchProducts();
      },
    });

  const onEditClick = (productId) => {
    const product = data?.data.find((product) => product.id === productId);
    if (product) {
      formik.setFieldValue("id", product.id);
      formik.setFieldValue("kode", product.kode);
      formik.setFieldValue("nama", product.nama);
      formik.setFieldValue("harga", product.harga);
    }
  };

  const handleFormInput = (event) => {
    // const { name, value } = event.target;
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const renderProducts = () => {
    return data?.data.map((product) => {
      return (
        <Tr key={product.id}>
          <Td>{product.id}</Td>
          <Td>{product.kode}</Td>
          <Td>{product.nama}</Td>
          <Td>{product.harga}</Td>
          <Td>
            <Button onClick={() => onEditClick(product.id)} colorScheme="blue">
              Edit {product.id}
            </Button>
          </Td>
          <Td>
            <Button
              onClick={() => confirmDeleteProduct(product.id)}
              colorScheme="red"
            >
              Delete {product.id}
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <div>
      <main>
        <Container>
          <h1>Hello, Product Next.js!</h1>
          <div>
            <LinksHome />
          </div>
          <div>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Kode</Th>
                  <Th>Nama</Th>
                  <Th>Harga</Th>
                  <Th colSpan={2}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {renderProducts()}
                {isLoadingProducts ? <Spinner size="xl" /> : null}
              </Tbody>
            </Table>
          </div>
          {/* buat formnya */}
          <Text> {formik.values.nama}</Text>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={"4"}>
              <FormControl>
                <FormLabel htmlFor="nama">nama</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  id="nama"
                  type="text"
                  name="nama"
                  value={formik.values.nama}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="kode">Kode Barang</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  id="kode"
                  type="text"
                  name="kode"
                  placeholder="KB-001"
                  value={formik.values.kode}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="harga">Harga</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  id="harga"
                  type="text"
                  name="harga"
                  value={formik.values.harga}
                />
              </FormControl>
              {createProductIsLoading ? (
                <Spinner />
              ) : (
                <Button mt={"4"} type="submit">
                  Submit
                </Button>
              )}
            </VStack>
          </form>

          {/* <Toast /> */}
        </Container>
      </main>
    </div>
  );
}
