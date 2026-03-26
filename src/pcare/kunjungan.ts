import { PCareBaseApi } from './base.js';

export class Kunjungan extends PCareBaseApi {
	/**
	 * Get Data Rujukan
	 * @param params param { nomor = Nomor Rujukan }
	 */
	async rujukan(params: {
		/** Nomor Rujukan */
		nomor: string;
	}) {
		return this.send<RujukanResult>({
			name: `${this.name} Data Rujukan`,
			path: ['/kunjungan/rujukan/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Get Data Riwayat Kunjungan
	 * @param params param { nomor = Nomor Rujukan }
	 */
	async riwayat(params: {
		/** Nomor Kartu Peserta */
		nomor: string;
	}) {
		return this.send<{ count: number; list: RiwayatKunjunganResult[] }>({
			name: `${this.name} Data Riwayat Kunjungan`,
			path: ['/kunjungan/peserta/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data Kunjungan
	 * @param data InputRujukanKhusus | InputRujukanSpesialis
	 */
	async insert(data: InputKunjunganKhusus | InputKunjunganSpesialis) {
		return this.send<{ field: string; messaage: string }>({
			name: `${this.name} Add Data Kunjungan`,
			path: '/kunjungan',
			method: 'POST',
			data: data
		});
	}

	/**
	 * Edit Data Kunjungan
	 * @param data InputUpdateKunjungan
	 */
	async update(data: InputUpdateKunjungan) {
		return this.send<null>({
			name: `${this.name} Edit Data Kunjungan`,
			path: '/kunjungan',
			method: 'PUT',
			data: data
		});
	}

	/**
	 * Delete Data Kunjungan
	 * @param params {nomor = Nomor Kunjungan}
	 */
	async delete(params: {
		/** Nomor Kunjungan */
		nomor: string;
	}) {
		return this.send<null>({
			name: `${this.name} Delete Data Kunjungan`,
			path: ['/kunjungan/:nomor', params],
			method: 'DELETE'
		});
	}
}

interface RujukanResult {
	noRujukan: string;
	ppk: {
		kdPPK: string;
		nmPPK: string;
		alamat: string | null;
		kc: {
			kdKC: string;
			nmKC: string;
			alamat: string | null;
			telp: string | null;
			fax: string | null;
			dati: {
				kdProp: string | null;
				kdDati: string;
				nmDati: string;
			};
			kdKR: {
				kdKR: string;
				nmKR: string;
				alamat: string | null;
				telp: string | null;
				fax: string | null;
			};
		};
	};
	tglKunjungan: string;
	poli: {
		kdPoli: string;
		nmPoli: string;
	};
	nokaPst: string;
	nmPst: string;
	tglLahir: string;
	pisa: string;
	ketPisa: string;
	sex: string;
	diag1: {
		kdDiag: string;
		nmDiag: string;
	};
	diag2: string | null;
	diag3: string | null;
	catatan: string;
	dokter: {
		kdDokter: string;
		nmDokter: string;
	};
	tacc: {
		nmTacc: string | null;
		alasanTacc: string | null;
	};
	infoDenda: string;
}

interface RiwayatKunjunganResult {
	noKunjungan: string;
	tglKunjungan: string;
	providerPelayanan: {
		kdProvider: string;
		nmProvider: string;
	};
	peserta: {
		noKartu: string;
		nama: string | null;
		hubunganKeluarga: string;
		sex: string | null;
		tglLahir: string | null;
		tglMulaiAktif: string | null;
		tglAkhirBerlaku: string | null;
		kdPpkPst: string | null;
		kdPpkGigi: string | null;
		jnsKelas: string | null;
		jnsPeserta: string | null;
		golDarah: string | null;
		noHP: string | null;
		noKTP: string | null;
		asuransi: string | null;
	};
	poli: {
		kdPoli: string;
		nmPoli: string;
		poliSakit: boolean;
	};
	progProlanis: {
		kdProgram: string;
		nmProgram: string;
	};
	keluhan: string;
	diagnosa1: {
		kdDiag: string;
		nmDiag: string;
		nonSpesialis: boolean;
	};
	diagnosa2: {
		kdDiag: string | null;
		nmDiag: string | null;
		nonSpesialis: boolean;
	};
	diagnosa3: {
		kdDiag: string | null;
		nmDiag: string | null;
		nonSpesialis: boolean;
	};
	kesadaran: {
		kdSadar: string;
		nmSadar: string;
	};
	sistole: number;
	diastole: number;
	beratBadan: number;
	tinggiBadan: number;
	respRate: number;
	heartRate: number;
	catatan: string;
	rujukBalik: number;
	providerAsalRujuk: {
		kdProvider: string;
		nmProvider: string | null;
	};
	providerRujukLanjut: {
		kdProvider: string;
		nmProvider: string;
	};
	pemFisikLain: string;
	dokter: {
		kdDokter: string;
		nmDokter: string;
	};
	statusPulang: {
		kdStatusPulang: string;
		nmStatusPulang: string;
	};
	tkp: {
		kdTkp: string;
		nmTkp: string;
	};
	poliRujukInternal: {
		kdPoli: string | null;
		nmPoli: string | null;
		poliSakit: boolean;
	};
	poliRujukLanjut: {
		kdPoli: string;
		nmPoli: string;
		poliSakit: boolean;
	};
	tglPulang: string;
}

interface InputKunjunganKhusus {
	noKunjungan: string | null;
	noKartu: string;
	tglDaftar: string;
	kdPoli: string | null;
	keluhan: string;
	kdSadar: string;
	sistole: number;
	diastole: number;
	beratBadan: number;
	tinggiBadan: number;
	respRate: number;
	heartRate: number;
	lingkarPerut: number;
	kdStatusPulang: string;
	tglPulang: string;
	kdDokter: string;
	kdDiag1: string;
	kdDiag2: string | null;
	kdDiag3: string | null;
	kdPoliRujukInternal: string | null;
	rujukLanjut: {
		tglEstRujuk: string;
		kdppk: string;
	};
	kdTacc: number;
	alasanTacc: string | null;
	anamnesa: string;
	alergiMakan: string;
	alergiUdara: string;
	alergiObat: string;
	kdPrognosa: string;
	terapiObat: string;
	terapiNonObat: string;
	bmhp: string;
	suhu: string;
}

interface InputKunjunganSpesialis {
	noKunjungan: string | null;
	noKartu: string;
	tglDaftar: string;
	kdPoli: string;
	keluhan: string;
	kdSadar: string;
	sistole: number;
	diastole: number;
	beratBadan: number;
	tinggiBadan: number;
	respRate: number;
	heartRate: number;
	lingkarPerut: number;
	kdStatusPulang: string;
	tglPulang: string;
	kdDokter: string;
	kdDiag1: string;
	kdDiag2: string | null;
	kdDiag3: string | null;
	kdPoliRujukInternal: string | null;
	rujukLanjut: {
		kdppk: string;
		tglEstRujuk: string;
	};
	kdTacc: number;
	alasanTacc: string | null;
	anamnesa: string;
	alergiMakan: string;
	alergiUdara: string;
	alergiObat: string;
	kdPrognosa: string;
	terapiObat: string;
	terapiNonObat: string;
	bmhp: string;
	suhu: string;
}

interface InputUpdateKunjungan {
	noKunjungan: string;
	noKartu: string;
	keluhan: string;
	kdSadar: string;
	sistole: number;
	diastole: number;
	beratBadan: number;
	tinggiBadan: number;
	respRate: number;
	heartRate: number;
	lingkarPerut: number;
	kdStatusPulang: string;
	tglPulang: string;
	kdDokter: string;
	kdDiag1: string;
	kdDiag2: string | null;
	kdDiag3: string | null;
	kdPoliRujukInternal: string | null;
	rujukLanjut: {
		tglEstRujuk: string;
		kdppk: string;
		subSpesialis: {
			kdSubSpesialis1: string;
			kdSarana: string | null;
		} | null;
		khusus: {
			kdKhusus: string;
			kdSubSpesialis: string | null;
			catatan: string;
		} | null;
	};
	kdTacc: number;
	alasanTacc: string;
	anamnesa: string;
	alergiMakan: string;
	alergiUdara: string;
	alergiObat: string;
	kdPrognosa: string;
	terapiObat: string;
	terapiNonObat: string;
	bmhp: string;
	suhu: string;
}
