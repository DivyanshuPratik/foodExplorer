import React, { useContext, useEffect } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import axios from 'axios'
const FoodDisplay = ({ category }) => {
  const { food_list, setFoodList ,cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const fetchFoodList = async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/food/list");
      setFoodList(response.data.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchFoodList();
  },[])
  const renderFoodItem = (item) => {
    const itemCount = cartItems[item._id] || 0;

    return (
      <div className="food-item" key={item._id}>
        <div className="image-container">
        {/* {item.image}  */}
          <img src={`http://localhost:3000/images/${item.Image}`} className="itemImg" alt={item.name} />
          {itemCount > 0 ? (
            <div className="item-count fade-in">
              <button className="decrement-button" onClick={() => removeFromCart(item._id)}>
                -
              </button>
              <span className="xyz">{itemCount}</span>
              <button className="increment-button" onClick={() => addToCart(item._id)}>
                +
              </button>
            </div>
          ) : (
            <button className="add-button" onClick={() => addToCart(item._id)}>
              +
            </button>
          )}
        </div>
        <div className="item-name">{item.name}</div>
        <div className="item-desc">{item.desc}</div>
        <div className="item-price">{item.price}$</div>
      </div>
    );
  };

  return (
    <div className="food-display">
      <h1>Here are some of our best dishes</h1>
      <div className="items">
        {category === "ALL"
          ? food_list.map(renderFoodItem)
          : food_list.filter((obj) => obj.category === category).map(renderFoodItem)}
      </div>
    </div>
  );
};

export default FoodDisplay;
