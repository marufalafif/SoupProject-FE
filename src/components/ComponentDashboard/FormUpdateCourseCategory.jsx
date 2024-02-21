import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import useUpdateCourseCategory from "../../hooks/useUpdateCourseCategory";

const FormUpdateCourseCategory = () => {
  const { categoryId } = useParams();

  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  } = useUpdateCourseCategory();

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
          Update Category Course
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, categoryId)}>
          <TextField
            label="Category Name"
            name="categoryName"
            onChange={handleInputChange}
            value={formData.categoryName}
            fullWidth
            required
            sx={{ marginBottom: { xs: "8px", sm: "16px" } }}
          />
          <TextField
            label="Category Description"
            name="categoryDesc"
            onChange={handleInputChange}
            value={formData.categoryDesc}
            fullWidth
            multiline
            rows={4}
            required
            sx={{ marginBottom: { xs: "8px", sm: "16px" } }}
          />

          <FormControl fullWidth>
            <InputLabel id="category-status-label">
              Category Status *
            </InputLabel>
            <Select
              labelId="category-status-label"
              id="category-status"
              label="Category Status"
              name="categoryStatus"
              value={formData.categoryStatus}
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
            name="imageFile"
            onChange={handleFileChange}
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
            <Link to="/admin-dashboard/course-category">
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
            {success ? "Course category updated successfully" : error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FormUpdateCourseCategory;
