import { useEffect, useState } from "react";
import { DPadProps } from "./DPad.type";
import { XStack, YStack } from "tamagui";
import { ButtonBorderCircleHelper } from "./ButtonBorderCircleHelper.styled";
import { DPadButtonStyled } from "./DPadButton.styled";
import { Direction } from "../../hooks/useMovement";
import useValue from "./useValue";

export default function DPad({
	styled = true,
	inputValueX = 0,
	inputValueY = 0,
	step,
	delay,
	onDPadPress,
}: DPadProps) {
	const moveX = useValue({ inputValue: inputValueX, step, delay });
	const moveY = useValue({ inputValue: inputValueY, step, delay });

	const [DPadPressed, setDPadPressed] = useState<Direction | "center" | undefined>(undefined);

	useEffect(() => {
		onDPadPress({ DPadPressed: DPadPressed, valueX: moveX.value, valueY: moveY.value });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [DPadPressed, moveX.value, moveY.value]);

	return (
		<YStack ai="center" scale={0.7} m={-45}>
			<XStack ai="flex-end">
				{styled && <ButtonBorderCircleHelper config={"topLeft"} />}
				<DPadButtonStyled
					config={Direction.UP}
					styled={styled}
					onPress={() => setDPadPressed(Direction.UP)}
					onPressIn={moveY.increase}
					onPressOut={moveY.stopAction}
				/>
				{styled && <ButtonBorderCircleHelper config={"topRight"} />}
			</XStack>
			<XStack>
				<DPadButtonStyled
					config={Direction.LEFT}
					styled={styled}
					onPress={() => setDPadPressed(Direction.LEFT)}
					onPressIn={moveX.decrease}
					onPressOut={moveX.stopAction}
				/>
				<DPadButtonStyled config={"center"} styled={styled} onPress={() => setDPadPressed("center")} />
				<DPadButtonStyled
					config={Direction.RIGHT}
					styled={styled}
					onPress={() => setDPadPressed(Direction.RIGHT)}
					onPressIn={moveX.increase}
					onPressOut={moveX.stopAction}
				/>
			</XStack>
			<XStack ai="flex-start">
				{styled && <ButtonBorderCircleHelper config={"bottomLeft"} />}
				<DPadButtonStyled
					config={Direction.DOWN}
					styled={styled}
					onPress={() => setDPadPressed(Direction.DOWN)}
					onPressIn={moveY.decrease}
					onPressOut={moveY.stopAction}
				/>
				{styled && <ButtonBorderCircleHelper config={"bottomRight"} />}
			</XStack>
		</YStack>
	);
}
