"use client";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { UserContext, User } from "../../app/context/user/usercontext";
import CustomButton from "@/components/elements/Button";
import { useRouter } from "next/navigation";

const API_BASE = "https://learnapi-pi.vercel.app";

// Extend User type to allow File uploads for form handling
type EditableUser = User & { [key: string]: string | File | undefined };

export const EditProfile: React.FC = () => {
  const { user, setUser, flashMessage, handleLogout } = useContext(UserContext)!;
  const [userDetails, setUserDetails] = useState<EditableUser>(
    user ? { ...user } : ({} as EditableUser)
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Update preview when user.img changes
  useEffect(() => {
    if (user?.img) setPreview(user.img);
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setUserDetails((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // Only append fields that have values
      Object.entries(userDetails).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`${API_BASE}/users/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser: User = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "60vh",
        bgcolor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: { xs: 4, sm: 6 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary.main"
          mb={3}
          textAlign="center"
        >
          Edit Profile
        </Typography>

        {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Avatar Preview */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar
                src={preview || "/images/photos/avatar.png"}
                alt="Profile"
                sx={{ width: 100, height: 100, boxShadow: 2 }}
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
                id="upload-avatar"
              />
              <label htmlFor="upload-avatar">
                <CustomButton component="span" variant="outlined" size="small">
                  Change Photo
                </CustomButton>
              </label>
            </Box>

            {/* Profile Fields */}
            <TextField
              label="First Name"
              name="fname"
              value={userDetails.fname || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lname"
              value={userDetails.lname || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={userDetails.email || ""}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Save Button */}
            <CustomButton type="submit" disabled={loading} sx={{ py: 1.5, fontSize: "1rem" }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </CustomButton>

            {/* Logout */}
            <CustomButton
              type="button"
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </CustomButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
