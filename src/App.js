import { useEffect, useState } from "react";
import { getIds, getItems, getFields, filterItemsByPrice, filterItemsByName, filterItemsByBrand } from "./api";
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
  const [resetCount, setResetCount] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  const products = ["кольцо", "колье", "серьги", "браслет", "комплект", "ложка", "кулон", "брошь", "пусеты", "цепочка", "подвес", "бусы", "подстаканник"]


  const getOriginalIds = (items) => {
    const uniqueObjects = items.filter((obj, index, self) => 
      index === self.findIndex((t) => (
          t.id === obj.id
      ))
    );
    return uniqueObjects
  }

  // const sortArray = (arr) => {
  //   arr.sort(function(a, b) {
  //     return a - b;
  //   })

  //   return arr
  // }

  const getUniqueArr = ({arr}) => {
    const uniqueArr = arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      const updatedArray = uniqueArr.filter(value =>
        value !== null
      );

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
    // setItems([]);
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
      getFields({currentPage: currentPage, field: "brand", limit: 9000})
        .then((res) => {
            // console.log("brands", res);
            return res.result;
        })
        .then((result) => {
            setBrands(getUniqueArr({arr: result}));
        })
        .catch((error) => {
          errorProcessing(error);
        })

  }, [currentPage, resetCount]);

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids])

  useEffect(() => {
    console.log(items);
  }, [items])

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
      setIsFiltered(true);
      setItems([]);
      setErrorMessage('');
      setIsLoading(true);
      filterItemsByPrice(chosenPrice)
      .then((res) => {
        return res.result;
      })
      .then((res) => {
        getItems(res)
        .then((result) => {
          setItems(result.result);
          setIsLoading(false);
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

  useEffect(() => {
    if (!initialRender) {
      setIsFiltered(true);
      setItems([]);
      setErrorMessage('');
      setIsLoading(true);
      filterItemsByName(chosenName)
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
  }, [chosenName])

  useEffect(() => {
    if (!initialRender) {
      setIsFiltered(true);
      setItems([]);
      setErrorMessage('');
      setIsLoading(true);
      filterItemsByBrand(chosenBrand)
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
  }, [chosenBrand])

  return (
    <div className="App">
      <Header/>
            {items && brands && names && prices ? (
        <Items
          items={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handldeClick={handldeClick}
          brands={brands}
          setChosenName={setChosenName}
          setChosenPrice={setChosenPrice}
          setChosenBrand={setChosenBrand}
          nameIsOpen={nameIsOpen}
          setNameIsOpen={setNameIsOpen}
          setPriceIsOpen={setPriceIsOpen}
          brandIsOpen={brandIsOpen}
          setBrandIsOpen={setBrandIsOpen}
          products={products}
          loading={loading}
          setResetCount={setResetCount}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
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