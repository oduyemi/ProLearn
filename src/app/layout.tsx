import "./globals.css";
import "animate.css"
import ClientSideLayout from "@/components/ClientSideLayout";
import { UserProvider } from "./context/user/usercontext";


export const metadata = {
  title: "Prolearn - Learn Programming, Data Science, Web Development & More",
  description: "Prolearn is an online learning platform offering courses in programming, data science, web development, and more. Join us to enhance your skills and advance your career.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="m-0 p-0 min-h-screen flex flex-col">
        <UserProvider>
          <ClientSideLayout>{children}</ClientSideLayout>
        </UserProvider>
      </body>
    </html>
  );
}