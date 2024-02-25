import "./items.css";

export const Items = ({items}) => {
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
  return <ul className="myUL">{itemsList}</ul>;
};