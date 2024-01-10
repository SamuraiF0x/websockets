import { Direction } from "../../hooks/useMovement";

export interface DPadProps {
	onDPadPress: (DPadPressed: Direction | "center" | undefined) => void;
}
