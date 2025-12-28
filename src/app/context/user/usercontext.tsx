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
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    }
    return null;
  });


  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        "https://learnapi-pi.vercel.app/send/login",
        { email, password }
      );

      if (response.status === 200) {
        const { token, userSession } = response.data as {
          token: string;
          userSession: User;
        };

        setUser(userSession);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userSession));

        setFlashMessage({
          type: "success",
          message: `Login Successful. Welcome Back ${userSession.fname}`,
        });

        return true;
      }

      setFlashMessage({
        type: "error",
        message: "Invalid login credentials.",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setFlashMessage({
          type: "error",
          message:
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Login failed.",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: "Something went wrong.",
        });
      }
    }

    return false;
  };



  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };


  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setFlashMessage({
          type: "success",
          message: "Password changed successfully.",
        });
      } else {
        setFlashMessage({
          type: "error",
          message: response.data?.message || "Password change failed.",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setFlashMessage({
          type: "error",
          message:
            error.response?.data?.message ||
            "Error changing password.",
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
