import { ApotekBaseApi } from './base.js';

export class Monitoring extends ApotekBaseApi {
	/**
	 * Data klaim resep
	 */
	async dataKlaim(params: {
		/** angka bulan 1 sampai 12 */
		bulan: number;

		/** tahun */
		tahun: number;

		/** jenis obat (0 = Semua) (1 = Obat PRB) (2 = Obat Kronis Belum Stabil) (3 = Obat Kemoterapi) */
		jenisObat: number;

		/** status klaim (0 = Belum di-verifikasi) (1 = Sudah Verifikasi) */
		status: number;
	}) {
		return this.send<{
			rekap: {
				jumlahdata: string;
				totalbiayapengajuan: string;
				totalbiayasetuju: string;
				listsep: {
					nosepapotek: string;
					nosepaasal: string;
					nokartu: string;
					namapeserta: string;
					noresep: string;
					jnsobat: string;
					tglpelayanan: string;
					biayapengajuan: string;
					biayasetuju: string;
				}[];
			};
		}>({
			path: `/monitoring/klaim/${params.bulan}/${params.tahun}/${params.jenisObat}/${params.status}`,
			method: 'GET'
		});
	}
}
