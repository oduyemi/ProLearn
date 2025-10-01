"use client";
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import CustomButton from "../elements/Button";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  timeAgo: string;
  comments: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "SQL FOR DATA ANALYSIS",
    category: "Data Science",
    description: "Introduction to SQL. SQL for Data Analysis",
    image: "/images/courses/data1.png",
    timeAgo: "6 mins ago",
    comments: 39,
  },
  {
    id: "2",
    title: "UNDERSTANDING GIT & GITHUB",
    category: "General",
    description: "Introduction to Git. Understanding GitHub as a tool.",
    image: "/images/courses/git1.png",
    timeAgo: "10 days ago",
    comments: 0,
  },
  {
    id: "3",
    title: "INTRODUCTION TO PROGRAMMING",
    category: "General",
    description: "What is programming? Understanding the basics of programming.",
    image: "/images/courses/prg1.png",
    timeAgo: "10 days ago",
    comments: 0,
  },
];

export const CoursePreview: React.FC = () => {
  return (
    <Box
      maxWidth="lg"
      mx="auto"
      px={{ xs: 2, sm: 4, md: 6 }}
      py={{ xs: 4, md: 8 }}
    >
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Explore Our Courses
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: { xs: "0.9rem", md: "1rem" },
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Choose from beginner to advanced topics and start learning today.
        </Typography>
      </Box>

      {/* Courses Flex Layout */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
      >
        {courses.map((course) => (
          <Box
            key={course.id}
            flex="1 1 280px"
            maxWidth="340px"
            minWidth="260px"
            display="flex"
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Image + Category */}
              <Box position="relative">
                <CardMedia
                  component="img"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    height: { xs: 160, sm: 200 },
                    objectFit: "cover",
                  }}
                />
                <Chip
                  label={course.category}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    borderRadius: "6px",
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    fontWeight: 700,
                    color: "#42113C",
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    mb: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {course.description}
                </Typography>
                <CustomButton
                  variant="yel"
                  fullWidth
                >
                  Start Learning
                </CustomButton>
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
                <Typography variant="caption" color="white">{course.timeAgo}</Typography>
                <Typography variant="caption" color="white">
                  {course.comments} Comments
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
