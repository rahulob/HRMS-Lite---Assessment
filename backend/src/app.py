from fastapi import FastAPI
from src.routes.EmployeeRouter import router
from src.routes.AttendanceRouter import attendance_router
from src.database import create_indexes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://hrms-lite-assessment-mdnnefofg-rahulobs-projects.vercel.app/"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# health check
@app.get("/api/health")
def health_check():
    return {"message": "API is running"}

# create indexes
@app.on_event("startup")
async def startup_event():
    await create_indexes()

# employee router
app.include_router(router)
#attendance router
app.include_router(attendance_router)