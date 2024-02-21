import {
  Container,
  List,
  ListItem,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.userId : null;

const MyClass = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        import.meta.env.VITE_REACT_APP_CHECKOUT_API_URL + "/GetMyCourseById",
        {
          params: { userId: userId },
        }
      )
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, [userId]);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: { xs: "60px", sm: "90px" },
          marginBottom: "500px",
        }}
      >
        <List>
          {data?.map((item, key) => (
            <ListItem
              key={key}
              sx={{
                borderBottom: "1px solid #BDBDBD",
                paddingX: { xs: "0px", sm: "20px" },
                paddingY: { xs: "5px", sm: "20px" },
                display: item.isPaid ? "block" : "none",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: { xs: "90px", sm: "200px" },
                    height: { xs: "70px", sm: "135px" },
                  }}
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
                      item.courseImg
                    }`}
                    alt={item.courseImg}
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>
                <Box sx={{ marginLeft: { xs: "5px", sm: "24px" } }}>
                  <Typography
                    sx={{
                      color: "#828282",
                      fontFamily: "poppins, sans-serif",
                      fontSize: { xs: "12px", sm: "16px" },
                      fontWeight: "400",
                    }}
                  >
                    {item.categoryName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontFamily: "poppins, sans-serif",
                      fontSize: { xs: "16px", sm: "24px" },
                      fontWeight: "600",
                    }}
                  >
                    {item.courseName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FABC1D",
                      fontFamily: "poppins, sans-serif",
                      fontSize: { xs: "12px", sm: "20px" },
                      fontWeight: "500",
                    }}
                  >
                    Schedule: {item.courseDate}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer />
    </div>
  );
};

export default MyClass;
