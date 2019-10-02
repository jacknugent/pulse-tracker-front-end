import React, { useState } from "react";
import { subscribeToRoute } from "./api";

const App = () => {
  const [estimates, setEstimates] = useState("loading...");
  const [route, setRoute] = useState(3503);

  subscribeToRoute((err: any, estimate: any) => setEstimates(estimate), 3503);

  return (
    <div className="App">
      <header className="App-header">
        <p>{estimates}</p>
        <select value={route} onChange={(e: any) => setRoute(e.target.value)}>
          <option value={3503}>east</option>
          <option value={3504}>west</option>
        </select>
      </header>
    </div>
  );
};

export default App;
