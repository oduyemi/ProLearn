import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Divider,
} from "@mui/material";
import CustomButton from "../elements/Button";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CloseIcon from "@mui/icons-material/Close";

interface UserDetails {
  fname: string;
  lname: string;
}

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Load user details only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userDetails");
      setUserDetails(stored ? JSON.parse(stored) : null);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={isMobileMenuOpen}
      onClose={closeMobileMenu}
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #42113C 30%, #6A1B9A 90%)",
          color: "white",
        },
      }}
    >
      <Box sx={{ width: 260, p: 2 }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={closeMobileMenu} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {["Home", "About", "Courses", "Contact"].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                onClick={closeMobileMenu}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
        <Box mt={2}>
          {userDetails ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                {userDetails.fname} {userDetails.lname}
              </Typography>
              <IconButton component={Link} href="/logout" color="error">
                <PowerSettingsNewIcon />
              </IconButton>
            </Box>
          ) : (
            <CustomButton
              component={Link}
              href="/login"
              color="secondary"
              fullWidth
              // sx={{
              //   borderRadius: "50px",
              //   fontWeight: 600,
              // }}
              onClick={closeMobileMenu}
            >
              Login
            </CustomButton>
          )}
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: "rgba(66,17,60,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Mobile Menu Button */}
          <Box display={{ xs: "block", md: "none" }}>
            <IconButton edge="start" color="inherit" onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/images/logo/logo.png"
              alt="logo"
              sx={{
                height: { xs: 60, md: 80 },
                width: "auto",
                transition: "0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>

          {/* Desktop Nav */}
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              display: { xs: "none", md: "flex" },
              gap: 3,
              m: 0,
              p: 0,
            }}
          >
            {["Home", "About", "Courses", "Contact"].map((text, index) => (
              <li key={index}>
                <Button
                  component={Link}
                  href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    textTransform: "none",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "0%",
                      height: "2px",
                      backgroundColor: "white",
                      transition: "width 0.3s",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                >
                  {text}
                </Button>
              </li>
            ))}
          </Box>

          {/* User Info / Login */}
          <Box display="flex" alignItems="center">
            {userDetails ? (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400, mr: 2, color: "white" }}
                >
                  {userDetails.fname} {userDetails.lname}
                </Typography>
                <IconButton component={Link} href="/logout" color="error">
                  <PowerSettingsNewIcon />
                </IconButton>
              </Box>
            ) : (
              <CustomButton
                component={Link}
                href="/login"
              >
                Login
              </CustomButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {renderMobileMenu()}
    </>
  );
};
