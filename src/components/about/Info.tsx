"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Typewriter } from "@/components/about/Typewriter";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { ContentFiller } from "@/components/contentFiller";
import { Values } from "./Values";

export const AbtInfo: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 4 },
        maxWidth: "1100px",
        mx: "auto",
      }}
    >
      {/* typewriter section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 4, md: 6 }}
        mb={4}
        sx={{ animation: "fadeInUp 1s" }}
      >
        <Typewriter />
      </Box>

      {/* description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: 15, sm: 16 },
          fontWeight: 400,
          mt: 2,
          lineHeight: 1.7,
          textAlign: "center",
          color: "grey.800",
        }}
        paragraph
      >
        At <b>ProGrowing</b>, we believe in the transformative power of creativity
        and individuality. Founded with the vision of fostering a community
        where developers and designers thrive, we cultivate innovation,
        mentorship, and continuous growth.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: 15, sm: 16 },
          fontWeight: 400,
          mt: 2,
          lineHeight: 1.7,
          textAlign: "center",
          color: "grey.800",
        }}
        paragraph
      >
        ProGrowing is an initiative aimed at mentoring programmers, teaching
        both soft and hard skills. Through <b>Taskify</b>, the <b>Learning
        Center</b>, and the <b>Forum</b>, we provide hands-on experience so
        you&apos;re well-rounded in your tech journey.
      </Typography>

      {/* what we do */}
      <Box mt={8} sx={{ animation: "fadeInUp 1s" }}>
        <WhatWeDo />
      </Box>

      {/* values */}
      <Values />
      {/* content filler CTA */}
      <Box mt={8}>
        <ContentFiller />
      </Box>
    </Box>
  );
};
