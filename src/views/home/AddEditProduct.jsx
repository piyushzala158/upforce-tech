//react
import React, { useEffect } from "react";

//mui
import {
  Button,
  Card,
  CardContent,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";

//third party
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

//actions
import {
  addProduct,
  editProduct,
  getAllCategories,
} from "@/actions/productsActions";

//custom components
import FormAutoComplete from "@/components/form/FormAutoComplete";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";

//default values
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
  //get all categories
  const { data: categories, isLoading: iscategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    select: (res) => res.map((c) => ({ label: c.name, value: c.slug })),
    enabled: open,
  });

  //add product mutation
  const { mutate, isPending: isAddLoading } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (data) => addProduct(data),
    onSuccess: (res) => {
      toast.success("New Product Added.");
      reset(defaultValues);
      handleClose();
    },
  });

  //Edit product mutation
  const { mutate: editMutate, isPending } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (payload) => editProduct(data.id, payload),
    onSuccess: (res) => {
      toast.success("Product Updated Successfully.");
      reset(defaultValues);
      handleClose();
    },
  });

  //hook form
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  //reset form based is edit or add
  useEffect(() => {
    if (isEdit) {
      reset({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        price: data.price || "",
      });
    } else {
      reset(defaultValues);
    }
  }, [open, isEdit, reset]);

  //form submit handler
  const onSubmit = (data) => {
    if (isEdit) {
      editMutate(data);
    } else {
      mutate(data);
    }
  };

  //handle cancel
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
                  isLoading={isAddLoading || isPending}
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
