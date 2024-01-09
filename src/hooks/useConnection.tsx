import { useState } from "react";
import { io } from "socket.io-client";

interface ConnectionProps {
	message: string;
	setMessage: (message: string) => void;
	serverMsgs: string[];
	setServerMsgs: (serverMsgs: string[]) => void;
}

export enum Port {
	LOCAL = "3000",
}

// Stvorena je instanca socket-a
const socket = io(`http://localhost:${Port.LOCAL}`);

export default function useConnection({ message, setMessage, serverMsgs, setServerMsgs }: ConnectionProps) {
	const [isConnected, setIsConnected] = useState(false);

	socket.on("connect", () => {
		console.log("Povezan s serverom");
		setIsConnected(true);
	});

	// Funkcija za slanje poruke
	const sendMessage = () => {
		if (message.trim() !== "") {
			socket.emit("message", message);
			setMessage("");
		}
	};

	// Primi i isprintaj odgovor sa servera
	socket.on("confirmation", (confirmationMessage) => {
		console.log("Odgovor servera:", confirmationMessage);
		setServerMsgs([...serverMsgs, confirmationMessage]);
	});

	// U slučaju prekida konekcije sa serverom
	socket.on("disconnect", () => {
		console.log("Prekinuta veza sa serverom");
		setIsConnected(false);
	});

	return { socket, isConnected, sendMessage };
}
