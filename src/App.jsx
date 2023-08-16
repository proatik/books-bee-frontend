import { Fragment, useState } from "react";

// main contexts.
import { MainnContextProvider } from "./contexts/MainContext";

// react components.
import Books from "./pages/Books";
import AppBar from "./components/AppBar";
import Collections from "./pages/Collections";

// simple router.
const Router = ({ page }) => {
  switch (page) {
    case "books":
      return <Books />;
    case "collections":
      return <Collections />;
    default:
      return null;
  }
};

function App() {
  const [page, setPage] = useState("books");

  return (
    <Fragment>
      <MainnContextProvider>
        <AppBar page={page} setPage={setPage} />
        <Router page={page} />
      </MainnContextProvider>
    </Fragment>
  );
}

export default App;
