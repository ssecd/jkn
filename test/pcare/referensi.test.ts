import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('PCare - Referensi', { timeout: 25_000 }, () => {
	it.concurrent('diagnosa() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.diagnosa({ kode: 'A00', row: 1, limit: 10 });
		expect(result.metaData.code).toBe(200);
	});

	it.concurrent('dokter() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.dokter({ row: 1, limit: 10 });
		expect(result.metaData.code).toBe(200);
	});

	it.concurrent('kesadaran() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.kesadaran();
		expect(result.metaData.code).toBe(200);
	});

	it.concurrent('poli() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.poli({ row: 1, limit: 10 });
		expect(result.metaData.code).toBe(200);
	});

	it.concurrent('alergi() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.alergi({ kode: '01' });
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.nmAlergi)).toContain('Seafood');
	});

	it.concurrent('prognosa() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.prognosa();
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.kdPrognosa)).toContain('01');
	});

	it.concurrent('satatuspulang(ranap = true) - 200 ok', async () => {
		const result = await jkn.pcare.referensi.statuspulang({ ranap: true });
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.nmStatusPulang)).toContain('Sembuh');
	});

	it.concurrent('satatuspulang(ranap = false) - 200 ok', async () => {
		const result = await jkn.pcare.referensi.statuspulang({ ranap: false });
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.nmStatusPulang)).toContain('Berobat Jalan');
	});

	it.concurrent('provider() - 200 ok', async () => {
		const result = await jkn.pcare.referensi.provider({ row: 1, limit: 10 });
		expect(result.metaData.code).toBe(200);
	});
});
