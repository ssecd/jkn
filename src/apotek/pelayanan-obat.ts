import { ApotekBaseApi } from './base.js';

export class PelayananObat extends ApotekBaseApi {
	/**
	 * Hapus pelayanan obat
	 */
	async hapus(data: {
		nosepapotek: string;

		noresep: string;

		kodeobat: string;

		tipeobat: string;
	}) {
		return this.send<string>({
			path: `/pelayanan/obat/hapus/`,
			method: 'DELETE',
			data
		});
	}

	/**
	 * Data daftar pelayanan obat
	 */
	async daftar(params: {
		/** nomor SEP kunjungan */
		nomorSep: string;
	}) {
		return this.send<{
			detailsep: {
				noSepApotek: string;
				noSepAsal: string;
				noresep: string;
				nokartu: string;
				nmpst: string;
				kdjnsobat: string;
				nmjnsobat: string;
				tglpelayanan: string;
				listobat: {
					kodeobat: string;
					namaobat: string;
					tipeobat: string;
					signa1: string;
					signa2: string;
					hari: string;
					permintaan: string | null;
					jumlah: string;
					harga: string;
				};
			};
		}>({
			path: `/obat/daftar/${params.nomorSep}`,
			method: 'GET'
		});
	}

	/**
	 * Riwayat pelayanan obat
	 */
	async riwayat(params: {
		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;

		/** nomor kartu peserta */
		nomorKartu: string;
	}) {
		return this.send<{
			list: {
				nokartu: string;
				namapeserta: string;
				tgllhr: string;
				history: {
					nosjp: string;
					tglpelayanan: string;
					noresep: string;
					kodeobat: string;
					namaobat: string;
					jmlobat: string;
				}[];
			};
		}>({
			path: `/riwayatobat/${params.awal}/${params.akhir}/${params.nomorKartu}`,
			method: 'GET'
		});
	}
}
