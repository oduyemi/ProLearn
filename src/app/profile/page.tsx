import { ProtectedRoute } from "@/components/user/ProtectedRoutes";
import { Profile } from "@/components/user/Profile";
import { DashboardContent } from "@/components/user/DashboardContent";



export default function UserProfile() {
    return (
        <ProtectedRoute>
            <DashboardContent title="Profile">
                <Profile />
            </DashboardContent>
        </ProtectedRoute>
    )
}