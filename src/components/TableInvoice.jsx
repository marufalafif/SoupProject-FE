import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";

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

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.userId : null;
const TableInvoice = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_INVOICE_API_URL + "/GetInvoiceByUser",
        { params: { userId: userId } }
      )
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, [userId]);

  const getNo = (index) => {
    return index + 1;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID");
  };

  const buttonStyle = {
    width: "140px",
    borderRadius: "8px",
    paddingTop: "5px",
    color: "#5B4947",
    fontSize: "14px",
    backgroundColor: "#FABC1D",
    textTransform: "none",
    fontFamily: "Montserrat",
    fontWeight: "700",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              No. Invoice
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Date
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Total Course
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Total Price
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ textAlign: "center" }}>
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((order, index) => (
            <StyledTableRow key={order.invoice}>
              <StyledTableCell component="th" scope="row">
                {getNo(index)}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {order.invoice}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {order.transactionDate}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                {order.totalCourse}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                IDR {formatPrice(order.totalPrice)}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ textAlign: "center" }}>
                <Button
                  href={`/detailInvoice/${order.invoice}`}
                  variant="contained"
                  sx={buttonStyle}
                >
                  Details
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableInvoice;
