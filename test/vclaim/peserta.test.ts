import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('VClaim - Peserta', { timeout: 25_000 }, () => {
	it.concurrent('nomorKartu() - 201 no data', async () => {
		const result = await jkn.vclaim.peserta.nomorKartu({
			nomor: '0000000000000',
			tanggal: '2021-04-01'
		});
		expect(result.metaData.code).toBe('201');
	});

	it.concurrent('nomorKartu() - 200 ok', async () => {
		const result = await jkn.vclaim.peserta.nomorKartu({
			nomor: '0002084717968',
			tanggal: '2023-06-12'
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.peserta.noKartu).toBe('0002084717968');
	});

	it.concurrent('nomorKependudukan() - 201 invalid number', async () => {
		const result = await jkn.vclaim.peserta.nomorKependudukan({
			/**
			 *
			 * Don't use random digits eg: 0000000000000000 because
			 * the data will exists:
			 *
			 * ```
			 * {
			 * 	noKartu: '0002091222977',
			 * 	nik: '0000000000000000',
			 * 	nama: 'BAYI BR LAHIR',
			 * 	// ...
			 * }
			 * ```
			 */
			nomor: '000000000000000X',
			tanggal: '2021-04-01'
		});
		expect(result.metaData.code).toBe('201');
	});

	it.concurrent('nomorKependudukan() - 200 ok', async () => {
		const result = await jkn.vclaim.peserta.nomorKependudukan({
			nomor: '3301097112650109',
			tanggal: '2023-06-12'
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.peserta.nik).toBe('3301097112650109');
	});
});
