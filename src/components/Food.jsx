import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Food = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_REACT_APP_CATEGORY_API_URL + "/GetAllCategories"
      )
      .then((res) => setFoods(res.data));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "147px" }}>
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
        More food type as you can choose
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "880px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: "16px", sm: "24px" },
          }}
        >
          {foods?.map((food) => (
            <Link
              key={food.categoryId}
              to={`/ListMenuClass/${food.categoryId}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                key={food.categoryId}
                sx={{
                  maxWidth: { xs: "105px", sm: "170px", md: "200px" },
                  marginBottom: "27px",
                  boxShadow: "none",
                  display:
                    food.categoryStatus === "Inactive" ? "none" : "block",
                }}
              >
                <CardMedia
                  component="img"
                  image={food.imagePath}
                  alt={food.categoryImg}
                />
                <CardContent>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "center",
                      fontSize: { xs: "16px", sm: "19px", md: "24px" },
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    {food.categoryName}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Food;
