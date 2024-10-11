"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [environment, setEnvironment] = useState('SMP CH TEST');

  useEffect(() => {
    const savedEnvironment = localStorage.getItem('selectedEnvironment');
    if (savedEnvironment) {
      setEnvironment(savedEnvironment);
    }
  }, []);

  const updateEnvironment = (newEnv) => {
    setEnvironment(newEnv);
    localStorage.setItem('selectedEnvironment', newEnv);
  };

  return (
    <AppContext.Provider value={{ environment, updateEnvironment }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};