import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe(
	'Apotek - Pelayanan Obat',
	() => {
		it.concurrent('daftar() - 201 no data', async () => {
			const result = await jkn.apotek.pelayananObat.daftar({
				nomorSep: '0089S0020523V000001'
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('riwayat() - 201 no data', async () => {
			const result = await jkn.apotek.pelayananObat.riwayat({
				awal: '2023-01-01',
				akhir: '2023-01-31',
				nomorKartu: '0002084717968'
			});
			expect(result.metaData.code).toBe('201');
		});
	},
	{ timeout: 25_000 }
);
