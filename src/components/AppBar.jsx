const AppBar = ({ page, setPage }) => {
  return (
    <div className="sticky top-0 z-10 px-0 py-4 shadow-md bg-slate-700">
      <div className="container flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Book's Bee</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setPage("books")}
                className={`text-white hover:text-blue-300 ${
                  page === "books" && "font-bold"
                }`}
              >
                Books
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("collections")}
                className={`text-white hover:text-blue-300 ${
                  page === "collections" && "font-bold"
                }`}
              >
                Collections
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AppBar;
