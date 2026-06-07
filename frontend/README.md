# Neighborhood Library Service

## Project Overview

Neighborhood Library Service is a full-stack web application developed using FastAPI, PostgreSQL, SQLAlchemy, Pydantic, and Next.js.

The application allows users to manage books and members, borrow and return books, and track borrowing history through a simple dashboard interface.

---

## Features

### Book Management

* Add new books
* View all books
* Update existing books

### Member Management

* Add new members
* View all members
* Update existing members

### Borrowing Management

* Borrow a specific book for a specific member
* Prevent borrowing of already borrowed books
* Return a specific borrowed book
* View borrowing history
* Track active and returned borrowings

### Validation

* Request validation using Pydantic schemas
* Automatic error handling for invalid inputs

---

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

### Frontend

* Next.js
* React
* Fetch API
* Tailwind CSS

### Infrastructure

* Docker
* Docker Compose

---

## Application Flow

User
 │
 ▼
Next.js Frontend
 │
 ▼
FastAPI Backend
 │
 ▼
Pydantic Validation
 │
 ▼
SQLAlchemy ORM
 │
 ▼
PostgreSQL Database

---

## Project Structure

Neighborhood_Library_App/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md


---

## Database Tables

### Books

| Column | Type    |
| ------ | ------- |
| id     | Integer |
| title  | String  |
| author | String  |

### Members

| Column       | Type    |
| ------------ | ------- |
| id           | Integer |
| name         | String  |
| contact_info | String  |

### Borrowings

| Column      | Type     |
| ----------- | -------- |
| id          | Integer  |
| member_id   | Integer  |
| book_id     | Integer  |
| borrowed_at | DateTime |
| returned_at | DateTime |

---

## API Endpoints

### Books

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | /books           | Get all books  |
| POST   | /books           | Add a new book |
| PUT    | /books/{book_id} | Update a book  |

### Members

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | /members             | Get all members  |
| POST   | /members             | Add a new member |
| PUT    | /members/{member_id} | Update a member  |

### Borrowing

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | /borrow         | Borrow a book          |
| POST   | /return         | Return a book          |
| GET    | /borrowed-books | View borrowing history |

---

## Setup Instructions

### Clone Repository


git clone <repository-url>
cd Neighborhood_Library_App


### Start Application


docker compose up --build


### Frontend


cd frontend
npm install
npm run dev

Frontend:


http://localhost:3000

Backend Swagger:


http://localhost:8000/docs


---

## Business Rules

* A book cannot be borrowed if it already has an active borrowing record.
* A returned book can be borrowed again.
* Active borrowings are identified using:


returned_at = NULL


* Borrow and Return operations are validated using Pydantic schemas.

---

## Future Enhancements

* Delete books and members
* Search and filtering
* Authentication and authorization
* Due dates and overdue tracking
* Email notifications
* Pagination

---

## Key Concepts Demonstrated

* REST API Development using FastAPI
* Dependency Injection using FastAPI Depends
* Request Validation using Pydantic
* Database Modeling using SQLAlchemy
* PostgreSQL Integration
* Dockerized Application Deployment
* Frontend Integration with React and Next.js
* Business Logic Validation
* CRUD Operations
* Client-Server Communication using Fetch API


## Author

Sutikshna Srivastava
