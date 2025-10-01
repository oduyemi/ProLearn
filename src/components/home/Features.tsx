"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 44 }} />,
      title: "Skilled Instructors",
      description: "Learn soft & hard skills, led by ProGrowing mentors.",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 44 }} />,
      title: "Online Classes",
      description:
        "Take advantage of self-paced learning on the ProGrowing platform.",
    },
    {
      icon: <HomeIcon sx={{ fontSize: 44 }} />,
      title: "Tasks",
      description:
        "Build your portfolio with the ProGrowing Taskify, and gain mastery.",
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 44 }} />,
      title: "Mentorship",
      description: "Learn from professionals who have been there, done that.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #42113C 0%, #6A1B9A 100%)",
      }}
    >
      {/* Heading */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 700,
            background: "linear-gradient(90deg, #FFD60A, #FFB703)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why Choose ProGrowing?
        </Typography>
        <Box
          sx={{
            width: 70,
            height: 4,
            borderRadius: 2,
            background: "linear-gradient(90deg, #FFD60A, #FFB703)",
            mx: "auto",
            mt: 1,
          }}
        />
      </Box>

      {/* Features List - Flexbox */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {features.map((feature, idx) => (
          <Box
            key={idx}
            flex="1 1 250px"
            maxWidth="280px"
            sx={{
              textAlign: "center",
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              color: "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
              },
              "& svg": {
                color: "#FFD60A",
                transition: "transform 0.3s ease",
              },
              "&:hover svg": {
                transform: "scale(1.2) rotate(-5deg)",
              },
            }}
          >
            {feature.icon}
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1.5,
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: "#FFD60A",
              }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
