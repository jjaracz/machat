import typescript from "rollup-plugin-typescript2";
import nodeResolve from "rollup-plugin-node-resolve";
import resolve from "rollup-plugin-paths";
import json from "rollup-plugin-json";
import replace from 'rollup-plugin-replace';
import gzip from "rollup-plugin-gzip";
import uglify from "rollup-plugin-uglify";
let config = require("./config/config.dev.json");

export default {
	entry: 'app.ts',
	dest: 'dist/bundle.js',
	format: 'cjs',
	sourceMap: 'inline',
	sourceMapFile: 'dist/bundle.map.js',
	plugins: [
		replace({
			"process.env.NODE_ENV": JSON.stringify(config.env)
		}),
		resolve({
			"shared@": "./app/shared/"
		}),
		nodeResolve({
			jsnext: true,
			main: true,
			module: true
		}),
		typescript({
			typescript : require('typescript')
		}),
		json(),
		// uglify(),
		gzip()
	],
	external: [
		"express",
		"body-parser",
		"path",
		"debug",
		"http"
	]
};