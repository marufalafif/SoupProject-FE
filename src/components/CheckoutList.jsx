import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  IconButton,
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.userId : null;

const CheckoutList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedCartIds, setSelectedCartIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [dataPayment, setDataPayment] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_PAYMENT_API_URL + "/GetAllPayments")
      .then((res) => setDataPayment(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL + "/GetCartById", {
        params: { userId: userId },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, [userId]);

  const handlePayNow = () => {
    if (selectedPaymentMethod && selectedCartIds.length > 0) {
      setPaymentError(false);
      const checkoutData = {
        userId: userId,
        paymentMethod: selectedPaymentMethod,
        selectedCourses: selectedCartIds,
      };

      axios
        .post(
          import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL + "/checkout",
          checkoutData
        )
        .then((response) => {
          console.log("Checkout successful:", response.data);
          navigate("/purchaseConfirmation");
          window.location.reload();
        })

        .catch((error) => {
          console.error("Checkout failed:", error);
        });
    } else {
      setPaymentError(true);
    }
  };

  const handleDelete = (cartId) => {
    let courseDateToDelete;

    // Find the courseDate corresponding to the cartId before deletion
    data.forEach((item) => {
      if (item.cartId === cartId) {
        courseDateToDelete = item.courseDate;
      }
    });

    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL
        }/DeleteCart?cartId=${cartId}`
      )
      .then((response) => {
        console.log("Item deleted successfully:", response.data);

        // Execute the second API with the courseDateToDelete
        axios
          .put(
            `${
              import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL
            }/ActivateSchedule?startTime=${courseDateToDelete}`
          )
          .then((secondApiResponse) => {
            console.log(
              "ActivateSchedule API executed successfully:",
              secondApiResponse.data
            );
          })
          .catch((secondApiError) => {
            console.error(
              "ActivateSchedule API execution failed:",
              secondApiError
            );
          });

        const updatedData = data.filter((item) => item.cartId !== cartId);
        setData(updatedData);
        calculateTotalPrice();
      })
      .catch((error) => {
        console.error("Deletion failed:", error);
      });
  };

  const handleOpen = () => {
    const cartIds = data
      .filter((_, index) => checkedItems[index])
      .map((value) => value.cartId);

    if (cartIds.length === 0) {
      handleAlert();
    } else {
      setSelectedCartIds(cartIds);
      setOpen(true);
    }
  };

  const handleAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setPaymentError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const areAllItemsChecked = () => {
    return data.length > 0 && data.every((_, index) => checkedItems[index]);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    data.forEach((value, index) => {
      if (!value.isPaid && checkedItems[index]) {
        total += value.coursePrice;
      }
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [checkedItems, data]);

  const formatPrice = (price) => {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("id-ID");
  };

  const handleListItemClick = (method) => {
    setSelectedPaymentMethod(method.paymentName);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: "120px",
      }}
    >
      <Box
        sx={{
          paddingX: { xs: "0", sm: "27px" },
        }}
      >
        <List
          sx={{
            width: "100%",
          }}
        >
          <ListItem
            dense
            sx={{
              borderBottom: "1px solid #E0E0E0",
              paddingY: { xs: "10px", sm: "24px" },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "10px", sm: "25px" },
              }}
            >
              <Checkbox
                edge="start"
                color="default"
                checked={areAllItemsChecked() && data.length > 0}
                onChange={(e) => {
                  setSelectAllChecked(e.target.checked);
                  const updatedCheckedItems = {};
                  data.forEach((_, index) => {
                    updatedCheckedItems[index] = e.target.checked;
                  });
                  setCheckedItems(updatedCheckedItems);
                }}
              />

              <Typography
                sx={{
                  color: "#333333",
                  fontWeight: "400",
                  fontSize: "20px",
                }}
              >
                Pilih Semua
              </Typography>
            </Box>
          </ListItem>

          {data.map((value, index) => {
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDelete(value.cartId)}
                  >
                    <DeleteForeverIcon
                      fontSize="large"
                      sx={{ color: "#EB5757" }}
                    />
                  </IconButton>
                }
                sx={{
                  borderBottom: "1px solid #E0E0E0",
                  paddingY: { xs: "5px", sm: "24px" },
                  display: value.isPaid ? "none" : "block", // Menyembunyikan item jika isPaid true
                }}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon sx={{ marginLeft: "-20px" }}>
                    <Checkbox
                      edge="start"
                      color="default"
                      checked={checkedItems[index] || false}
                      onChange={(e) => {
                        const updatedCheckedItems = { ...checkedItems };
                        updatedCheckedItems[index] = e.target.checked;
                        setCheckedItems(updatedCheckedItems);
                      }}
                    />
                  </ListItemIcon>
                  <Box
                    sx={{
                      display: "flex",
                      marginLeft: { xs: "-24px", sm: "0" },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "180px", sm: "200px" },
                        height: { xs: "120px", sm: "130px" },
                      }}
                    >
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
                          value.courseImg
                        }`}
                        alt={value.categoryName}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                    <Box sx={{ marginLeft: { xs: "7px", sm: "24px" } }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#828282",
                          fontWeight: "400",
                          fontSize: { xs: "12px", sm: "14px" },
                          marginY: { xs: "3px", sm: "5px" },
                        }}
                      >
                        {value.categoryName}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#333333",
                          fontWeight: "600",
                          fontSize: { xs: "13px", sm: "24px" },
                        }}
                      >
                        {value.courseName}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#4F4F4F",
                          fontWeight: "400",
                          fontSize: { xs: "12px", sm: "16px" },

                          marginY: { xs: "4px", sm: "8px" },
                        }}
                      >
                        Schedule : {value.courseDate}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#FABC1D",
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "20px" },
                        }}
                      >
                        IDR {formatPrice(value.coursePrice)}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <AppBar sx={{ position: "fixed", top: "auto", bottom: 0 }}>
        <Box
          sx={{
            paddingX: { xs: "10px", sm: "50px" },
            height: "75px",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: "15px", sm: "24px" },
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#333333",
                  fontSize: { xs: "14px", sm: "18px" },
                  fontWeight: "400",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Total Price
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#FABC1D",
                  fontSize: { xs: "19px", sm: "24px" },
                  fontWeight: "600",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                IDR {formatPrice(totalPrice)}
              </Typography>
            </Box>
            <Button
              color="secondary"
              variant="contained"
              size="medium"
              sx={{ boxShadow: "none", width: { xs: "120px", sm: "175px" } }}
              onClick={handleOpen}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </AppBar>

      <Dialog open={open}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <List>
          {dataPayment.map((method) => (
            <ListItem
              key={method.paymentId}
              disablePadding
              sx={{
                display: method.paymentStatus === "Inactive" ? "none" : "block",
              }}
            >
              <ListItemButton onClick={() => handleListItemClick(method)}>
                <ListItemIcon>
                  <img src={method.imagePath} alt={method.paymentImg} />
                </ListItemIcon>
                <ListItemText primary={method.paymentName} />
              </ListItemButton>
            </ListItem>
          ))}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "14px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ boxShadow: "none", width: "125px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ boxShadow: "none", width: "125px" }}
              onClick={handlePayNow}
            >
              Pay Now
            </Button>
          </Box>
        </List>
      </Dialog>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="error"
        >
          Please select at least one item before proceeding.
        </Alert>
      </Snackbar>
      <Snackbar
        open={paymentError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseError}
          severity="error"
        >
          Please select payment method.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckoutList;
