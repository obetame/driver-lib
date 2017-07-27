import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'index.js',
	dest: 'dist/driver-lib.js',
	moduleName: '',
	context: 'window',
	format: 'iife',
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true,
			preferBuiltins: false,
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		}),
		commonjs({
			sourceMap: false,
			include: [
				'node_modules/hogan.js/**',
				'node_modules/url-search-params/**'
			]
		})
	]
};
