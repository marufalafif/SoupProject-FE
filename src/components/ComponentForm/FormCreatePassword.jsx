import { Box, Typography, TextField, Button, Alert } from "@mui/material";

import { Link } from "react-router-dom";

import useCreatePassword from "../../hooks/useCreatePassword";

const FormCreatePassword = () => {
  const { passwordData, loading, error, handleChange, handleCreatePassword } =
    useCreatePassword();
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
        Create Password
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "16px" }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        sx={{ width: "100%", marginTop: "20px", marginBottom: "40px" }}
      >
        <TextField
          fullWidth
          id="password"
          label="New Password"
          name="password"
          type="password"
          value={passwordData.password}
          onChange={handleChange}
          sx={{ marginBottom: { xs: "16px", md: "24px" } }}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
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
        <Link to="/">
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
          onClick={handleCreatePassword}
          disabled={loading}
          sx={{
            boxShadow: "none",
            borderRadius: "8px",
            width: { xs: "100px", sm: "140px" },
          }}
        >
          {loading ? "Creating..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreatePassword;
