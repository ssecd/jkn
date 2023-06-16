import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe(
	'Antrean',
	() => {
		it.concurrent('refPoli()', async () => {
			const result = await jkn.antrean.refPoli();
			expect(result.metadata.code).toBe(1);
			expect(result.response?.length).gte(0);
			expect(result.response?.[0]?.nmpoli).not.toBeFalsy();
		});

		it.concurrent('refDokter()', async () => {
			const result = await jkn.antrean.refDokter();
			expect(result.metadata.code).toBe(1);
			expect(result.response?.length).gte(0);
			expect(result.response?.[0]?.namadokter).not.toBeFalsy();
		});

		it.concurrent('refJadwalDokter()', async () => {
			const result = await jkn.antrean.refJadwalDokter({ poli: 'MAT', tanggal: '2023-05-01' });
			expect(result.metadata.code).toBe(200);
			expect(result.response?.length).gte(0);
			expect(result.response?.[0]?.kodesubspesialis).not.toBeFalsy();
		});

		it.concurrent('refPoliFp()', async () => {
			const result = await jkn.antrean.refPoliFp();
			console.log(result); // error: 'No Content'
		});

		it.concurrent('refPasienFp()', async () => {
			const result = await jkn.antrean.refPasienFp({ jenis: 'noka', nomor: '0002084717968' });
			expect(result.metadata.code).toBe(1);
			expect(result.response?.nomorkartu).toBe('0002084717968');
		});

		it.concurrent('listTaskId()', async () => {
			const result = await jkn.antrean.listTaskId({ kodeBooking: '2022032204531425' });
			expect(result.metadata.code).toBe(200);
			expect(result.response?.length).gt(0);
		});

		it.concurrent('dashboardPerTanggal()', async () => {
			const result = await jkn.antrean.dashboardPerTanggal({
				tanggal: '2022-03-22',
				waktu: 'rs'
			});
			expect(result.metadata.code).toBe(200);
			expect(result.response?.list.length).gt(0);
		});

		it.concurrent('dashboardPerBulan()', async () => {
			const result = await jkn.antrean.dashboardPerBulan({
				bulan: 3,
				tahun: 2022,
				waktu: 'rs'
			});
			expect(result.metadata.code).toBe(200);
			expect(result.response?.list.length).gt(0);
		});

		it.concurrent('perTanggal()', async () => {
			const result = await jkn.antrean.perTanggal('2022-03-22');
			expect(result.metadata.code).toBe(200);
			expect(result.response?.length).gt(0);
		});

		it.concurrent('perKodeBooking()', async () => {
			const result = await jkn.antrean.perKodeBooking('2022032204531425');
			expect(result.metadata.code).toBe(200);
			expect(result.response?.length).gt(0);
		});

		it.concurrent('belumDilayani()', async () => {
			const result = await jkn.antrean.belumDilayani();
			console.log(result); // error: 'No Content'
		});

		it.concurrent('belumDilayaniPredikat()', async () => {
			const result = await jkn.antrean.belumDilayaniPredikat({
				poli: 'MAT',
				dokter: '292667',
				hari: 2,
				jam: '07:00-15:00'
			});
			console.log(result); // error: 'No Content'
		});
	},
	{ timeout: 25_000 }
);
