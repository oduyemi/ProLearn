"use client";
import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";



export interface User {
  id: string;
  fname: string;
  lname?: string;
  email: string;
  username?: string;
  phone?: string;
  img?: string;
  createdAt?: string;
}

export interface FlashMessage {
  type: "success" | "error";
  message: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  flashMessage: FlashMessage | null;
  handleLogin: (email: string, password: string) => Promise<boolean>; 
  handleChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  handleLogout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "https://learnapi-pi.vercel.app/send/login",
        { email, password }
      );

      if (response.status === 200) {
        const { token, userSession } = response.data;

        setUser(userSession);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userSession));

        setFlashMessage({
          type: "success",
          message: `Login Successful. Welcome Back ${userSession.fname}`,
        });

        return true; 
      } else if (response.status === 400) {
        setFlashMessage({
          type: "error",
          message: "All fields are required!",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    } catch (error: any) {
      if (error.response) {
        setFlashMessage({
          type: "error",
          message: error.response.data.detail || error.response.data.message,
        });
      } else if (error.request) {
        setFlashMessage({
          type: "error",
          message: "No response received from the server. Please try again later.",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: "Something went wrong.",
        });
      }
    }
    return false; // failed login
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setFlashMessage({
          type: "error",
          message: "You must be logged in to change your password.",
        });
        return;
      }

      const response = await axios.put(
        "https://learnapi-pi.vercel.app/send/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setFlashMessage({
          type: "success",
          message: "Password changed successfully.",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: response.data.message || "Password change failed.",
        });
      }
    } catch (error: any) {
      if (error.response) {
        setFlashMessage({
          type: "error",
          message: error.response.data.message || "Error changing password.",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: "Something went wrong. Try again later.",
        });
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        flashMessage,
        handleLogin,
        handleLogout,
        handleChangePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
