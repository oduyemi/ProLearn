"use client";

import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/user/usercontext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userContext?.user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [userContext, router]);

  if (!userContext?.user) {
    return null; // or return <LoadingSpinner /> while redirecting
  }

  return <>{children}</>;
};
