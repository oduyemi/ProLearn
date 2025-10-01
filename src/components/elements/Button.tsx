import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

type CustomButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "yel" | "outline" | "whi";
  children: React.ReactNode;
} & Omit<ButtonProps, "variant" | "size">;

const CustomButton: React.FC<CustomButtonProps> = ({
  size = "medium",
  variant = "yel",
  children,
  ...rest
}) => {
  const getStyles = () => {
    switch (variant) {
      case "yel":
        return {
          backgroundColor: "#FACC15", // yellow
          color: "#000",
          "&:hover": { backgroundColor: "#EAB308" },
        };
      case "outline":
        return {
          border: "1px solid #EAB308", // yellow outline
          color: "#EAB308",
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "rgba(107,33,168,0.08)" },
        };
      case "whi":
        return {
          backgroundColor: "#FFF",
          color: "#FACC15",
          "&:hover": { backgroundColor: "#F3F4F6" },
        };
      default:
        return {};
    }
  };

  return (
    <MUIButton
      size={size}
      sx={{
        borderRadius: "6px",
        textTransform: "none",
        px: size === "small" ? 2 : size === "large" ? 4 : 3,
        py: size === "small" ? 1 : size === "large" ? 2 : 1.5,
        transition: "all 0.15s ease-in-out",
        ...getStyles(),
      }}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};

export default CustomButton;
