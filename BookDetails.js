import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getBookById} from '../api';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await getBookById(parseInt(id));
      setBook(fetchedBook);
    };

    loadBook();
  }, [id]);

  if (!book) 
  {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <p className="mb-2"><strong>Author:</strong> {book.author}</p>
      <p className="mb-2"><strong>Published Year:</strong> {book.publishedDate}</p>
      <p className="mb-2"><strong>Publisher:</strong> {book.publisher}</p>
      <p className="mt-4">{book.overview}</p>

      <Link to="/" className="inline-block mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Back to Book List
      </Link>
    </div>
  );
}
