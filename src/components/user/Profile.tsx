"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../app/context/user/usercontext";
import {
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const Profile: React.FC = () => {
  const { user, handleLogout } = useContext(UserContext)!;
  const [flashMessage, setFlashMessage] = useState<{ type: string; message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      setFlashMessage({
        type: "error",
        message: "You need to login first!",
      });
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={8}
      p={4}
      borderRadius={3}
      sx={{
        background: "linear-gradient(135deg, #6A1B9A 0%, #1E3A8A 100%)",
        color: "white",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      }}
    >
      <Box display="flex" justifyContent="center" mt={-10}>
        <Avatar
          src={user.img || "/images/photos/avatar.png"}
          alt={user.fname}
          sx={{
            width: 110,
            height: 110,
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        />
      </Box>

      <Box mt={6} textAlign="center">
        <Typography variant="h5" fontWeight="bold">
          {user.fname} {user.lname}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          @{user.username}
        </Typography>
      </Box>

      <Box mt={3}>
        <Link href="/profile/edit-profile" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FF9800, #F57C00)",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(90deg, #F57C00, #FF9800)",
                boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
              },
            }}
          >
            Edit Profile
          </Button>
        </Link>
      </Box>

      <Box mt={4} pl={1}>
        <Typography variant="body1" mb={1}>
          <b>Email:</b> {user.email}
        </Typography>
        <Typography variant="body1" mb={1}>
          <b>Phone:</b> {user.phone || "Not provided"}
        </Typography>
        <Typography variant="body1">
          <b>Joined:</b>{" "}
          {user.createdAt ? formatDate(user.createdAt) : "Not available"}
        </Typography>
      </Box>
    </Box>
  );
};
