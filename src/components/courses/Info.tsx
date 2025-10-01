"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import Link from "next/link";
import CommentIcon from "@mui/icons-material/Comment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import coursesData from "@/data/courses.json";
import CustomButton from "../elements/Button";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  comments: number;
  timeAgo: string;
}

export const CourseInfo: React.FC = () => {
  const courses: Course[] = coursesData;

  return (
    <Box maxWidth="lg" mx="auto" py={6} px={{ xs: 2, sm: 4, md: 6 }}>
      {/* Wrapper with flexbox */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={4}
        justifyContent="center"
      >
        {courses.map((course) => (
          <Card
            key={course.id}
            component={Link}
            href={`/courses/${course.id}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "45%", md: "30%" },
              minHeight: 380,
              borderRadius: 3,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            {/* Image */}
            <CardMedia
              component="img"
              height="200"
              image={course.image}
              alt={course.title}
              sx={{ objectFit: "cover" }}
            />

            {/* Category Badge */}
            <Chip
              label={course.category}
              sx={{
                position: "relative",
                top: "-43%",
                left: 40,
                bgcolor: "rgba(107,33,168,0.9)",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            />

            {/* Content */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#42113C" }}
              >
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {course.description}
              </Typography>

              <Box textAlign="center">
                <CustomButton
                  variant="yel"
                  color="primary"
                >
                  Start Learning
                </CustomButton>
              </Box>
            </CardContent>

            {/* Footer */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1.2}
              sx={{
                background: "linear-gradient(90deg, #6A1B9A 0%, #42113C 100%)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(90deg, #42113C 0%, #6A1B9A 100%)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* Time */}
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="caption" color="white">
                  {course.timeAgo}
                </Typography>
              </Box>

              {/* Comments */}
              <Box display="flex" alignItems="center" gap={0.5}>
                <CommentIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="caption" color="white">
                  {course.comments} Comments
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
