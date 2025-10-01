import { EditProfile } from "@/components/forms/EditProfile";
import { DashboardContent } from "@/components/user/DashboardContent";
import { ProtectedRoute } from "@/components/user/ProtectedRoutes";




export default function ProfileEdit() {
    return (
        <ProtectedRoute>
            <DashboardContent title="">
                <EditProfile />
            </DashboardContent>
        </ProtectedRoute>
    )
}