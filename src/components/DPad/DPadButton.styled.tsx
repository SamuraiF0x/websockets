import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleDot } from "@tamagui/lucide-icons";
import { Button, GetProps, styled } from "tamagui";

export const DPadButtonStyled = styled(Button, {
	p: "$6",
	br: 0,
	bbw: "$1",
	px: 30,
	scaleIcon: 2,
	color: "$blue",
	bg: "$bgTop",
	boc: "$blueTransparent",

	animation: "bouncy",
	pressStyle: { scale: 0.9 },

	variants: {
		config: {
			up: {
				icon: ChevronUp,
				btlr: 30,
				btrr: 30,
				bbw: 0,
				pressStyle: { mb: "$4", bbw: "$3" },
			},
			down: {
				icon: ChevronDown,
				bblr: 30,
				bbrr: 30,
				btw: 0,
				pressStyle: { mt: "$4", btw: "$3" },
			},
			left: {
				icon: ChevronLeft,
				btlr: 30,
				bblr: 30,
				brw: 0,
				pressStyle: { mr: "$4", brw: "$3" },
			},
			right: {
				icon: ChevronRight,
				btrr: 30,
				bbrr: 30,
				blw: 0,
				pressStyle: { ml: "$4", blw: "$3" },
			},
			center: {
				icon: CircleDot,
				bw: 0,
				pressStyle: { m: "$3", bw: "$1" },
			},
		},
		styled: {
			true: {
				br: 20,
			},
		},
	} as const,
});

export type DPadButtonStyledProps = GetProps<typeof DPadButtonStyled>;
