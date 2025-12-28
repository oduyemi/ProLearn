"use client";
import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";


export interface User {
  id: string;
  fname: string;
  lname?: string;
  username?: string;
  email: string;
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
  handleLogout: () => Promise<void>;
  handleChangePassword: (oldPassword: string, newPassword: string, confirmNewPassword: string) => Promise<void>;
  handleUpdateProfile: (data: Partial<User>) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    }
    return null;
  });


const handleLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      "https://learnapi-pi.vercel.app/auth/login",
      { email, password }
    );

    if (response.status === 200) {
      const { token } = response.data;

      // decode JWT to get user info
      const decoded = jwt_decode<{ id: string; fname: string; lname: string; email: string; username: string }>(token);

      const userData: User = {
        id: decoded.id,
        fname: decoded.fname,
        lname: decoded.lname,
        email: decoded.email,
        username: decoded.username,
      };

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setFlashMessage({
        type: "success",
        message: `Login Successful. Welcome Back ${userData.fname}`,
      });

      return true;
    }
  } catch (error: unknown) {
    setFlashMessage({
      type: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Login failed."
        : "Something went wrong.",
    });
  }
  return false;
};

  


const handleLogout = async (): Promise<void> => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setFlashMessage({ type: "success", message: "Logged out successfully." });
};


  // ---------------- CHANGE PASSWORD ----------------
  const handleChangePassword = async (oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<void> => {
    try {
      if (!user) {
        setFlashMessage({ type: "error", message: "You must be logged in." });
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://learnapi-pi.vercel.app/auth/reset-password/${user?.id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFlashMessage({
        type: response.status === 200 ? "success" : "error",
        message: response.data.message || "Password update failed",
      });
    } catch (error: unknown) {
      setFlashMessage({
        type: "error",
        message: axios.isAxiosError(error) ? error.response?.data?.message || "Error changing password" : "Something went wrong",
      });
    }
  };


  const handleUpdateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user) {
        setFlashMessage({ type: "error", message: "You must be logged in." });
        return;
      }

      const token = localStorage.getItem("token");
      const response = axios.put(
        `https://learnapi-pi.vercel.app/auth/update`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setFlashMessage({ type: "success", message: "Profile updated successfully." });
      } else {
        setFlashMessage({ type: "error", message: response.data.message || "Profile update failed" });
      }
    } catch (error: unknown) {
      setFlashMessage({
        type: "error",
        message: axios.isAxiosError(error) ? error.response?.data?.message || "Error updating profile" : "Something went wrong",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, flashMessage, handleLogin, handleLogout, handleChangePassword, handleUpdateProfile }}>
      {children}
    </UserContext.Provider>
  );
};
