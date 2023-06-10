import { describe, expect, it } from 'vitest';
import JKN from '../../src';

const jkn = new JKN();

describe(
	'VClaim - LPK',
	() => {
		it.concurrent('dataLpk()', async () => {
			const result = await jkn.vclaim.lpk.dataLpk('2022-01-01', 2);
			expect(result.metaData.code).toBe('201'); // no example data
		});
	},
	{ timeout: 25_000 }
);
