import { useEffect, useState } from "react";
import { DPadProps } from "./DPad.type";
import { XStack, YStack } from "tamagui";
import { ButtonBorderCircleHelper } from "./ButtonBorderCircleHelper.styled";
import { DPadButtonStyled } from "./DPadButton.styled";
import { Direction } from "../../hooks/useMovement";

export default function DPad({ onDPadPress }: DPadProps) {
	const [DPadPressed, setDPadPressed] = useState<Direction | "center" | undefined>();

	useEffect(() => {
		onDPadPress(DPadPressed);
		setDPadPressed(undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [DPadPressed]);

	return (
		<YStack ai="center" scale={0.7} m={-45}>
			<XStack ai="flex-end">
				<ButtonBorderCircleHelper config={"topLeft"} />
				<DPadButtonStyled config={Direction.UP} styled onPress={() => setDPadPressed(Direction.UP)} />
				<ButtonBorderCircleHelper config={"topRight"} />
			</XStack>
			<XStack>
				<DPadButtonStyled config={Direction.LEFT} styled onPress={() => setDPadPressed(Direction.LEFT)} />
				<DPadButtonStyled config={"center"} styled onPress={() => setDPadPressed("center")} />
				<DPadButtonStyled
					config={Direction.RIGHT}
					styled
					onPress={() => setDPadPressed(Direction.RIGHT)}
				/>
			</XStack>
			<XStack ai="flex-start">
				<ButtonBorderCircleHelper config={"bottomLeft"} />
				<DPadButtonStyled config={Direction.DOWN} styled onPress={() => setDPadPressed(Direction.DOWN)} />
				<ButtonBorderCircleHelper config={"bottomRight"} />
			</XStack>
		</YStack>
	);
}
