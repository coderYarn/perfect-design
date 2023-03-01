import ts from 'rollup-plugin-typescript2'

import clear from 'rollup-plugin-clear'
import cjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import alias from 'rollup-plugin-alias'
const path = require('path')

function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [
		cjs({
			ignoreGlobal: true,
			include: /\/node_modules\//,
			external: ['react', 'react-dom', 'styled-components']
		}),
		ts(typescript),
		terser(),
		uglify()
	]
}

export default {
	input: ['./src/index.ts'],
	output: [
		{
			file: 'dist/cjs/index.js',
			format: 'cjs',
			name: 'cjs.js'
		},
		{
			file: 'dist/umd/index.js',
			format: 'umd',
			name: 'umd.js'
		},
		{
			file: 'dist/es/index.js',
			format: 'es',
			name: 'index.js'
		}
	],
	plugins: [
		alias({
			entries: [
		
			]
		}),
		clear({
			targets: ['dist']
		}),
		...getBaseRollupPlugins(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true
		}),
	
	],
	external: ['react', 'react-dom']
}