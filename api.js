let books = [
    {
      id: 1,
      title: "Making India Awesome",
      author: "Chetan Bhagat ",
      publishedDate: "2015",
      publisher: "Rupa Publications",
      overview: "Making India Awesome by Chetan Bhagat is a non-fiction book that discusses India's socio-economic and political issues.",
    },
    {
      id: 2,
      title: "The Test of My Life: From Cricket to Cancer and Back",
      author: "Nishant Jeet Arora.",
      publishedDate: "2013",
      publisher: "Random House India.",
      overview: "This autobiography by Yuvraj Singh, co-authored with Sharda Ugra and Nishant Jeet Arora, is an emotional and inspiring account of his journey through cricket, his battle with cancer, and his triumphant comeback.",
    },
  ];
  
  export const fetchBooks = () => Promise.resolve([...books]);
  export const getBookById = (id) => Promise.resolve(books.find(book => book.id === id));
  
  export const addBook = (book) => {
    const newBook = { ...book, id: books.length + 1 };
    books.push(newBook);
    return Promise.resolve(newBook);
  };
  
  export const updateBook = (id, updatedBook) => {
    books = books.map(book => (book.id === id ? { ...book, ...updatedBook } : book));
    return Promise.resolve(updatedBook);
  };
  
  export const deleteBook = (id) => {
    books = books.filter(book => book.id !== id);
    return Promise.resolve(id);
  };
  