import { forwardRef, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Menu = () => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const userDataString = localStorage.getItem("user");

  // Menguraikan string JSON menjadi objek JavaScript
  const userData = JSON.parse(userDataString);

  // Mendapatkan nilai userId
  const userName = userData.username;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserOpen = () => {
    setOpenUser(true);
  };

  const handleUserClose = () => {
    setOpenUser(false);
  };

  const handleLogout = () => {
    // hapus data user dari local storage
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Box>
      {/* Desktop Menu */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          width: "441px",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Link to={`/checkout`} style={{ textDecoration: "none" }}>
          <Button variant="text" sx={{ color: "#5B4947", padding: "10px" }}>
            <ShoppingCartIcon fontSize="medium" />
          </Button>
        </Link>

        <Link to={`/myClass`} style={{ textDecoration: "none" }}>
          <Button variant="text">My Class</Button>
        </Link>

        <Link to={`/invoice`} style={{ textDecoration: "none" }}>
          <Button variant="text">Invoice</Button>
        </Link>

        <Typography variant="h6" color={"black"}>
          |
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="text"
            onClick={handleUserOpen}
            sx={{ color: "#FABC1D", padding: "5px" }}
          >
            <PersonIcon fontSize="large" />
          </Button>

          <Button
            variant="text"
            onClick={handleClickOpen}
            sx={{ color: "#5B4947", padding: "5px" }}
          >
            <LogoutIcon fontSize="medium" />
          </Button>
        </Box>
      </Box>

      {/* Hamburger Menu Button */}
      <IconButton
        onClick={() => setDrawerOpen(true)}
        sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" }, width: "80vw" }}
      >
        <Box
          sx={{
            width: "80vw",
            maxWidth: "300px",
            paddingTop: "16px",
            paddingLeft: "16px",
          }}
        >
          <Link to={`/checkout`} style={{ textDecoration: "none" }}>
            <Button variant="text" sx={{ color: "#5B4947", padding: "10px" }}>
              <ShoppingCartIcon fontSize="medium" />
            </Button>
          </Link>

          <Link to={`/myClass`} style={{ textDecoration: "none" }}>
            <Button variant="text">My Class</Button>
          </Link>

          <Link to={`/invoice`} style={{ textDecoration: "none" }}>
            <Button variant="text">Invoice</Button>
          </Link>

          <Button
            variant="text"
            onClick={handleUserOpen}
            sx={{ color: "#FABC1D", padding: "5px" }}
          >
            <PersonIcon fontSize="large" />
          </Button>

          <Button
            variant="text"
            onClick={handleClickOpen}
            sx={{ color: "#5B4947", padding: "5px" }}
          >
            <LogoutIcon fontSize="medium" />
          </Button>
        </Box>
      </Drawer>

      {/* log out dialog */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>{"Log Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout}>Ok</Button>
        </DialogActions>
      </Dialog>

      {/* user */}
      <Dialog
        open={openUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>{`Hi ${
          userName || "Guest"
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to Reset Password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserClose}>Cancel</Button>
          <Link
            to={`/resetPassword`}
            style={{ textDecoration: "none", color: "#5B4947" }}
          >
            <Button onClick={handleUserClose}>Ok</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Menu;
