import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import FCStatistics from "../FreeCompany/FCStatistics";
import MainPage from "../MainPage";

export const CardLinks = ({ pageName, fullName }) => {
  return (
    <div>
      <Router>
        <Switch>
          <Link class="card" to={pageName}>
            {fullName}
          </Link>
          <Route exact path={"/" + pageName} component={FCStatistics} />
          <Router>
            <Link class="card" to={pageName}>
              {fullName}
            </Link>
            <Route exact path={"/" + pageName} component={MainPage} />
          </Router>
        </Switch>
      </Router>
    </div>
  );
};

export default CardLinks;
