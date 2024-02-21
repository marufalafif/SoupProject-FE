import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import listmenubaner from "../assets/listmenubaner.png";

const ListMenuClass = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_CATEGORY_API_URL
          }/GetCategory?categoryId=${id}`
        );
        const courseResponse = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_COURSE_API_URL
          }/GetCoursesByCategoryId?categoryId=${id}`
        );

        setData(categoryResponse.data);
        setCourse(courseResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID");
  };

  return (
    <Box sx={{ marginTop: { xs: "60px", md: "75px" } }}>
      <Box
        key={data?.categoryId}
        sx={{ borderBottom: "1px solid #E0E0E0", marginBottom: "80px" }}
      >
        <Box
          sx={{
            backgroundImage: `url(${listmenubaner})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: { xs: "180px", sm: "294px" },
            marginBottom: { xs: "32px", sm: "46px" },
          }}
        ></Box>
        <Container maxWidth="xl" sx={{ marginBottom: "80px" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
              fontSize: { xs: "19px", sm: "24px" },
            }}
          >
            {data?.categoryName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "400",
              fontSize: { xs: "14px", sm: "16px" },
              marginTop: { xs: "14px", sm: "16px" },
            }}
          >
            {data?.categoryDesc}
          </Typography>
        </Container>
      </Box>
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
          }}
        >
          Another menu in this class
        </Typography>
        <Box
          sx={{
            marginTop: { xs: "60px", md: "80px" },
            paddingX: { xs: 0, sm: "19px", md: "27px" },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {course?.map((product) => (
              <Grid
                key={product.courseId}
                item
                xs={6}
                sm={4}
                md={4}
                sx={{
                  display:
                    product.courseStatus === "Inactive" ? "none" : "block",
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
    </Box>
  );
};

export default ListMenuClass;
