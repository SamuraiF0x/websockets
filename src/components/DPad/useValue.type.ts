export enum ValueControlButtonsActions {
	INCREASE = "increase",
	DECREASE = "decrease",
	IDLE = "idle",
}

export interface StepDelayProps {
	totalTime?: never;
	step?: number;
	delay?: number;
}

export interface TotalTimeProps {
	/**
	 * - `totalTime: number` *(time (in ms) it takes to go from 0 to maxValue and vice versa)*
	 */
	totalTime: number;
	step?: never;
	delay?: never;
}

type SpeedControlProps = StepDelayProps | TotalTimeProps;

export interface StoreValueProps {
	/**
	 * - if `toZero` is triggered, the last value before `toZero` will be stored and used as the new starting value
	 */
	storeLastValue?: boolean;
	/**
	 * - if `toZero` is triggered, after which `increase`/`decrease` is triggered, the last value will be used as the new starting value
	 */
	continueFromLastValue?: boolean;
}

interface BaseProps extends StoreValueProps {
	inputValue?: number;
	maxValue?: number;
}

export type ValueControlButtonsHookProps = BaseProps & SpeedControlProps;
