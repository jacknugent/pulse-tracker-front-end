import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import bus from "./utils/pulseBus.gif";

const socket = openSocket("https://9195fabe.ngrok.io");

const globalStyles = css`
  html,
  body {
    height: 100%;
    font-family: helvetica;
    margin: 0;
  }
  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  // margin-bottom: 20vh;
`;
const Title = styled.h1`
  text-align: center;
  font-size: calc(1rem + 6vw);
  margin: 0;
`;

const Times = styled.p`
  text-align: center;
  margin: 0;
  font-size: calc(1.5rem + 3vw);
  margin-bottom: 1rem;
`;

const Bus = styled.div`
  display: flex;
  justify-content: center;
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
  max-width: 100%;
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
    socket.emit("room", 3504);
    socket.on("estimate", function(data: any) {
      if (data) {
        const stopInfo = JSON.parse(data);
        setStopName(stopInfo.stpnm);
        setEstimates(stopInfo.estimates);
      } else {
        setEstimates([]);
      }
    });
  }, []);

  return (
    <Container>
      <Global styles={globalStyles} />
      <Title>{stopName.replace("BOUND STATION", "")}</Title>
      <Estimates>
        {estimates.map((estimate: any, i: number) => (
          <div key={i}>
            <Times>{estimate}</Times>
            <Bus>
              <img src={bus} alt="bus icon"></img>
            </Bus>
          </div>
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
