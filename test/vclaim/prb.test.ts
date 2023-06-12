import { describe, expect, it } from 'vitest';
import JKN from '../../src';
import { generateDateRanges } from '../utils';

const jkn = new JKN();

describe(
	'VClaim - PRB',
	() => {
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
	},
	{ timeout: 25_000 }
);
