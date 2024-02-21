import { Box, Typography } from "@mui/material";

const BoxPro = (props) => {
  return (
    <Box
      sx={{
        width: { xs: "324px", sm: "250px", md: "324px" },
        height: { xs: "207px", sm: "190px", md: "207px" },
        textAlign: "center",
        padding: "10px",
        border: "1px solid #BDBDBD",
        borderRadius: "20px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#FABC1D",
          fontFamily: "Montserrat, sans-serif",
          fontSize: { xs: "48px", sm: "40px", md: "48px" },
          fontWeight: "600",
          marginBottom: "31px",
        }}
      >
        {props.num}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#5B4947",
          fontFamily: "Montserrat, sans-serif",
          fontSize: { xs: "16px", sm: "14px", md: "16px" },
          fontWeight: "500px",
        }}
      >
        {props.text}
      </Typography>
    </Box>
  );
};

export default BoxPro;
