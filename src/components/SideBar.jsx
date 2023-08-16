const Sidebar = ({ active, setActive, setModals, collections }) => {
  return (
    <div className="h-full py-8 pr-4">
      <h2 className="px-3 py-4 mb-2 text-2xl font-bold text-center rounded-md bg-slate-700/40 text-slate-200">
        Collections
      </h2>
      <ul className="py-4 space-y-2">
        {collections.map(({ collection_id, name }) => {
          return (
            <li
              key={collection_id}
              onClick={() => setActive({ collection_id, name })}
              className={`px-3 py-2 text-white transition-all rounded-md cursor-pointer hover:bg-slate-600/70 ${
                collection_id == active.collection_id
                  ? "bg-slate-600"
                  : "bg-slate-700/40"
              }`}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => setModals({ bool: false, collection: true })}
        className="flex justify-center w-full px-3 py-2 text-white transition-all rounded-md cursor-pointer hover:bg-sky-700 bg-sky-600"
      >
        Add New Collection
      </button>
    </div>
  );
};

export default Sidebar;
