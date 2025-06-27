"use client";
import { createContext, useState } from "react";
import React from "react";
export const MyContext = createContext(null);
const ContextProvider = ({ children }) => {
  const [username, setusername] = useState("");
  const [room, setroom] = useState(0);
  const [previousmessage, setpreviousmessage] = useState([]);
  return (
    <div>
      <MyContext.Provider
        value={{
          username,
          setusername,
          room,
          setroom,
          previousmessage,
          setpreviousmessage,
        }}
      >
        {children}
      </MyContext.Provider>
    </div>
  );
};

export default ContextProvider;
