import { defineConfig } from "vite";
import replace from "@rollup/plugin-replace";
import GlobPlugin from "vite-plugin-glob";

export default defineConfig({
	plugins: [
		replace({
			values: {
				'.html";': '.html?raw";', // replace .html with .html?raw to make html imports consistent with css imports
			},
			delimiters: ["", ""],
			include: ["src/components/**/*.ts"],
			preventAssignment: true,
		}),
		GlobPlugin(), // plugin needed by WebComponentLoader to import all modules automatically
	],
});
