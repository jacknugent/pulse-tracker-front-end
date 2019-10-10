import React, { useState } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("localhost:8000");

const subscribeToRoute = (cb: any, route: number) => {
  socket.on("estimates", (estimate: any) => cb(null, estimate));
  socket.emit("subscribeToRoute", route, 100);
};

const App = () => {
  const [estimates, setEstimates] = useState("loading...");
  const [route, setRoute] = useState(3503);

  const changeSocket = (route: any) => {
    setRoute(route);
    socket.emit("subscribeToRoute", route, 100);
  };

  subscribeToRoute((err: any, estimate: any) => setEstimates(estimate), route);

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
