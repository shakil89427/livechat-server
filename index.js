const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());

/* Create instance */
const io = new Server(server, {
  cors: {
    origin: "https://shakil-live.netlify.app"
  },
});

/* Main Connection */
io.on("connection", (socket) => {
  /* Join Room */
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  /* Send Messages */
  socket.on("send_msg", (data) => {
    socket.to(data.room).emit("receive_msg", data);
  });

  /* Disconnect */
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

/* Checking route */
app.get("/", (req, res) => {
  res.send("Server running...");
});

/* Port Listening */
server.listen(port, () => {
  console.log("Listening to", port);
});
