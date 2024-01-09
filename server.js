/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const http = require("http");

const server = http.createServer();

const PORT = 3000;

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

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
