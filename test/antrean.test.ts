import { describe, expect, it } from 'vitest';
import JKN from '../src';

const jkn = new JKN();

describe('Antrean', () => {
	it('refPoli()', async () => {
		const result = await jkn.antrean.refPoli();
		expect(result.metadata.code).toBe(1);
		expect(result.response?.length).gte(0);
		expect(result.response?.[0]?.nmpoli).not.toBeFalsy();
	});

	it('refDokter()', async () => {
		const result = await jkn.antrean.refDokter();
		expect(result.metadata.code).toBe(1);
		expect(result.response?.length).gte(0);
		expect(result.response?.[0]?.namadokter).not.toBeFalsy();
	});

	it('refJadwalDokter()', async () => {
		const result = await jkn.antrean.refJadwalDokter('MAT', '2023-05-01');
		expect(result.metadata.code).toBe(200);
		expect(result.response?.length).gte(0);
		expect(result.response?.[0]?.kodesubspesialis).not.toBeFalsy();
	});

	it('refPoliFp()', async () => {
		const result = await jkn.antrean.refPoliFp();
		console.log(result); // error: 'No Content'
	});

	it('refPasienFp()', async () => {
		const result = await jkn.antrean.refPasienFp('noka', '0002084717968');
		expect(result.metadata.code).toBe(1);
		expect(result.response?.nomorkartu).toBe('0002084717968');
	});
});
