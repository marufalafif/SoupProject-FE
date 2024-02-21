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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";

import Dashboard from "../../pages/Dashboard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = () => {
  const [users, setUsers] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_USER_API_URL + "/GetAllUser")
      .then((res) => setUsers(res.data));
  }, []);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const renderStatus = (isActivated) => {
    return isActivated ? "Active" : "Inactive";
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
          Users
        </Typography>
        <Link to="/admin-dashboard/user/add">
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
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{renderStatus(user.isActivated)}</TableCell>
                  <TableCell>
                    <Link to={`/admin-dashboard/user/edit/${user.userId}`}>
                      <Button variant="outlined" color="success" size="small">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="User deleted successfully!"
      />
    </div>
  );
};

export default User;
