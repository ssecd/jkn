import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('PCare - Kunjungan', { timeout: 25_000 }, () => {
	it.concurrent('rujukan() - 500 wrong final block length', async () => {
		const result = await jkn.pcare.kunjungan.rujukan({ nomor: '0114A0260815Y000003' });
		expect(result.metaData.code).toBe('500');
	});
	it.concurrent('rujukan() - 200 ok', async () => {
		const result = await jkn.pcare.kunjungan.rujukan({ nomor: '0108B0110326Y000002' });
		expect(result.metaData.code).toBe(200);
	});

	it.concurrent('riwayat() - 200 ok', async () => {
		const result = await jkn.pcare.kunjungan.riwayat({ nomor: '0002060616655' });
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.peserta.noKartu)).toContain('0002060616655');
	});
});
