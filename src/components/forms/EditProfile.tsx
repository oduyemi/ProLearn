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
} from "@mui/material";
import { UserContext } from "../../app/context/user/usercontext";
import CustomButton from "@/components/elements/Button";
import { useRouter } from "next/navigation";

const API_BASE = "https://learnapi-pi.vercel.app";

export const EditProfile: React.FC = () => {
  const { user } = useContext(UserContext)!;
  const [userDetails, setUserDetails] = useState<any>(user || {});
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setUserDetails((prev: any) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setUserDetails((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(userDetails).forEach((key) => {
        formData.append(key, userDetails[key]);
      });

      await axios.put(`${API_BASE}/users/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "40vh",
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

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Avatar Preview */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar
                src={preview || userDetails.img || "/images/photos/avatar.png"}
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
                <CustomButton component="span" variant="outline" size="small">
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
            <CustomButton
              type="submit"
              disabled={loading}
              // sx={{
              //   py: 1.4,
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </CustomButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
