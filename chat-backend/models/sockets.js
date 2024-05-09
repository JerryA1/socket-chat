// controllers
const {
  connectedUser,
  disconnectedUser,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
// helpers
const { checkJwt } = require("../helpers/jwt");

// ----------------------------------------------------------------------

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valid, uid] = checkJwt(socket.handshake.query["x-token"]);

      if (!valid) {
        console.log("invalid token");
        return socket.disconnect();
      }

      const user = await connectedUser(uid);
      console.log("connected client", socket.id, uid, user.name);

      socket.join(uid);

      this.io.emit("user-list", await getUsers());

      socket.on("send-message", async (payload) => {
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("send-message", message);
        this.io.to(payload.from).emit("send-message", message);
      });

      socket.on("disconnect", async () => {
        await disconnectedUser(uid);
        console.log("client disconnected", socket.id, uid, user.name);
        this.io.emit("user-list", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
