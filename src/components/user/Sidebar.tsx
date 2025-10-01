"use client";
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  MenuBook as CoursesIcon,
  School as MyCoursesIcon,
  Person as ProfileIcon,
  Lock as PasswordIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { text: "All Courses", icon: <CoursesIcon />, path: "/dashboard" },
    { text: "My Courses", icon: <MyCoursesIcon />, path: "/dashboard/my-courses" },
    { text: "Profile", icon: <ProfileIcon />, path: "/profile" },
    { text: "Change Password", icon: <PasswordIcon />, path: "/profile/edit-password" },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        width: 250,
        background: "linear-gradient(135deg, #6A1B9A, #4527A0, #283593)",
        color: "white",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* Logo */}
      <Box display="flex" justifyContent="center" mb={2}>
        <img
          src="/images/logo/logo.png"
          alt="Logo"
          width={150}
          height={80}
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Navigation */}
      <List>
        {navItems.map((item, idx) => {
          const active = pathname === item.path;
          return (
            <ListItemButton
              key={idx}
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                px: 2,
                py: 1.2,
                background: active ? "rgba(0, 188, 212, 0.2)" : "transparent",
                color: active ? "#00bcd4" : "white",
                "&:hover": {
                  background: "rgba(0, 188, 212, 0.15)",
                  color: "#00bcd4",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#00bcd4" : "rgba(255,255,255,0.7)",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={active ? "bold" : 400}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Logout */}
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.2,
            color: "white",
            "&:hover": {
              background: "rgba(244, 67, 54, 0.2)", // red tint
              color: "#f44336",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};
