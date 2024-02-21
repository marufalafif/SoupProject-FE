import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const FormRegister = () => {
  const { formData, error, isLoading, handleInputChange, handleSignUp } =
    useRegister();

  return (
    <Box
      sx={{
        width: "616px",
      }}
    >
      <Typography
        color="primary"
        sx={{
          fontSize: { xs: "19px", sm: "24px" },
          fontWeight: "500",
          marginBottom: { xs: "8px", sm: "16px", md: "16px" },
          lineHeight: "26px",
        }}
      >
        Are you ready become a professional chef?
      </Typography>
      <Typography
        color="primary.light"
        sx={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Please register first
      </Typography>

      <Box
        component="form"
        sx={{
          width: "100%",
          marginY: { xs: "20px", sm: "40px" },
          position: "relative",
        }}
        onSubmit={handleSignUp}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              position: { xs: "relative", sm: "absolute" },
              top: { xs: "-15px", sm: "-60px" },
              right: "0px",
            }}
          >
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          id="username"
          label="Name"
          name="username"
          type="text"
          autoComplete="name"
          sx={{ marginBottom: { xs: "16px", sm: "24px" } }}
          value={formData.username || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          sx={{ marginBottom: { xs: "16px", sm: "24px" } }}
          value={formData.email || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          sx={{ marginBottom: { xs: "16px", sm: "24px" } }}
          value={formData.password || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword || ""}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "60px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "8px", width: "140px" }}
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#000",
          textAlign: "center",
        }}
      >
        Have an account?
        <Link to="/login" style={{ textDecoration: "none", color: "#2F80ED" }}>
          {" "}
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default FormRegister;
