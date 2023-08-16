import { useState, useEffect } from "react";

// contexts.
import { useMain } from "../contexts/MainContext";

const formValues = {
  name: "",
  price: "",
  author: "",
};

const BookForm = ({ onAddBook }) => {
  const {
    status,
    setModal,
    candidate,
    setStatus,
    createBook,
    updateBook,
    setCandidate,
  } = useMain();

  const [values, setValues] = useState(formValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "create") {
      createBook(values);
    } else if (status === "update") {
      updateBook(values);
    }

    setModal(false);
    setCandidate({});
    setStatus("create");
  };

  useEffect(() => {
    if (status === "update") {
      setValues(candidate);
    }
  }, []);

  return (
    <div className="p-4 bg-white border rounded-lg border-slate-400">
      <h2 className="mb-4 text-lg font-semibold text-center">
        {status === "update" ? "Update Book" : "Add Book"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            required
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="w-full p-2 py-1 mt-1 border rounded-md border-slate-400 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            required
            type="text"
            id="author"
            name="author"
            value={values.author}
            onChange={handleChange}
            className="w-full p-2 py-1 mt-1 border rounded-md border-slate-400 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            required
            id="price"
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            pattern="^\d{0,4}(\.\d{0,2})?$"
            className="w-full px-2 py-1 mt-1 border rounded-md border-slate-400 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-1 mt-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {status === "update" ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
