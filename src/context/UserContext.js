/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [mealsInCart, setMealsInCart] = useState([]);
  const [mealIds, setMealIds] = useState([]);
  const [auth, setAuth] = useState({});

  return (
    <UserContext.Provider value={{
      showPasswordField, setShowPasswordField,
      mealsInCart, setMealsInCart,
      mealIds, setMealIds,
      auth, setAuth,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;