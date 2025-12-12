import { ApotekBaseApi } from './base.js';

export class PRB extends ApotekBaseApi {
	/**
	 * Data rekap peserta PRB yang baru dilakukan PRB oleh Faskes
	 */
	async rekapPeserta(params: {
		/** tahun */
		tahun: number;

		/** angka bulan 1 sampai 12 */
		bulan: number;
	}) {
		return this.send<{
			list: {
				No: 1;
				NamaPeserta: string;
				NomorKaPst: string;
				Alamat: string;
				TglSRB: string;
				Diagnosa: string;
				Obat: string;
				DPJP: string;
				AsalFaskes: string;
			}[];
		}>({
			name: this.name + 'Data Klaim',
			path: `/Prb/rekappeserta/tahun/${params.tahun}/bulan/${params.bulan}`,
			method: 'GET'
		});
	}
}
