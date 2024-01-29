import { Archive, Trash } from "@tamagui/lucide-icons";
import { Button, H4, Paragraph, ScrollView, Stack, XStack, YStack } from "tamagui";

interface CommandHistoryProps {
	serverMsgs: string[];
	setServerMsgs: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CommandHistory({ serverMsgs, setServerMsgs }: CommandHistoryProps) {
	return (
		<ScrollView mah={475} p="$5" pt={0} bg="$background" br="$8">
			<XStack
				ai="center"
				jc="space-between"
				gap="$4"
				pt="$5"
				pb="$4"
				style={{ position: "sticky", top: 0 }}
				zi={1}
				bg="$background"
				boc="$lavanda"
				bbw="$1"
				bblr="$3"
				bbrr="$3">
				<H4 col="$lavanda">{serverMsgs.length > 0 ? "Command history" : "Command history is empty"}</H4>

				<Button
					w="$6"
					h="$6"
					p="$2"
					scaleIcon={1.25}
					fontWeight="bold"
					color={serverMsgs.length > 0 ? "$error" : "$lavanda50"}
					bw="$1"
					boc={serverMsgs.length > 0 ? "$error" : "$lavanda50"}
					disabled={serverMsgs.length === 0}
					icon={serverMsgs.length > 0 ? <Trash /> : <Archive />}
					onPress={() => setServerMsgs([])}
				/>
			</XStack>

			<YStack fd="column-reverse" gap="$4" mt="$4" px="$1">
				{serverMsgs.map((msg, id) => (
					<XStack key={id} ai="center" gap="$5">
						<Stack ai="center" jc="center" w="$5" h="$5" p="$4" bw="$1" boc="$lavanda50" br="$10">
							<Paragraph ta="center" fos="$6" col="$lavanda50">
								{id + 1}
							</Paragraph>
						</Stack>

						<Stack
							ai="flex-start"
							jc="center"
							p="$4"
							mih="$6"
							bw="$1"
							boc="$lavanda50"
							br="$5"
							animation="bouncy"
							enterStyle={{ scale: 0.75 }}>
							<Paragraph fos="$6" whiteSpace="pre-wrap">
								{msg}
							</Paragraph>
						</Stack>
					</XStack>
				))}
			</YStack>
		</ScrollView>
	);
}
