import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

const subscribeToTimer = (cb: any) => {
  socket.on("timer", (timestamp: any) => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
};
export { subscribeToTimer };
