import React, { useContext } from "react";
import { storeContext } from "../../context/StoreProvider";

import { Trash } from "phosphor-react";

const CartItem = ({ item, items }) => {
  const { title, image, description, price, id, category } = item;

  const { removeFromCart, addToCart, editInput, removeCartItem, cart } =
    useContext(storeContext);

  return (
    <div className="cartItem">
      <div className="cart-logic">
        <div className="left-cart">
          <img src={image} alt={category} />
        </div>
        <div className="middle-cart">
          <b>
            <p>{title}</p>
          </b>
          <p>{description}</p>
        </div>
        <div className="right-cart">${price}</div>
      </div>

      <div className="bottom-cart">
        <div className="bottom-left">
          <button onClick={() => removeCartItem(id)}>
            <Trash />
            REMOVE
          </button>
        </div>
        <div className="bottom-right">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input
            type="text"
            value={cart[id]}
            onChange={(e) => editInput(id, e.target.value)}
          />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
