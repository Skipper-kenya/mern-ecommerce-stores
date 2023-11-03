import React, { useContext, useRef, useState } from "react";
import { storeContext } from "../../context/StoreProvider";

const Store = ({ item, cart, addToCart }) => {
  const {
    setDeliveryItems,
    setCheckOutItems,
  } = useContext(storeContext);

  const noOfItems = (id) => {
    if (cart[id] > 0) {
      return <span>{cart[id]}</span>;
    }
  };

  const handleAddToCart = async (id) => {
    await addToCart(id);

    const updQty = Number(cart[id]) + 1;

    await setDeliveryItems((prev) => ({ ...prev, [id]: updQty }));
    setCheckOutItems((prev) => [...prev, {}]);
  };

  return (
    <div className="item">
      <img src={item.image} alt={item.title} />
      <div className="itCred">
        <h3>{item.title}</h3>
        <h4>Price: ${item.price}</h4>
        <button className="btnCred1" onClick={() => handleAddToCart(item.id)}>
          Add to Cart {noOfItems(item.id)}
        </button>
      </div>
    </div>
  );
};

export default Store;
