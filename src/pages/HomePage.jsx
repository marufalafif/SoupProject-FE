import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import banner from "../assets/banner.png";
import benefit from "../assets/benefit.png";

import BoxPro from "../components/utils/BoxPro";
import Product from "../components/Product";
import Food from "../components/Food";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box sx={{ marginTop: { xs: "60px", md: "75px" } }}>
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "200px", md: "274px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: { xs: "48px", md: "60px" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "843px",
            paddingX: { xs: "7px", sm: "9px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
              fontSize: { xs: "24px", sm: "27", md: "32px" },
              marginBottom: "27px",
            }}
          >
            Be the next great chef
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",

              fontFamily: "Montserrat, sans-serif",
              fontWeight: "400",
              fontSize: { xs: "16px", sm: "19px", md: "24px" },
            }}
          >
            We are able to awaken your cooking skills to become a classy chef
            and ready to dive into the professional world
          </Typography>
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "56px",
        }}
      >
        <Box
          sx={{
            width: "1052px",
            display: { xs: "none", sm: "flex" },
            gap: { sm: "20px", md: "40px" },
          }}
        >
          <BoxPro
            num="200+"
            text="Various cuisines available in professional class"
          />
          <BoxPro
            num="50+"
            text="A chef who is reliable and has his own characteristics in cooking"
          />
          <BoxPro
            num="30+"
            text="Cooperate with trusted and upscale restaurants"
          />
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
          <Swiper className="mySwiper">
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BoxPro
                num="200+"
                text="Various cuisines available in professional class"
              />
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BoxPro
                num="50+"
                text="A chef who is reliable and has his own characteristics in cooking"
              />
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BoxPro
                num="30+"
                text="Cooperate with trusted and upscale restaurants"
              />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Container>
      <Product title="More professional class" />
      <Box
        sx={{
          backgroundImage: `url(${benefit})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "233px",
          paddingX: { xs: "20px", md: "50px", lg: "80px" },
          display: "flex",
          alignItems: "center",
          marginBottom: "60px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
              fontSize: { xs: "24px", md: "40px" },
              marginBottom: { xs: "16px", md: "24px" },
            }}
          >
            Gets your best benefit
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "500",
              fontSize: { xs: "9px", md: "16px" },
            }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam.
          </Typography>
        </Box>
      </Box>
      <Food />
    </Box>
  );
};

export default HomePage;
