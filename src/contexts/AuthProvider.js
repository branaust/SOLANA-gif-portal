import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <AuthContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
