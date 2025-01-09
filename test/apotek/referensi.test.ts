import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('Apotek - Referensi', { timeout: 25_000 }, () => {
	it.concurrent('dpho() - 201 no data', async () => {
		const result = await jkn.apotek.referensi.dpho();
		expect(result.metaData.code).toBe('201');
	});

	it.concurrent('poli() - 200 ok', async () => {
		const result = await jkn.apotek.referensi.poli({ keyword: 'mata' });
		expect(result.metaData.code).toBe('200');
		expect(result.response?.poli.map((d) => d.kode)).toContain('MAT');
	});

	it.concurrent('faskes() - 200 ok', async () => {
		const result = await jkn.apotek.referensi.faskes({ jenis: 2, nama: 'mata' });
		expect(result.metaData.code).toBe('200');
		expect(result.response?.faskes.map((d) => d.nama)).toContain(
			'KU MATA SILAMPARI SRIWIJAYA EC - KOTA LUBUK LINGGAU'
		);
	});

	it.concurrent('settingApotek() - 201 no data', async () => {
		const result = await jkn.apotek.referensi.settingApotek({ kodeApotek: '12345' });
		expect(result.metaData.code).toBe('201');
	});

	it.concurrent('spesialistik() - 200 ok', async () => {
		const result = await jkn.apotek.referensi.spesialistik();
		expect(result.metaData.code).toBe('200');
		expect(result.response?.list?.[0]?.kode).not.toBeFalsy();
	});

	it.concurrent('obat() - 201 no data', async () => {
		const result = await jkn.apotek.referensi.obat({
			jenis: '12345',
			tanggal: '2023-01-01'
		});
		expect(result.metaData.code).toBe('201');
	});
});
