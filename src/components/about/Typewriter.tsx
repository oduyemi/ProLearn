"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export const Typewriter: React.FC = () => {
  const [text, setText] = useState("");
  const fullText =
    "Welcome to ProGrowing, where innovation meets mentorship";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) clearInterval(interval);
    }, 60); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          textAlign: "center",
          color: "#42113C", 
          lineHeight: 1.4,
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word", 
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            right: -6,
            top: 0,
            height: "100%",
            width: "3px",
            bgcolor: "#FACC15", // yellow caret
            animation: "blinkCaret 0.8s step-end infinite",
          },
        }}
      >
        {text}
      </Typography>

      {/* Keyframes for caret animation */}
      <style>
        {`
          @keyframes blinkCaret {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};
