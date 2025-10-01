"use client";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CustomButton from "../elements/Button";

export const ContactBlock: React.FC = () => {
  return (
    <Box
      maxWidth="lg"
      sx={{
        mx: "auto",
        my: { xs: 6, md: 10 },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "white",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: { xs: "0 0 100%", md: "0 0 35%" },
          bgcolor: "#42113C", // deep purple like header
          p: { xs: 4, md: 6 },
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#FFD60A", // yellow accent
          }}
        >
          Contact
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Get In{" "}
          <Box component="span" sx={{ color: "#FFD60A" }}>
            Touch
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 3, color: "rgba(255,255,255,0.8)", maxWidth: 320 }}
        >
          We’d love to hear from you! Whether you’re curious about ProGrowing
          features or want to share your tech journey with us.
        </Typography>

        <Box>
          <Typography variant="body2" sx={{ mb: 1, color: "#FFD60A" }}>
            📩 support@progrowing.org
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            ⚡ Quick response guaranteed
          </Typography>
        </Box>
      </Box>

      {/* Right Section (Form) */}
      <Box
        component="form"
        sx={{
          flex: 1,
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* First + Last Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
          }}
        >
          <TextField
            fullWidth
            label="First Name"
            placeholder="Jane"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Doe"
            variant="outlined"
          />
        </Box>

        {/* Email */}
        <TextField
          fullWidth
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          variant="outlined"
          required
        />

        {/* Message */}
        <TextField
          fullWidth
          label="Your Message"
          multiline
          rows={6}
          variant="outlined"
          placeholder="Write your message..."
        />

        {/* Newsletter + Submit */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mt: 2,
          }}
        >
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Send me your newsletter!"
          />
          <CustomButton
            variant="yel"
            type="submit"
            // sx={{
            //   px: 4,
            //   py: 1.2,
            //   fontWeight: 600,
            //   borderRadius: "50px",
            //   textTransform: "none",
            //   bgcolor: "#FFD60A",
            //   color: "#42113C",
            //   boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            //   transition: "all 0.3s ease",
            //   "&:hover": {
            //     bgcolor: "#e6c200",
            //     transform: "translateY(-2px)",
            //     boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            //   },
            // }}
          >
            Send Message
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};
