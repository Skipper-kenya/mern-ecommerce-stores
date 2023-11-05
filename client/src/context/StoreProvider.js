import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const storeContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const [cookie, setCookie] = useCookies(["auth_token"]);

  //cartItems count manager
  const [cart, setCart] = useState({});

  const [ready, setReady] = useState(false);

  const [isHover, setIsHover] = useState(false);

  //cartItems to be delivered for processing

  const defaultItems = () => {
    const items = {};
    for (let i = 1; i <= 20; i++) {
      items[i] = 0;
    }
    return items;
  };

  const [deliveryItems, setDeliveryItems] = useState(defaultItems());

  const [checkOutItems, setCheckOutItems] = useState([]);

  const [isUserRedirected, setIsUserRedirected] = useState(false);

  //the actual items to be delivered to the backend
  const [finalCheckout, setFinalCheckout] = useState([]);
  const items = [];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.REACT_APP_GET_DATA_ROUTE);

        const storesCopy = response.data.storeItems;

        setStores(storesCopy);

        setLoading(false);

        const cartItems = defaultItems();
        setCart(cartItems);
        setReady(true);
      } catch (error) {
        setLoading(false);
        console.log(`error at fetch data:client${error.message}`);
      }
    };
    fetchItems();
  }, []);

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    setDeliveryItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    setDeliveryItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const editInput = (id, value) => {
    setCart((prev) => ({ ...prev, [id]: value }));
    setDeliveryItems((prev) => ({ ...prev, [id]: value }));
  };

  const removeCartItem = (id) => {
    setCart((prev) => ({ ...prev, [id]: 0 }));
    setDeliveryItems((prev) => ({ ...prev, [id]: 0 }));
  };

  const populateSubTotal = () => {
    if (ready) {
      let total = 0;
      for (let i = 0; i < 20; i++) {
        const item = stores[i];
        if (cart[item.id] > 0) {
          const subTotal = item.price * cart[item.id];
          total += subTotal;
        }
      }
      return total;
    }
  };

  const totalPrice = Math.round(populateSubTotal() * 100) / 100;

  const values = {
    items,
    ready,
    stores,
    loading,
    cart,
    addToCart,
    removeFromCart,
    removeCartItem,
    editInput,
    totalPrice,
    cookie,
    setCookie,
    isHover,
    setIsHover,
    deliveryItems,
    setDeliveryItems,
    checkOutItems,
    setCheckOutItems,
    finalCheckout,
    setFinalCheckout,
    isUserRedirected,
    setIsUserRedirected,
  };

  return (
    <storeContext.Provider value={values}>{children}</storeContext.Provider>
  );
};

export default StoreProvider;
