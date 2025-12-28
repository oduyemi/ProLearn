import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Chip, Button } from "@mui/material";
import Link from "next/link";
import coursesData from "../../../data/courses.json";
import CustomButton from "@/components/elements/Button";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  comments: number;
  timeAgo: string;
}

// 1️⃣ Generate static paths for export
export function generateStaticParams() {
  return (coursesData as Course[]).map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = (coursesData as Course[]).find((c) => c.id === params.id);

  if (!course) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h5" color="error">
          Course not found 😢
        </Typography>
        <Link href="/courses" passHref>
          <CustomButton variant="outlined">
            Back to Courses
          </CustomButton>
        </Link>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" py={5} px={2}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="300"
          src={course.image}
          alt={course.title}
        />
        <CardContent>
          <Chip
            label={course.category}
            color="warning"
            sx={{ fontWeight: "bold", mb: 2 }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {course.timeAgo} • 💬 {course.comments} comments
          </Typography>

          <Box display={"flex"} justifyContent="center">
            <Box mt={4} textAlign="center">
              < CustomButton
                variant="yel"
                color="primary"
              >
                Start Learning
              </CustomButton>{" "}
              </Box>
              <Box textAlign="center" mt={4}>
                <Link href="/courses" passHref>
                  <CustomButton variant="outlined">
                    Back to Courses
                  </CustomButton>
                </Link>
              </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
