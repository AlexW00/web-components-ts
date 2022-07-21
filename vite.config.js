import { defineConfig } from "vite";
import replace from "@rollup/plugin-replace";
import GlobPlugin from "vite-plugin-glob";

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
			preventAssignment: true,
		}),
		GlobPlugin({
			// enable to let this plugin interpret `import.meta.glob`
			// takeover: true,
		}),
	],
});
