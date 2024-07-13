// PlansContext.js
import React, { createContext, useState, useContext } from 'react';

const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  return (
    <PlansContext.Provider value={{ plans, setPlans }}>
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => useContext(PlansContext);
