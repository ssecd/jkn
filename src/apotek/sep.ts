import { ApotekBaseApi } from './base.js';

export class SEP extends ApotekBaseApi {
	/**
	 * Data kunjungan berdasarkan nomor SEP
	 */
	async kunjungan(params: {
		/** nomor SEP kunjungan */
		nomorSep: string;
	}) {
		return this.send<{
			noSep: string;
			faskesasalresep: string;
			nmfaskesasalresep: string;
			nokartu: string;
			namapeserta: string;

			/** L atau P */
			jnskelamin: string;

			tgllhr: string;
			pisat: string;
			kdjenispeserta: string;
			nmjenispeserta: string;
			kodebu: string;
			namabu: string;
			tglsep: string;
			tglplgsep: string;
			jnspelayanan: string;
			nmdiag: string;
			poli: string;
			flagprb: string;
			namaprb: string;
			kodedokter: string;
			namadokter: string | null;
		}>({
			name: this.name + 'Cari No. Kunjungan/SEP',
			path: `/sep/${params.nomorSep}`,
			method: 'GET'
		});
	}
}
