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
    setCurrentPage,
    currentPage,
    setResetCount,
    handldeClick,
}) => {

    const [log, setLog] = useState(1100);
    const [delayedChosenPrice, setDelayedChosenPrice] = useState("");

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
    setBrandIsOpen(false);
    setNameIsOpen(false);
    setLog(e.target.value);
    setDelayedChosenPrice(Number(e.target.value));
  };

  useEffect(() => {
    if (delayedChosenPrice) {
      const delayedFunction = setTimeout(() => {
        setChosenPrice(delayedChosenPrice);
      }, 500);

      return () => {
        clearTimeout(delayedFunction);
      };
    }
  }, [delayedChosenPrice]);

  const resetFilters = (e) => {
    handldeClick(e);
    setResetCount(prevCount => prevCount + 1);
  }
  
  return (
    <div className="popup-menus">
      Filter:
        <div className="popup-menu">
        <button
            className="sort-button"
            onClick={() => {
                setNameIsOpen(!nameIsOpen);
                setPriceIsOpen(false);
                setBrandIsOpen(false);
            }}
        >
            by name
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
        <div className="inputWrapper">
          by price
          <input 
          className="inputPrice"
              type="number" 
              value={log} 
              onChange={handleChange}
              step={100}
              disabled={loading ? "disabled" : ''}
          ></input>
        </div>
        <div className="popup-menu">
        <button
            className="sort-button"
            onClick={() => {
                setBrandIsOpen(!brandIsOpen);
                setNameIsOpen(false);
                setPriceIsOpen(false);
            }}
        >
            by brand
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
        <button className="sort-button" 
        onClick={(e) => resetFilters(e)}
        >reset</button>
    </div>
  );
};