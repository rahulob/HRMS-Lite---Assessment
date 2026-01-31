from fastapi import APIRouter, HTTPException
from src.models.AttendanceModel import AttendanceCreate
from src.database import attendance_collection
from src.database import employee_collection
from datetime import datetime
attendance_router = APIRouter(prefix="/api/attendance", tags=["Attendance"])

@attendance_router.post("/mark")
async def mark_attendance(attendance: AttendanceCreate):
    # Check if employee exists
    employee = await employee_collection.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(
            status_code=404,
            detail=f"Employee with ID '{attendance.employee_id}' not found."
        )

    # Convert date → datetime
    attendance_dict = attendance.dict()
    attendance_dict["date"] = datetime.combine(
        attendance.date, datetime.min.time()
    )

    existing = await attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": attendance_dict["date"]
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    await attendance_collection.insert_one(attendance_dict)
    return {"message": "Attendance marked successfully"}
