import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [cashFlows, setCashFlows] = useState([]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, cashFlows, setCashFlows }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
