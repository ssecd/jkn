import { describe, expect, it } from 'vitest';
import jkn from '../jkn';
import { generateDateRanges } from '../utils';

describe('VClaim - PRB', { timeout: 25_000 }, () => {
	it.concurrent('cariByTanggal() - not 200 no data', async () => {
		const results: string[] = [];
		// max 31 days
		for (const [awal, akhir] of generateDateRanges(2023, 40)) {
			const result = await jkn.vclaim.prb.cariByTanggal({
				awal,
				akhir
			});
			results.push(result.metaData.code);
		}
		expect(results).not.toContain('200');
	});

	it.concurrent('rekapPotensi() - should return data', async () => {
		const result = await jkn.vclaim.prb.rekapPotensi({
			tahun: 2025,
			bulan: 11
		});
		expect(result.metaData.code).toBe('200');
	});
});
