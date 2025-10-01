import { CourseInfo } from "@/components/courses/Info";
import { DashboardContent } from "@/components/user/DashboardContent";
import { ProtectedRoute } from "@/components/user/ProtectedRoutes";




export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardContent title="All Courses">
                <CourseInfo />
            </DashboardContent>
        </ProtectedRoute>
    )
}