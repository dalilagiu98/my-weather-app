import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNav from "./component/MyNav";
import SearchingCity from "./component/SearchingCity";
import ShowCity from "./component/ShowCity";
import Details from "./component/Details";
import MyFooter from "./component/MyFooter";
import NotFound from "./component/NotFound";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <BrowserRouter>
      <div className='d-flex flex-column h-100'>
        <header>
          <MyNav />
        </header>
        <main className='flex-grow-1'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <SearchingCity
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                  <ShowCity searchValue={searchValue} />
                </>
              }
            />
            <Route path='/details/:cityId' element={<Details />} />
            <Route element={<NotFound />} path='*' />
          </Routes>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
