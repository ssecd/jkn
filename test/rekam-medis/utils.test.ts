import { describe, expect, it } from 'vitest';
import { unzipSync } from 'zlib';
import { gzip } from '../../src/rekam-medis/utils';

describe('utils', () => {
	it.concurrent('gzip()', async () => {
		const value = `{ "prop": "value" }`;
		const result = await gzip(value);
		expect(result).toBeTypeOf('object');

		const unzipped = unzipSync(result);
		expect(unzipped.toString('utf8')).toBe(value);
	});
});
