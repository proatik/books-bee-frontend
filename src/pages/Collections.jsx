import { useEffect, useState } from "react";

// main context.
import { useMain } from "../contexts/MainContext";

// react components.
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
import BookList from "../components/BookList";
import AddCollectionForm from "../components/AddCollectionForm";
import AddToCollectionForm from "../components/AddToCollectionForm";

const modalStates = {
  book: false,
  collection: false,
};

function Collections() {
  const { collections, bookList, fetchBookList } = useMain();

  const [active, setActive] = useState({});
  const [modals, setModals] = useState(modalStates);

  useEffect(() => {
    if (collections.length) {
      setActive(collections[0]);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(active).length) {
      fetchBookList(active.collection_id);
    }
  }, [active]);

  const closeModals = () => {
    setModals({ book: false, collection: false });
  };

  return (
    <div className="container flex flex-row min-h-[calc(100vh-61px)]">
      <div className=" w-60">
        <Modal isOpen={modals.collection} onClose={closeModals}>
          <AddCollectionForm closeModals={closeModals} />
        </Modal>

        <Modal isOpen={modals.book} onClose={closeModals}>
          <AddToCollectionForm active={active} closeModals={closeModals} />
        </Modal>

        <SideBar
          active={active}
          setActive={setActive}
          setModals={setModals}
          collections={collections}
        />
      </div>

      <div className="w-full">
        <BookList setModals={setModals} active={active} list={bookList} />
      </div>
    </div>
  );
}

export default Collections;
