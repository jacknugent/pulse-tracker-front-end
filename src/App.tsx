import React, { useState } from "react";
import { subscribeToTimer } from "./api";

const App = () => {
  const [times, setTimes] = useState("loading...");

  subscribeToTimer((err: any, timestamp: any) => setTimes(timestamp));

  return (
    <div className="App">
      <header className="App-header">
        <p>{times}</p>
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
