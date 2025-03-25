let books = [
    { id: 1, title: "Book One", author: "Author One", publishedDate: "2023", publisher: "Publisher One", overview: "Overview of Book One" },
    { id: 2, title: "Book Two", author: "Author Two", publishedDate: "2024", publisher: "Publisher Two", overview: "Overview of Book Two" },
  ];
  
  export const fetchBooks = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(books);
      }, 500);
    });
  };
  
  export const fetchBookById = (id) => {
    return new Promise((resolve, reject) => {
      const book = books.find((b) => b.id === parseInt(id));
      setTimeout(() => {
        if (book) resolve(book);
        else reject("Book not found");
      }, 500);
    });
  };
  
  export const saveBook = (book) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (book.id) 
        {
          books = books.map((b) => (b.id === book.id ? book : b));
        } 
        else 
        {
          book.id = books.length + 1;
          books.push(book);
        }
        resolve(book);
      }, 500);
    });
  };
  export const deleteBook = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        books = books.filter((b) => b.id !== id);
        resolve();
      }, 500);
    });
  };
  