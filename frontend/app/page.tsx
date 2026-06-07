"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

const [name, setName] = useState("");
const [contactInfo, setContactInfo] = useState("");
const [selectedBook, setSelectedBook] = useState("");
const [selectedMember, setSelectedMember] = useState("");
const [selectedReturnBook, setSelectedReturnBook] = useState("");

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
  const response = await fetch(
    "http://localhost:8000/books",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);
  
  
  setTitle("");
  setAuthor("");
  loadData();
};

  const addMember = async () => {
  const response = await fetch(
    "http://localhost:8000/members",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contact_info: contactInfo,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);

  setName("");
  setContactInfo("");

  loadData();
};

 const borrowBook = async () => {
  const response = await fetch(
    "http://localhost:8000/borrow",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: Number(selectedBook),
        member_id: Number(selectedMember),
      }),
    }
  );

  const data = await response.json();

  alert(data.message);

  setSelectedBook("");
  setSelectedMember("");

  loadData();
};



  
const returnBook = async () => {
  const response = await fetch(
    "http://localhost:8000/return",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: Number(selectedReturnBook),
      }),
    }
  );

  const data = await response.json();

  alert(data.message);

  setSelectedReturnBook("");

  loadData();
};

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Neighborhood Library Service
      </h1>

      <div className="mb-6 space-y-4">

  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Book Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Author"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      className="border p-2 rounded"
    />
  </div>

  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Member Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Contact Info"
      value={contactInfo}
      onChange={(e) => setContactInfo(e.target.value)}
      className="border p-2 rounded"
    />
  </div>

</div>

<div className="flex gap-2 mb-4">

  <select
    value={selectedBook}
    onChange={(e) => setSelectedBook(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Select Book</option>

    {books.map((book: any) => (
      <option key={book.id} value={book.id}>
        #{book.id} - {book.title}
      </option>
    ))}
  </select>

  <select
    value={selectedMember}
    onChange={(e) => setSelectedMember(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Select Member</option>

    {members.map((member: any) => (
      <option key={member.id} value={member.id}>
        #{member.id} - {member.name}
      </option>
    ))}
  </select>

  <select
    value={selectedReturnBook}
    onChange={(e) => setSelectedReturnBook(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Select Book To Return</option>

    {borrowings
      .filter((b: any) => !b.returned_at)
      .map((b: any) => (
        <option
          key={b.id}
          value={b.book_id}
        >
          Book #{b.book_id}
        </option>
      ))}
  </select>

</div>

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