import { Container, AppBar, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Logo from "../assets/logo.png";
import PurchaseConfirmationImg from "../assets/confirmation.png";

const PurchaseConfirmation = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ boxShadow: "none", backgroundColor: "white" }}
        >
          <Box
            sx={{
              paddingX: { xs: "20px", md: "50px" },
              height: { xs: "60px", md: "75px" },
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
              <Link to="/">
                <Box>
                  <img src={Logo} alt="logo" width="50px" />
                </Box>
              </Link>
            </Box>
          </Box>
        </AppBar>

        <Box sx={{ textAlign: "center" }}>
          <img
            src={PurchaseConfirmationImg}
            alt="purchase confirmation"
            width="250px"
          />

          <Typography
            color="primary"
            sx={{
              fontSize: { xs: "19px", sm: "24px" },
              fontWeight: "500",
              marginBottom: { xs: "1px", sm: "3px" },
            }}
          >
            Purchase Successfully
          </Typography>
          <Typography
            color="primary.light"
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "400",
              marginBottom: "30px",
            }}
          >
            Horay!! Let’s cook and become a professional cheff
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: "4px", sm: "8px" },
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                sx={{ fontWeight: "600" }}
              >
                <HomeIcon fontSize="small" sx={{ marginRight: "5px" }} />
                Back to Home
              </Button>
            </Link>
            <Link to="/invoice">
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                sx={{ fontWeight: "600" }}
              >
                <ArrowForwardIcon
                  fontSize="small"
                  sx={{ marginRight: "5px" }}
                />
                Open Invoice
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PurchaseConfirmation;
