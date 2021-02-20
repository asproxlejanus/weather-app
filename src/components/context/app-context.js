import React, { useState } from "react";

export const AppContext = React.createContext(null);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({});

  const setCity = (city) => {
    setState({ ...state, city });
  };

  return (
    <AppContext.Provider value={{ state, setCity }}>
      {children}
    </AppContext.Provider>
  );
};
