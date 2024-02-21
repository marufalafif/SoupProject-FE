import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
} from "@mui/material";

import Dashboard from "../../pages/Dashboard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActivated, setIsActivated] = useState("");

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_USER_API_URL
        }/GetUserById/?userId=${userId}`
      )
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setRole(res.data.role);
        setIsActivated(res.data.isActivated);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [userId]);

  const handleUpdate = () => {
    const updatedUser = { username, email, role, isActivated };
    axios
      .put(
        `${
          import.meta.env.VITE_REACT_APP_USER_API_URL
        }/UpdateUser/?userId=${userId}`,
        updatedUser
      )
      .then(() => {
        setIsSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };

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
          Edit User
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={isActivated}
              onChange={(e) => setIsActivated(e.target.value)}
              label="Status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="User updated successfully!"
        />
      </Box>
    </div>
  );
};

export default EditUser;
