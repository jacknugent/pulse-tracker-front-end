import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

const subscribeToRoute = (cb: any, route: number) => {
  socket.on("estimates", (estimate: any) => cb(null, estimate));
  socket.emit("subscribeToRoute", route, 100);
};
export { subscribeToRoute };
