"use client";
import { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../../app/context/user/usercontext";
import CustomButton from "../elements/Button";

export const UpdatePassword = () => {
  const { user } = useContext(UserContext)!;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToggle = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlash(null);

    if (newPassword !== confirmPassword) {
      setFlash({ type: "error", message: "New password and confirmation do not match." });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/v1/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password change failed");

      setFlash({ type: "success", message: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setFlash({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: "40vh",
        bgcolor: "grey.100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          textAlign="center"
          mb={3}
        >
          Change Password
        </Typography>

        {flash && (
          <Alert severity={flash.type} sx={{ mb: 2 }}>
            {flash.message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleToggle("current")} edge="end">
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleToggle("new")} edge="end">
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleToggle("confirm")} edge="end">
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <CustomButton
            type="submit"
            disabled={loading}
            // sx={{
            //   mt: 2,
            //   py: 1.4,
            //   fontSize: "1rem",
            //   fontWeight: 600,
            //   // background: "linear-gradient(90deg, #6A1B9A 0%, #1E3A8A 100%)",
            //   color: "white",
            //   "&:hover": {
            //     background: "linear-gradient(90deg, #1E3A8A 0%, #6A1B9A 100%)",
            //     boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
            //   },
            // }}
          >
            {loading ? "Updating..." : "Update Password"}
          </CustomButton>
        </Box>
      </Paper>
    </Box>
  );
};
