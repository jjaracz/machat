import typescript from "rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import uglify from "rollup-plugin-uglify";

export default {
	entry: 'main.ts',
	dest: 'dist/bundle.js',
	format: 'cjs',
	sourceMap: 'inline',
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
			module: true
		}),
		typescript({
			typescript : require('typescript')
		}),
		json()
		// uglify()
	],
	external: [
		"express",
		"body-parser"
	]
};