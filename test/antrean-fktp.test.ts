import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe('Antrean', { timeout: 25_000 }, () => {
	it.concurrent('refPoli()', async () => {
		const result = await jkn.antreanFktp.refPoli({ tanggal: '2025-02-04' });
		expect(result.metaData.code).toBe(1);
		expect(result.response?.list?.length).gte(0);
		expect(result.response?.[0]?.nmpoli).not.toBeFalsy();
	});

	it.concurrent('refDokter()', async () => {
		const result = await jkn.antreanFktp.refDokter({
			tanggal: '2025-02-04',
			kodePoli: '001'
		});
		expect(result.metaData.code).toBe(1);
		expect(result.response?.list?.length).gte(0);
		expect(result.response?.[0]?.namadokter).not.toBeFalsy();
	});
});
