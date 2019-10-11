import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("localhost:8000");

const App = () => {
  const [estimates, setEstimates] = useState("loading...");
  const [route, setRoute] = useState(3503);

  const changeSocket = (route: any) => {
    setRoute(route);
  };

  useEffect(() => {
    // waiting for an event
    socket.on("estimates", (estimate: any) => setEstimates(estimate));

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // sending an event
    socket.emit("subscribeToRoute", route, 100);
  }, [route]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{estimates}</p>
        <select
          value={route}
          onChange={(e: any) => changeSocket(e.target.value)}
        >
          <option value={3504}>east</option>
          <option value={3503}>west</option>
        </select>
      </header>
    </div>
  );
};

export default App;
