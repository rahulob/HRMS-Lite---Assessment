import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { toast } from "sonner"; // or your preferred toast library
import apiInstance from "../api/api_instance";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

function MarkAttendanceForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [formData, setFormData] = useState({
        employee_id: "",
        date: new Date().toISOString().split("T")[0], // default to today
        status: "present", // default
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (status: string) => {
        setFormData({ ...formData, status });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await apiInstance.post("/attendance/mark", formData);

            toast.success("Attendance marked successfully!");
            setFormData({ employee_id: "", date: "", status: "present" });
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>
                    Enter information below to mark the attendance of an employee
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="employee_id">Employee ID</FieldLabel>
                            <Input
                                id="employee_id"
                                name="employee_id"
                                type="text"
                                placeholder="123456"
                                required
                                value={formData.employee_id}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="date">Date</FieldLabel>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
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
    );
}

export default function MarkAttendance() {
    return (
        <div className="p-8 w-1/2 max-w-lg mx-auto">
            <MarkAttendanceForm />
        </div>
    );
}
