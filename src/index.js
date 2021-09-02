import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";

function App() {
  return (
    <div>
      <MainPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);