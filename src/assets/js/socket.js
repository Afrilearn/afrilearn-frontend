const socketClient = require("socket.io-client");

const HerokuURL = "https://afrilearn-backend-01.herokuapp.com/";
const LocalURL = "http://localhost:5000/";
const SERVER = LocalURL;

const socket = socketClient(SERVER);
export default socket;
