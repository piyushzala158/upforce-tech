import FormInput from "@/components/form/FormInput";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  title: "",
  description: "",
  category: "",
  price: null,
};

const AddEditProduct = ({
  open = false,
  handleClose,
  isEdit = false,
  data = null,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Card>
        <CardContent>
          <Typography textAlign={"center"}>Add Product</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
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
                <FormInput
                  control={control}
                  name="description"
                  label="Description"
                  placeHolder="Enter product description"
                  fullWidth
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
