import { useEffect, useState } from "react";
import { getIds, getItems } from "./api";

import "./App.css";

function App() {

  const [ids, setIds] = useState([])
  const [items, setItems] = useState([])

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
      <div>Hello World!</div>
    </div>
  );
}

export default App;
