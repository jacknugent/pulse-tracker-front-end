import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("localhost:8000");

const App = () => {
  const [estimates, setEstimates] = useState("loading...");
  const [route, setRoute] = useState(3504);

  const changeSocket = (newRoute: any) => {
    console.log("old route", route);
    setRoute(previousState => {
      socket.emit("leaveRoom", previousState);
      socket.emit("room", newRoute);
      return newRoute;
    });
  };

  useEffect(() => {
    // waiting for an event
    socket.on("connect", function() {
      socket.emit("room", route);
    });
  }, []);

  socket.on("estimate", function(data: any) {
    setEstimates(data);
  });

  return (
    <div>
      <header>
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
