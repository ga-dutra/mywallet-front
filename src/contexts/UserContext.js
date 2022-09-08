import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [cashFlows, setCashFlows] = useState([]);
  const [editingCashFlow, setEditingCashFlow] = useState({});

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        cashFlows,
        setCashFlows,
        editingCashFlow,
        setEditingCashFlow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
