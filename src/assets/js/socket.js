const socketClient = require("socket.io-client");
const { LocalServer, HerokuServer } = require("./api");

const SERVER = HerokuServer;

const socket = socketClient(SERVER);
export default socket;
