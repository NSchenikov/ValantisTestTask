import { useEffect, useState } from "react";
import { getIds, getItems, getFields } from "./api";
import {Items} from './Components/Items/items'
import { Loader } from "./Components/Loader/loader";
import {Header} from "./Components/Header/header"

import "./App.css";

function App() {

  const [ids, setIds] = useState([])
  const [items, setItems] = useState([])
  const [loading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [names, setNames] = useState([]);
  const [prices, setPrices] = useState([]);
  const [brands, setBrands] = useState([]);

  const getOriginalArr = (items) => {
    const uniqueObjects = items.filter((obj, index, self) => 
      index === self.findIndex((t) => (
          t.id === obj.id
      ))
    );
    return uniqueObjects
  }

  const getUniqueArr = ({arr}) => {
    const uniqueArr = arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      const updatedArray = uniqueArr.map((value) => {
        if (value === null) {
          return "with no point";
        } else {
          return value;
        }
      });
      return updatedArray;
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
      getFields({currentPage: currentPage, field: "brand"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setBrands(getUniqueArr({arr: result}));
        })
      getFields({currentPage: currentPage, field: "product"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setNames(getUniqueArr({arr: result}));
        })
      getFields({currentPage: currentPage, field: "price"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setPrices(getUniqueArr({arr: result}));
        })
  }, [currentPage]);

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids])

  // useEffect(() => {
  //   console.log(items);
  // }, [items])

  // useEffect(() => {
  //   console.log(brands);
  // }, [brands])

  // useEffect(() => {
  //   console.log(prices);
  // }, [prices])

  // useEffect(() => {
  //   console.log(names);
  // }, [names])

  return (
    <div className="App">
      <Header/>
            {items && brands ? (
        <Items
          items={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handldeClick={handldeClick}
          names={names}
          setNames={setNames}
          prices={prices}
          setPrices={setPrices}
          brands={brands}
          setBrands={setBrands}
        />
      ) : (
        ""
      )}
      {loading && <Loader />}
    </div>
  );
}

export default App;
