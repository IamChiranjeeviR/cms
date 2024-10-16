import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CombinedRoutes from "./routes/CombinedRoutes";

const App = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<CombinedRoutes />} />
      </Routes>
    </>
  );
};

export default App;
