import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { Link } from "react-router-dom";
import useAddPayment from "../../hooks/useAddPayment";

const FormAddPayment = () => {
  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  } = useAddPayment();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "616px" },
          paddingX: { xs: "5px", sm: "0" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "19px", sm: "24px" },
            fontWeight: "500",
            color: "#5B4947",
            marginBottom: "16px",
          }}
        >
          Add Payment Method
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Payment Name"
            name="paymentName"
            onChange={handleInputChange}
            value={formData.paymentName}
            fullWidth
            required
            sx={{ marginBottom: { xs: "8px", sm: "16px" } }}
          />
          <FormControl fullWidth>
            <InputLabel id="payment-status-label">Payment Status *</InputLabel>
            <Select
              labelId="payment-status-label"
              id="payment-status"
              label="Payment Status"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <FormHelperText sx={{ marginBottom: { xs: "8px", sm: "16px" } }}>
              Select category status
            </FormHelperText>
          </FormControl>
          <input
            type="file"
            onChange={handleFileChange}
            name="imageFile"
            required
          />
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/admin-dashboard/payment">
              <Button variant="outlined" color="primary">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
        {/* Snackbar untuk menampilkan pesan error atau pesan keberhasilan */}
        <Snackbar open={error || success} autoHideDuration={3000}>
          <Alert
            severity={success ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {success ? "Payment Method added successfully" : error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FormAddPayment;
