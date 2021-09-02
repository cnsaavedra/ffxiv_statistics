import React from "react";
import FCStatistics from "../FreeCompany/FCStatistics";
import "../App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

export const MainMenu = () => {
  return (
    <div class="main">
      <Link class="card" to="/fc-statistics">FC Demographics</Link>
      <Link class="card" to="/empty">Under Construction</Link>
      <Link class="card" to="/empty">Under Construction</Link>
    </div>
  );
};

export default MainMenu;
