import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { toast } from "sonner"; // or your preferred toast library

function CreateEmployeeForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        employee_id: "",
        department: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/employee/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Employee created successfully!");
                setFormData({ fullname: "", email: "", employee_id: "", department: "" });
            } else {
                const errorData = await response.json();
                toast.error(errorData.detail || "Failed to create employee");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create New Employee</CardTitle>
                <CardDescription>
                    Enter information of the new employee below
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                name="fullname"
                                type="text"
                                placeholder="Rahul Gupta"
                                required
                                value={formData.fullname}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </Field>
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
                            <FieldLabel htmlFor="department">Department</FieldLabel>
                            <Input
                                id="department"
                                name="department"
                                type="text"
                                placeholder="IT"
                                required
                                value={formData.department}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </Field>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Employee"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

export function CreateEmployee() {
    return (
        <div className="p-8 max-w-lg mx-auto">
            <CreateEmployeeForm />
        </div>
    );
}