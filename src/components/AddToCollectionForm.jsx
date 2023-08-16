import { useState } from "react";

// contexts.
import { useMain } from "../contexts/MainContext";

const AddToCollectionForm = ({ active, closeModals }) => {
  const { books, addBook, bookList } = useMain();

  const [bookId, setBookId] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;

    setBookId(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { collection_id } = active;

    const book = books.find(({ book_id }) => book_id == bookId);

    addBook({ collection_id, book });
    closeModals();
  };

  return (
    <div className="p-4 bg-white border rounded-lg border-slate-400">
      <h2 className="mb-4 text-lg font-semibold text-center">{active?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="book"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <select
            id="book"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option key={0} value={0}>
              All
            </option>
            {books.map(({ book_id, name }) => {
              return (
                <option
                  key={book_id}
                  value={book_id}
                  disabled={bookList.some((book) => book.book_id == book_id)}
                  className="disabled:bg-slate-200"
                >
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-1 mt-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddToCollectionForm;
