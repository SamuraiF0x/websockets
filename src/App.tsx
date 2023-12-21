import config from "../tamagui.config";
import { TamaguiProvider, Theme } from "tamagui";
import MessageForm from "./components/MessageForm";
import FullscreenWrapper from "./utilities/FullscreenWrapper";

function App() {
	return (
		<TamaguiProvider config={config}>
			<Theme name="dark">
				<FullscreenWrapper>
					<MessageForm />
				</FullscreenWrapper>
			</Theme>
		</TamaguiProvider>
	);
}

export default App;
