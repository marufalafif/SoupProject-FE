import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  Dialog,
  DialogTitle,
  ListItemText,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.userId : null;

const DetailClass = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { courseId } = useParams();
  const [courseDate, setcourseDate] = useState([]);
  const [course, setCourse] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [dataPayment, setDataPayment] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentError, setPaymentError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(import.meta.env.VITE_REACT_APP_PAYMENT_API_URL + "/GetAllPayments")
      .then((res) => setDataPayment(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_COURSE_API_URL +
          "/GetCourse?courseId=" +
          courseId
      )
      .then((res) => setData(res.data));
  }, [courseId]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_COURSE_API_URL + "/GetAllCourses")
      .then((res) => {
        // Filter out the current course using courseId
        const filteredCourses = res.data.filter(
          (course) => course.courseId !== courseId
        );
        setCourse(filteredCourses);
      });
  }, [courseId]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL +
          "/GetScheduleByCourse?courseId=" +
          courseId
      )
      .then((res) => {
        setcourseDate(res.data);
      });
  }, [courseId]);

  const formatPrice = (price) => {
    const NumberPrice = Number(price);
    return NumberPrice.toLocaleString("id-ID");
  };

  function deactivateSchedule() {
    const apiUrl =
      import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL +
      "/DeactivateSchedule?startTime=" +
      selectedSchedule;

    return axios.put(apiUrl);
  }

  function handleAddToCart(event) {
    event.preventDefault();

    // Pengecekan selectedSchedule
    if (!selectedSchedule) {
      console.log("Selected Schedule is required");
      return;
    }

    deactivateSchedule()
      .then(() => {
        // Setelah berhasil mengeksekusi API DeactivateSchedule, lanjutkan dengan handleAddToCart
        axios
          .post(
            import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL + "/AddToCart",
            {
              userId: userId,
              courseId: courseId,
              courseDate: selectedSchedule,
            }
          )
          .then(() => window.location.reload())
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log("DeactivateSchedule failed:", error));
  }

  const handlePayNow = () => {
    if (selectedPaymentMethod && selectedSchedule) {
      setPaymentError(false);

      deactivateSchedule()
        .then(() => {
          // Setelah berhasil mengeksekusi API DeactivateSchedule, lanjutkan dengan handlePayNow
          const checkoutData = {
            userId: userId,
            paymentMethod: selectedPaymentMethod,
            courseId: courseId,
            courseDate: selectedSchedule,
          };

          axios
            .post(
              import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL +
                "/CheckoutByCourse",
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
        })
        .catch((error) => console.log("DeactivateSchedule failed:", error));
    } else {
      setPaymentError(true);
    }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    if (!selectedSchedule) {
      // // Tampilkan peringatan atau ambil tindakan sesuai kebutuhan
      return;
    }
    setOpen(true);
    // }
  };

  const handleCloseError = () => {
    setPaymentError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (method) => {
    setSelectedPaymentMethod(method.paymentName);
  };

  return (
    <Box sx={{ marginTop: { xs: "60px", md: "75px" } }}>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: { xs: "30px", md: "40px" },
          paddingBottom: { xs: "67px", md: "80px" },
          borderBottom: "1px solid #E0E0E0",
          marginBottom: { xs: "70px", md: "80px" },
        }}
      >
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            paddingX: { xs: "0", sm: "24px", md: "27px" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "400px" },
              height: { xs: "230px", sm: "267px" },
            }}
          >
            <img
              src={data?.imagePath}
              alt="soto"
              width={"100%"}
              height={"100%"}
            />
          </Box>
          <Box
            sx={{
              marginLeft: { xs: "0", sm: "40px" },
              marginTop: { xs: "20px", sm: "0" },
            }}
          >
            <Typography
              sx={{
                color: "#828282",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "400",
              }}
            >
              {data?.categoryName}
            </Typography>
            <Typography
              sx={{
                color: "#333",
                fontSize: { xs: "19px", sm: "24px" },
                fontWeight: "600",
              }}
            >
              {data?.courseName}
            </Typography>
            <Typography
              sx={{
                color: "#5B4947",
                fontSize: { xs: "19px", sm: "24px" },
                fontWeight: "600",
              }}
            >
              IDR {formatPrice(data?.coursePrice)}
            </Typography>
            <FormControl fullWidth>
              <TextField
                select
                label="Select Schedule"
                size="small"
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.target.value)}
                InputProps={{
                  style: {
                    color: "#41454D",
                    fontSize: "15px",
                    fontWeight: "400",
                  },
                }}
                sx={{
                  marginTop: { xs: "23px", sm: "30px" },
                  width: "300px",
                  marginBottom: { xs: "30px", sm: "60px" },
                }}
              >
                {courseDate.map((option) => (
                  <MenuItem
                    key={option.scheduleId}
                    value={option.startTime}
                    sx={{
                      display: option.isActive === 0 ? "none" : "block",
                    }}
                  >
                    {option.startTime}
                  </MenuItem>
                ))}
              </TextField>
              {!selectedSchedule && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    fontSize: "12px",
                    marginBottom: { xs: "2px", sm: "10px" },
                  }}
                >
                  Schedule is required
                </Typography>
              )}
            </FormControl>
            <Box sx={{ display: { xs: "block", sm: "flex" }, gap: "16px" }}>
              <Button
                onClick={handleAddToCart}
                variant="outlined"
                size="medium"
                sx={{
                  width: { xs: "100%", sm: "233px" },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
                color="primary"
              >
                Add to Card
              </Button>

              <Button
                variant="contained"
                size="medium"
                sx={{ width: { xs: "100%", sm: "233px" } }}
                color="secondary"
                onClick={handleOpen}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingX: { xs: "0", sm: "27px" },
            marginTop: { xs: "30px", sm: "40px" },
          }}
        >
          <Typography
            sx={{
              color: "#333",
              fontSize: { xs: "19px", sm: "24px" },
              fontWeight: "600",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: { xs: "12px", sm: "16px" },
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              color: "#333",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "400",
              marginBottom: { xs: "16px", sm: "24px" },
            }}
          >
            {data?.courseDesc}
          </Typography>
        </Box>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          marginBottom: { xs: "80px", md: "120px" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#5B4947",
            textAlign: "center",
            fontSize: { xs: "26px", sm: "29px", md: "32px" },
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Another menu in this class
        </Typography>
        <Box
          sx={{
            marginTop: { xs: "60px", md: "80px" },
            paddingX: { xs: 0, sm: "19px", md: "27px" },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {course?.map((product) => (
              <Grid
                key={product.courseId}
                item
                xs={6}
                sm={4}
                md={4}
                sx={{
                  display:
                    product.courseStatus === "Inactive" ? "none" : "block",
                }}
              >
                <Link
                  key={product.courseId}
                  to={`/DetailClass/${product.courseId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    key={product.courseId}
                    sx={{
                      marginBottom: { xs: "20px", md: "40px" },
                      height: { xs: "290px", md: "400px" },
                      position: "relative",
                      "&:hover": {
                        transform: "scale(1.03)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.courseImg}
                      image={product.imagePath}
                      sx={{ height: { xs: "160px", md: "233.333px" } }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#828282",
                          fontSize: { xs: "12px", sm: "14px", md: "16px" },
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        {product.categoryName}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#5B4947",
                          fontSize: { xs: "14px", sm: "18px", md: "20px" },
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        {product.courseName}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#FABC1D",
                          fontSize: { xs: "16px", md: "20px" },
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                          position: "absolute",
                          bottom: { xs: "14px", sm: "24px", md: "30px" },
                        }}
                      >
                        IDR {formatPrice(product.coursePrice)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Dialog open={open}>
          <DialogTitle>Select Payment Method</DialogTitle>
          <List>
            {dataPayment.map((method) => (
              <ListItem
                key={method.paymentId}
                disablePadding
                sx={{
                  display:
                    method.paymentStatus === "Inactive" ? "none" : "block",
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
    </Box>
  );
};

export default DetailClass;
