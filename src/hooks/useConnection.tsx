import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ConnectionProps {
	message: string;
	setMessage: (message: string) => void;
	serverMsgs: string[];
	setServerMsgs: React.Dispatch<React.SetStateAction<string[]>>;
}

export enum SERVER {
	IP = "192.168.223.1",
	PORT = 29999,
}

// Stvorena je instanca socket-a
const socket = io(`http://${SERVER.IP}:${SERVER.PORT}`);

export default function useConnection({ message, setMessage, setServerMsgs }: ConnectionProps) {
	const [isConnected, setIsConnected] = useState(false);

	socket.on("connect", () => {
		console.log("Povezan sa serverom");
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
	useEffect(() => {
		const handleConfirmation = (confirmationMessage: string) => {
			console.log("Odgovor servera:", confirmationMessage);
			setServerMsgs((prevServerMsgs) => [...prevServerMsgs, confirmationMessage]);
		};

		socket.on("confirmation", handleConfirmation);

		return () => {
			socket.off("confirmation", handleConfirmation);
		};
	}, [setServerMsgs]);

	// U slučaju prekida konekcije sa serverom
	socket.on("disconnect", () => {
		console.log("Prekinuta veza sa serverom");
		setIsConnected(false);
	});

	return { socket, isConnected, sendMessage };
}
