import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B4947",
      light: "#4F4F4F",
    },
    brown: {
      main: "#4F4F4F",
    },
    secondary: {
      main: "#FABC1D",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#5B4947",
          fontSize: "16px",
          textTransform: "none",
          fontFamily: "Montserrat",
          fontWeight: "500",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
