import React from "react";
import ReactDOM from "react-dom";
import FCStatistics from "./FreeCompany/FCStatistics";

function App() {
  return (
    <div className="App">
      <FCStatistics />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);