import React, { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import "./popup-menu.css";

export const PopupMenu = ({ 
    names,
    prices,
    brands,
    setChosenName,
    setChosenPrice,
    setChosenBrand,
    nameIsOpen,
    setNameIsOpen,
    priceIsOpen,
    setPriceIsOpen,
    brandIsOpen,
    setBrandIsOpen,
    products,
    loading, 
    setIsLoading,
}) => {

    // const [log, setLog] = useState("");
    // const [prevVal, setPrevVal] = useState(1100);
    // const setLogIfArrowClicked = e => {
    //     let currentVal = parseInt(e.target.value);
    //     if (currentVal > prevVal) {
    //       if (currentVal - prevVal === 100) {
    //         setLog(`${log}+`);
    //       } else {
    //         setLog(`${log}`);
    //       }
    //     } else {
    //       setLog(`${log}`);
    //     }
    //     setPrevVal(currentVal);
    //     setChosenPrice(currentVal);
    // };



    // const delayedFunction = (e) => debounce(setLogIfArrowClicked, 5000)(e);

    const [log, setLog] = useState(1100);
    const [delayedChosenPrice, setDelayedChosenPrice] = useState(1100);

  useEffect(() => {
    const delayedFunction = debounce((e) => {
      if (e.key === 'ArrowUp') {
        setLog((prevLog) => prevLog + 1);
      } else if (e.key === 'ArrowDown') {
        setLog((prevLog) => prevLog - 1);
      }
      
    }, 500);

    window.addEventListener('keydown', delayedFunction);

    return () => {
      window.removeEventListener('keydown', delayedFunction);
    };
  }, []);

  const handleChange = (e) => {
    setLog(e.target.value);
    setDelayedChosenPrice(Number(e.target.value));
  };

  useEffect(() => {
    const delayedFunction = setTimeout(() => {
      setChosenPrice(delayedChosenPrice);
    }, 500);

    return () => {
      clearTimeout(delayedFunction);
    };
  }, [delayedChosenPrice]);
  
  return (
    <div className="popup-menus">
        <div className="popup-menu">
        <button
            className="sort-button"
            onClick={() => {
                setNameIsOpen(!nameIsOpen);
                setPriceIsOpen(false);
                setBrandIsOpen(false);
            }}
        >
            Filter by name
        </button>
        <div className={`menu-options ${nameIsOpen ? "open" : ""}`}>
                {products.map((item, index) => {
                    return (
                        <div className="menu-item" key={index}                             onClick={(e) => {
                            setChosenName(item);
                            setNameIsOpen(false);
                            }}>
                            {item}
                        </div>
                    )
                })}
        </div>
        </div>
        <input 
            type="number" 
            value={log} 
            onChange={handleChange}
            step={100}
            disabled={loading ? "disabled" : ''}
        ></input>
        <div className="popup-menu">
        <button
            className="sort-button"
            onClick={() => {
                setBrandIsOpen(!brandIsOpen);
                setNameIsOpen(false);
                setPriceIsOpen(false);
            }}
        >
            Filter by brand
        </button>
        <div className={`menu-options ${brandIsOpen ? "open" : ""}`}>
            {brands.map((item, index) => {
                return (
                    <div className="menu-item" key={index}
                    onClick={(e) => {
                        setChosenBrand(item);
                        setBrandIsOpen(false);
                        }}>
                        {item}
                    </div>
                )
            })}
        </div>
        </div>
    </div>
  );
};