import { useState } from "react";
import { Socket } from "socket.io-client";

export enum Direction {
	UP = "up",
	DOWN = "down",
	LEFT = "left",
	RIGHT = "right",
}

interface MovementProps {
	socket: Socket;
}

export default function useMovement({ socket }: MovementProps) {
	const [move, setMovement] = useState({
		left: 0,
		down: 0,
		up: 0,
		right: 0,
	});

	const moveRobot = (direction: Direction | "center" | undefined) => {
		// Adjust the movement values based on the direction
		setMovement((prevMovement) => {
			switch (direction) {
				case Direction.LEFT:
					return { ...prevMovement, left: prevMovement.left - 1 };
				case Direction.DOWN:
					return { ...prevMovement, down: prevMovement.down - 1 };
				case Direction.UP:
					return { ...prevMovement, up: prevMovement.up + 1 };
				case Direction.RIGHT:
					return { ...prevMovement, right: prevMovement.right + 1 };
				default:
					return prevMovement;
			}
		});

		const command = `movej(p[${move.left}, ${move.down}, ${move.up}, 0.0, 0.0, ${move.right}], a=0.1, v=0.1)`;

		// Send the URScript command to the robot via the socket
		if (direction !== undefined) socket.emit("message", command);
	};

	return moveRobot;
}
