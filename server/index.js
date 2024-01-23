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

const users = new Map();

app.get("/", (req, res) => {
  return res.json({
    Status: "Up and Running...",
  });
});

io.on("connection", (socket) => {
  socket.on("frontend-connected", () => {
    socket.broadcast.emit("ready-to-recieve");
  });

  socket.emit(
    "users-list",
    Array.from(users, ([_, user]) => user)
  );

  socket.on("login-user", (username) => {
    for (let [socketId, user] of users) {
      if (user.name === username) {
        users.delete(socketId);
        users.set(socket.id, user);
        break;
      }
    }

    socket.emit(
      "users-list",
      Array.from(users, ([_, user]) => user)
    );
  });

  socket.on("update-user", (payload) => {
    console.log(payload);
    if (users.has(payload.socketId)) {
      users.set(payload.socketId, {
        ...users.get(payload.socketId),
        color: payload.color,
      });
    }

    socket.emit(
      "users-list",
      Array.from(users, ([_, user]) => user)
    );
  });

  socket.on("newUser", (user) => {
    userDetails.push(user);
    users.set(socket.id, user);

    console.log("on-new-user", users);

    io.emit(
      "users-list",
      Array.from(users, ([_, user]) => user)
    );
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

  socket.on("disconnect", () => {
    users.delete(socket.id);
    socket.broadcast.emit(
      "users-list",
      Array.from(users, ([_, user]) => user)
    );
  });
});

server.listen(5000, (err) => {
  err ? console.log(err) : console.log("server is running on port 5000");
});
