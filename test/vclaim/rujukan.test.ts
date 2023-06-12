import { describe, expect, it } from 'vitest';
import JKN from '../../src';
import { currentIsoDate, generateDateRanges } from '../utils';

const jkn = new JKN();

describe(
	'VClaim - Rujukan',
	() => {
		it.concurrent('cariByNomor() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.cariByNomor({
				nomor: '061201030423P000001',
				sumber: 1
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.rujukan.noKunjungan).toBe('061201030423P000001');
		});

		it.concurrent('cariByNoka() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.cariByNoka({
				nomor: '0002084717968',
				sumber: 1
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.rujukan.peserta.noKartu).toBe('0002084717968');
		});

		it.concurrent('cariByNokaMulti() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.cariByNokaMulti({
				nomor: '0002084717968',
				sumber: 1
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.rujukan[0].peserta.noKartu).toBe('0002084717968');
		});

		it.concurrent('listSpesialistik() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.listSpesialistik({
				kodePpk: '0089S002',
				tanggal: currentIsoDate()
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list[0].kodeSpesialis).not.toBeFalsy();
		});

		it.concurrent('listSarana() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.listSarana({
				kodePpk: '0089S002'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list[0].kodeSarana).not.toBeFalsy();
		});

		it.concurrent('listKeluar() - not 200 no data', async () => {
			for (const [awal, akhir] of generateDateRanges(2022, 30)) {
				const result = await jkn.vclaim.rujukan.listKeluar({ awal, akhir });
				expect(result.metaData.code).not.toBe('200');
			}
		});

		it.concurrent('keluarByNomor() - not 200 no data', async () => {
			const result = await jkn.vclaim.rujukan.keluarByNomor({
				nomor: '061201030423P000001'
			});
			expect(result.metaData.code).not.toBe('200');
		});

		it.concurrent('jumlahSep() - 200 ok', async () => {
			const result = await jkn.vclaim.rujukan.jumlahSep({
				jenis: 1,
				nomor: '061201030423P000001'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.jumlahSEP).not.toBeFalsy();
		});
	},
	{ timeout: 25_000 }
);
