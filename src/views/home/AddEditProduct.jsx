import {
  addProduct,
  editProduct,
  getAllCategories,
} from "@/actions/productsActions";
import FormAutoComplete from "@/components/form/FormAutoComplete";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const defaultValues = {
  title: "",
  description: "",
  category: "",
  price: "",
};

const AddEditProduct = ({
  open = false,
  handleClose,
  isEdit = false,
  data = null,
}) => {
  const [edit, setEdit] = useState(false);

  const { data: categories, isLoading: iscategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    select: (res) => res.map((c) => ({ label: c.name, value: c.slug })),
    enabled: open,
  });

  const { mutate } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (data) => addProduct(data),
    onSuccess: (res) => {
      toast.success("New Product Added.");
      reset(defaultValues);
      handleClose();
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (payload) => editProduct(data.id, payload),
    onSuccess: (res) => {
      toast.success("Product Updated Successfully.");
      reset(defaultValues);
      handleClose();
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isEdit) {
      setEdit(true);
      reset({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        price: data.price || "",
      });
    } else {
      reset(defaultValues);
      setEdit(false);
    }
  }, [open, isEdit, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      editMutate(data);
    } else {
      mutate(data);
    }
  };

  const handleCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="md">
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography
            textAlign={"center"}
            fontSize={20}
            fontWeight={600}
            pb={4}
          >
            {isEdit ? "Edit Product" : "Add Product"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={3}>
              <Grid2 size={6}>
                <FormInput
                  control={control}
                  name="title"
                  label="Title"
                  placeHolder="Enter product title"
                  required
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <FormInput
                  control={control}
                  name="description"
                  label="Description"
                  placeHolder="Enter product description"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={6}>
                <FormAutoComplete
                  control={control}
                  name="category"
                  label="Category"
                  placeHolder="Select product category"
                  options={categories}
                  maxHeight={230}
                  loading={iscategoriesLoading}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormInput
                  control={control}
                  type="number"
                  name="price"
                  label="Price"
                  placeHolder="Enter product price"
                  fullWidth
                />
              </Grid2>
              <Grid2
                size={12}
                display={"flex"}
                justifyContent={"flex-end"}
                gap={3}
              >
                <Button onClick={handleCancel} variant="outlined">
                  Cancel
                </Button>
                <SubmitButton
                  tittle="Add"
                  isLoading={false}
                  disabled={!isDirty}
                  variant="outlined"
                  color="primary"
                />
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default AddEditProduct;
