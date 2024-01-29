import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export interface RealtimeDataInterface {
	tool: {
		position: {
			x: number;
			y: number;
			z: number;
		};
		orientation: {
			rx: number;
			ry: number;
			rz: number;
		};
		force: {
			x: number;
			y: number;
			z: number;
		};
	};
	jointPositions: number[];
	motorTemperatures: number[];
	controllerTime: number;
}

interface ConnectionProps {
	message: string;
	setMessage: (message: string) => void;
	setServerMsgs: React.Dispatch<React.SetStateAction<string[]>>;
	setRealtimeData: React.Dispatch<React.SetStateAction<RealtimeDataInterface | undefined>>;
}

export enum SERVER {
	IP = "192.168.223.1",
	PORT = 29999,
}

// Stvorena je instanca socket-a
const socket = io(`http://${SERVER.IP}:${SERVER.PORT}`);

export default function useConnection({ message, setMessage, setServerMsgs, setRealtimeData }: ConnectionProps) {
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

		const handleRealtimeData = (data: RealtimeDataInterface) => {
			setRealtimeData(data);
		};

		socket.on("confirmation", handleConfirmation);

		socket.on("interfaceData", handleRealtimeData);

		return () => {
			socket.off("confirmation", handleConfirmation);
		};
	}, [setRealtimeData, setServerMsgs]);

	// U slučaju prekida konekcije sa serverom
	socket.on("disconnect", () => {
		console.log("Prekinuta veza sa serverom");
		setIsConnected(false);
	});

	return { socket, isConnected, sendMessage };
}
