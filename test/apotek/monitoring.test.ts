import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('Apotek - Monitoring', { timeout: 25_000 }, () => {
	it.concurrent('dataKlaim()', async () => {
		const result = await jkn.apotek.monitoring.dataKlaim({
			bulan: 2,
			tahun: 2023,
			jenisObat: 0,
			status: 1
		});
		expect(result.metaData.code).toBe('201'); // no example data
	});
});
