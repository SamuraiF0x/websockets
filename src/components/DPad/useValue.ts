import { useEffect, useState } from "react";
import { ValueControlButtonsActions, ValueControlButtonsHookProps } from "./useValue.type";
import { useDebounce } from "@uidotdev/usehooks";

/**
 * **Usage:**
 *
 * `inputValue: number` *(range between 0 and 100)*
 */
export default function useValue({
	inputValue = 1,
	maxValue = 100,
	totalTime,
	delay = totalTime ? totalTime / maxValue : 100,
	step = totalTime ? Math.ceil(maxValue / delay) : 5,
	storeLastValue = true,
	continueFromLastValue = true,
}: ValueControlButtonsHookProps) {
	const [action, setAction] = useState<ValueControlButtonsActions>(ValueControlButtonsActions.IDLE);

	const [storedValue, setStoredValue] = useState(0);
	const [value, setValue] = useState(inputValue);
	const debouncedValue = useDebounce(value, 50);

	const setValueWithBounds = (newValue: number) => {
		const clampedValue = Math.min(maxValue, Math.max(0, newValue));
		setValue(clampedValue);
	};

	useEffect(() => {
		setValueWithBounds(inputValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		const startSliding = () => {
			intervalId = setInterval(() => {
				if (action === ValueControlButtonsActions.INCREASE) {
					setValueWithBounds(debouncedValue + step);
				} else if (action === ValueControlButtonsActions.DECREASE) {
					setValueWithBounds(debouncedValue - step);
				} else {
					if (intervalId) clearInterval(intervalId);
				}
			}, delay / 2);
		};

		if (action !== ValueControlButtonsActions.IDLE) {
			startSliding();
		} else {
			if (intervalId) clearInterval(intervalId);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action, delay, step, debouncedValue]);

	const startAction = (newAction: ValueControlButtonsActions.INCREASE | ValueControlButtonsActions.DECREASE) => {
		if (value === 0 && continueFromLastValue) {
			setValueWithBounds(storedValue);
			const restoreLastValue = setTimeout(() => setAction(newAction), 500);
			clearTimeout(restoreLastValue);
		} else setAction(newAction);
	};

	const stopAction = () => {
		setAction(ValueControlButtonsActions.IDLE);
	};

	const toZero = () => {
		if (value === 0) {
			// If value is already 0, set it to the last value before toZero
			if (storeLastValue) setValueWithBounds(storedValue);
		} else {
			// Set value to 0 and store the last value before toZero
			setStoredValue(debouncedValue);
			setValueWithBounds(0);
		}
	};

	const onValueChange = (value: number, action: string) => {
		return { value, action };
	};

	return {
		value,
		action,
		increase: () => startAction(ValueControlButtonsActions.INCREASE),
		decrease: () => startAction(ValueControlButtonsActions.DECREASE),
		stopAction,
		toZero,
		onValueChange,
	};
}
