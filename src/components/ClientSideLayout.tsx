"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";



const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isUserRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile");

  useEffect(() => {
    if (isUserRoute) {
      const token = localStorage.getItem("token");
      if (!token) router.push("/admin/login");
    }
  }, [isUserRoute, router]);

  return (
    <>
      {!isUserRoute && (
        <Header />
      )}
      <main className="flex-1">{children}</main>
      {!isUserRoute && (
        <Header />
      )}
    </>
  );
};

export default ClientSideLayout;