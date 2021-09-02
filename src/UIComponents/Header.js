import React from "react";
import "../App.css";
import { withRouter } from "react-router";
import FCStatistics from "../FreeCompany/FCStatistics";
import MainMenu from "./MainMenu";
import EmptyPage from "../EmptyPage";
import { BrowserRouter as Router, Link } from "react-router-dom";

export const Header = (props) => {
  if (props.location.pathname !== "/") {
    return (
      <div class="header">
        <Link to="/">
          <h1 class="header-text">Home</h1>
        </Link>
        <Link class="header-text" to="/empty">
          <h1 class="header-text">Under Construction</h1>
        </Link>
        <Link class="header-text" to="/empty">
          <h1 class="header-text">Under Construction</h1>
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default withRouter(Header);
