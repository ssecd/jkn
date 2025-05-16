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

		/**
		 * (1 = Obat PRB) (2 = Obat Kronis Belum Stabil) (3 = Obat Kemoterapi)
		 *
		 * nomor Resep maksimal 5 digit, di-generate sesuai kebutuhan, dalam 1
		 * bulan klaim tidak boleh ada yang sama.
		 */
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
			/** Nomor SEP Resep */
			noApotik: string;
			noResep: string;
			tglResep: string;
			kdJnsObat: string;
			byTagRsp: string;
			byVerRsp: string;
			tglEntry: string;
		}>({
			name: this.name + 'Simpan',
			path: `/sjpresep/v3/insert`,
			method: 'POST',
			data
		});
	}

	/**
	 * Hapus data resep
	 */
	async hapus(data: {
		/** nomor SEP Resep dari response simpan resep */
		nosjp: string;

		/** nomor SEP Kunjungan */
		refasalsjp: string;

		noresep: string;
	}) {
		return this.send<null>({
			name: this.name + 'Hapus',
			path: `/hapusresep`,
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			skipContentTypeHack: true,
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
			name: this.name + 'List/Daftar',
			path: `/daftarresep`,
			method: 'POST',
			data
		});
	}
}
