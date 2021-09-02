import React from "react";
import "../App.css";
import { BrowserRouter as Link } from "react-router-dom";

export const MainMenu = () => {
  return (
    <div className="main">
      <Link className="card" to="/fc-statistics">FC Demographics</Link>
      <Link className="card" to="/empty">Under Construction</Link>
      <Link className="card" to="/empty">Under Construction</Link>
    </div>
  );
};

export default MainMenu;
