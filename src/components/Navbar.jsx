import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Menu from "./utils/Menu";
import ButtonCombo from "./utils/ButtonCombo";

import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: "none", backgroundColor: "white" }}
    >
      <Box
        sx={{
          paddingX: { xs: "20px", md: "50px" },
          height: { xs: "60px", md: "75px" },
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Box>
              <img src={Logo} alt="logo" width="50px" />
            </Box>
          </Link>
          {isLoggedIn ? (
            <Menu />
          ) : (
            <ButtonCombo
              first="Login"
              last="Register"
              firstLink="/login"
              lastLink="/register"
            />
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
