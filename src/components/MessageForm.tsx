import { useState } from "react";
import { XStack } from "tamagui";
import useConnection, { RealtimeDataInterface } from "../hooks/useConnection";
import CommandControl from "./CommandControl";
import CommandHistory from "./CommandHistory";
import RealtimeDataDisplay from "./RealtimeDataDisplay";

// React komponenta za unos poruke
export default function MessageForm() {
	const [message, setMessage] = useState("");
	const [serverMsgs, setServerMsgs] = useState<string[]>([]);
	const [realtimeData, setRealtimeData] = useState<RealtimeDataInterface>();

	const { socket, isConnected, sendMessage } = useConnection({
		message,
		setMessage,
		setServerMsgs,
		setRealtimeData,
	});

	return (
		<XStack gap="$4" flexWrap="wrap">
			{/* real time robot state */}
			<RealtimeDataDisplay realtimeData={realtimeData} />

			{/* command control */}
			<CommandControl
				socket={socket}
				isConnected={isConnected}
				sendMessage={sendMessage}
				message={message}
				setMessage={setMessage}
			/>

			{/* command history */}
			<CommandHistory serverMsgs={serverMsgs} setServerMsgs={setServerMsgs} />
		</XStack>
	);
}
