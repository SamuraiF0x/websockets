/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server);

const PORT = 5173;

// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: `http://localhost:${PORT}`,
// 		methods: ["GET", "POST"],
// 	},
// });

io.on("connection", (socket) => {
	console.log("Korisnik se povezao");

	// Obrada dolaznih poruka od klijenta
	socket.on("message", (message) => {
		console.log("Primljena poruka:", message);

		// Potvrda da je poruka primljena od strane servera
		socket.emit("Potvrda", "Poruka primljena od strane servera");

		// Emitiranje primljene poruke svim povezanim klijentima
		io.emit("confirmation", message);
	});

	socket.on("disconnect", () => {
		console.log("Korisnik se odspojio");
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// server.listen(PORT, "10.0.2.15", () => {
// 	console.log(`Server listening on port ${PORT}`);
// });
