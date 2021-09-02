import React from "react";
import "../App.css";
import { BrowserRouter as Link } from "react-router-dom";
import { withRouter } from "react-router";

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
