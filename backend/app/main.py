from fastapi import FastAPI
from app.database import engine
from app.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Neighborhood Library Service API"
    }
    
@app.get("/books")
def get_books():
    return [
        {
            "id": 1,
            "title": "Python Basics"
        },
        {
            "id": 2,
            "title": "FastAPI Guide"
        }
    ]