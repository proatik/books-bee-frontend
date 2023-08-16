import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const MainContext = createContext();

export const useMain = () => {
  return useContext(MainContext);
};

const queryStates = {
  search: "",
  author: "",
  collection_id: "",
};

export const MainnContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [status, setStatus] = useState("create");
  const [candidate, setCandidate] = useState({});
  const [collections, setCollections] = useState([]);
  const [queries, setQueries] = useState(queryStates);

  // fetch all books.
  const fetchBooks = async () => {
    try {
      const url = "http://localhost:3000/api/books/";

      const response = await axios.get(url, { params: queries });
      const books = await response.data?.books;

      setBooks(books);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch books of a collection.
  const fetchBookList = async (collection_id) => {
    try {
      const url = `http://localhost:3000/api/collections/books/${collection_id}`;

      const response = await axios.get(url);
      const books = await response.data?.books;

      setBookList(books);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all authors.
  const fetchAuthors = async () => {
    try {
      const url = "http://localhost:3000/api/books/authors";

      const response = await axios.get(url);
      const authors = await response.data?.authors;

      setAuthors(authors);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all collections.
  const fetchCollectios = async () => {
    try {
      const url = "http://localhost:3000/api/collections";

      const response = await axios.get(url);
      const collections = await response.data?.collections;

      setCollections(collections);
    } catch (error) {
      console.log(error);
    }
  };

  // create a book.
  const createBook = async (values) => {
    try {
      const url = "http://localhost:3000/api/books";

      const response = await axios.post(url, { ...values });
      const { status, book } = await response.data;

      if (status === 201) {
        setBooks([...books, book]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update a book.
  const updateBook = async (values) => {
    try {
      const { book_id } = values;

      const url = `http://localhost:3000/api/books/${book_id}`;

      const response = await axios.patch(url, { ...values });
      const { status, message } = await response.data;

      if (status === 200) {
        const updatedBooks = books.map((prev) => {
          return prev.book_id == values.book_id ? values : prev;
        });

        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete a book.
  const deleteBook = async (book_id) => {
    try {
      const url = `http://localhost:3000/api/books/${book_id}`;

      const { status } = await axios.delete(url);

      if (status === 204) {
        const updatedBooks = books.filter((book) => book.book_id != book_id);

        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // create a collection.
  const createCollection = async (name) => {
    try {
      const url = "http://localhost:3000/api/collections";

      const response = await axios.post(url, { name });
      const collection = await response.data?.collection;

      setCollections([...collections, collection]);
    } catch (error) {
      console.log(error);
    }
  };

  // add a book to a collection.
  const addBook = async ({ collection_id, book }) => {
    try {
      const url = "http://localhost:3000/api/collections/books/add";

      const { book_id } = book;

      const response = await axios.post(url, { collection_id, book_id });
      const { status } = await response.data;

      if (status === 200) {
        setBookList([...bookList, book]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // remove a book from a collection.
  const removeBook = async (values) => {
    try {
      const { book_id } = values;

      const url = "http://localhost:3000/api/collections/books/remove";

      const response = await axios.delete(url, { data: { ...values } });
      const { status } = await response.data;

      if (status === 200) {
        const updatedList = bookList.filter((book) => book.book_id != book_id);
        setBookList(updatedList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCollectios();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [queries]);

  useEffect(() => {
    fetchAuthors();
  }, [books]);

  const props = {
    modal,
    books,
    status,
    queries,
    authors,
    bookList,
    candidate,
    collections,

    addBook,
    setModal,
    setStatus,
    setQueries,
    createBook,
    updateBook,
    removeBook,
    deleteBook,
    setCandidate,
    fetchBookList,
    createCollection,
  };

  return <MainContext.Provider value={props}>{children}</MainContext.Provider>;
};
