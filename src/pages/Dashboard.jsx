import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  Button,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MenuIcon from "@mui/icons-material/Menu";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    // hapus data user dari local storage
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ width: "100%", display: { xs: "none", md: "block" } }}>
        <AppBar
          color="secondary"
          position="fixed"
          sx={{
            boxShadow: "none",
            height: "70px",
            paddingX: "30px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="primary"
                sx={{ fontSize: "27px", fontWeight: "bold" }}
              >
                Dashboard
              </Typography>
              <AdminPanelSettingsIcon fontSize="medium" color="primary" />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="primary"
                sx={{ fontSize: "24px", fontWeight: "700" }}
              >
                welcome {userData.username}
              </Typography>
              <InsertEmoticonIcon
                fontSize="large"
                color="primary"
                sx={{ ml: 1 }}
              />
            </div>
          </Box>
        </AppBar>

        {/* Sidebar */}
        <Box
          sx={{
            paddingTop: "70px",
            width: "18%",
            backgroundColor: "#F5F5F5",
            height: "100vh",
            borderRight: "1px solid #BDBDBD",
            position: "relative",
          }}
        >
          <Link to="/admin-dashboard/user" style={{ textDecoration: "none" }}>
            <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
              <ListItemText primary="user" />
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link
            to="/admin-dashboard/course-category"
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
              <ListItemText primary="Course Category" />
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Link to="/admin-dashboard/course" style={{ textDecoration: "none" }}>
            <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
              <ListItemText primary="Course" />
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Link
            to="/admin-dashboard/payment"
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
              <ListItemText primary="PaymentMethod" />
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Link
            to="/admin-dashboard/all-invoice"
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
              <ListItemText primary="All Invoice" />
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <ListItem
            sx={{
              borderTop: "1px solid #BDBDBD",
              position: "absolute",
              bottom: "0",
            }}
          >
            <ListItemButton onClick={handleClickOpen}>
              <ListItemText primary="Logout" />
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>

      {/* Mobile Phone */}
      <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
        <AppBar
          color="secondary"
          position="fixed"
          sx={{
            boxShadow: "none",
            height: "50px",
            paddingX: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="primary"
                sx={{ fontSize: "18px", fontWeight: "700" }}
              >
                welcome {userData.username}
              </Typography>
              <InsertEmoticonIcon fontSize="medium" color="primary" />
            </div>
            <MenuIcon fontSize="large" onClick={() => setDrawerOpen(true)} />
          </Box>
        </AppBar>
        <Drawer
          open={drawerOpen}
          anchor="left"
          onClose={() => setDrawerOpen(false)}
          sx={{ marginTop: "50px", position: "relative" }}
        >
          <List>
            <ListItem
              sx={{
                borderBottom: "1px solid #BDBDBD",
                backgroundColor: "#F5F5F5",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  color="primary"
                  sx={{ fontSize: "27px", fontWeight: "bold" }}
                >
                  Dashboard
                </Typography>
                <AdminPanelSettingsIcon fontSize="medium" color="primary" />
              </div>
            </ListItem>
            <Link to="/admin-dashboard/user" style={{ textDecoration: "none" }}>
              <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
                <ListItemText primary="user" />
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Link
              to="/admin-dashboard/course-category"
              style={{ textDecoration: "none" }}
            >
              <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
                <ListItemText primary="Course Category" />
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Link
              to="/admin-dashboard/course"
              style={{ textDecoration: "none" }}
            >
              <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
                <ListItemText primary="Course" />
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Link
              to="/admin-dashboard/payment"
              style={{ textDecoration: "none" }}
            >
              <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
                <ListItemText primary="PaymentMethod" />
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Link
              to="/admin-dashboard/all-invoice"
              style={{ textDecoration: "none" }}
            >
              <ListItem sx={{ borderBottom: "1px solid #BDBDBD" }}>
                <ListItemText primary="All Invoice" />
                <ListItemIcon>
                  <FactCheckIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
          </List>
          <ListItem
            sx={{
              borderTop: "1px solid #BDBDBD",
              position: "absolute",
              bottom: "0",
            }}
          >
            <ListItemButton onClick={handleClickOpen}>
              <ListItemText primary="Logout" />
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
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
      </Box>
    </>
  );
};

export default Dashboard;
