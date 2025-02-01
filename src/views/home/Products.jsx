"use client";
import React, { useState } from "react";
import { Button, Box, Pagination, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "@/actions/productsActions";
import { useQueryState } from "nuqs";
import AddEditProduct from "./AddEditProduct";
import toast from "react-hot-toast";

const Products = () => {
  const [perPage, setPerPage] = useQueryState("per_page", { defaultValue: 10 });
  const [page, setPage] = useQueryState("page", { defaultValue: 1 });
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, perPage],
    queryFn: () => getProducts({ limit: 10, skip: (page - 1) * perPage }),
    keepPreviousData: true,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product Updated Successfully.");
    },
  });

  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
    handleAddDialogOpen();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price ($)", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => deleteMutate(params.row.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleAddDialogClose = () => {
    setIsOpenAddDialog(false);
    setIsEdit(false);
    setEditData(null);
  };

  const handleAddDialogOpen = () => {
    setIsOpenAddDialog(true);
  };

  return (
    <Box height={"100%"}>
      <Typography textAlign={"center"} my={2} fontSize={18} fontWeight={500}>
        Products Data
      </Typography>

      <Box textAlign={"end"} mb={2}>
        <Button variant="outlined" onClick={handleAddDialogOpen}>
          {" "}
          Add Product
        </Button>
      </Box>

      <DataGrid
        rowHeight={50}
        rows={data?.products || []}
        columns={columns}
        loading={isLoading}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        disableSelectionOnClick
        slots={{
          pagination: () => (
            <Pagination
              count={Math.ceil((data?.total || 0) / perPage)}
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
