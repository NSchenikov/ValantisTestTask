import React, { useEffect, useState, useRef } from "react";
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
}) => {

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
                        <div 
                            className="menu-item" 
                            key={index} 
                            onClick={(e) => {setChosenPrice(item);
                            setPriceIsOpen(false);
                            }}>
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