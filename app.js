const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();


const port = process.env.PORT || 8000;
const index = require("./index");

const app = express();
//app.use(index);
router.get("/", (req, res) => {
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
});
  res.send({ response: "I am alive" }).status(200);
});

const server = http.createServer(app);

const io = socketIo(server);


server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app