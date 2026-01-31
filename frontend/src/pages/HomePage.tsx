import { Card } from "../components/ui/card"
import { Building2, UserPlus, Users, UserCheck, Calendar } from "lucide-react"
import { Link } from "react-router"

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-zinc-500 to-zinc-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-linear-to-r from-zinc-600 to-zinc-700 bg-clip-text text-transparent">
                    HRMS Lite
                </div>
            </div>

            {/* Tagline */}
            <p className="text-center text-lg text-muted-foreground mb-8 max-w-md">
                Simple and efficient Human Resource Management System for tracking employees and attendance.
            </p>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                <Link to="/create-employee" className="block">
                    <Card className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <UserPlus className="w-6 h-6 text-blue-500" />
                        <div>Create Employee</div>
                    </Card>
                </Link>
                <Link to="/view-employees" className="block">
                    <Card className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <Users className="w-6 h-6 text-green-500" />
                        <div>All Employees</div>
                    </Card>
                </Link>
                <Link to="/mark-attendance" className="block">
                    <Card className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <UserCheck className="w-6 h-6 text-purple-500" />
                        <div>Mark Attendance</div>
                    </Card>
                </Link>
                <Link to="/view-attendance" className="block">
                    <Card className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        <div>View Attendance</div>
                    </Card>
                </Link>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground mt-12 text-center">
                © 2026 HRMS Lite. All rights reserved.
            </p>
        </div>
    )
}
