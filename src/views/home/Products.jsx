"use client";
//react
import React, { useState } from "react";

//next
import { useRouter } from "next/navigation";

//mui
import { Button, Box, Pagination, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//third party
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";

//actions
import {
  deleteProduct,
  getProducts,
  getProductsBySearch,
} from "@/actions/productsActions";

//custom componets
import AddEditProduct from "./AddEditProduct";
import SubmitButton from "@/components/form/SubmitButton";

//constants
import { API_SUCCESS_MESSAGES } from "@/constants/messages";

const Products = () => {
  //states with queryparams using nuqs
  const [perPage] = useQueryState("per_page", { defaultValue: 10 });
  const [page, setPage] = useQueryState("page", { defaultValue: 1 });
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  //states
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  //hooks
  const router = useRouter();
  const queryClient = useQueryClient();

  //get products data with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, perPage],
    queryFn: () => getProducts({ limit: 10, skip: (page - 1) * perPage }),
    keepPreviousData: true,
  });

  //get products by search with pagination
  const { data: searchData, isLoading: searchLoader } = useQuery({
    queryKey: ["productsBySearch", page, perPage, search],
    queryFn: () =>
      getProductsBySearch({ limit: 10, skip: (page - 1) * perPage, q: search }),
    keepPreviousData: true,
    enabled: !!search,
  });

  //delete mutation
  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      setDeletingId(id); // Set loading state for specific row
      const response = await deleteProduct(id);
      return { id, ...response };
    },
    onSuccess: ({ id, isDeleted }) => {
      if (isDeleted) {
        toast.success(API_SUCCESS_MESSAGES.DELETEPRODUCTSUCCESS);

        // Optimistically update the query cache
        queryClient.setQueryData(["products", page, perPage], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            products: oldData.products.filter((product) => product.id !== id),
          };
        });

        queryClient.setQueryData(
          ["productsBySearch", page, perPage, search],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              products: oldData.products.filter((product) => product.id !== id),
            };
          }
        );
      }
    },
    onSettled: () => {
      setDeletingId(null); // Reset loading state after deletion
    },
  });

  //handle edit
  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
    handleAddDialogOpen();
  };

  //handle search with debounce
  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  }, 500);

  //datagrid columns
  const columns = [
    { field: "id", headerName: "ID", sortable: false, width: 70 },
    { field: "title", headerName: "Title", sortable: false, flex: 0.0075 },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      flex: 0.0175,
    },
    { field: "category", headerName: "Category", sortable: false, width: 150 },
    { field: "price", headerName: "Price ($)", sortable: false, width: 100 },
    { field: "stock", headerName: "Stock", sortable: true, width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(params.row);
            }}
          >
            Edit
          </Button>
          <SubmitButton
            variant="contained"
            color="error"
            isLoading={deletingId === params.row.id}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              deleteMutate(params.row.id);
            }}
            style={{ marginLeft: 8 }}
            tittle="Delete"
          />
        </>
      ),
    },
  ];

  //handle add/edit dialog close
  const handleAddDialogClose = () => {
    setIsOpenAddDialog(false);
    setIsEdit(false);
    setEditData(null);
  };

  //handle add/edit dialog open
  const handleAddDialogOpen = () => {
    setIsOpenAddDialog(true);
  };

  //handle row click
  const handleRowClick = ({ id }) => {
    router.push(`/${id}`);
  };

  return (
    <Box height={"100%"}>
      <Typography textAlign={"center"} my={2} fontSize={20} fontWeight={500}>
        Products Data
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        mb={2}
        flexWrap={"wrap"}
      >
        <TextField
          variant="outlined"
          label="Search Product"
          size="small"
          defaultValue={search}
          onChange={handleSearchChange}
        />
        <Button variant="outlined" onClick={() => setIsOpenAddDialog(true)}>
          Add Product
        </Button>
      </Box>

      <DataGrid
        rowHeight={50}
        onRowClick={handleRowClick}
        rows={searchData?.products || data?.products || []}
        columns={columns}
        loading={isLoading || searchLoader}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        disableSelectionOnClick
        disableEval
        disableVirtualization
        slots={{
          noRowsOverlay: () => (
            <Typography textAlign={"center"} py={4}>
              No Products Found
            </Typography>
          ),
          pagination: () => (
            <Pagination
              count={Math.ceil(
                (searchData?.total || data?.total || 0) / perPage
              )}
              page={Number(page)}
              onChange={(_, value) => setPage(value)}
            />
          ),
        }}
      />

      <AddEditProduct
        open={isOpenAddDialog}
        handleClose={handleAddDialogClose}
        isEdit={isEdit}
        data={editData}
      />
    </Box>
  );
};

export default Products;
