import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('PCare - Peserta', { timeout: 25_000 }, () => {
	it.concurrent('nomorKartu() - 204 NO_CONTENT', async () => {
		const result = await jkn.pcare.peserta.nomorKartu({
			nomor: '0000000000000'
		});
		expect(result.metaData.code).toBe(204);
	});
	it.concurrent('nomorKartu() - 200 ok', async () => {
		const result = await jkn.pcare.peserta.nomorKartu({
			nomor: '0002060616655'
		});
		expect(result.metaData.code).toBe(200);
		expect(result.response?.noKartu).toBe('0002060616655');
	});

	it.concurrent('jenisKartu(noka, nomor) - 204 NO_CONTENT', async () => {
		const result = await jkn.pcare.peserta.jenisKartu({
			jenis: 'noka',
			nomor: '0000000000000'
		});
		expect(result.metaData.code).toBe(204);
	});

	it.concurrent('jenisKartu(noka, nomor) - 200 ok', async () => {
		const result = await jkn.pcare.peserta.jenisKartu({
			jenis: 'noka',
			nomor: '0002060616655'
		});
		expect(result.metaData.code).toBe(200);
		expect(result.response?.noKartu).toBe('0002060616655');
	});

	it.concurrent('jenisKartu(nik, nomor) - 500 wrong final block length', async () => {
		const result = await jkn.pcare.peserta.jenisKartu({
			jenis: 'nik',
			nomor: '000000000000000'
		});
		console.log(result);
		expect(result.metaData.code).toBe('500');
	});

	it.concurrent('jenisKartu(nik, nomor) - 200 ok', async () => {
		const result = await jkn.pcare.peserta.jenisKartu({
			jenis: 'nik',
			nomor: '1705065003000004'
		});
		expect(result.metaData.code).toBe(200);
		expect(result.response?.noKartu).toBe('0002060616655');
	});
});
