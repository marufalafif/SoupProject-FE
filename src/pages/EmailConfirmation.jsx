import { Container, AppBar, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
import ConfirmationEmail from "../assets/confirmation.png";

const EmailConfirmation = () => {
  return (
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
        <img src={ConfirmationEmail} alt="email confirmation" width="250px" />

        <Typography
          color="primary"
          sx={{
            fontSize: { xs: "19px", sm: "24px" },
            fontWeight: "500",
            marginBottom: { xs: "1px", sm: "3px" },
          }}
        >
          Email Confirmation Success
        </Typography>
        <Typography
          color="primary.light"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: "400",
            marginBottom: "30px",
          }}
        >
          Congratulations! please check your email for confirmation.
        </Typography>

        <Link to="/login">
          <Button variant="contained" color="secondary" size="large">
            Login Here
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default EmailConfirmation;
