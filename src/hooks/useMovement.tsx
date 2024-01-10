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
	const moveDistance = 0.05;

	// const [move, setMovement] = useState<string | undefined>();

	const moveRobot = (direction: Direction | "center" | undefined) => {
		// Adjust the movement values based on the direction
		let move: string | undefined;
		switch (direction) {
			case Direction.LEFT:
				move = `poz_tcp2[0]=poz_tcp2[0]-${moveDistance}\n`;
				break;
			case Direction.RIGHT:
				move = `poz_tcp2[0]=poz_tcp2[0]+${moveDistance}\n`;
				break;
			case Direction.DOWN:
				move = `poz_tcp2[1]=poz_tcp2[1]-${moveDistance}\n`;
				break;
			case Direction.UP:
				move = `poz_tcp2[1]=poz_tcp2[1]+${moveDistance}\n`;
				break;
			case "center":
				move = `poz_tcp2[2]=poz_tcp2[2]+${moveDistance}\n`;
				break;
			default:
				move = undefined;
		}

		const command =
			move &&
			`def program_move():\n
			poz_tcp=get_actual_tcp_pose()\n
			poz_tcp2=poz_tcp\n
			${move}
			movel(poz_tcp2,a=1,v=1,t=0,r=0)\nend\n`;

		// Send the URScript command to the robot via the socket
		if (direction !== undefined && move !== undefined) socket.emit("message", command);
	};

	return moveRobot;
}
