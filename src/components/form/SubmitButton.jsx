import React from "react";

//mui
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({
  tittle = "Submit",
  isLoading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Button type="submit" disabled={isLoading || disabled} {...rest}>
      {isLoading ? (
        <CircularProgress size={12} color="inherit" sx={{ mr: 0.5 }} />
      ) : null}
      {tittle}
    </Button>
  );
};

export default SubmitButton;
