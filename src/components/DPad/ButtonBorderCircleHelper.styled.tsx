import { Circle, GetProps, styled } from "tamagui";

export const ButtonBorderCircleHelper = styled(Circle, {
	size: 20,
	zi: 1,
	bg: "$background",
	boc: "$blueTransparent",

	variants: {
		config: {
			topLeft: {
				mb: -15,
				r: -15,
				bbw: "$1",
				brw: "$1",
			},
			topRight: {
				mb: -15,
				l: -15,
				bbw: "$1",
				blw: "$1",
			},
			bottomLeft: {
				mt: -15,
				r: -15,
				btw: "$1",
				brw: "$1",
			},
			bottomRight: {
				mt: -15,
				l: -15,
				btw: "$1",
				blw: "$1",
			},
		},
	} as const,
});

export type ButtonBorderCircleHelperStyledProps = GetProps<typeof ButtonBorderCircleHelper>;
