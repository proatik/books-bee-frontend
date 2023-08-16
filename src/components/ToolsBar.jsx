import { useState, useCallback } from "react";

// utility functions.
import debounce from "../utils/debounce";

// main contexts.
import { useMain } from "../contexts/MainContext";

const queryStates = {
  search: "",
  author: "",
  collection_id: "",
};

const ToolsBar = () => {
  const { setModal, setQueries, authors, collections } = useMain();

  const [values, setValues] = useState(queryStates);

  const debouncedUpdateQuery = useCallback(
    debounce((updates) => {
      setQueries(updates);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "collection_id") {
      value = collections?.find(({ name }) => name === value)?.collection_id;
    }

    debouncedUpdateQuery({ ...values, [name]: value });
  };

  return (
    <div className="flex flex-col items-end px-0 py-4 mb-3 md:flex-row md:justify-end">
      <div className="w-full mb-3 md:mr-4 md:w1/3 lg:w-52">
        <label
          htmlFor="author"
          className="block pl-2 mb-1 text-sm font-medium text-slate-200"
        >
          Author
        </label>
        <select
          id="author"
          name="author"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md lg:w-52 focus:outline-none"
        >
          <option key={0} value="">
            All
          </option>
          {authors.map(({ id, name }) => {
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full mb-3 md:mr-4 md:w1/3 lg:w-52">
        <label
          htmlFor="collection_id"
          className="block pl-2 mb-1 text-sm font-medium text-slate-200"
        >
          Collection
        </label>
        <select
          id="collection_id"
          name="collection_id"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option key={0} value="">
            All
          </option>
          {collections.map(({ collection_id, name }) => {
            return (
              <option key={collection_id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full mb-3 md:mr-4 md:w1/3 lg:w-52">
        <label
          htmlFor="search"
          className="block pl-2 mb-1 text-sm font-medium text-slate-200"
        >
          Search
        </label>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Book Name"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <div className="w-full mt-4 mb-3 md:w1/3 lg:w-52">
        <button
          onClick={() => setModal(true)}
          className="flex justify-center w-full p-2 px-3 py-2 text-white transition-all rounded-md cursor-pointer hover:bg-sky-700 bg-sky-600"
        >
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default ToolsBar;
