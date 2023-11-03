import React, { useContext } from "react";
import "./cart.css";

import { storeContext } from "../../context/StoreProvider";
import CartItem from "./CartItem";
import { ShoppingCartSimple } from "phosphor-react";

import nothing from "../../Assets/nothing.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();

  const { items, stores, cart, totalPrice, deliveryItems } =
    useContext(storeContext);

  const cartArr = Object.values(cart);

  const cartHasItems = cartArr.reduce((sum, item) => {
    return (sum += item);
  }, 0);

  const handleCheckout = async () => {
    try {
      //code to export items array with several objects of items qty and id
      for (let key in deliveryItems) {
        if (deliveryItems[key] > 0) {
          items.push({ id: Number(key), quantity: Number(deliveryItems[key]) });
        }

        try {
          const response = await axios.post(process.env.REACT_APP_STRIPE_URL, {
            items,
          });

          const { url } = response.data;

          window.location.href = url;
        } catch (error) {
          console.log("error at checkout(client)");
        }
      }
    } catch (error) {
      console.log("error at checkout btn(client)");
    }
  };

  return (
    <>
      {cartHasItems > 0 ? (
        <>
          <h3 className="top-cart-header">
            Your Cart Items <ShoppingCartSimple />
          </h3>
          <div className="cart-wrapper">
            <div className="cart-items">
              {stores.map((item) =>
                cart[item.id] > 0 ? (
                  <CartItem key={item.id} item={item} items={items} />
                ) : (
                  ""
                )
              )}
            </div>
            <div className="cartCheckout">
              <h3>Cart Summary</h3>
              <h4>SubTotal : ${totalPrice} </h4>
              <button onClick={handleCheckout}>Checkout $({totalPrice})</button>
            </div>
          </div>
        </>
      ) : (
        <div className="nothing-cart">
          <h3>You have nothing in your cart yet!</h3>
          <button onClick={() => navigate("/")}>Go back Shopping</button>
          <img src={nothing} alt="nothing yet..." />
        </div>
      )}
    </>
  );
};

export default Cart;
