import { useState } from "react";
import { io } from "socket.io-client";
import { Button, Input, Paragraph, Spinner, Stack, XStack, YStack } from "tamagui";

// Stvorena je instanca socket-a
const socket = io("http://localhost:30001");

// React komponenta za unos poruke
export default function MessageForm() {
	const [isConnected, setIsConnected] = useState(false);
	const [message, setMessage] = useState("");
	const [serverMsgs, setServerMsgs] = useState<string[]>([]);

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

	// Primi i isprintaj odgovor sa servera
	socket.on("confirmation", (confirmationMessage) => {
		console.log("Odgovor servera:", confirmationMessage);
		setServerMsgs([...serverMsgs, confirmationMessage]);
	});

	// U slučaju prekida konekcije sa serverom
	socket.on("disconnect", () => {
		console.log("Prekinuta veza sa serverom");
	});

	return (
		<XStack gap="$4">
			<YStack gap="$4">
				<Input value={message} onChange={(e) => setMessage(e.nativeEvent.text)} />
				<XStack gap="$4">
					<Button color="$success" bw="$1" boc="$success" onPress={() => socket.connect}>
						Reconnect
					</Button>

					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={sendMessage}>
						{isConnected && "Send"}
					</Button>
				</XStack>
				<XStack gap="$4">
					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={loadProgram}>
						{isConnected && "Load"}
					</Button>
					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={startProgram}>
						{isConnected && "Start"}
					</Button>
					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={stopProgram}>
						{isConnected && "Stop"}
					</Button>
				</XStack>
			</YStack>

			<YStack gap="$4">
				{serverMsgs.map((msg, i) => (
					<Stack key={i} ai="center" jc="center" p="$4" h="$6" bw="$1" boc="$orange" br="$5">
						<Paragraph fos="$6">{msg}</Paragraph>
					</Stack>
				))}
			</YStack>
		</XStack>
	);
}
