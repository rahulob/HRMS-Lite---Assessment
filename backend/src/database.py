from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGO_URL)
database = client[DATABASE_NAME]

employee_collection = database.get_collection("employee")
attendance_collection = database.get_collection("attendance")

async def create_indexes():
    await employee_collection.create_index("email", unique=True)
    await employee_collection.create_index("employee_id", unique=True)