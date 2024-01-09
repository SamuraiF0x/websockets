import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export enum Direction {
	UP = "up",
	DOWN = "down",
	LEFT = "left",
	RIGHT = "right",
}

interface MovementProps {
	socket: Socket;
	serverMsgs: string[];
}

export default function useMovement({ socket, serverMsgs }: MovementProps) {
	const getCurrentPos = `get_actual_tcp_pose()`;

	useEffect(() => {
		socket.emit("message", getCurrentPos);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	const [move, setMovement] = useState({
		x: 0,
		y: 0,
	});

	const moveRobot = (direction: Direction | "center" | undefined) => {
		// Adjust the movement values based on the direction
		setMovement((prevMovement) => {
			switch (direction) {
				case Direction.LEFT:
					return { ...prevMovement, x: prevMovement.x - 1 };
				case Direction.RIGHT:
					return { ...prevMovement, x: prevMovement.x + 1 };
				case Direction.DOWN:
					return { ...prevMovement, y: prevMovement.y - 1 };
				case Direction.UP:
					return { ...prevMovement, y: prevMovement.y + 1 };
				default:
					return prevMovement;
			}
		});

		const command = `movel(p[${move.x}, ${move.y}, 0.0, 0.0, 0.0, 0.0], a=0.1, v=0.1)`;

		// Send the URScript command to the robot via the socket
		if (direction !== undefined) socket.emit("message", command);
	};

	return moveRobot;
}
