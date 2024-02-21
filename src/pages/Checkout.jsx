import { Box } from "@mui/material";
import React, { useEffect } from "react";

import CheckoutList from "../components/CheckoutList";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box sx={{ marginTop: { xs: "60px", md: "75px" } }}>
      <CheckoutList />
    </Box>
  );
};

export default Checkout;
