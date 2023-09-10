import { useState, createContext } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
