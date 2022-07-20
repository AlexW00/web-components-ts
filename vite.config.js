import { defineConfig } from "vite";
import replace from "@rollup/plugin-replace";

export default defineConfig({
	// mark components as assets
	assetsInclude: ["components/**/*.html", "components/**/*.css"],
	plugins: [
		replace({
			values: {
				'.html";': '.html?raw";',
			},
			delimiters: ["", ""],
			include: ["src/components/**/*.ts"],
		}),
	],
});
