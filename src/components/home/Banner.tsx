"use client";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Container } from "@mui/material";
import Link from "next/link";
import CustomButton from "../elements/Button";
import { motion } from "framer-motion";

interface BannerSlide {
  title: string;
  heading: string;
  description: string;
  image: string;
}

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const slides: BannerSlide[] = [
  {
    title: "ProGrowing Taskify",
    heading: "ProGrowing Online Learning Platform",
    description:
      "Have access to ProGrowing Taskify, where you will be assigned projects and assignments that will give you the needed experience, and help you build your portfolio, and communication skills.",
    image: "/images/photos/hero2.jpg",
  },
  {
    title: "Free Online Courses",
    heading: "Learn From The Comfort of Your Home",
    description:
      "Learning is a wonderful experience, and learning from the best makes everything ten times easier. The Progrowing mentors and lead instructors are all here to make your learning experience unforgettable.",
    image: "/images/slides/b.jpg",
  },
];

export const Banner: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <Box key={idx} sx={{ position: "relative" }}>
            {/* Background Image */}
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                width: "100%",
                height: { xs: "70vh", sm: "80vh", md: "85vh" },
                objectFit: "cover",
                filter: "brightness(0.7)",
              }}
            />

            {/* Overlay with Gradient */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 100%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Container>
                <Box
                  sx={{
                    px: { xs: 2, sm: 4, md: 8 },
                    maxWidth: { xs: "100%", sm: "90%", md: "65%" },
                  }}
                >
                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#FFD700",
                        textTransform: "uppercase",
                        mb: 1,
                        fontWeight: 700,
                        letterSpacing: 2,
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                      }}
                    >
                      {slide.title}
                    </Typography>
                  </motion.div>

                  {/* Heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        mb: 2,
                        lineHeight: 1.2,
                        fontSize: {
                          xs: "1.8rem",
                          sm: "2.2rem",
                          md: "2.8rem",
                          lg: "3.2rem",
                        },
                      }}
                    >
                      {slide.heading}
                    </Typography>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 300,
                        mb: 3,
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    >
                      {slide.description}
                    </Typography>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <Box
                      display="flex"
                      gap={2}
                      flexWrap="wrap"
                      sx={{ flexDirection: { xs: "column", sm: "row" } }}
                    >
                      <CustomButton
                        component={Link}
                        href="/about"
                        sx={{
                          borderRadius: "50px",
                          px: { xs: 3, sm: 4 },
                          py: { xs: 1, sm: 1.2 },
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                          fontWeight: 600,
                          backgroundColor: "transparent",
                          border: "2px solid #FFD700",
                          color: "#FFD700",
                          "&:hover": {
                            backgroundColor: "#FFD700",
                            color: "#000",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Read More
                      </CustomButton>
                      <CustomButton
                        component={Link}
                        href="/login"
                        sx={{
                          borderRadius: "50px",
                          px: { xs: 3, sm: 4 },
                          py: { xs: 1, sm: 1.2 },
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                          fontWeight: 600,
                          backgroundColor: "#FFD700",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#e6c200",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Login
                      </CustomButton>
                    </Box>
                  </motion.div>
                </Box>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
