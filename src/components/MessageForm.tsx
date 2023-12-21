import { useState } from "react";
import { Button, H4, Input, Paragraph, ScrollView, Spinner, Stack, XStack, YStack } from "tamagui";
import useConnection from "../hooks/useConnection";
import useMovement from "../hooks/useMovement";
import useProgram from "../hooks/useProgram";
import DPad from "./DPad/DPad";

// React komponenta za unos poruke
export default function MessageForm() {
	const [message, setMessage] = useState("");
	const [serverMsgs, setServerMsgs] = useState<string[]>([]);

	const { socket, isConnected, sendMessage } = useConnection({
		message,
		setMessage,
		serverMsgs,
		setServerMsgs,
	});

	const { loadProgram, startProgram, stopProgram } = useProgram({ socket, setMessage });

	const moveRobot = useMovement({ socket });

	return (
		<XStack gap="$4">
			<YStack jc="space-between" gap="$4" p="$6" bg="$background" br="$8">
				<Input
					placeholder="Enter command"
					value={message}
					onChange={(e) => setMessage(e.nativeEvent.text)}
					bg="$bgTop"
				/>
				<XStack jc="space-between">
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

				<Stack mt="$4">
					<DPad
						inputValueX={0}
						inputValueY={0}
						step={2}
						delay={50}
						onDPadPress={(val) => moveRobot(val.DPadPressed)}
					/>
				</Stack>
			</YStack>

			<ScrollView mah={475} p="$5" bg="$background" br="$8">
				<H4 ta="center" p="$3" col="$lavanda" boc="$lavanda" bw="$1" br="$3">
					Previous commands:
				</H4>
				<YStack fd="column-reverse" gap="$4" mt="$4">
					{serverMsgs.map((msg, id) => (
						<Stack
							key={id}
							ai="flex-start"
							jc="center"
							p="$4"
							h="$6"
							bw="$1"
							boc="$orange"
							br="$5"
							animation="bouncy"
							enterStyle={{ scale: 0.75 }}>
							<Paragraph fos="$6">
								{id + 1}. {msg}
							</Paragraph>
						</Stack>
					))}
				</YStack>
			</ScrollView>
		</XStack>
	);
}
