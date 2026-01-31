from pydantic import BaseModel, Field
from datetime import date, time
from typing import Optional

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str = Field(..., examples=["present", "absent", "leave"])
