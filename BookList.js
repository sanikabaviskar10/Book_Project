import React, {useEffect, useState} from 'react';
import {fetchBooks, deleteBook} from '../api';
import {Link} from 'react-router-dom';
import BookForm from './BookForm';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?"))
    {
      await deleteBook(id);
      loadBooks();
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Book Inventory Management</h1>

     
      <BookForm refreshBooks={loadBooks} editingBook={editingBook} setEditingBook={setEditingBook} />

   
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3">Title</th>
              <th className="border px-6 py-3">Author</th>
              <th className="border px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="text-center hover:bg-gray-50">
                <td className="border px-6 py-4">{book.title}</td>
                <td className="border px-6 py-4">{book.author}</td>
                <td className="border px-6 py-4 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => setEditingBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/books/${book.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
