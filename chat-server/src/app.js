import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 1000
});

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
});

app.get("/", (req, res) => {
  res.sendFile("Hello Chatting App Server");
});

io.on("connection", socket => {
  socket.on("chat", data => {
    console.log(`Message from ${data.name}: ${data.msg}`);

    const msg = {
      from: {
        name: data.name
      },
      msg: data.msg
    };

    socket.broadcast.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.name}`);
  });
});

server.listen(3000, () => {
  console.log("app is running on port 3000");
});
