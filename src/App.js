import { useEffect, useState } from "react";
import { getIds, getItems, getFields, filterItems } from "./api";
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
  let [errorMessage, setErrorMessage] = useState("");
  const [chosenName, setChosenName] = useState("");
  const [chosenPrice, setChosenPrice] = useState("");
  const [chosenBrand, setChosenBrand] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  const [nameIsOpen, setNameIsOpen] = useState(false);
  const [priceIsOpen, setPriceIsOpen] = useState(false);
  const [brandIsOpen, setBrandIsOpen] = useState(false);
  // const [priceFilteredIds, setPriceFilteredIds] = useState([]);


  const getOriginalIds = (items) => {
    const uniqueObjects = items.filter((obj, index, self) => 
      index === self.findIndex((t) => (
          t.id === obj.id
      ))
    );
    return uniqueObjects
  }

  const sortArray = (arr) => {
    arr.sort(function(a, b) {
      return a - b;
    })

    return arr
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

  const errorProcessing = (error) => {
    setIsLoading(false);
    setItems([]);
    setErrorMessage("Something get wrong. Please, try again later");
    if (error.response && error.response.status === 401) {
      console.error("Ошибка аутентификации: Некорректная авторизационная строка");
    } else {
      console.error("Ошибка при получении данных: ", error);
    }
  }

  useEffect(() => {
    setInitialRender(false);
  }, [])

  useEffect(() => {
    setErrorMessage("");
    getIds({currentPage: currentPage})
      .then((res) => {
        setIds(res.result);
        return res.result;
      })
      .then((res) => {
        // console.log(res);
        getItems(res)
          .then((res) => {
            setItems(getOriginalIds(res.result));
            setIsLoading(false)
            return res;
          })
          .catch((error) => {
            errorProcessing(error);
          })
      })
      .catch((error) => {
        errorProcessing(error);
      })
      getFields({currentPage: currentPage, field: "brand"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setBrands(getUniqueArr({arr: result}));
        })
        .catch((error) => {
          errorProcessing(error);
        })
      getFields({currentPage: currentPage, field: "product"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setNames(getUniqueArr({arr: result}));
        })
        .catch((error) => {
          errorProcessing(error);
        })
      getFields({currentPage: currentPage, field: "price"})
        .then((res) => {
            // console.log("initial", res);
            return res.result;
        })
        .then((result) => {
            setPrices(sortArray(getUniqueArr({arr: result})));
        })
        .catch((error) => {
          errorProcessing(error);
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

  useEffect(() => {
    if (!initialRender) {
      setItems([]);
      setErrorMessage('');
      setIsLoading(true);
      filterItems(chosenPrice)
      .then((res) => {
        return res.result;
      })
      .then((res) => {
        getItems(res)
        .then((result) => {
          setIsLoading(false);
          setItems(result.result);
          // console.log(result);
        })
        .catch((error) => {
          errorProcessing(error);
        })
      })
      .catch((error) => {
        errorProcessing(error);
      })
    }
  }, [chosenPrice])

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
          prices={prices}
          brands={brands}
          setChosenName={setChosenName}
          setChosenPrice={setChosenPrice}
          setChosenBrand={setChosenBrand}
          nameIsOpen={nameIsOpen}
          setNameIsOpen={setNameIsOpen}
          priceIsOpen={priceIsOpen}
          setPriceIsOpen={setPriceIsOpen}
          brandIsOpen={brandIsOpen}
          setBrandIsOpen={setBrandIsOpen}
        />
      ) : (
        ""
      )}
      {loading && <Loader />}
      {errorMessage ? <div style={{ color: "red", marginTop: "180px" }}>{errorMessage}</div> : ""}
    </div>
  );
}

export default App;