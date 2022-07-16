import React from "react";
import { Route, Routes } from "react-router-dom";

import AppContext from "../context/AppContext";
import Login from "../pages/Login";

const App: React.FunctionComponent = () => {
  return (
    <AppContext>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </AppContext>
  );
};

export default App;
