
import { Pagination } from "../Pagination/pagination";
import { PopupMenu } from "../popup-menu/popup-menu";
import "./items.css";

export const Items = ({
  items, 
  currentPage, 
  setCurrentPage, 
  handldeClick,           
  brands,
  setChosenName,
  setChosenPrice,
  setChosenBrand,
  nameIsOpen,
  setNameIsOpen,
  setPriceIsOpen,
  brandIsOpen,
  setBrandIsOpen,
  products,
  loading, 
  setResetCount,
  isFiltered,
  setIsFiltered,
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
        handldeClick={handldeClick}
        setIsFiltered={setIsFiltered}
      />
      <ul className="myUL">{itemsList}</ul>
      {!isFiltered && <Pagination
        items={items}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handldeClick={handldeClick}
      />}
    </div>);
};