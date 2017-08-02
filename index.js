const
	fs = require('fs'),
	path = require('path');
const
	yml = require('js-yaml');
const
	LODASH_PLACE_HOLDER = '/* LODASH */',
	LODASH_CONFIG_PATH = path.join('./config/lodash.yml'),
	BUILD_TEMPLATE_PATH = path.join('./config/build.js'),
	BUILD_PATH = path.join('./config/.build_tmp.js');
const
	lodashImportList = [],
	lodashExportList = [];

yml.safeLoad(fs.readFileSync(LODASH_CONFIG_PATH)).forEach(name => {
	lodashImportList.push(`import _${name} from 'lodash/${name}';`);
	lodashExportList.push(`${name}: _${name},`);
});

fs.writeFileSync(BUILD_PATH,
	fs.readFileSync(BUILD_TEMPLATE_PATH, 'utf8').replace(
		LODASH_PLACE_HOLDER,
		`
			${lodashImportList.join('')}
			window._ = {
				${lodashExportList.join('')}
			};
		`
	)
);
