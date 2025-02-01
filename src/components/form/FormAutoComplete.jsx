import React from "react";

//mui
import { Autocomplete, TextField } from "@mui/material";

//third party
import { Controller } from "react-hook-form";

const FormAutoComplete = ({
  control,
  name = "",
  label = "",
  options = [],
  placeholder = "",
  required = false,
  fullWidth = false,
  loading = false,
  error = false,
  maxHeight = 200,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label || ""}
          value={options.find((option) => option.value === value) || null}
          onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
          fullWidth={fullWidth}
          loading={loading}
          slotProps={{
            paper: {
              sx: {
                maxHeight: maxHeight,
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              placeholder={placeholder}
              error={error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
};

export default FormAutoComplete;
