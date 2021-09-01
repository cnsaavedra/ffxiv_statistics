import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./Main/MainPage";

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);