"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/context/user/usercontext";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Alert,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
import {
  MenuBook as CoursesIcon,
  School as MyCoursesIcon,
  Person as ProfileIcon,
  Lock as PasswordIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import defaultAvatar from "../../../public/images/photos/avatar.png";

interface DashboardContentProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  title = "Dashboard",
  children,
}) => {
  const { user } = useContext(UserContext)!;
  const router = useRouter();
  const pathname = usePathname();

  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    img: "",
  });

  const [bottomNav, setBottomNav] = useState(0);

  useEffect(() => {
    if (!user) {
      setFlashMessage({ type: "error", message: "You need to login first!" });
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setUserDetails({
        fname: user.fname || "",
        lname: user.lname || "",
        img: user.img ?? defaultAvatar.src,
      });
    }
  }, [user, router]);

  const handleLogout = () => {
    router.push("/logout");
  };

  const navMap = [
    { label: "Courses", icon: <CoursesIcon />, path: "/dashboard" },
    { label: "My Courses", icon: <MyCoursesIcon />, path: "/dashboard/my-courses" },
    { label: "Profile", icon: <ProfileIcon />, path: "/profile" },
    { label: "Password", icon: <PasswordIcon />, path: "/profile/edit-password" },
  ];

  useEffect(() => {
    const currentIndex = navMap.findIndex((item) => item.path === pathname);
    if (currentIndex >= 0) setBottomNav(currentIndex);
  }, [pathname]);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Sidebar (desktop only) */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {flashMessage && (
          <Alert severity={flashMessage.type} sx={{ borderRadius: 0 }}>
            {flashMessage.message}
          </Alert>
        )}

        {/* Top Bar */}
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            px: 3,
            py: 2,
            borderRadius: 0,
          }}
        >
          <TextField
            placeholder="Search courses..."
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: 320 },
              bgcolor: "grey.100",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={userDetails.img} alt="User image" />
            <Typography fontWeight={600}>
              {userDetails.fname} {userDetails.lname}
            </Typography>
          </Box>
        </Paper>

        {/* Body */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2, md: 4 },
            py: 3,
            overflowX: "hidden",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#42113C",
              mb: 3,
            }}
          >
            {title}
          </Typography>
          {children}
        </Box>

        {/* Bottom Navigation (mobile only) */}
        <Paper
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #ddd",
            zIndex: 1200,
          }}
          elevation={3}
        >
          <BottomNavigation
            value={bottomNav}
            onChange={(e, newValue) => {
              setBottomNav(newValue);
              if (newValue < navMap.length) {
                router.push(navMap[newValue].path);
              }
            }}
            sx={{ bgcolor: "white" }}
          >
            {navMap.map((item, idx) => (
              <Tooltip key={idx} title={item.label} arrow>
                <BottomNavigationAction
                  label={item.label}
                  icon={item.icon}
                  sx={{
                    "&.Mui-selected": { color: "primary.main" },
                  }}
                />
              </Tooltip>
            ))}

            {/* Logout as a dedicated action */}
            <Tooltip title="Logout" arrow>
              <BottomNavigationAction
                icon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  "&.Mui-selected": { color: "error.main" },
                }}
              />
            </Tooltip>
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
};
