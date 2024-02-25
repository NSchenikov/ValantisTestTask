import { useEffect, useState } from "react";
import { getIds, getItems } from "./api";
import {Items} from './Components/Items/items'
import { Loader } from "./Components/Loader/loader";

import "./App.css";

function App() {

  const [ids, setIds] = useState([])
  const [items, setItems] = useState([])
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    getIds()
      .then((res) => {
        setIds(res.result);
        return res.result;
      })
      .then((res) => {
        // console.log(res);
        getItems(res)
          .then((res) => {
            setItems(res.result);
            setIsLoading(false)
            return res;
          });
      });
  }, []);

  useEffect(() => {
    console.log(ids);
  }, [ids])

  useEffect(() => {
    console.log(items);
  }, [items])

  return (
    <div className="App">
            {items ? (
        <Items
          items={items}
        />
      ) : (
        ""
      )}
            {loading && <Loader />}
    </div>
  );
}

export default App;
