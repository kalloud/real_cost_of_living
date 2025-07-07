from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import endpoints

app = FastAPI()

# Allow frontend dev server to talk to API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI backend running."}


app.include_router(endpoints.router)
