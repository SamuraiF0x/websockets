import { Socket } from "socket.io-client";
import { Button, Input, Spinner, XStack, YStack } from "tamagui";
import useMovement from "../hooks/useMovement";
import useProgram from "../hooks/useProgram";
import DPad from "./DPad/DPad";

interface CommandControlProps {
	socket: Socket;
	isConnected: boolean;
	sendMessage: () => void;
	message: string;
	setMessage: (message: string) => void;
}

export default function CommandControl({
	socket,
	isConnected,
	sendMessage,
	message,
	setMessage,
}: CommandControlProps) {
	const { loadProgram, startProgram, stopProgram, movePosition, moveJoint } = useProgram({ socket });

	const moveRobot = useMovement({ socket });

	const reconnect = () => {
		socket.disconnect();
		console.log("Ponovno povezivanje sa serverom...");
		socket.connect();
	};

	return (
		<YStack jc="space-between" gap="$4" p="$6" bg="$background" br="$8">
			<Input
				placeholder="Enter command"
				value={message}
				onChange={(e) => setMessage(e.nativeEvent.text)}
				onSubmitEditing={sendMessage}
				bg="$bgTop"
			/>
			<XStack jc="space-between">
				<Button color="$success" bw="$1" boc="$success" onPress={reconnect}>
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

			<XStack ai="center" jc="space-between" mt="$4">
				<YStack gap="$5">
					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={movePosition}>
						{isConnected && "Move position"}
					</Button>

					<Button
						fontWeight="bold"
						color="$accent"
						bw="$1"
						boc="$accent"
						disabled={!isConnected}
						icon={isConnected ? undefined : <Spinner />}
						onPress={moveJoint}>
						{isConnected && "Move joints"}
					</Button>
				</YStack>

				{isConnected ? (
					<DPad onDPadPress={(DPadPressed) => moveRobot(DPadPressed)} />
				) : (
					<Spinner size="large" />
				)}
			</XStack>
		</YStack>
	);
}
