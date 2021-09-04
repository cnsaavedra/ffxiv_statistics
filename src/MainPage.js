import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import FCStatistics from "./FreeCompany/FCStatistics";
import EmptyPage from "./EmptyPage";
import MainMenu from "./UIComponents/MainMenu";
import Header from "./UIComponents/Header";
import WhatIsUp from "./Server/WhatIsUp";
import Fashion from "./Server/Fashion";

export const MainPage = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={MainMenu} />
          <Route exact path="/fc-statistics" component={FCStatistics} />
          <Route exact path="/what-is-up" component={WhatIsUp} />
          <Route path="/fashion" component={Fashion} />
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
