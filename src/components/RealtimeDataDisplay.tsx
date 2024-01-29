import { H4, Paragraph, ScrollView, Stack, XStack, YStack } from "tamagui";
import { RealtimeDataInterface } from "../hooks/useConnection";

interface RealtimeDataDisplayProps {
	realtimeData: RealtimeDataInterface | undefined;
}

export default function RealtimeDataDisplay({ realtimeData }: RealtimeDataDisplayProps) {
	return (
		<ScrollView maw="$12" p="$5" pt={0} bg="$background" br="$8">
			<XStack
				ai="center"
				jc="center"
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
				<H4 col="$lavanda">Realtime robot state </H4>
			</XStack>

			<YStack gap="$4" mt="$4" px="$1">
				<YStack gap="$3">
					<Paragraph ta="center" fos="$6" col="$accent" bg="$bgTop" p="$2" br="$4" bw="$0" boc="$accent">
						Tool
					</Paragraph>
					<XStack ai="center" gap="$3">
						<YStack gap="$3">
							<Paragraph
								ta="center"
								fos="$6"
								col="$accent"
								bg="$bgTop"
								p="$2"
								br="$4"
								bw="$0"
								boc="$accent">
								Position
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								x: {realtimeData?.tool.position.x.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								y: {realtimeData?.tool.position.y.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								z: {realtimeData?.tool.position.z.toFixed(2)}
							</Paragraph>
						</YStack>

						<YStack gap="$3">
							<Paragraph
								ta="center"
								fos="$6"
								col="$accent"
								bg="$bgTop"
								p="$2"
								br="$4"
								bw="$0"
								boc="$accent">
								Orientation
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								rx: {realtimeData?.tool.orientation.rx.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								ry: {realtimeData?.tool.orientation.ry.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								rz: {realtimeData?.tool.orientation.rz.toFixed(2)}
							</Paragraph>
						</YStack>

						<YStack gap="$3">
							<Paragraph
								ta="center"
								fos="$6"
								col="$accent"
								bg="$bgTop"
								p="$2"
								br="$4"
								bw="$0"
								boc="$accent">
								Force
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								x: {realtimeData?.tool.force.x.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								y: {realtimeData?.tool.force.y.toFixed(2)}
							</Paragraph>
							<Paragraph fos="$6" col="$lavanda50">
								z: {realtimeData?.tool.force.z.toFixed(2)}
							</Paragraph>
						</YStack>
					</XStack>
				</YStack>

				<YStack gap="$3">
					<Paragraph ta="center" fos="$6" col="$accent" bg="$bgTop" p="$2" br="$4" bw="$0" boc="$accent">
						Joint positions
					</Paragraph>
					<Stack fd="row" fw="wrap" jc="center" gap="$3">
						{realtimeData?.jointPositions.map((jointPos, id) => (
							<Paragraph key={id} fos="$6" col="$lavanda50">
								{jointPos.toFixed(2)}
							</Paragraph>
						))}
					</Stack>
				</YStack>

				<YStack gap="$3">
					<Paragraph ta="center" fos="$6" col="$accent" bg="$bgTop" p="$2" br="$4" bw="$0" boc="$accent">
						Motor temperatures
					</Paragraph>
					<Stack fd="row" fw="wrap" jc="center" gap="$3">
						{realtimeData?.motorTemperatures.map((motorTemp, id) => (
							<Paragraph key={id} fos="$6" col="$lavanda50">
								{motorTemp.toFixed(2)}
							</Paragraph>
						))}
					</Stack>
				</YStack>

				<YStack gap="$3">
					<Paragraph ta="center" fos="$6" col="$accent" bg="$bgTop" p="$2" br="$4" bw="$0" boc="$accent">
						Controller time
					</Paragraph>

					<Paragraph ta="center" fos="$6" col="$lavanda50">
						{realtimeData?.controllerTime.toFixed(2)}
					</Paragraph>
				</YStack>
			</YStack>
		</ScrollView>
	);
}
