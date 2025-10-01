"use client";
import { UpdatePassword } from "@/components/forms/EditPassword";
import { DashboardContent } from "@/components/user/DashboardContent";
import { ProtectedRoute } from "@/components/user/ProtectedRoutes";


export default function EditPassword() {
    return (
        <ProtectedRoute>
            <DashboardContent title="">
                <UpdatePassword />
            </DashboardContent>
        </ProtectedRoute>
    );
}
