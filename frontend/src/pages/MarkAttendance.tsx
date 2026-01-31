"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Field, FieldGroup, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import apiInstance from "../api/api_instance"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "../components/ui/select"

interface Employee {
    _id: string
    employee_id: string
    fullname: string
}

function MarkAttendanceForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [formData, setFormData] = useState({
        employee_id: "",
        date: new Date().toISOString().split("T")[0],
        status: "present",
    })
    const [isLoading, setIsLoading] = useState(false)

    // Fetch employees for dropdown
    const fetchEmployees = async () => {
        try {
            const response = await apiInstance.get("/employee/get-all")
            setEmployees(response.data.employees)
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to fetch employees.")
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleStatusChange = (status: string) => {
        setFormData({ ...formData, status })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await apiInstance.post("/attendance/mark", formData)
            toast.success("Attendance marked successfully!")
            setFormData({
                employee_id: "",
                date: new Date().toISOString().split("T")[0],
                status: "present",
            })
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Network error. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>
                    Select an employee and enter the attendance details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {/* Employee Dropdown */}
                        <Field>
                            <FieldLabel htmlFor="employee_id">Employee</FieldLabel>
                            <Select
                                value={formData.employee_id}
                                onValueChange={(val) => setFormData({ ...formData, employee_id: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {employees.map((emp) => (
                                            <SelectItem key={emp._id} value={emp.employee_id}>
                                                {emp.employee_id} - {emp.fullname}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Date */}
                        <Field>
                            <FieldLabel htmlFor="date">Date</FieldLabel>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                disabled={isLoading}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </Field>

                        {/* Status Tabs */}
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Tabs
                                defaultValue={formData.status}
                                onValueChange={handleStatusChange}
                            >
                                <TabsList className="w-full">
                                    <TabsTrigger value="present">Present</TabsTrigger>
                                    <TabsTrigger value="absent">Absent</TabsTrigger>
                                    <TabsTrigger value="leave">Leave</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </Field>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default function MarkAttendance() {
    return (
        <div className="p-8 w-1/2 max-w-lg mx-auto">
            <MarkAttendanceForm />
        </div>
    )
}
