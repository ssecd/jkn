import { ApotekBaseApi } from './base.js';

export class Resep extends ApotekBaseApi {
	/**
	 * Simpan data resep
	 */
	async simpan(data: {
		/** tanggal dan jam contoh: `"2021-08-05 18:13:11"` */
		TGLSJP: string;

		REFASALSJP: string;

		POLIRSP: string;

		/** (1 = Obat PRB) (2 = Obat Kronis Belum Stabil) (3 = Obat Kemoterapi) */
		KDJNSOBAT: string;

		NORESEP: string;

		IDUSERSJP: string;

		/** tanggal dan jam contoh: `"2021-08-05 00:00:00"` */
		TGLRSP: string;

		/** tanggal dan jam contoh: `"2021-08-05 00:00:00"` */
		TGLPELRSP: string;

		KdDokter: string;

		/** (0. Non Iterasi, 1. Iterasi) */
		iterasi: string;
	}) {
		return this.send<{
			noSep_Kunjungan: string;
			noKartu: string;
			nama: string;
			faskesAsal: string;
			noApotik: string;
			noResep: string;
			tglResep: string;
			kdJnsObat: string;
			byTagRsp: string;
			byVerRsp: string;
			tglEntry: string;
		}>({
			path: `/sjpresep/v3/insert`,
			method: 'POST',
			data
		});
	}

	/**
	 * Hapus data resep
	 */
	async hapus(data: {
		nosjp: string;

		refasalsjp: string;

		noresep: string;
	}) {
		return this.send<null>({
			path: `/hapusresep`,
			method: 'DELETE',
			data
		});
	}

	/**
	 * Daftar resep
	 */
	async daftar(data: {
		kdppk: string;

		KdJnsObat: string;

		/** TGLPELSJP | TGLRSP */
		JnsTgl: string;

		/** tanggal dan jam contoh: `"2019-03-01 08:49:45"` */
		TglMulai: string;

		/** tanggal dan jam contoh: `"2019-03-31 06:18:33"` */
		TglAkhir: string;
	}) {
		return this.send<{
			resep: {
				NORESEP: string;
				NOAPOTIK: string;
				NOSEP_KUNJUNGAN: string;
				NOKARTU: string;
				NAMA: string;
				TGLENTRY: string;
				TGLRESEP: string;
				TGLPELRSP: string;
				BYTAGRSP: string;
				BYVERRSP: string;
				KDJNSOBAT: string;
				FASKESASAL: string;
			};
		}>({
			path: `/daftarresep`,
			method: 'POST',
			data
		});
	}
}
