const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
// sockets
const Sockets = require("./sockets");
// db
const { dbConnection } = require("../db/config");

// ----------------------------------------------------------------------

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // DB connection
    dbConnection();

    // Htpp server
    this.server = http.createServer(this.app);

    // sockets configurations
    this.io = socketio(this.server, {
      /** Configuaraciones */
    });
  }

  middlewares() {
    // public folder
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // body parser
    this.app.use(express.json());

    this.app.use("/api/login", require("../routes/auth"));
    this.app.use("/api/messages", require("../routes/messages"));
  }

  socketsConfiguration() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.socketsConfiguration();

    this.server.listen(this.port, () => {
      console.log("🚀 Server on port:", this.port);
    });
  }
}

module.exports = Server;
