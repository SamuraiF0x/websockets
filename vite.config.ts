import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tamaguiPlugin } from "@tamagui/vite-plugin";

export default defineConfig({
	build: {
		outDir: "build",
	},
	server: {
		open: true,
	},
	plugins: [
		react(),
		tamaguiPlugin({
			config: "tamagui.config.ts",
			components: ["tamagui"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: "globalThis",
			},
		},
	},
});
