import { describe, expect, it } from 'vitest';
import { unzipSync } from 'zlib';
import { encrypt, gzip } from '../../src/rekam-medis/utils';

describe('utils', () => {
	it.concurrent('gzip()', async () => {
		const value = `{ "prop": "value" }`;
		const result = await gzip(value);
		expect(result).toBeTypeOf('object');

		const unzipped = unzipSync(result);
		expect(unzipped.toString('utf8')).toBe(value);
	});

	it.concurrent('decrypt()', async () => {
		const keys = ['a', 'b', 'c'];
		const result1 = encrypt('data1', keys);
		const result2 = encrypt('data2', keys);

		expect(result1.length % 4).toBe(0);
		expect(result2.length % 4).toBe(0);
		expect(result1).not.toBe(result2);
	});
});
