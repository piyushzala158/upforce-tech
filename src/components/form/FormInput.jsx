import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInput = ({
  control,
  name = "",
  label = "",
  placeHolder = "",
  required = false,
  fullWidth = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          required={required}
          label={label}
          placeholder={placeHolder}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default FormInput;
