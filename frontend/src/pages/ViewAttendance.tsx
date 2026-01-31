import { useEffect, useState } from "react"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "../components/ui/select"
import { toast } from "sonner"
import apiInstance from "../api/api_instance"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "../components/ui/table"

interface Employee {
    _id: string
    employee_id: string
    fullname: string
}

interface Attendance {
    _id: string
    employee_id: string
    status: string
    date: string
}

export default function ViewAttendance() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("")
    const [month, setMonth] = useState("0") // 0 → Entire Year
    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [attendance, setAttendance] = useState<Attendance[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Fetch all employees for the dropdown
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

    // Fetch attendance whenever employee/month/year changes
    useEffect(() => {
        const fetchAttendance = async () => {
            if (!selectedEmployeeId || !year) return

            setIsLoading(true)
            setAttendance([])

            try {
                const response = await apiInstance.get("/attendance/by-employee", {
                    params: {
                        employee_id: selectedEmployeeId,
                        month: parseInt(month),
                        year: parseInt(year)
                    }
                })

                const sorted = response.data.sort(
                    (a: Attendance, b: Attendance) => new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                setAttendance(sorted)
            } catch (error: any) {
                toast.error(error.response?.data?.detail || "Failed to fetch attendance.")
                setAttendance([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchAttendance()
    }, [selectedEmployeeId, month, year])

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "present":
                return "text-green-600 font-semibold"
            case "absent":
                return "text-red-600 font-semibold"
            case "leave":
                return "text-yellow-600 font-semibold"
            default:
                return ""
        }
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    }

    return (
        <div className="p-4 mx-auto max-w-4xl">
            <Card className="p-6 space-y-4">
                <h2 className="text-xl font-bold">View Attendance</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Employee</label>
                        <Select
                            value={selectedEmployeeId}
                            onValueChange={setSelectedEmployeeId}
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Month</label>
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger>
                                <SelectValue>{month === "0" ? "Entire Year" : month}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Entire Year</SelectItem>
                                {[...Array(12)].map((_, idx) => (
                                    <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                                        {idx + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Year</label>
                        <Input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-4 mt-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>
                <Table className="min-w-[500px]">
                    <TableCaption>
                        {selectedEmployeeId
                            ? `Attendance for Employee ID: ${selectedEmployeeId}`
                            : "Select an employee to view attendance"}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold px-4 py-2">Date</TableHead>
                            <TableHead className="font-semibold px-4 py-2">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-4">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : attendance.length > 0 ? (
                            attendance.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell className="px-4 py-2">{formatDate(record.date)}</TableCell>
                                    <TableCell className={`px-4 py-2 ${getStatusColor(record.status)}`}>
                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-4">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
