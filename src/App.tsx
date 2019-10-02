import React, { useState } from "react";
import { subscribeToRoute } from "./api";

const App = () => {
  const [estimates, setEstimates] = useState("loading...");

  subscribeToRoute((err: any, estimate: any) => setEstimates(estimate));

  return (
    <div className="App">
      <header className="App-header">
        <p>{estimates}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
