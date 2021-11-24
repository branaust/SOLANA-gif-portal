import React from "react";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider";
import Main from "./components";

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
