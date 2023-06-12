import { describe, expect, it } from 'vitest';
import JKN from '../../src';
import { generateDateRanges } from '../utils';

const jkn = new JKN();

describe(
	'VClaim - Monitoring',
	() => {
		it.concurrent('kunjungan() - 201 no data', async () => {
			const result = await jkn.vclaim.monitoring.kunjungan({ tanggal: '2021-04-01', jenis: 2 });
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('kunjungan() - 200 ok', async () => {
			const result = await jkn.vclaim.monitoring.kunjungan({ tanggal: '2023-06-09', jenis: 2 });
			expect(result.metaData.code).toBe('200');
			expect(result.response?.sep?.[0].noSep).not.toBeFalsy();
		});

		it.concurrent('klaim() - 201 no data', async () => {
			const result = await jkn.vclaim.monitoring.klaim({
				tanggal: '2023-05-31',
				jenis: 2,
				status: 1
			});
			expect(result.metaData.code).toBe('201');
			expect(result.response).toBeFalsy();
		});

		it.concurrent('riwayatPelayanan()', async () => {
			const results: string[] = [];
			for (const [awal, akhir] of generateDateRanges(2023)) {
				const result = await jkn.vclaim.monitoring.riwayatPelayanan({
					nomorKartu: '0002084717968',
					awal,
					akhir
				});
				results.push(result.metaData.code);
			}
			expect(results).toContain('200');
		});

		it.concurrent('klaimJasaRaharja() - not 200 or no data', async () => {
			const results: string[] = [];
			for (const [awal, akhir] of generateDateRanges(2023)) {
				const result = await jkn.vclaim.monitoring.klaimJasaRaharja({
					jenis: 2,
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
