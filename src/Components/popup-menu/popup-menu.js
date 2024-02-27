import React, { useEffect, useState, useRef } from "react";
import { getFields } from "../../api";
import "./popup-menu.css";

export const PopupMenu = ({ 
    names,
    setNames,
    prices,
    setPrices,
    brands,
    setBrands
}) => {

  const [nameIsOpen, setNameIsOpen] = useState(false);
  const [priceIsOpen, setPriceIsOpen] = useState(false);
  const [brandIsOpen, setBrandIsOpen] = useState(false);

  const savedEvent = useRef(null);

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
                {names.map((item, index) => {
                    return (
                        <div className="menu-item" key={index}>
                            {item}
                        </div>
                    )
                })}
        </div>
        </div>
        <div className="popup-menu">
        <button
            className="sort-button"
            onClick={() => {
                setPriceIsOpen(!priceIsOpen);
                setNameIsOpen(false);
                setBrandIsOpen(false);
            }}
        >
            Filter by price
        </button>
        <div className={`menu-options ${priceIsOpen ? "open" : ""}`}>
            {prices.map((item, index) => {
                    return (
                        <div className="menu-item" key={index}>
                            {item}
                        </div>
                    )
            })}
        </div>
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
            Filter by brand
        </button>
        <div className={`menu-options ${brandIsOpen ? "open" : ""}`}>
            {brands.map((item, index) => {
                return (
                    <div className="menu-item" key={index}>
                        {item}
                    </div>
                )
            })}
        </div>
        </div>
    </div>
  );
};