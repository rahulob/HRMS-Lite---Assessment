from fastapi import FastAPI
from src.routes import router
from src.database import create_indexes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
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

app.include_router(router)
