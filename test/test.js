import fs from 'fs';
import test from 'ava';
import jsdom from 'jsdom';

test('Run lib in browser env', t => {
	const dom = new jsdom.JSDOM(``, {
		runScripts: 'outside-only'
	});

	t.plan(1);
	t.notThrows(() => {
		dom.window.eval(fs.readFileSync('dist/driver-lib.min.js', 'utf8'));
		dom.window.eval(fs.readFileSync('test/script.js', 'utf8'));
	}, 'should have those global vars');
});

