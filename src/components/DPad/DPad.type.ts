import { Direction } from "../../hooks/useMovement";

interface StepDelayProps {
	step?: number;
	delay?: number;
}

export interface DPadProps extends StepDelayProps {
	styled?: boolean;
	inputValueX: number;
	inputValueY: number;
	onDPadPress: (params: {
		DPadPressed: Direction | "center" | undefined;
		valueX: number;
		valueY: number;
	}) => void;
}
