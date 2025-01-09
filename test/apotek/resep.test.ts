import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('Apotek - Resep', { timeout: 25_000 }, () => {
	it.concurrent('dataKlaim() - 201 no data', async () => {
		const result = await jkn.apotek.resep.daftar({
			kdppk: '0112A017',
			KdJnsObat: '0',
			JnsTgl: 'TGLPELSJP',
			TglMulai: '2019-03-01 08:49:45',
			TglAkhir: '2019-03-31 06:18:33'
		});
		expect(result.metaData.code).toBe('201');
	});
});
