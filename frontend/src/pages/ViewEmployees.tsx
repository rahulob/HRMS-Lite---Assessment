import { useEffect, useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { toast } from "sonner"
import apiInstance from "../api/api_instance"
import { Trash } from "lucide-react"
import { Card } from "../components/ui/card"

interface Employee {
    _id: string
    email: string
    employee_id: string
    fullname: string
    department: string
}

export default function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchEmployees = async () => {
        setIsLoading(true)
        try {
            const response = await apiInstance.get("/employee/get-all")
            setEmployees(response.data.employees)
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to fetch employees.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this employee?")) return

        setDeletingId(id)
        try {
            await apiInstance.delete(`/employee/delete-by-id/${id}`)
            toast.success("Employee deleted successfully.")
            setEmployees((prev) => prev.filter((emp) => emp._id !== id))
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to delete employee.")
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="mx-auto p-4">
            <Card className="p-4">
                {/* Table Title */}
                <h2 className="text-xl font-bold mb-4">All Employees</h2>

                <div className="overflow-x-auto">
                    <Table className="min-w-[700px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[140px] font-semibold px-4 py-2">Employee ID</TableHead>
                                <TableHead className="font-semibold px-4 py-2">Full Name</TableHead>
                                <TableHead className="font-semibold px-4 py-2">Email</TableHead>
                                <TableHead className="font-semibold px-4 py-2">Department</TableHead>
                                <TableHead className="text-center font-semibold px-4 py-2">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : employees.length > 0 ? (
                                employees.map((emp) => (
                                    <TableRow key={emp._id}>
                                        <TableCell className="font-medium px-4 py-2">{emp.employee_id}</TableCell>
                                        <TableCell className="px-4 py-2">{emp.fullname}</TableCell>
                                        <TableCell className="px-4 py-2">{emp.email}</TableCell>
                                        <TableCell className="px-4 py-2">{emp.department}</TableCell>
                                        <TableCell className="text-right px-4 py-2">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(emp._id)}
                                                disabled={deletingId === emp._id}
                                            >
                                                <Trash className="w-4 h-4 mr-1" />
                                                {deletingId === emp._id ? "Deleting..." : "Delete"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}
