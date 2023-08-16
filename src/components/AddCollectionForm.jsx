import { useState } from "react";

// contexts.
import { useMain } from "../contexts/MainContext";

const AddCollectionForm = ({ closeModals }) => {
  const { createCollection } = useMain();

  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCollection(name);
    closeModals();
  };

  return (
    <div className="p-4 bg-white border rounded-lg border-slate-400">
      <h2 className="mb-4 text-lg font-semibold text-center">
        Add New Collection
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
            value={name}
            onChange={handleChange}
            className="w-full p-2 py-1 mt-1 border rounded-md border-slate-400 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-1 mt-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Collection
        </button>
      </form>
    </div>
  );
};

export default AddCollectionForm;
