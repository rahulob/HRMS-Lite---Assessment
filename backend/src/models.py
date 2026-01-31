from pydantic import BaseModel, EmailStr, Field

class EmployeeCreate(BaseModel):
    email: EmailStr
    employee_id: str = Field(..., alias="employee-id")
    fullname: str
    department: str

    class Config:
        validate_by_name = True
