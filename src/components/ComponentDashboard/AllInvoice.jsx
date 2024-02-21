import {
  Box,
  Typography,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useState, useEffect, forwardRef } from "react";
import axios from "axios";

import Dashboard from "../../pages/Dashboard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_INVOICE_API_URL + "/GetAllInvoice")
      .then((res) => setInvoices(res.data));
  }, []);

  return (
    <div>
      <Dashboard />
      <Box
        sx={{
          width: { sm: "100%", md: "82%" },
          height: "100vh",
          paddingTop: "70px",
          paddingX: { xs: "5px", sm: "30px" },
          marginLeft: { sm: "auto" },
          position: { sm: "absolute" },
          right: 0,
          top: 0,
          overflow: { sm: "auto" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          AllInvoice
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Total Course</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={invoice.userId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invoice.username}</TableCell>
                  <TableCell>{invoice.invoice}</TableCell>
                  <TableCell>{invoice.transactionDate}</TableCell>
                  <TableCell>{invoice.totalCourse}</TableCell>
                  <TableCell>{invoice.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AllInvoice;
