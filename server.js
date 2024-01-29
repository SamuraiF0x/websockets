/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const http = require("http");
const net = require("net");
const io = require("socket.io");

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
const REMOTE_PORT = 30003;

// Connect to remote server
const client = net.createConnection({ port: REMOTE_PORT, host: REMOTE_IP }, () => {
	console.log(`Connected to remote server at ${REMOTE_IP}:${REMOTE_PORT}`);
});

client.on("data", (data) => {
	const received = Buffer.from(data);

	const decimalValues = [];
	for (let i = 0; i < received.length; i++) {
		decimalValues.push(received.readUInt8(i));
	}

	const interfaceData = {
		tool: {
			position: {
				x: decimalValues[56],
				y: decimalValues[57],
				z: decimalValues[58],
			},
			orientation: {
				rx: decimalValues[59],
				ry: decimalValues[60],
				rz: decimalValues[61],
			},
			force: {
				x: decimalValues[68],
				y: decimalValues[69],
				z: decimalValues[70],
			},
		},
		jointPositions: decimalValues.slice(32, 38),
		motorTemperatures: decimalValues.slice(87, 93),
		controllerTime: decimalValues[93],
	};

	socketServer.emit("interfaceData", interfaceData);

	console.log("Received data from remote server:", interfaceData);
});

client.on("end", () => {
	console.log("Disconnected from remote server");
});
