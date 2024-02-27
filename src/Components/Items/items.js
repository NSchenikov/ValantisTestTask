
import { Pagination } from "../Pagination/pagination";
import { PopupMenu } from "../popup-menu/popup-menu";
import "./items.css";

export const Items = ({
  items, 
  currentPage, 
  setCurrentPage, 
  handldeClick,           
  names,
  setNames,
  prices,
  setPrices,
  brands,
  setBrands}) => {

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
        setNames={setNames}
        prices={prices}
        setPrices={setPrices}
        brands={brands}
        setBrands={setBrands}
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