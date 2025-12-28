"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Lightbulb, Groups, TrendingUp } from "@mui/icons-material";


export const Values: React.FC = () => {
  const values = [
    {
      title: "Creativity",
      description:
        "We champion creativity and encourage our members to think outside the box. No two projects should be the same; we believe in the power of unique perspectives and original ideas.",
      icon: <Lightbulb sx={{ fontSize: 28, color: "#6B21A8" }} />,
    },
    {
      title: "Collaboration",
      description:
        "Collaboration is at the core of what we do. We bring together individuals from diverse backgrounds and expertise, fostering a collaborative spirit that drives innovation and growth.",
      icon: <Groups sx={{ fontSize: 28, color: "#6B21A8" }} />,
    },
    {
      title: "Growth",
      description:
        "Continuous growth is essential. Whether it's through mentorship, projects, or community engagement, we are committed to helping our members grow both personally and professionally.",
      icon: <TrendingUp sx={{ fontSize: 28, color: "#6B21A8" }} />,
    },
  ];

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 6 }}>
      {/* Section Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1.6rem", sm: "2rem" },
          color: "#1E293B",
        }}
      >
        Our{" "}
        <Typography
          component="span"
          variant="h4"
          sx={{ color: "#6B21A8", fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          Values
        </Typography>
      </Typography>

      {/* Values List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 4,
        }}
      >
        {values.map((val, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-4px)",
              },
            }}
          >
            {/* Icon with subtle background */}
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(107,33,168,0.1)", // subtle purple bg
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {val.icon}
            </Box>

            {/* Text */}
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#111827", mb: 1 }}
              >
                {val.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  lineHeight: 1.6,
                  color: "text.secondary",
                }}
              >
                {val.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
