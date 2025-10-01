"use client";

import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../../app/context/user/usercontext";
import CustomButton from "../elements/Button";

export const LoginForm: React.FC = () => {
  const { handleLogin, flashMessage } = useContext(UserContext)!;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin(formData.email, formData.password);
    if (success) {
      const requestedPath = localStorage.getItem("requestedPath");
      window.location.href = requestedPath ? requestedPath : "/dashboard";
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
        background: "linear-gradient(135deg, #6A1B9A 0%, #1E3A8A 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-4px)" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                position: "relative",
                display: "inline-block",
                pb: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "3px",
                  bgcolor: "warning.main",
                  borderRadius: 2,
                },
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Sign in to continue your learning journey
            </Typography>
          </Box>

          {flashMessage && (
            <Alert
              severity={flashMessage.type}
              sx={{
                mb: 3,
                borderRadius: 2,
                fontSize: "0.9rem",
              }}
            >
              {flashMessage.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 6px rgba(106,27,154,0.3)",
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 6px rgba(106,27,154,0.3)",
                },
              }}
            />

            <CustomButton
              type="submit"
              fullWidth
              // sx={{
              //   py: 1.4,
              //   fontSize: "1rem",
              //   fontWeight: 600,
              //   mt: 1,
              //   background:
              //     "linear-gradient(90deg, #6A1B9A 0%, #1E3A8A 100%)",
              //   color: "white",
              //   "&:hover": {
              //     background:
              //       "linear-gradient(90deg, #1E3A8A 0%, #6A1B9A 100%)",
              //     boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              //   },
              // }}
            >
              Login
            </CustomButton>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Don’t have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </Box>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};
