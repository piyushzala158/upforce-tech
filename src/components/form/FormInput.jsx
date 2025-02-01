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
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value}
          required={required}
          label={label}
          placeholder={placeHolder}
          fullWidth={fullWidth}
          {...rest}
        />
      )}
    />
  );
};

export default FormInput;
