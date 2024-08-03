"use client"; // Menandai ini sebagai Client Component
import {
  Spinner,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useProductsHome } from "./useProductsHome";
import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";
import { useUpdateProduct } from "./useUpdateProduct";

export default function Page() {
  const toast = useToast();

  const {
    data,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
  } = useProductsHome();

  const formik = useFormik({
    initialValues: {
      id: "",
      nama: "",
      kode: "",
      harga: "",
    },
    onSubmit: () => {
      const { nama, kode, harga, id } = formik.values;
      if (id) {
        updateProduct({
          id,
          nama,
          kode,
          harga: parseInt(harga),
        });
      } else {
        createProduct({
          nama,
          kode,
          harga: parseInt(harga),
        });
      }

      console.log("onSubmit dari function formik");

      formik.setFieldValue("id", "");
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

  const { mutate: createProduct, isLoading: createProductIsLoading } =
    useCreateProduct({
      onMutate: () => {
        console.log("onMutate dari useMutation");
      },
      onSuccess: () => {
        toast({
          title: "Product added ",
          status: "success",
          duration: 7000,
        });
        refetchProducts();
      },
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

  const confirmDeleteProduct = (productId) => {
    const shouldDelete = confirm("Are you sure?");
    if (shouldDelete) {
      deleteProduct(productId);
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

  const onEditClick = (product) => {
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("kode", product.kode);
    formik.setFieldValue("nama", product.nama);
    formik.setFieldValue("harga", product.harga);
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
            <Button onClick={() => onEditClick(product)} colorScheme="blue">
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
    <>
      <TableContainer>
        <Table maxWidth={"100%"} variant={"simple"}>
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
      </TableContainer>

      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={"4"}>
          <FormControl>
            <FormLabel htmlFor="id">ID</FormLabel>
            <Input
              isDisabled
              onChange={formik.handleChange}
              id="id"
              type="number"
              name="id"
              value={formik.values.id}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nama">Nama</FormLabel>
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
    </>
  );
}
