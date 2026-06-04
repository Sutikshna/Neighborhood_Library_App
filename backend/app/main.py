from fastapi import FastAPI, Depends
from app.database import engine, get_db
from app.models import Base, Book, Member, Borrowing
from sqlalchemy.orm import Session
from datetime import datetime

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
    new_book = Book(
    title="Python Basics",
    author="Unknown"
    )

    db.add(new_book)
    db.commit()

    return {
        "message": "Book added successfully"
    }
    
@app.post("/members")
def add_member(db: Session = Depends(get_db)):
    new_member = Member(
        name="John Doe",
        contact_info="john@example.com"
    )

    db.add(new_member)
    db.commit()

    return {
        "message": "Member added successfully"
    }
    
@app.get("/members")
def get_members(db: Session = Depends(get_db)):
    members = db.query(Member).all()

    return [
        {
            "id": member.id,
            "name": member.name,
            "contact_info": member.contact_info
        }
        for member in members
    ]
    
@app.post("/borrow")
def borrow_book(db: Session = Depends(get_db)):
    new_borrowing = Borrowing(
        member_id=1,
        book_id=1,
        borrowed_at=datetime.utcnow(),
        returned_at=None
    )

    db.add(new_borrowing)
    db.commit()

    return {
        "message": "Book borrowed successfully"
    }
    
@app.post("/return")
def return_book(db: Session = Depends(get_db)):
    borrowing = db.query(Borrowing).first()

    borrowing.returned_at = datetime.utcnow()

    db.commit()

    return {
        "message": "Book returned successfully"
    }
    
@app.get("/borrowed-books")
def get_borrowed_books(db: Session = Depends(get_db)):
    borrowings = db.query(Borrowing).all()

    return [
        {
            "id": borrowing.id,
            "member_id": borrowing.member_id,
            "book_id": borrowing.book_id,
            "borrowed_at": borrowing.borrowed_at,
            "returned_at": borrowing.returned_at
        }
        for borrowing in borrowings
    ]