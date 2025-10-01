"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import CustomButton from "./elements/Button";

export const ContentFiller: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: 400,
        px: 2,
        py: { xs: 6, md: 10 },
        bgcolor: "#f9fafc",
        color: "black",
        position: "relative",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.5,
          mb: 2,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
          lineHeight: 1.3,
        }}
      >
        Ready to Join the Pro
        <Typography
          component="span"
          variant="inherit"
          sx={{
            color: "#6a1b9a",
            fontWeight: 800,
            display: "inline",
            ml: 0.5,
          }}
        >
          Gro
        </Typography>
        wing Community?
      </Typography>

      {/* Subheading / Tagline */}
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          maxWidth: 600,
          fontSize: { xs: "0.95rem", sm: "1rem" },
          color: "text.secondary",
          lineHeight: 1.6,
        }}
      >
        Connect with like-minded learners, gain mentorship, and unlock new
        opportunities with ProGrowing. Your growth journey starts here.
      </Typography>

      {/* CTA Button with hover animation */}
      <Link
        href="https://chat.whatsapp.com/CwXJQItHh3d6yviZlTa8Iz/"
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CustomButton
          className="text-white"
          style={{
            // background: "linear-gradient(135deg, #6a1b9a 0%, #42113C 100%)",
            padding: "12px 28px",
            borderRadius: "50px",
            fontSize: "1rem",
            fontWeight: 600,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(106, 27, 154, 0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 8px 20px rgba(106, 27, 154, 0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 12px rgba(106, 27, 154, 0.3)";
          }}
        >
          WhatsApp Community
        </CustomButton>
      </Link>
    </Box>
  );
};
