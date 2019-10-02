import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

const subscribeToRoute = (cb: any) => {
  socket.on("estimates", (estimate: any) => cb(null, estimate));
  socket.emit("subscribeToRoute", 3504, 100);
};
export { subscribeToRoute };
