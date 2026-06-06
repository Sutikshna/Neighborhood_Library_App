# Neighborhood Library Service

## Project Overview

Neighborhood Library Service is a full-stack web application that allows users to manage books, members, and borrowing records in a library system.

The application provides functionality to:

* Add books
* View books
* Update books
* Add members
* View members
* Update members
* Borrow books
* Return books
* View borrowing history

---

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Docker

### Frontend

* Next.js
* React
* TypeScript

---

## Architecture

```text
Next.js Frontend
        |
        v
FastAPI REST APIs
        |
        v
SQLAlchemy ORM
        |
        v
PostgreSQL Database
```

---

## Project Structure

```text
Neighborhood_Library_App
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── models.py
│   │   └── database.py
│   │
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── package.json
│   └── next.config.ts
│
├── docker-compose.yml
└── README.md
```

---

## Database Schema

### Book

| Field  | Type    |
| ------ | ------- |
| id     | Integer |
| title  | String  |
| author | String  |

### Member

| Field        | Type    |
| ------------ | ------- |
| id           | Integer |
| name         | String  |
| contact_info | String  |

### Borrowing

| Field       | Type     |
| ----------- | -------- |
| id          | Integer  |
| book_id     | Integer  |
| member_id   | Integer  |
| borrowed_at | DateTime |
| returned_at | DateTime |

---

## API Endpoints

### Books

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /books           |
| POST   | /books           |
| PUT    | /books/{book_id} |

### Members

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /members             |
| POST   | /members             |
| PUT    | /members/{member_id} |

### Borrowing

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /borrow         |
| POST   | /return         |
| GET    | /borrowed-books |

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd Neighborhood_Library_App
```

### Start Backend

```bash
docker compose up --build
```

Backend Swagger UI:

```text
http://localhost:8000/docs
```

### Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

## Testing Steps

### Add Book

1. Open frontend dashboard
2. Click "Add Book"
3. Verify new book appears in Books section

### Add Member

1. Click "Add Member"
2. Verify new member appears in Members section

### Borrow Book

1. Click "Borrow Book"
2. Verify borrowing record appears
3. Verify status shows Active Borrow

### Return Book

1. Click "Return Book"
2. Verify borrowing status changes to Returned

---

## Features Implemented

* PostgreSQL database integration
* SQLAlchemy ORM models
* FastAPI REST APIs
* Dockerized backend
* Next.js frontend dashboard
* Borrow and return workflow
* Book and member management
* Borrow status tracking
* CORS configuration
* Interactive frontend controls

---

## Future Improvements

* User authentication
* Delete APIs
* Search functionality
* Pagination
* Enhanced UI design
* Dynamic member and book selection during borrowing

---

## Author

Sutikshna Srivastava
