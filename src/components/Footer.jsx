import { Box, Typography, IconButton, Grid } from "@mui/material";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { Link } from "react-router-dom";

const Footer = () => {
  const buttonStyle = {
    backgroundColor: "#FABC1D",
  };

  return (
    <Box
      sx={{
        paddingX: { xs: "10px", sm: "20px", md: "95px" },
        paddingY: "24px",
        backgroundColor: "#5B4947",
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginBottom: { xs: "14px", sm: "0" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#FABC1D",
                fontWeight: "500",
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              About
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "12px", md: "14px" },
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginBottom: { xs: "14px", sm: "0" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#FABC1D",
                fontWeight: "500",
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              Product
            </Typography>

            <Box
              sx={{
                display: "flex",
                paddingLeft: "15px",
                marginBottom: { xs: "14px", sm: "0" },
              }}
            >
              <Box
                sx={{
                  marginTop: { xs: "5px", sm: "8px" },
                  marginRight: { xs: "40px", sm: "25px", md: "80px" },
                }}
              >
                <ul style={{ color: "#fff" }}>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/1"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Asian
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/8"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Western
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/3"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cookies
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/5"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Eastern
                    </Link>
                  </li>
                </ul>
              </Box>
              <Box sx={{ marginTop: "8px" }}>
                <ul style={{ color: "#fff" }}>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/6"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Hot Drink
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/2"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cold Drink
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/7"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Junk Food
                    </Link>
                  </li>
                  <li
                    style={{
                      marginBottom: "8px",
                      fontWeight: "400",
                      fontSize: { xs: "12px", md: "14px" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      to="/ListMenuClass/4"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Desert
                    </Link>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#FABC1D",
                fontWeight: "500",
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              Address
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "12px", md: "14px" },
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                marginTop: { xs: "5px", sm: "8px" },
                marginBottom: { xs: "14px", sm: "0" },
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#FABC1D",
                fontWeight: "500",
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: "16px", sm: "8px", md: "16px" },
                marginTop: { xs: "10px", sm: "8px" },
              }}
            >
              <IconButton
                sx={{
                  width: { xs: "50px", sm: "40px", md: "50px" },
                  height: { xs: "50px", sm: "40px", md: "50px" },
                }}
                style={buttonStyle}
              >
                <LocalPhoneIcon />
              </IconButton>
              <IconButton
                sx={{
                  width: { xs: "50px", sm: "40px", md: "50px" },
                  height: { xs: "50px", sm: "40px", md: "50px" },
                }}
                style={buttonStyle}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  width: { xs: "50px", sm: "40px", md: "50px" },
                  height: { xs: "50px", sm: "40px", md: "50px" },
                }}
                style={buttonStyle}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                sx={{
                  width: { xs: "50px", sm: "40px", md: "50px" },
                  height: { xs: "50px", sm: "40px", md: "50px" },
                }}
                style={buttonStyle}
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                sx={{
                  width: { xs: "50px", sm: "40px", md: "50px" },
                  height: { xs: "50px", sm: "40px", md: "50px" },
                }}
                style={buttonStyle}
              >
                <MailOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
