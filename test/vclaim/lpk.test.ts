import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('VClaim - LPK', { timeout: 25_000 }, () => {
	it.concurrent('dataLpk()', async () => {
		const result = await jkn.vclaim.lpk.data({ tanggal: '2021-04-01', jenis: 2 });
		expect(result.metaData.code).toBe('201'); // no example data
	});
});
