import { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductApi";
import UserAPI from "./api/UserApi";
import CategoriesAPI from "./api/CategoryApi";
import io from "socket.io-client";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // socketio
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  const state = {
    productsAPI: ProductsAPI(),
    categoriesAPI: CategoriesAPI(),
    userAPI: UserAPI(),
    socket,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
