"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowings, setBorrowings] = useState([]);

  const loadData = () => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));

    fetch("http://localhost:8000/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));

    fetch("http://localhost:8000/borrowed-books")
      .then((res) => res.json())
      .then((data) => setBorrowings(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBook = async () => {
    await fetch("http://localhost:8000/books", {
      method: "POST",
    });

    loadData();
  };

  const addMember = async () => {
    await fetch("http://localhost:8000/members", {
      method: "POST",
    });

    loadData();
  };

  const borrowBook = async () => {
  const response = await fetch(
    "http://localhost:8000/borrow",
    {
      method: "POST",
    }
  );

  const data = await response.json();

  alert(data.message);

  loadData();
};



  const returnBook = async () => {
  const response = await fetch(
    "http://localhost:8000/return",
    {
      method: "POST",
    }
  );

  const data = await response.json();

  alert(data.message);

  loadData();
};

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Neighborhood Library Service
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={addBook}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>

        <button
          onClick={addMember}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Member
        </button>

        <button
          onClick={borrowBook}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Borrow Book
        </button>

        <button
          onClick={returnBook}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Return Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4">Books</h2>

          <ul>
            {books.map((book: any) => (
              <li key={book.id} className="mb-2">
                #{book.id} - {book.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4">Members</h2>

          <ul>
            {members.map((member: any) => (
              <li key={member.id} className="mb-2">
                #{member.id} - {member.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Borrowed Books
          </h2>

          <ul>
            {borrowings.map((borrowing: any) => (
  <li key={borrowing.id} className="mb-2">
    Book #{borrowing.book_id} → Member #{borrowing.member_id}
    {" "}
    {borrowing.returned_at
      ? "(Returned)"
      : "(Active Borrow)"}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}