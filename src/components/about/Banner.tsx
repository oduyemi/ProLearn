"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const AbtBanner: React.FC = () => {
  return (
    <Box
      sx={{
        height: { xs: 260, sm: 320, md: 420 },
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/photos/grp1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* overlay with gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(66, 17, 60, 0.7)", // deep purple base
          background:
            "linear-gradient(to bottom right, rgba(66,17,60,0.85), rgba(20,20,20,0.6))",
        }}
      />

      {/* floating glow accent */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: 200,
          height: 200,
          bgcolor: "rgba(255, 214, 10, 0.15)", // soft yellow glow
          borderRadius: "50%",
          filter: "blur(80px)",
          transform: "translateX(-50%)",
        }}
      />

      {/* Title + Subtitle */}
      <Box
        sx={{
          position: "relative",
          px: 2,
          animation: "fadeInUp 1s ease forwards",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
            mb: 1,
            letterSpacing: 1,
          }}
        >
          About
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#FFD60A",
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.4rem" },
            mb: 2,
          }}
        >
          Learning Center
        </Typography>

        {/* Breadcrumb */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            color: "grey.300",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
            Home
          </Link>
          <span>/</span>
          <Typography component="span" sx={{ color: "#FFD60A" }}>
            About
          </Typography>
        </Box>
      </Box>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};
