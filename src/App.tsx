import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";

const socket = openSocket("https://9195fabe.ngrok.io");

const globalStyles = css`
  html,
  body {
    height: 100%;
  }
  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 8vw;
  margin: 0;
`;

const Estimates = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 7vw;
`;

const Select = styled.select`
  margin: 0 auto;
  display: flex;
  height: 50px;
  font-size: 20px;
`;

const App = () => {
  const [stopName, setStopName] = useState("Loading...");
  const [estimates, setEstimates] = useState([]);
  const [route, setRoute] = useState(3504);

  const changeSocket = (newRoute: any) => {
    setRoute(previousState => {
      socket.emit("leaveRoom", previousState);
      socket.emit("room", newRoute);
      return newRoute;
    });
  };

  useEffect(() => {
    socket.emit("room", route);
    socket.on("estimate", function(data: any) {
      if (data) {
        const stopInfo = JSON.parse(data);
        setStopName(stopInfo.stpnm);
        setEstimates(stopInfo.estimates);
      } else {
        setEstimates([]);
      }
    });
  });

  return (
    <Container>
      <Global styles={globalStyles} />
      <Title>{stopName}</Title>
      <Estimates>
        {estimates.map((estimate: any, i: number) => (
          <div key={i}>{estimate}</div>
        ))}
      </Estimates>
      <Select value={route} onChange={(e: any) => changeSocket(e.target.value)}>
        <option value={3504}>Scott's Addition East</option>
        <option value={3519}>VCU Medical Center West</option>
      </Select>
    </Container>
  );
};

export default App;
