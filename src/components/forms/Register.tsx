"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomButton from "../elements/Button";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (flashMessage) setFlashMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Both passwords must match!");
      }

      await axios.post(
        "https://learnapi-pi.vercel.app/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setFlashMessage({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      let errorMessage;
      if (error.response) {
        errorMessage =
          error.response.data.message ||
          "An error occurred during registration.";
      } else if (error.request) {
        errorMessage = "No response from the server. Please try again later.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }

      setFlashMessage({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
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
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
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
                color: "#42113C",
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
              Create Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Start your learning journey with ProGrowing
            </Typography>
          </Box>

          {flashMessage && (
            <Alert
              severity={flashMessage.type}
              sx={{ mb: 3, fontSize: "0.9rem", borderRadius: 2 }}
            >
              {flashMessage.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
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
              disabled={loading}
              // sx={{
              //   py: 1.5,
              //   fontSize: "1rem",
              //   fontWeight: 600,
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </CustomButton>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Already have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => router.push("/login")}
            >
              Login
            </Box>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};
