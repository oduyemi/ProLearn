"use client";
import React from "react";
import Link from "next/link";
import { Box, Typography, Container } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #42113C 0%, #6A1B9A 100%)",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            &copy; {new Date().getFullYear()} &nbsp;
            <Link
              href="https://progrowing.org"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "#FFD60A",
                fontWeight: 600,
              }}
            >
              ProGrowing™
            </Link>
            . All Rights Reserved.
          </Typography>

          {/* Links */}
          <Box
            component="ul"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              m: 0,
              p: 0,
              gap: { xs: 2, sm: 3 },
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            {[
              { label: "Forum", href: "https://forum.progrowing.org" },
              { label: "Learning Center", href: "https://learn.progrowing.org/" },
              { label: "Taskify", href: "https://taskify.progrowing.org/" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  target="_blank"
                  style={{
                    color: "#fff",
                    fontWeight: 500,
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  {link.label}
                  <span
                    style={{
                      display: "block",
                      height: "2px",
                      width: "0%",
                      background: "#FFD60A",
                      transition: "width 0.3s ease",
                      position: "absolute",
                      bottom: -3,
                      left: 0,
                    }}
                  />
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
