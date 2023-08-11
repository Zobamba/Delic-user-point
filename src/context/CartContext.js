/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [mealsInCart, setMealsInCart] = useState([]);
  const [mealIds, setMealIds] = useState([]);
  const [auth, setAuth] = useState({});

  return (
    <CartContext.Provider value={{
      mealsInCart, setMealsInCart,
      mealIds, setMealIds,
      auth, setAuth,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;