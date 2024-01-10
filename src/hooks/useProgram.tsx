import { Socket } from "socket.io-client";

interface ProgramProps {
	socket: Socket;
}

export default function useProgram({ socket }: ProgramProps) {
	// Funkcija za učitavanje programa
	const loadProgram = () => {
		socket.emit("message", "load.zadatak.urp");
	};

	// Funkcija za pokretanje programa
	const startProgram = () => {
		socket.emit("message", "play");
	};

	// Funkcija za zaustavljanje programa
	const stopProgram = () => {
		socket.emit("message", "stop");
	};

	const movePositionMsg = `def program_rx_neg():\n
	poz_tcp=get_actual_tcp_pose()\n
	poz_tcp2=poz_tcp\n
	poz_tcp2[0]=poz_tcp2[0]-0.05\n
	poz_tcp2[1]=poz_tcp2[1]-0.05\n
	poz_tcp2[2]=poz_tcp2[2]-0.05\n
	movel(poz_tcp2,a=1,v=1,t=0,r=0)\nend\n`;

	// Funkcija za poruku cijelog programa za pomicanje pozicije
	const movePosition = () => {
		socket.emit("message", movePositionMsg);
	};

	const moveJointMsg = `def program_z1_neg():\n
	poz_j=get_actual_joint_positions()\n
	poz_2j=poz_j\n
	poz_2j[0]=poz_2j[0]-0.05\n
	poz_2j[1]=poz_2j[1]-0.05\n
	poz_2j[2]=poz_2j[2]-0.05\n
	poz_2j[3]=poz_2j[3]-0.05\n
	poz_2j[4]=poz_2j[4]-0.05\n
	poz_2j[5]=poz_2j[5]-0.05\n
	movej(poz_2j,a=1,v=1,t=0,r=0)\nend\n`;

	// Funkcija za poruku cijelog programa za pomicanje zgloba
	const moveJoint = () => {
		socket.emit("message", moveJointMsg);
	};

	return { loadProgram, startProgram, stopProgram, movePosition, moveJoint };
}
