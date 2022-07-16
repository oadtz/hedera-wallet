import React from "react";
import { Route, Routes } from "react-router-dom";

import AppContext from "../context/AppContext";
import Home from "../pages/Home";
import Login from "../pages/Login";

const App: React.FunctionComponent = () => {
  return (
    <AppContext>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AppContext>
  );
};

export default App;
