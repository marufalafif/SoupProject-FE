import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";

import useResetPassword from "../../hooks/useResetPassword";

const FormResetPassword = () => {
  const { email, loading, error, success, handleChange, handleResetPassword } =
    useResetPassword();

  return (
    <Box sx={{ width: "616px" }}>
      <Typography
        color="primary"
        sx={{
          fontSize: { xs: "19px", sm: "24px" },
          fontWeight: "500",
          marginBottom: { xs: "8px", sm: "16px", md: "16px" },
        }}
      >
        Reset Password
      </Typography>
      <Typography
        color="primary.light"
        sx={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Send OTP code to your email address
      </Typography>
      <Box
        component="form"
        sx={{
          width: "100%",
          marginTop: { xs: "30px", sm: "40px", md: "60px" },
          marginBottom: { xs: "25px", sm: "40px" },
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: "16px",
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{
              marginBottom: "16px",
            }}
          >
            Please check your email
          </Alert>
        )}

        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: { xs: "10px", sm: "24px" },
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              boxShadow: "none",
              borderRadius: "8px",
              width: { xs: "100px", sm: "140px" },
            }}
          >
            Cancel
          </Button>
        </Link>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetPassword}
          disabled={loading}
          sx={{
            boxShadow: "none",
            borderRadius: "8px",
            width: { xs: "100px", sm: "140px" },
          }}
        >
          {loading ? "Confirm..." : "Confirm"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormResetPassword;
