import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";

import useUpdateCourse from "../../hooks/useUpdateCourse";

const FormUpdateCourse = () => {
  const [selectCategory, setSelectCategory] = useState([]);
  const { courseId } = useParams();

  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  } = useUpdateCourse();

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_CATEGORY_API_URL + "/GetAllCategories"
      )
      .then((res) => setSelectCategory(res.data));
  }, []);

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
          Update Course
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, courseId)}>
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
            fullWidth
          />
          <FormControl
            fullWidth
            sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
            >
              {selectCategory.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Course Description"
            name="courseDesc"
            value={formData.courseDesc}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
          />
          <TextField
            label="Course Price"
            name="coursePrice"
            value={formData.coursePrice}
            onChange={handleInputChange}
            type="number"
            fullWidth
            sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
          />

          <FormControl
            fullWidth
            sx={{ marginBottom: { xs: "8px", sm: "10px" } }}
          >
            <InputLabel id="course-status-label">Course Status *</InputLabel>
            <Select
              labelId="course-status-label"
              id="course-status"
              label="Course Status"
              name="courseStatus"
              value={formData.courseStatus}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <FormHelperText sx={{ marginBottom: { xs: "8px", sm: "16px" } }}>
              Select course status
            </FormHelperText>
          </FormControl>
          <input
            type="file"
            name="courseImage"
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
            <Link to="/admin-dashboard/course">
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
        {error && <Typography color="error">{error}</Typography>}
        {success && (
          <Typography color="success">Course added successfully!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormUpdateCourse;
