import { ReactNode } from "react";
import { YStack } from "tamagui";

export default function FullscreenWrapper({ ...props }: { children: ReactNode }) {
	return (
		<YStack fullscreen ai="center" jc="space-around" p="$4" bg="$bgTop">
			{props.children}
		</YStack>
	);
}
