import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('PCare - Referensi', { timeout: 25_000 }, () => {
	it.concurrent('spesialis() - 200 ok', async () => {
		const result = await jkn.pcare.spesialis.get();
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.kdSpesialis)).toContain('ANA');
	});

	it.concurrent('subSpesialis() - 200 ok', async () => {
		const result = await jkn.pcare.spesialis.sub({ kode: 'ANA' });
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.kdPoliRujuk)).toContain('ANA');
	});

	it.concurrent('sarana() - 200 ok', async () => {
		const result = await jkn.pcare.spesialis.sarana();
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.nmSarana)).toContain('REKAM MEDIK');
	});

	it.concurrent('khusus() - 200 ok', async () => {
		const result = await jkn.pcare.spesialis.khusus();
		expect(result.metaData.code).toBe(200);
		expect(result.response?.list.map((d) => d.nmKhusus)).toContain('HEMODIALISA');
	});

	it.concurrent('faskesRujukanSubSpesialis() - 200 ok', async () => {
		const result = await jkn.pcare.spesialis.faskesRujukanSubSpesialis({
			kodeSub: '26', // kode subSpesialis untuk ANAK
			kodeSarana: '1', // kode sarana untuk REKAM MEDIK
			tanggal: '25-03-2026'
		});
		expect(result.metaData.code).toBe(200);
	});
});
