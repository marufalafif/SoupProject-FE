import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = ({ title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_COURSE_API_URL + "/GetAllCourses")
      .then((res) => setData(res.data));
  }, []);

  const formatPrice = (price) => {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("id-ID");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: { xs: "80px", md: "120px" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#5B4947",
          textAlign: "center",
          fontSize: { xs: "26px", sm: "29px", md: "32px" },
          fontWeight: "600",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          marginTop: { xs: "60px", md: "80px" },
          paddingX: { xs: 0, sm: "19px", md: "27px" },
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {data?.map((product) => (
            <Grid
              key={product.courseId}
              item
              xs={6}
              sm={4}
              md={4}
              sx={{
                display: product.courseStatus === "Inactive" ? "none" : "block",
              }}
            >
              <Link
                key={product.courseId}
                to={`/DetailClass/${product.courseId}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  key={product.courseId}
                  sx={{
                    marginBottom: { xs: "20px", md: "40px" },
                    height: { xs: "290px", md: "400px" },
                    position: "relative",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={product.courseImg}
                    image={product.imagePath}
                    sx={{ height: { xs: "160px", md: "233.333px" } }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#828282",
                        fontSize: { xs: "12px", sm: "14px", md: "16px" },
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      {product.categoryName}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#5B4947",
                        fontSize: { xs: "14px", sm: "18px", md: "20px" },
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {product.courseName}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#FABC1D",
                        fontSize: { xs: "16px", md: "20px" },
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                        position: "absolute",
                        bottom: { xs: "14px", sm: "24px", md: "30px" },
                      }}
                    >
                      IDR {formatPrice(product.coursePrice)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Product;
