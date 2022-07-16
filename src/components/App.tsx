import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppContext from "../context/AppContext";
import Account from "../pages/Account";
import Login from "../pages/Login";

const App: React.FunctionComponent = () => {
  return (
    <AppContext>
      <Routes>
        <Route path="/accounts/:accountId" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppContext>
  );
};

export default App;
