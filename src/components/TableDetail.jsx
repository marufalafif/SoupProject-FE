import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5B4947",
    color: theme.palette.common.white,
    fontFamily: "Montserrat, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableDetail = () => {
  const { invoice } = useParams();
  const [data, setData] = useState([]);
  let totalPrice = 0;
  let transaksi = "";

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_INVOICE_API_URL +
          "/GetInvoiceDetailByInvoice",
        { params: { invoice: invoice } }
      )
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, [invoice]);

  const parsePrice = (price) => {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("id-ID");
  };

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          color: "#4F4F4F",
          fontSize: { xs: "16px", sm: "20px" },
          fontWeight: "600",
          fontFamily: "Montserrat",
          marginTop: "32px",
        }}
      >
        Details Invoice
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: { xs: "20px", sm: "30px" },
          marginBottom: { xs: "25px", sm: "34px" },
          width: "100%",
        }}
      >
        {data?.map((orderdetail) => {
          totalPrice += Number(orderdetail.coursePrice);
          transaksi = orderdetail.transactionDate;
        })}
        <Box>
          <Typography
            sx={{
              color: "#4F4F4F",
              fontSize: { xs: "14px", sm: "18px" },
              fontFamily: "Montserrat",
              fontWeight: "500",
            }}
          >
            No. Invoice : {invoice}
          </Typography>

          <Typography
            sx={{
              color: "#4F4F4F",
              fontSize: { xs: "14px", sm: "18px" },
              fontFamily: "Montserrat",
              fontWeight: "500",
            }}
          >
            Date : {transaksi}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "#4F4F4F",
            fontSize: { xs: "15px", sm: "18px" },
            fontFamily: "Montserrat",
            fontWeight: "700",
            textAlign: "end",
          }}
        >
          Total Price {totalPrice.toLocaleString("id-ID")}
        </Typography>
      </Box>

      <Table
        sx={{ minWidth: 700, display: { xs: "none", sm: "table" } }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Course Name
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Type
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Schedule
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Price
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((orderdetail, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {orderdetail.courseName}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {orderdetail.category}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {orderdetail.schedule}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                IDR {parsePrice(orderdetail.coursePrice)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mobile */}
      <Table sx={{ display: { xs: "table", sm: "none" }, width: "100%" }}>
        <TableBody>
          {data?.map((orderdetail, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell component="th" scope="row">
                {index + 1} .
              </StyledTableCell>
              <StyledTableCell>
                <Typography sx={{ textAlign: "center" }}>
                  Course Name: {orderdetail.courseName}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  Type: {orderdetail.category}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  Schedule: {orderdetail.schedule}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  Price: IDR {parsePrice(orderdetail.coursePrice)}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableDetail;
