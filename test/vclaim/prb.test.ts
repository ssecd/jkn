import { describe, expect, it } from 'vitest';
import jkn from '../jkn';
import { generateDateRanges } from '../utils';

describe('VClaim - PRB', { timeout: 25_000 }, () => {
	it.concurrent('cariByTanggal() - not 200 no data', async () => {
		const results: string[] = [];
		for (const [awal, akhir] of generateDateRanges(2023)) {
			const result = await jkn.vclaim.prb.cariByTanggal({
				awal,
				akhir
			});
			results.push(result.metaData.code);
		}
		expect(results).not.toContain('200');
	});
});
