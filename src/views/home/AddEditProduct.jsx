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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

//constats
import {
  API_SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} from "@/constants/messages";

//default values
const defaultValues = {
  title: "",
  description: "",
  category: "",
  price: "",
};

//schema
const schema = yup.object().shape({
  title: yup.string().required(VALIDATION_MESSAGES.titleIsRequired),
  description: yup.string().required(VALIDATION_MESSAGES.descriptionIsRequired),
  category: yup.string().required(VALIDATION_MESSAGES.categoryIsRequired),
  price: yup
    .number()
    .typeError(VALIDATION_MESSAGES.priceTypeError)
    .positive(VALIDATION_MESSAGES.priceMustBePositive)
    .required(VALIDATION_MESSAGES.priceIsRequired),
});

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
      toast.success(API_SUCCESS_MESSAGES.ADDPRODUCTSUCCESS);
      reset(defaultValues);
      handleClose();
    },
  });

  //Edit product mutation
  const { mutate: editMutate, isPending } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (payload) => editProduct(data.id, payload),
    onSuccess: (res) => {
      toast.success(API_SUCCESS_MESSAGES.EDITPRODUCTSUCCESS);
      reset(defaultValues);
      handleClose();
    },
  });

  //hook form
  const {
    control,
    handleSubmit,
    reset,

    formState: { isDirty, errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
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
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid2 container spacing={3}>
              <Grid2 size={6}>
                <FormInput
                  control={control}
                  name="title"
                  label="Title"
                  placeHolder="Enter product title"
                  required
                  fullWidth
                  error={errors.title}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormInput
                  control={control}
                  name="description"
                  label="Description"
                  placeHolder="Enter product description"
                  fullWidth
                  required
                  error={errors.description}
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
                  error={errors.category}
                  required
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
                  required
                  error={errors.price}
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
                  tittle={isEdit ? "Edit" : "Add"}
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
