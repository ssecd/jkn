import { VClaimBaseApi } from './base.js';

export class Peserta extends VClaimBaseApi {
	/**
	 * Pencarian data peserta berdasarkan nomor kartu
	 *
	 * @param value nomor kartu JKN atau BPJS
	 * @param tanggal tanggal pelayanan atau SEP
	 */
	async nomorKartu(value: string, tanggal: string) {
		return this.send<{ peserta: DataPeserta }>({
			path: `/Peserta/nokartu/${value}/tglSEP/${tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data peserta berdasarkan NIK
	 *
	 * @param value NIK
	 * @param tanggal tanggal pelayanan atau SEP
	 */
	async nik(value: string, tanggal: string) {
		return this.send<{ peserta: DataPeserta }>({
			path: `/Peserta/nik/${value}/tglSEP/${tanggal}`,
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
