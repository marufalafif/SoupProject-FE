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

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [deleteDisabledCourses, setDeleteDisabledCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState({});

  const handleClickOpen = (courseId) => {
    setOpenDialog((prev) => ({ ...prev, [courseId]: true }));
  };

  const handleClose = (courseId) => {
    setOpenDialog((prev) => ({ ...prev, [courseId]: false }));
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_COURSE_API_URL + "/GetAllCourses")
      .then((res) => setCourses(res.data));
  }, []);

  const handleDelete = (courseId) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL
        }/DeleteScheduleByCourseId?courseId=${courseId}`
      )
      .then(() => {
        // Pemanggilan pertama (menghapus schedule) selesai dengan sukses
        axios
          .delete(
            `${
              import.meta.env.VITE_REACT_APP_COURSE_API_URL
            }/DeleteCourse?courseId=${courseId}`
          )
          .then(() => {
            // Pemanggilan kedua (menghapus course) selesai dengan sukses
            setCourses((prevCourse) =>
              prevCourse.filter((course) => course.courseId !== courseId)
            );
            setDeleteDisabledCourses((prevDisabledCourse) => [
              ...prevDisabledCourse,
              courseId,
            ]);
            setIsSnackbarOpen(true);
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting schedule by courseId:", error);
      });

    setOpenDialog((prev) => ({ ...prev, [courseId]: false }));
  };

  useEffect(() => {
    const disabledCourse = courses
      .filter((course) => course.cartCount !== 0)
      .map((course) => course.courseId);
    setDeleteDisabledCourses(disabledCourse);
  }, [courses]);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID");
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
          Course
        </Typography>
        <Link to="/admin-dashboard/course/form-add-course">
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
        {courses.map((course) => (
          <Box
            key={course.courseId}
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
                src={course.imagePath}
                alt={course.courseImg}
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
                Name: {course.courseName}
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
                  {course.courseDesc}
                </Box>
              </Box>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Price: IDR {formatPrice(course.coursePrice)}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: "500" }}
              >
                Status: {course.courseStatus}
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
                to={`/admin-dashboard/course/form-update-course/${course.courseId}`}
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
                disabled={deleteDisabledCourses.includes(course.courseId)}
                onClick={() => handleClickOpen(course.courseId)}
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
                to={`/admin-dashboard/course/form-update-course/${course.courseId}`}
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
                disabled={deleteDisabledCourses.includes(course.courseId)}
                onClick={() => handleClickOpen(course.courseId)}
              >
                Delete
              </Button>
            </Box>
            {/* Delete dialog */}
            <Dialog
              open={openDialog[course.courseId] || false}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => handleClose(course.courseId)}
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
                  Are you sure you want to delete this course?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(course.courseId)}>
                  Cancel
                </Button>
                <Button onClick={() => handleDelete(course.courseId)}>
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
        message="Course deleted successfully!"
      />
    </div>
  );
};

export default Course;
