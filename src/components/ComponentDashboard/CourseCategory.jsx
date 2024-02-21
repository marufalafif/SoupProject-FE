import {
  Box,
  Typography,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";

import Dashboard from "../../pages/Dashboard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CourseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [deleteDisabledCategories, setDeleteDisabledCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState({});

  const handleClickOpen = (categoryId) => {
    setOpenDialog((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleClose = (categoryId) => {
    setOpenDialog((prev) => ({ ...prev, [categoryId]: false }));
  };

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_CATEGORY_API_URL + "/GetAllCategories"
      )
      .then((res) => setCategories(res.data));
  }, []);

  const handleDelete = (categoryId) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_CATEGORY_API_URL
        }/DeleteCategory?categoryId=${categoryId}`
      )
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        );
        setDeleteDisabledCategories((prevDisabledCategories) => [
          ...prevDisabledCategories,
          categoryId,
        ]);
        setIsSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
    setOpenDialog((prev) => ({ ...prev, [categoryId]: false }));
  };

  useEffect(() => {
    const disabledCategories = categories
      .filter((category) => category.courseCount !== 0)
      .map((category) => category.categoryId);
    setDeleteDisabledCategories(disabledCategories);
  }, [categories]);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div>
      <Dashboard />
      <Box
        sx={{
          width: { sm: "100%", md: "82%" },
          height: "100vh",
          paddingTop: "70px",
          paddingX: { xs: "5px", sm: "30px" },
          marginLeft: { sm: "auto" },
          position: { sm: "absolute" },
          right: 0,
          top: 0,
          overflow: { sm: "auto" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Course Category
        </Typography>
        <Link to="/admin-dashboard/course-category/form-add-course-category">
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginTop: "20px",
              width: "100px",
              marginBottom: { xs: "6px", sm: "10px" },
            }}
          >
            Add
          </Button>
        </Link>
        {categories.map((category) => (
          <Box
            key={category.categoryId}
            sx={{
              width: "100%",
              border: "1px solid black",
              paddingX: "7px",
              paddingY: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100px", sm: "180px" },
                height: { xs: "80px", sm: "100px" },
              }}
            >
              <img
                src={category.imagePath}
                alt={category.categoryImg}
                width={"100%"}
                height={"100%"}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
                width: "70%",
                borderRight: "3px solid black",
                paddingRight: { xs: "5px", sm: "10px" },
              }}
            >
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Name: {category.categoryName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", sm: "20px" },
                    fontWeight: "500",
                  }}
                >
                  Description:
                </Typography>
                <Box
                  sx={{
                    marginLeft: "10px",
                    border: "1px solid black",
                    padding: "2px",
                    background: "grey",
                    height: { xs: "25px", sm: "30px" },
                    width: "100%",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category.categoryDesc}
                </Box>
              </Box>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Status: {category.categoryStatus}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: "7px",
                gap: { sm: "3px", md: "5px" },
                width: "100px",
              }}
            >
              <Link
                to={`/admin-dashboard/course-category/form-update-course-category/${category.categoryId}`}
              >
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ width: "100px" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ width: "100px" }}
                disabled={deleteDisabledCategories.includes(
                  category.categoryId
                )}
                onClick={() => handleClickOpen(category.categoryId)}
              >
                Delete
              </Button>
            </Box>
            <Box
              sx={{
                marginLeft: { xs: "5px", sm: "10px" },
                display: { xs: "flex", sm: "none" },
                alignItems: "center",
                flexDirection: "column",
                paddingY: "7px",
                width: "50px",
              }}
            >
              <Link
                to={`/admin-dashboard/course-category/form-update-course-category/${category.categoryId}`}
              >
                <Button
                  color="success"
                  sx={{ textDecoration: "underline", color: "green" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                color="error"
                sx={{ textDecoration: "underline", color: "red" }}
                disabled={deleteDisabledCategories.includes(
                  category.categoryId
                )}
                onClick={() => handleClickOpen(category.categoryId)}
              >
                Delete
              </Button>
            </Box>
            {/* Delete dialog */}
            <Dialog
              open={openDialog[category.categoryId] || false}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => handleClose(category.categoryId)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle sx={{ textAlign: "center" }}>
                {"Delete Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  sx={{ textAlign: "center" }}
                >
                  Are you sure you want to delete this category?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(category.categoryId)}>
                  Cancel
                </Button>
                <Button onClick={() => handleDelete(category.categoryId)}>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000} // Durasi tampilan Snackbar (ms)
        onClose={handleCloseSnackbar}
        message="Category deleted successfully!"
      />
    </div>
  );
};

export default CourseCategory;
