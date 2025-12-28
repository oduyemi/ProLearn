"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export const WhatWeDo: React.FC = () => {
  const features = [
    { title: "Innovation Hub", icon: "🚀", description: "Where ideas come alive, projects challenge norms, and creativity thrives." },
    { title: "Mentorship", icon: "🎓", description: "Experienced mentors guide and inspire learners to navigate their careers." },
    { title: "Learning Center", icon: "📘", description: "Our LMS offers courses, tutorials, and resources for continuous growth." },
    { title: "Forum", icon: "💬", description: "A vibrant community space to share knowledge, collaborate, and grow." },
    { title: "Taskify", icon: "📝", description: "Smart task management to track progress, feedback, and productivity." },
    { title: "Community Engagement", icon: "🌍", description: "Events, workshops, and networking to connect and inspire members." },
  ];

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        position: "relative",
        borderRadius: 3,
        bgcolor: "white",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 2,
          fontWeight: 700,
          // color: "#6A1B9A",
          mb: { xs: 4, md: 6 },
        }}
      >
        What We Do
      </Typography>

      {/* Features */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 24px)", md: "1 1 calc(33% - 24px)" },
              borderRadius: 3,
              p: 4,
              bgcolor: "grey.50",
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>{feature.icon}</Typography>
            <Typography
              variant="h6"
              sx={{ mt: 2, color: "#42113C", fontWeight: 600 }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, color: "grey.700", lineHeight: 1.6 }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
