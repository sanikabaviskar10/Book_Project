import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {addBook, updateBook} from '../api';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publishedDate: yup
    .number()
    .typeError('Published Year must be a number')
    .required('Published Year is required'),
  publisher: yup.string().required('Publisher is required'),
  overview: yup.string().required('Overview is required'),
});

export default function BookForm({refreshBooks, editingBook, setEditingBook }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
     if (editingBook) 
     {
       reset(editingBook);
     }
  }, [editingBook, reset]);

  const onSubmit = async (data) => {
    if (editingBook) 
    {
      await updateBook(editingBook.id, data);
      setEditingBook(null);
    }
    else
    {
      await addBook(data);
    }
    reset();
    refreshBooks();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register('title')}
          className="w-full p-2 border rounded"
          placeholder="Enter book title"
        />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-medium">Author</label>
        <input
          {...register('author')}
          className="w-full p-2 border rounded"
          placeholder="Enter author name"
        />
        <p className="text-red-500 text-sm">{errors.author?.message}</p>
      </div>
      <div>
        <label className="block mb-1 font-medium">Published Year</label>
        <input
          {...register('publishedDate')}
          className="w-full p-2 border rounded"
          placeholder="Enter published year (e.g. 2020)"
        />
        <p className="text-red-500 text-sm">{errors.publishedDate?.message}</p>
      </div>
      <div>
        <label className="block mb-1 font-medium">Publisher</label>
        <input
          {...register('publisher')}
          className="w-full p-2 border rounded"
          placeholder="Enter publisher"
        />
        <p className="text-red-500 text-sm">{errors.publisher?.message}</p>
      </div>
      <div>
        <label className="block mb-1 font-medium">Overview</label>
        <textarea
          {...register('overview')}
          className="w-full p-2 border rounded"
          placeholder="Enter overview"
        />
        <p className="text-red-500 text-sm">{errors.overview?.message}</p>
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        {editingBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}
