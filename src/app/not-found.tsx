"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import CustomButton from "@/components/elements/Button";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      {/* Big 404 */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "5rem", md: "8rem" },
          fontWeight: "bold",
          background: "linear-gradient(90deg, #6A1B9A, #00bcd4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        404
      </Typography>

      {/* Humorous Subtitle */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 500,
          color: "text.secondary",
        }}
      >
        Oops... this page took a wrong turn and got lost in cyberspace 🚀
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
          maxWidth: 500,
        }}
      >
        Don’t worry though — even the best explorers get lost sometimes. 
        Let’s get you back to safety before the internet monsters find you.
      </Typography>

      {/* CTA Button */}
      <CustomButton
        component={Link}
        href="/dashboard"
        variant="yel"
        size="large"
      >
        🏠 Take Me Home
      </CustomButton>
    </Box>
  );
};

