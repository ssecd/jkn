import { describe, expect, it } from 'vitest';
import jkn from '../jkn';
import { currentIsoDate } from '../utils';

describe('VClaim - Rencana Kontrol', { timeout: 25_000 }, () => {
	it.concurrent('sep() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.sep({
			nomor: '0089S0020523V000001'
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.noSep).toBe('0089S0020523V000001');
	});

	it.concurrent('cari() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.cari({
			nomor: '0089S0020623K000001'
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.noSuratKontrol).toBe('0089S0020623K000001');
	});

	it.concurrent('dataByNoka() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.dataByNoka({
			bulan: 6,
			tahun: 2023,
			nomorKartu: '0002084717968',
			filter: 1
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.list?.[0]?.noKartu).toBe('0002084717968');
	});

	it.concurrent('dataByTanggal() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.dataByTanggal({
			awal: '2023-05-14',
			akhir: '2023-06-12',
			filter: 1
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.list).not.toBeFalsy();
	});

	it.concurrent('poli() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.poli({
			jenis: 2,
			nomor: '0089S0020523V000001',
			tanggal: currentIsoDate()
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.list).not.toBeFalsy();
	});

	it.concurrent('dokter() - 200 ok', async () => {
		const result = await jkn.vclaim.rencanaKontrol.dokter({
			jenis: 2,
			kodePoli: 'MAT',
			tanggal: currentIsoDate()
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.list).not.toBeFalsy();
	});
});
