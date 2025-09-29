import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => res.send("PixelChain API running"));

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(4000, () => console.log("Backend listening on 4000"));