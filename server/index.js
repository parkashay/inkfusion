const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let userDetails = [];
app.get('/', (req, res) => {
  return res.json({
    "Hello": "World"
  })
})

io.on("connection", (socket) => {
  console.log("connection");

  socket.on("frontend-connected", () => {
    socket.broadcast.emit("ready-to-recieve");
  });

  socket.on("canvas-state", (state) => {
    socket.broadcast.emit("canvas-state-from-server", state);
  });

  socket.on("draw-line", ({ prevPoint, currentPoint, color, brushSize }) => {
    socket.broadcast.emit("draw-line", {
      prevPoint,
      currentPoint,
      color,
      brushSize,
    });
  });

  socket.on("clear", () => {
    io.emit("clear");
  });

  socket.on("newUser", (user) => {
    userDetails.push(user);
    io.emit('users', userDetails)
  });

  socket.on("disconnect", () => {
    userDetails = [];
    socket.broadcast.emit('users', userDetails)
  })
});

server.listen(5000, (err) => {
  err ? console.log(err) : console.log("server is running on port 5000");
});
