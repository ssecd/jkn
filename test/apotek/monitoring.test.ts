import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe(
	'Apotek - Monitoring',
	() => {
		it.concurrent('dataKlaim()', async () => {
			const result = await jkn.apotek.monitoring.dataKlaim({
				bulan: 2,
				tahun: 2023,
				jenisObat: 0,
				status: 1
			});
			console.log(result);
			expect(result.metaData.code).toBe('201'); // no example data
		});
	},
	{ timeout: 25_000 }
);
