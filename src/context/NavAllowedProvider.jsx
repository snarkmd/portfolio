import { createContext, useContext, useState } from "react";
const NavAllowedContext = createContext();

export const NavAllowedProvider = ({ children }) => {
  const [isNavAllowed, setIsNavAllowed] = useState(true);
  const toggleNavAllowed = () => setIsNavAllowed((prev) => !prev);
  return (
    <NavAllowedContext.Provider value={{ isNavAllowed, toggleNavAllowed }}>
      {children}
    </NavAllowedContext.Provider>
  );
};

export const useNavAllowed = () => {
  return useContext(NavAllowedContext);
};
