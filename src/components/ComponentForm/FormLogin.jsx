import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const FormLogin = () => {
  const { formData, loading, error, handleChange, handleLogin } = useLogin();

  return (
    <Box sx={{ width: "616px" }}>
      <Typography
        color="primary"
        sx={{
          fontSize: { xs: "19px", sm: "24px" },
          fontWeight: "500",
          marginBottom: { xs: "8px", sm: "16px", md: "16px" },
          lineHeight: "26px",
        }}
      >
        Welcome Back!! Cheff
      </Typography>
      <Typography
        color="primary.light"
        sx={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Please login first
      </Typography>
      <Box component="form" sx={{ width: "100%", marginY: "40px" }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          sx={{ marginBottom: "24px" }}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Box>
      <Typography
        color="primary.light"
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          marginBottom: "16px",
        }}
      >
        Forgot Password?
        <Link
          to="/resetPassword"
          style={{ textDecoration: "none", color: "#2F80ED" }}
        >
          {" Click Here"}
        </Link>
      </Typography>
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
          size="large"
          sx={{ boxShadow: "none", width: "140px", borderRadius: "8px" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </Button>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#000",
          textAlign: "center",
        }}
      >
        Don't have an account?
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#2F80ED" }}
        >
          {" Sign Up here"}
        </Link>
      </Typography>
    </Box>
  );
};

export default FormLogin;
