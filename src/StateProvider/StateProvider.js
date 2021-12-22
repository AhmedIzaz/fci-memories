import React, { useContext, useReducer } from "react";

const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialstate, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialstate)}>
      {children}
    </StateContext.Provider>
  );
};

const useStateValue = () => useContext(StateContext);

export default useStateValue;
