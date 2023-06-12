import { describe, expect, it } from 'vitest';
import JKN from '../../src';

const jkn = new JKN();

describe(
	'VClaim - Referensi',
	() => {
		it.concurrent('diagnosa() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.diagnosa({
				keyword: 'h26.9'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.diagnosa.map((d) => d.kode.toLocaleLowerCase())).toContain('h26.9');
		});

		it.concurrent('poli() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.poli({
				keyword: 'mata'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.poli.map((d) => d.kode)).toContain('MAT');
		});

		it.concurrent('faskes() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.faskes({
				keyword: 'mata',
				jenis: 2
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.faskes.map((d) => d.nama)).toContain(
				'KU MATA SILAMPARI SRIWIJAYA EC - KOTA LUBUK LINGGAU'
			);
		});

		it.concurrent('dpjp() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.dpjp({
				jenis: 2,
				tanggal: '2023-06-12',
				kode: 'MAT'
			});
			expect(result.metaData.code).toBe('200');
			// unknown data because response random values
			expect(result.response?.list?.[0]?.kode).not.toBeFalsy();
		});

		it.concurrent('provinsi() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.provinsi();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('SUMATERA SELATAN');
		});

		it.concurrent('kabupaten() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.kabupaten({ provinsi: '06' });
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('KOTA LUBUK LINGGAU');
		});

		it.concurrent('kecamatan() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.kecamatan({ kabupaten: '0089' });
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('LUBUK LINGGAU SELATAN II');
		});

		it.concurrent('diagnosaPrb() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.diagnosaPrb();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list?.[0].kode).toContain('01');
		});

		it.concurrent('obatPrb() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.obatPrb({
				nama: 'tab 100 mg'
			});
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list).not.toBeFalsy();
		});

		it.concurrent('klaimProsedur() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.klaimProsedur({
				keyword: '13.41'
			});
			expect(result.metaData.code).toBe('200');
			expect(
				result.response?.procedure.find((p) =>
					p.nama //
						.toLocaleLowerCase()
						.includes('cataract')
				)
			).not.toBeFalsy();
		});

		it.concurrent('klaimKelasRawat() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.klaimKelasRawat();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('VIP');
		});

		it.concurrent('klaimDokter() - 201 no data', async () => {
			const result = await jkn.vclaim.referensi.klaimDokter({
				nama: '292667'
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('klaimSpesialistik() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.klaimSpesialistik();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)) //
				.toContain('Spesialis Penyakit Mata');
		});

		it.concurrent('klaimRuangRawat() - 201 no data', async () => {
			const result = await jkn.vclaim.referensi.klaimRuangRawat();
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('klaimCaraKeluar() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.klaimCaraKeluar();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('Dirujuk');
		});

		it.concurrent('klaimPaskaPulang() - 200 ok', async () => {
			const result = await jkn.vclaim.referensi.klaimPaskaPulang();
			expect(result.metaData.code).toBe('200');
			expect(result.response?.list.map((p) => p.nama)).toContain('Sembuh');
		});
	},
	{ timeout: 25_000 }
);
