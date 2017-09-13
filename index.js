const
	fs = require('fs'),
	{ join } = require('path'),
	{ tmpdir } = require('os');
const
	{ safeLoad } = require('js-yaml'),
	{ rollup } = require('rollup'),
	lodashBuilder = require('lodash-builder');
const
	LODASH_PLACE_HOLDER = '/* LODASH */',
	LODASH_CONFIG_PATH = join('./config/lodash.yml'),
	LODASH_PATH = join(tmpdir(), `custom-lodash-${process.hrtime().join('')}.js`),
	BUILD_TEMPLATE_PATH = join('./config/build.js'),
	BUILD_PATH = join('./config/.build_tmp.js');

lodashBuilder({ // Make custom lodash
	methods: safeLoad(fs.readFileSync(LODASH_CONFIG_PATH)),
	format: 'es',
	output: LODASH_PATH
}).then(() => { // Write build file
	fs.writeFileSync(BUILD_PATH,
		fs.readFileSync(BUILD_TEMPLATE_PATH, 'utf8').replace(
			LODASH_PLACE_HOLDER, `
				import lodash from '${LODASH_PATH}';
				window._ = lodash;
			`
		)
	);
}).then(() => rollup({ // Rollup pack
	input: BUILD_PATH,
	context: 'window',
	plugins: [
		require('rollup-plugin-node-resolve')({
			jsnext: true,
			main: true,
			browser: true,
			preferBuiltins: false,
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		}),
		require('rollup-plugin-commonjs')({
			sourceMap: false,
			include: [
				'node_modules/hogan.js/**',
				'node_modules/url-search-params/**'
			]
		})
	]
})).then(bundle => bundle.write({ // Write bundle output
	file: 'dist/driver-lib.js',
	name: '',
	format: 'iife'
})).catch(err => {
	console.error(err);
}).then(() => { // Remove tmp file
	fs.unlinkSync(LODASH_PATH);
	fs.unlinkSync(BUILD_PATH);
});
