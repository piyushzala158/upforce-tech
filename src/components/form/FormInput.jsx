import React from "react";

//mui
import { TextField } from "@mui/material";

//third party
import { Controller } from "react-hook-form";

const FormInput = ({
  control,
  name = "",
  label = "",
  placeHolder = "",
  required = false,
  fullWidth = false,
  error = false,
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
          error={error}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  );
};

export default FormInput;
