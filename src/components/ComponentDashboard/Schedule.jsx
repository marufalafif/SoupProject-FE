import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";
import useAddSchedule from "../../hooks/useAddSchedule";

const Schedule = () => {
  const { courseId } = useParams();
  const [courseDate, setcourseDate] = useState([]);

  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleSubmit,
  } = useAddSchedule();

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL +
          "/GetScheduleByCourse?courseId=" +
          courseId
      )
      .then((res) => {
        setcourseDate(res.data);
      });
  }, [courseId]);

  const handleDeleteSchedule = (scheduleId) => {
    // You can use axios to send a delete request to the API
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL
        }/DeleteSchedule?id=${scheduleId}`
      )
      .then((res) => {
        console.log("Schedule deleted successfully", res);
        axios
          .get(
            `${
              import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL
            }/GetScheduleByCourse?courseId=${courseId}`
          )
          .then((res) => {
            setcourseDate(res.data);
          });
      })
      .catch((error) => {
        console.error("Error deleting schedule", error);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "800px" },
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
            textAlign: "center",
          }}
        >
          Schedule
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Schedule Date"
              name="startTime"
              onChange={handleInputChange}
              value={formData.startTime}
              required
              sx={{ marginBottom: { xs: "8px", sm: "16px" }, width: "600px" }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "8px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="small"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add"}
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="small"
                disabled={courseDate.length === 0}
              >
                <Link
                  to="/admin-dashboard/course"
                  style={{ textDecoration: "none" }}
                >
                  Finished
                </Link>
              </Button>
            </Box>
          </Box>
        </form>
        {courseDate.map((option) => (
          <Box
            key={option.scheduleId}
            sx={{
              width: "100%",
              paddingX: { xs: "5px", sm: "10px", paddingY: "3px" },
              border: "1px solid #BDBDBD",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: { xs: "7px", sm: "10px" },
            }}
          >
            <Typography sx={{ fontSize: "16px" }}>
              {option.startTime}
            </Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              sx={{ color: "red" }}
              onClick={() => handleDeleteSchedule(option.scheduleId)}
            >
              Delete
            </Button>
          </Box>
        ))}
        {/* Snackbar untuk menampilkan pesan error atau pesan keberhasilan */}
        <Snackbar open={error || success} autoHideDuration={3000}>
          <Alert
            severity={success ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {success ? "Schedule date added successfully" : error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Schedule;
