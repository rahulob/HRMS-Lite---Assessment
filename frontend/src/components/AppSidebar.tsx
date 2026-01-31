import { Link, useLocation } from "react-router"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "./ui/sidebar"
import { Users, UserCheck, Calendar, Building2, UserPlus } from "lucide-react"
import clsx from "clsx" // for conditional classNames

export function AppSidebar() {
    const location = useLocation()
    const currentPath = location.pathname

    const isActive = (path: string) => currentPath === path

    return (
        <Sidebar>
            {/* Logo Header */}
            <SidebarHeader>
                <Link to={"/"}>
                    <div className="flex items-center gap-3 p-4 mb-4">
                        <div className="w-8 h-8 bg-linear-to-r from-zinc-500 to-zinc-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="font-bold text-lg bg-linear-to-r from-zinc-600 to-zinc-700 bg-clip-text text-transparent">
                            HRMS
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">Lite</div>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {/* Attendance Group */}
                <SidebarGroup>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Attendance
                    </div>
                    <SidebarMenu className="space-y-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className={clsx(
                                    isActive("/mark-attendance") &&
                                    "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                                )}
                            >
                                <Link to="/mark-attendance" className="flex items-center gap-3">
                                    <UserCheck className="w-4 h-4" />
                                    <span>Mark Attendance</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className={clsx(
                                    isActive("/view-attendance") &&
                                    "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                                )}
                            >
                                <Link to="/view-attendance" className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>View Attendance</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* Employee Management Group */}
                <SidebarGroup>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Employee
                    </div>
                    <SidebarMenu className="space-y-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className={clsx(
                                    isActive("/view-employees") &&
                                    "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                                )}
                            >
                                <Link to="/view-employees" className="flex items-center gap-3">
                                    <Users className="w-4 h-4" />
                                    <span>All Employees</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className={clsx(
                                    isActive("/create-employee") && "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                                )}
                            >
                                <Link to="/create-employee" className="flex items-center gap-3">
                                    <UserPlus className="w-4 h-4" />
                                    <span>Create Employee</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto">
                <div className="p-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                        © 2026 HRMS Lite
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
