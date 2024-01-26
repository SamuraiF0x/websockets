/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const http = require("http");
const net = require("net");
const io = require("socket.io");
// const ioClient = require("socket.io-client");

// Create server
const server = http.createServer();

const socketServer = io(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const LOCAL_IP = "192.168.223.1";
const LOCAL_PORT = 29999;

// Start server
server.listen(LOCAL_PORT, LOCAL_IP, () => {
	console.log(`Server is running on http://${LOCAL_IP}:${LOCAL_PORT}`);
});

socketServer.on("connection", (socket) => {
	console.log("Client connected");

	socket.on("message", (message) => {
		console.log("Received message from client:", message);

		// Confirmation that the message was received by the server
		socket.emit("Potvrda", "Poruka primljena od strane servera");

		// Broadcasting the received message to all connected clients
		socketServer.emit("confirmation", message);

		// Send the received data to the remote server
		client.write(message);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const REMOTE_IP = "192.168.223.128";
const REMOTE_PORT = 30002;

// // Connect to remote server
// const client = ioClient(`http://${REMOTE_IP}:${REMOTE_PORT}`);

// client.on("connect", () => {
// 	console.log(`Connected to server at ${REMOTE_IP}:${REMOTE_PORT}`);
// });

// client.on("message", (message) => {
// 	console.log("Received message from server:", message);
// });

// client.on("disconnect", () => {
// 	console.log("Disconnected from server");
// });

// Connect to remote server
const client = net.createConnection({ port: REMOTE_PORT, host: REMOTE_IP }, () => {
	console.log(`Connected to remote server at ${REMOTE_IP}:${REMOTE_PORT}`);
});

client.on("data", (data) => {
	console.log("Received data from remote server:", data.toString());
});

client.on("end", () => {
	console.log("Disconnected from remote server");
});
