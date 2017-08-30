[
	'_',
	'$',
	'fetch',
	'moment',
	'Hogan',
	'URLSearchParams',
	'numeral',
	'regeneratorRuntime'
].forEach(item => {
	if (!window[item]) {
		throw new Error(`No ${item} on window`);
	}
});
