import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.static("public"));
const expressServer = app.listen(5000, "0.0.0.0", () => {
  console.log("server is up and running");
});
const io = new Server(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("this is my id", socket.id);
  socket.on("sendroom", (room) => {
    socket.join(room);
  });
  socket.on("messagefromfrontend", (data) => {
    io.to(data[1]).emit("messagefromserver", data);
  });
});
