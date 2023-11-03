import React, { useContext } from "react";

import Store from "./Store";
import "./home.css";

import Loading from "../../components/loading/Loading";
import { storeContext } from "../../context/StoreProvider";
const Home = () => {
  const { loading, stores, cart, addToCart, removeFromCart } =
    useContext(storeContext);

  return (
    <div className="home-wrapper">
      <h3>Welcome to rastaTech one-stop shop</h3>
      {loading ? (
        <Loading />
      ) : (
        <div className="items">
          {stores.map((item, idx) => (
            <Store
              key={idx}
              item={item}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
