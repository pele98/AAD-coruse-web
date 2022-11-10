import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <UserContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};