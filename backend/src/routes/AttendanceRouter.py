from fastapi import APIRouter, HTTPException, Query
from src.models.AttendanceModel import AttendanceCreate
from src.database import attendance_collection
from src.database import employee_collection
from datetime import datetime
from bson import ObjectId
from typing import List

attendance_router = APIRouter(prefix="/api/attendance", tags=["Attendance"])

def serialize_attendance(attendance: dict) -> dict:
    """Convert ObjectId to string and datetime to date string."""
    return {
        "_id": str(attendance["_id"]),
        "employee_id": attendance["employee_id"],
        "status": attendance["status"],
        "date": attendance["date"].strftime("%Y-%m-%d")
    }

@attendance_router.get("/by-employee")
async def get_attendance_by_employee(
    employee_id: str = Query(..., description="ID of the employee"),
    month: int = Query(..., ge=0, le=12, description="Month (1-12), or 0 for entire year"),
    year: int = Query(..., description="Year, e.g. 2026")
) -> List[dict]:
    """
    Get all attendance records for a given employee in a specific month/year.
    """
    # Check if employee exists
    employee = await employee_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=404,
            detail=f"Employee with ID '{employee_id}' not found."
        )

    # check if month == 0; meaning the data for whole year
    if month == 0:
        # Entire year
        start_date = datetime(year, 1, 1)
        end_date = datetime(year + 1, 1, 1)
    else:
        # Specific month
        start_date = datetime(year, month, 1)
        if month == 12:
            end_date = datetime(year + 1, 1, 1)
        else:
            end_date = datetime(year, month + 1, 1)

    records = attendance_collection.find({
        "employee_id": employee_id,
        "date": {"$gte": start_date, "$lt": end_date}
    })

    result = []
    async for record in records:
        result.append(serialize_attendance(record))

    if not result:
        raise HTTPException(status_code=404, detail="No attendance records found for this employee in the given period")

    return result

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
