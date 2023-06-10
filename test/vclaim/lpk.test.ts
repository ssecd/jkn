import { describe, expect, it } from 'vitest';
import JKN from '../../src';

const jkn = new JKN();

describe(
	'VClaim - LPK',
	() => {
		it.concurrent('dataLpk()', async () => {
			const result = await jkn.vclaim.lpk.data({ tanggal: '2021-04-01', jenis: 2 });
			expect(result.metaData.code).toBe('201'); // no example data
		});
	},
	{ timeout: 25_000 }
);
