import { Socket } from "socket.io-client";

interface ProgramProps {
	socket: Socket;
	setMessage: (message: string) => void;
}

export default function useProgram({ socket, setMessage }: ProgramProps) {
	// Funkcija za učitavanje programa
	const loadProgram = () => {
		socket.emit("message", "load.zadatak.urp");
		setMessage("");
	};

	// Funkcija za pokretanje programa
	const startProgram = () => {
		socket.emit("message", "play");
		setMessage("");
	};

	// Funkcija za zaustavljanje programa
	const stopProgram = () => {
		socket.emit("message", "stop");
		setMessage("");
	};

	return { loadProgram, startProgram, stopProgram };
}
