from fastapi import FastAPI, Depends
from app.database import engine, get_db
from app.models import Base, Book, Member, Borrowing
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    

@app.post("/return")
def return_book(db: Session = Depends(get_db)):

    borrowing = (
        db.query(Borrowing)
        .filter(Borrowing.returned_at == None)
        .first()
    )

    if not borrowing:
        return {
            "message": "No active borrowed book found"
        }

    borrowing.returned_at = datetime.utcnow()

    db.commit()

    return {
        "message": f"Book {borrowing.book_id} returned successfully"
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
    
@app.post("/borrow")
def borrow_book(db: Session = Depends(get_db)):

    books = db.query(Book).all()

    member = db.query(Member).first()

    if not books:
        return {
            "message": "No books found"
        }

    if not member:
        return {
            "message": "No member found"
        }

    available_book = None

    for book in books:

        active_borrow = (
            db.query(Borrowing)
            .filter(
                Borrowing.book_id == book.id,
                Borrowing.returned_at == None
            )
            .first()
        )

        if not active_borrow:
            available_book = book
            break

    if not available_book:
        return {
            "message": "No books available for borrowing"
        }

    new_borrowing = Borrowing(
        member_id=member.id,
        book_id=available_book.id,
        borrowed_at=datetime.utcnow(),
        returned_at=None
    )

    db.add(new_borrowing)
    db.commit()

    return {
        "message": f"Book {available_book.id} borrowed successfully"
    }

@app.put("/books/{book_id}")
def update_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()

    if not book:
        return {
            "message": "Book not found"
        }

    book.title = "Updated Python Book"
    book.author = "Updated Author"

    db.commit()

    return {
        "message": "Book updated successfully"
    }
    
@app.put("/members/{member_id}")
def update_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()

    if not member:
        return {
            "message": "Member not found"
        }

    member.name = "Updated John Doe"
    member.contact_info = "updated@example.com"

    db.commit()

    return {
        "message": "Member updated successfully"
    }