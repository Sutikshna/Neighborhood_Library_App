from fastapi import FastAPI, Depends
from app.database import engine, get_db
from app.models import Base, Book
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Neighborhood Library Service API"
    }
    
@app.get("/books")
def get_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()

    return [
        {
            "id": book.id,
            "title": book.title
        }
        for book in books
    ]
    
@app.post("/books")
def add_book(db: Session = Depends(get_db)):
    new_book = Book(title="Python Basics")

    db.add(new_book)
    db.commit()

    return {
        "message": "Book added successfully"
    }