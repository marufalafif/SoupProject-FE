import React, { useState } from "react";
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

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleAddUser = () => {
    const newUser = { username, email, password, role, isActivated };
    axios
      .post(
        import.meta.env.VITE_REACT_APP_USER_API_URL + "/CreateUser",
        newUser
      )
      .then(() => {
        setIsSnackbarOpen(true);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setIsActivated(false);
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
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
          Add User
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
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <Button variant="contained" color="secondary" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="User added successfully!"
        />
      </Box>
    </div>
  );
};

export default AddUser;
