
import { Pagination } from "../Pagination/pagination";
import { PopupMenu } from "../popup-menu/popup-menu";
import "./items.css";

export const Items = ({
  items, 
  currentPage, 
  setCurrentPage, 
  handldeClick,           
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
  setResetCount,
}) => {

  let itemsList = items.map((item, index) => {
    return (
      <li
        key={index}
      >
        <div>id товара: {item.id}</div>
        <div>Название товара: {item.product}</div>
        <div>Цена товара: {item.price} руб.</div>
        <div>Бренд товара: {item.brand ? item.brand : 'нет информации о бренде товара'}</div> 
        <br/>
      </li>
    );
  });
  return (
    <div>
      <PopupMenu 
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
        products={products}
        loading={loading}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setResetCount={setResetCount}
        handldeClick={handldeClick}
      />
      <ul className="myUL">{itemsList}</ul>
      <Pagination
        items={items}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handldeClick={handldeClick}
      />
    </div>);
};