import { useMain } from "../contexts/MainContext";

const Book = ({ book, handleRemove }) => {
  return (
    <div className="flex flex-row h-40 p-2 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-32 h-full mr-2 text-2xl rounded-md bg-slate-600 text-slate-400">
        Book
      </div>
      <div className="relative w-full">
        <h2 className="mb-2 text-lg font-semibold">{book.name}</h2>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-2 text-lg font-semibold text-green-600">
          ${book.price}
        </p>
        <div className="absolute flex flex-row justify-end bottom-1 right-1">
          <button
            onClick={() => handleRemove(book.book_id)}
            className="p-1 mr-1 text-red-600 transition-all rounded-full bg-slate-200 hover:bg-slate-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const BookList = ({ active, list, setModals }) => {
  const { collections, removeBook } = useMain();

  const handleRemove = (book_id) => {
    const { collection_id } = active;

    removeBook({ collection_id, book_id });
  };
  return (
    <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
      {list.map((book) => (
        <Book key={book.book_id} book={book} handleRemove={handleRemove} />
      ))}

      {collections.length && (
        <button
          onClick={() => setModals({ book: true, collection: false })}
          className="flex flex-row items-center justify-center h-40 p-2 transition-all border border-transparent rounded-lg shadow-md text-slate-400 bg-slate-700/40 hover:text-sky-600 hover:border-sky-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BookList;
