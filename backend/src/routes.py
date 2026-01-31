from bson import ObjectId
import pydantic
from src.models import EmployeeCreate
from src.database import employee_collection
from fastapi import APIRouter, HTTPException
from pymongo.errors import DuplicateKeyError

router = APIRouter(prefix="/api/employee", tags=["Employees"])

def serialize_employee(employee):
    if employee:
        employee = employee.copy()
        if "_id" in employee:
            employee["_id"] = str(employee["_id"])
        # Handle any nested ObjectIds if needed
        for key, value in employee.items():
            if isinstance(value, ObjectId):
                employee[key] = str(value)
    return employee

@router.get("/get-all")
async def get_all_employees():
    employees = await employee_collection.find().to_list(length=100)
    return {"employees": [serialize_employee(emp) for emp in employees]}

@router.get("/get-by-id/{employee_id}")
async def get_employee(employee_id: str):
    employee = await employee_collection.find_one({"_id": ObjectId(employee_id)})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"employee": serialize_employee(employee)}

@router.post("/create")
async def create_employee(employee: EmployeeCreate):
    try:
        employee_dict = employee.dict(by_alias=False)
        result = await employee_collection.insert_one(employee_dict)
        full_employee = await employee_collection.find_one({"_id": result.inserted_id})
        return {
            "message": "Employee created successfully",
            "id": str(result.inserted_id),
            "employee": serialize_employee(full_employee)
        }

    except DuplicateKeyError as e:
        if "email" in str(e):
            raise HTTPException(status_code=400, detail="Email already exists")
        if "employee_id" in str(e):
            raise HTTPException(status_code=400, detail="Employee ID already exists")

        raise HTTPException(status_code=400, detail="Duplicate key error")