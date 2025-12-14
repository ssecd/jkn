import { VClaimBaseApi } from './base.js';

export class Peserta extends VClaimBaseApi {
	/**
	 * Pencarian data peserta berdasarkan nomor kartu
	 */
	async nomorKartu(params: {
		/** nomor kartu JKN atau BPJS */
		nomor: string;

		/** tanggal pelayanan atau SEP dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{ peserta: DataPeserta }>({
			name: this.name + 'No. Kartu BPJS',
			path: ['/Peserta/nokartu/:nomor/tglSEP/:tanggal', params],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data peserta berdasarkan NIK
	 */
	async nomorKependudukan(params: {
		/** nomor induk kependudukan atau NIK */
		nomor: string;

		/** tanggal pelayanan atau SEP dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{ peserta: DataPeserta }>({
			name: this.name + 'NIK',
			path: ['/Peserta/nik/:nomor/tglSEP/:tanggal', params],
			method: 'GET'
		});
	}
}

interface DataPeserta {
	cob: {
		nmAsuransi: string | null;
		noAsuransi: string | null;
		tglTAT: string | null;
		tglTMT: string | null;
	};
	hakKelas: {
		keterangan: string;
		kode: string;
	};
	informasi: {
		dinsos: string | null;
		noSKTM: string | null;
		prolanisPRB: string | null;
		eSEP: 'True' | 'False' | null;
	};
	jenisPeserta: {
		keterangan: string;
		kode: string;
	};
	mr: {
		noMR: string | null;
		noTelepon: string | null;
	};
	nama: string;
	nik: string;
	noKartu: string;
	pisa: string;
	provUmum: {
		kdProvider: string;
		nmProvider: string;
	};
	sex: string;
	statusPeserta: {
		keterangan: string;
		kode: string;
	};
	tglCetakKartu: string;
	tglLahir: string;
	tglTAT: string;
	tglTMT: string;
	umur: {
		umurSaatPelayanan: string;
		umurSekarang: string;
	};
}
