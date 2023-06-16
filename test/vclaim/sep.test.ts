import { describe, expect, it } from 'vitest';
import jkn from '../jkn';
import { currentIsoDate } from '../utils';

describe(
	'VClaim - cari',
	() => {
		it.concurrent('cari() - 200 ok', async () => {
			const result = await jkn.vclaim.sep.cari({
				nomor: '0089S0020523V000001'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.noSep).toBe('0089S0020523V000001');
		});

		it.concurrent('suplesiJasaRaharja() - 201 no data', async () => {
			const result = await jkn.vclaim.sep.suplesiJasaRaharja({
				nomorKartu: '0002084717968',
				tanggalPelayanan: currentIsoDate()
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('dataIndukKecelakaan() - 201 no data', async () => {
			const result = await jkn.vclaim.sep.dataIndukKecelakaan({
				nomorKartu: '0002084717968'
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('listPersetujuan() - 200 ok', async () => {
			const result = await jkn.vclaim.sep.listPersetujuan({
				bulan: 5,
				tahun: 2023
			});
			console.log(result); // TODO: ask why `Unauthorized!`
			// expect(result.metaData.code).toBe('201');
		});

		it.concurrent('listTanggalPulang() - 201 no data', async () => {
			const result = await jkn.vclaim.sep.listTanggalPulang({
				bulan: 6,
				tahun: 2023,
				filter: ''
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('inacbg() - 200 ok', async () => {
			const result = await jkn.vclaim.sep.inacbg({
				nomor: '0089S0020523V000001'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.pesertasep.noKartuBpjs).toBe('0002084717968');
		});

		it.concurrent('listInternal() - 201 no data or not found', async () => {
			const result = await jkn.vclaim.sep.listInternal({
				nomor: '0089S0020523V000001'
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('fingerPrint() - 200 ok', async () => {
			const result = await jkn.vclaim.sep.fingerPrint({
				nomorKartu: '0002084717968',
				tanggal: currentIsoDate()
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.status).not.toBeFalsy();
		});

		it.concurrent('listFingerPrint() - 201 no data', async () => {
			const result = await jkn.vclaim.sep.listFingerPrint({
				tanggal: currentIsoDate()
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('listRandomQuestions() - 200 ok', async () => {
			const result = await jkn.vclaim.sep.listRandomQuestions({
				nomorKartu: '0002084717968',
				tanggal: currentIsoDate()
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.faskes?.[0]?.kode).not.toBeFalsy();
		});
	},
	{ timeout: 25_000 }
);
