import { CircularProgress, Box } from "@mui/material";

import React from "react";

const Loader = () => {
  return (
    <Box
      height={"100dvh"}
      position={"absolute"}
      zIndex={100}
      sx={{ inset: 0 }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress size={20} />
    </Box>
  );
};

export default Loader;
