const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const httpServer = require("http").createServer();
app.use(cors());

/* Create instance */
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://shakil-live.netlify.app",
    methods: ["GET", "POST"],
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

app.get("/", (req, res) => {
  res.send("server running");
});

/* Port Listening */
app.listen(port, () => {
  console.log("listening to", port);
});
