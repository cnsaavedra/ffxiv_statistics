import React from "react";
import "./App.css";
import { CardLinks } from "./UIComponents/CardLinks";

export const MainPage = () => {
  return (
      <div class="main">
        <CardLinks pageName="FCStatistics" fullName="Free Company Demographics"/>
        <CardLinks pageName="N/A" fullName="N/A"/>
        <CardLinks pageName="N/A" fullName="N/A"/>
      </div>
  )
};

export default MainPage;
