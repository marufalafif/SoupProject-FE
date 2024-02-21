import {
  Box,
  Typography,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";

import Dashboard from "../../pages/Dashboard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentMethod = () => {
  const [payment, setPayment] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState({});

  const handleClickOpen = (paymentId) => {
    setOpenDialog((prev) => ({ ...prev, [paymentId]: true }));
  };

  const handleClose = (paymentId) => {
    setOpenDialog((prev) => ({ ...prev, [paymentId]: false }));
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_PAYMENT_API_URL + "/GetAllPayments")
      .then((res) => setPayment(res.data));
  }, []);

  const handleDelete = (paymentId) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_PAYMENT_API_URL
        }/DeletePayment?paymentId=${paymentId}`
      )
      .then(() => {
        setPayment((prevPayment) =>
          prevPayment.filter((payment) => payment.paymentId !== paymentId)
        );

        setIsSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting payment method:", error);
      });
    setOpenDialog((prev) => ({ ...prev, [paymentId]: false }));
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

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
          Payment Method
        </Typography>
        <Link to="/admin-dashboard/payment/form-add-payment">
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginTop: "20px",
              width: "100px",
              marginBottom: { xs: "6px", sm: "10px" },
            }}
          >
            Add
          </Button>
        </Link>
        {payment.map((method) => (
          <Box
            key={method.paymentId}
            sx={{
              width: "100%",
              border: "1px solid black",
              paddingX: { xs: "7px", sm: "20px" },
              paddingY: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: { xs: "40px", sm: "60px" },
                height: { xs: "40px", sm: "60px" },
              }}
            >
              <img
                src={method.imagePath}
                alt={method.paymentImg}
                width={"100%"}
                height={"100%"}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
                width: "70%",
                borderRight: "3px solid black",
                paddingRight: { xs: "5px", sm: "10px" },
              }}
            >
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Name: {method.paymentName}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Status: {method.paymentStatus}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: "7px",
                gap: { sm: "3px", md: "5px" },
                width: "100px",
              }}
            >
              <Link
                to={`/admin-dashboard/payment/form-update-payment/${method.paymentId}`}
              >
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ width: "100px" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ width: "100px" }}
                onClick={() => handleClickOpen(method.paymentId)}
              >
                Delete
              </Button>
            </Box>
            <Box
              sx={{
                marginLeft: { xs: "5px", sm: "10px" },
                display: { xs: "flex", sm: "none" },
                alignItems: "center",
                flexDirection: "column",
                paddingY: "7px",
                width: "50px",
              }}
            >
              <Link
                to={`/admin-dashboard/payment/form-update-payment/${method.paymentId}`}
              >
                <Button
                  color="success"
                  sx={{ textDecoration: "underline", color: "green" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                color="error"
                sx={{ textDecoration: "underline", color: "red" }}
                onClick={() => handleClickOpen(method.paymentId)}
              >
                Delete
              </Button>
            </Box>
            {/* Delete dialog */}
            <Dialog
              open={openDialog[method.paymentId] || false}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => handleClose(method.paymentId)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle sx={{ textAlign: "center" }}>
                {"Delete Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  sx={{ textAlign: "center" }}
                >
                  Are you sure you want to delete this Payment Method?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(method.paymentId)}>
                  Cancel
                </Button>
                <Button onClick={() => handleDelete(method.paymentId)}>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Payment Method deleted successfully!"
      />
    </div>
  );
};

export default PaymentMethod;
