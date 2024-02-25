import { useEffect, useState } from "react";
import { getIds, getItems } from "./api";
import {Items} from './Components/Items/items'
import { Loader } from "./Components/Loader/loader";
import {Header} from "./Components/Header/header"

import "./App.css";

function App() {

  const [ids, setIds] = useState([])
  const [items, setItems] = useState([])
  const [loading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)

  const getOriginalArr = (items) => {
    const uniqueObjects = items.filter((obj, index, self) => 
      index === self.findIndex((t) => (
          t.id === obj.id
      ))
    );
    return uniqueObjects
  }

  const handldeClick = (e) => {
    e.preventDefault();
    setIds([]);
    setItems([]);
    setIsLoading(true);
  };

  useEffect(() => {
    getIds({currentPage: currentPage})
      .then((res) => {
        setIds(res.result);
        return res.result;
      })
      .then((res) => {
        // console.log(res);
        getItems(res)
          .then((res) => {
            setItems(getOriginalArr(res.result));
            setIsLoading(false)
            return res;
          })
      })
  }, [currentPage]);

  useEffect(() => {
    console.log(ids);
  }, [ids])

  useEffect(() => {
    console.log(items);
  }, [items])

  return (
    <div className="App">
      <Header/>
            {items ? (
        <Items
          items={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handldeClick={handldeClick}
        />
      ) : (
        ""
      )}
      {loading && <Loader />}
    </div>
  );
}

export default App;
