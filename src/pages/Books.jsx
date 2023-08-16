// contexts.
import { useMain } from "../contexts/MainContext";

// react components.
import Book from "../components/Book";
import Empty from "../components/Empty";
import Modal from "../components/Modal";
import BookForm from "../components/BookForm";
import ToolsBar from "../components/ToolsBar";

const Books = () => {
  const { modal, setCandidate, setStatus, setModal, books } = useMain();

  const closeModal = () => {
    setModal(false);
    setCandidate({});
    setStatus("create");
  };

  return (
    <div className="container py-10 mx-auto min-h-[calc(100vh-61px)]">
      <ToolsBar />
      <Modal onClose={closeModal} isOpen={modal}>
        <BookForm />
      </Modal>
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {books.map((book) => (
          <Book closeModal={closeModal} key={book.book_id} book={book} />
        ))}

        {!books.length && <Empty />}
      </div>
    </div>
  );
};

export default Books;
