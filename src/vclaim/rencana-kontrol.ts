import { VClaimBaseApi } from './base.js';

// TODO: make generic request and response data type as possible
export class RencanaKontrol extends VClaimBaseApi {
	get listPenyakitPRB(): { kode: string; nama: string }[] {
		return [
			['01', 'Diabetes Mellitus'],
			['02', 'Hipertensi'],
			['03', 'Asma'],
			['04', 'Penyakit Jantung'],
			['05', 'PPOK'],
			['06', 'Skizofrenia'],
			['07', 'Stroke'],
			['08', 'Epilepsi'],
			['09', 'SLE']
		].map(([kode, nama]) => ({ kode, nama }));
	}

	/**
	 * Insert rencana kontrol
	 */
	async insert(data: RencanaKontrolInsert) {
		return this.send<RencanaKontrolWriteResult>({
			name: this.name + 'Insert',
			path: `/RencanaKontrol/insert`,
			method: 'POST',
			data: { request: data }
		});
	}

	/**
	 * Insert rencana kontrol dengan API v2
	 */
	async insertV2(data: RencanaKontrolInsertV2) {
		return this.send<RencanaKontrolWriteResultV2>({
			name: this.name + 'InsertV2',
			path: '/RencanaKontrol/v2/Insert',
			method: 'POST',
			data: { request: data }
		});
	}

	/**
	 * Update rencana kontrol
	 */
	async update(
		data: {
			/** nomor surat kontrol yang akan di-update */
			noSuratKontrol: string;
		} & RencanaKontrolInsert
	) {
		return this.send<RencanaKontrolWriteResult>({
			name: this.name + 'Update',
			path: `/RencanaKontrol/Update`,
			method: 'PUT',
			data: { request: data }
		});
	}

	/**
	 * Update rencana kontrol dengan API v2
	 */
	async updateV2(
		data: {
			/** nomor surat kontrol yang akan di-update */
			noSuratKontrol: string;
		} & RencanaKontrolInsertV2
	) {
		return this.send<RencanaKontrolWriteResultV2>({
			name: this.name + 'UpdateV2',
			path: '/RencanaKontrol/v2/Update',
			method: 'PUT',
			data: { request: data }
		});
	}

	/**
	 * Delete atau hapus rencana kontrol
	 */
	async delete(data: {
		/** nomor surat kontrol yang akan dihapus */
		noSuratKontrol: string;

		/** user yang menghapus surat kontrol */
		user: string;
	}) {
		return this.send<null>({
			name: this.name + 'Hapus',
			path: `/RencanaKontrol/Delete`,
			method: 'DELETE',
			data: { request: { t_suratkontrol: data } }
		});
	}

	/**
	 * Insert surat pengantar rawat inap (SPRI)
	 */
	async insertSPRI(data: {
		/** nomor kartu peserta JKN */
		noKartu: string;

		/** kode dokter JKN */
		kodeDokter: string;

		/** kode poli JKN */
		poliKontrol: string;

		/** tanggal rencana kontrol dengan format YYYY-MM-DD */
		tglRencanaKontrol: string;

		/** user yang membuat SPRI */
		user: string;
	}) {
		return this.send<{
			noSPRI: string;
			tglRencanaKontrol: string;
			namaDokter: string;
			noKartu: string;
			nama: string;
			kelamin: string;
			tglLahir: string;
			namaDiagnosa: string | null;
		}>({
			name: this.name + 'Insert SPRI',
			path: `/RencanaKontrol/InsertSPRI`,
			method: 'POST',
			data: { request: data }
		});
	}

	/**
	 * Update surat pengantar rawat inap (SPRI)
	 */
	async updateSPRI(data: {
		/** nomor SPRI yang akan di-update */
		noSPRI: string;

		/** kode dokter JKN */
		kodeDokter: string;

		/** kode poli JKN */
		poliKontrol: string;

		/** tanggal rencana kontrol dengan format YYYY-MM-DD */
		tglRencanaKontrol: string;

		/** user yang membuat SPRI */
		user: string;
	}) {
		return this.send<{
			noSPRI: string;
			tglRencanaKontrol: string;
			namaDokter: string;
			noKartu: string;
			nama: string;
			kelamin: string;
			tglLahir: string;
			namaDiagnosa: string | null;
		}>({
			name: this.name + 'Update SPRI',
			path: `/RencanaKontrol/UpdateSPRI`,
			method: 'PUT',
			data: { request: data }
		});
	}

	/**
	 * Melihat data SEP untuk keperluan rencana kontrol
	 */
	async sep(params: {
		/** nomor SEP */
		nomor: string;
	}) {
		return this.send<{
			noSep: string;
			tglSep: string;
			jnsPelayanan: string;
			poli: string;
			diagnosa: string;
			peserta: {
				noKartu: string;
				nama: string;
				tglLahir: string;
				kelamin: string;
				hakKelas: string;
			};
			provUmum: {
				kdProvider: string;
				nmProvider: string;
			};
			provPerujuk: {
				kdProviderPerujuk: string;
				nmProviderPerujuk: string;
				asalRujukan: string;
				noRujukan: string;
				tglRujukan: string;
			};
		}>({
			name: this.name + 'Cari SEP',
			path: `/RencanaKontrol/nosep/${encodeURIComponent(params.nomor)}`,
			method: 'GET'
		});
	}

	/**
	 * Melihat detail surat kontrol berdasarkan nomor surat kontrol
	 *
	 * Catatan:
	 * Ketika pembuatan SPRI atau jenis kontrol = 1 tidak ada referensi nomor SEP asalnya,
	 * jadi field response SEP kosong atau null. Sedangkan jika pembuatan surat kontrol
	 * atau jenis kontrol = 2, akan ter-isi field response SEP karena terdapat referensi
	 * nomor SEP asal ketika pembuatan surat kontrol tersebut.
	 */
	async cari(params: {
		/** nomor surat kontrol */
		nomor: string;
	}) {
		return this.send<
			Omit<SuratKontrolDetail, 'jnsKontrol' | 'sep'> &
				({ jnsKontrol: '1'; sep: null } | { jnsKontrol: '2'; sep: SuratKontrolDetail['sep'] })
		>({
			name: this.name + 'Cari Surat Kontrol',
			path: `/RencanaKontrol/noSuratKontrol/${encodeURIComponent(params.nomor)}`,
			method: 'GET'
		});
	}

	/**
	 * List data rencana kontrol berdasarkan nomor kartu peserta
	 */
	async dataByNoka(params: {
		/** bulan dimulai dari 1 (Januari) */
		bulan: number;

		/** misalnya 2020 */
		tahun: number;

		/** nomor kartu peserta JKN */
		nomorKartu: string;

		/** jenis filter (1 = tanggal entri) (2 = tanggal rencana kontrol) */
		filter: number;
	}) {
		const bulan = String(params.bulan || 0).padStart(2, '0');
		return this.send<{ list: RencanaKontrolListItem[] }>({
			name: this.name + 'Data Berdasarkan No. Kartu',
			path: `/RencanaKontrol/ListRencanaKontrol/Bulan/${bulan}/Tahun/${params.tahun}/Nokartu/${encodeURIComponent(params.nomorKartu)}/filter/${params.filter}`,
			method: 'GET'
		});
	}

	/**
	 * List data rencana kontrol berdasarkan tanggal
	 */
	async dataByTanggal(params: {
		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;

		/** jenis filter (1 = tanggal entri) (2 = tanggal rencana kontrol) */
		filter: number;
	}) {
		return this.send<{ list: Omit<RencanaKontrolListItem, 'terbitSEP'>[] }>({
			name: this.name + 'Data Berdasarkan Tanggal',
			path: `/RencanaKontrol/ListRencanaKontrol/tglAwal/${params.awal}/tglAkhir/${params.akhir}/filter/${params.filter}`,
			method: 'GET'
		});
	}

	/**
	 * Data poli untuk rencana kontrol
	 */
	async poli(params: {
		/** jenis kontrol (1 = SPRI) (2 = Rencana Kontrol) */
		jenis: number;

		/** nomor kartu jika jenis kunjungan 1 (SPRI) atau nomor SEP jika jenis kunjungan 2 (Rencana Kontrol) */
		nomor: string;

		/** tanggal rencana kontrol dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				kodePoli: string;
				namaPoli: string;
				kapasitas: string;
				jmlRencanaKontroldanRujukan: string;
				persentase: '0.00';
			}[];
		}>({
			name: this.name + 'Data Poli/Spesialistik',
			path: `/RencanaKontrol/ListSpesialistik/JnsKontrol/${params.jenis}/nomor/${encodeURIComponent(params.nomor)}/TglRencanaKontrol/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Data dokter untuk rencana kontrol
	 */
	async dokter(params: {
		/** jenis kontrol (1 = SPRI) (2 = Rencana Kontrol) */
		jenis: number;

		/** kode poli JKN */
		kodePoli: string;

		/** tanggal rencana kontrol dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				kodeDokter: string;
				namaDokter: string;
				jadwalPraktek: string;
				kapasitas: string;
			}[];
		}>({
			name: this.name + 'Data Dokter',
			path: `/RencanaKontrol/JadwalPraktekDokter/JnsKontrol/${params.jenis}/KdPoli/${encodeURIComponent(params.kodePoli)}/TglRencanaKontrol/${params.tanggal}`,
			method: 'GET'
		});
	}
}

interface SuratKontrolDetail {
	noSuratKontrol: string;
	tglRencanaKontrol: string;
	tglTerbit: string;
	/** 1 = SPRI/Rawat Inap | 2 = Surat Kontrol/Rawat Jalan */
	jnsKontrol: '1' | '2';
	poliTujuan: string;
	namaPoliTujuan: string;
	kodeDokter: string;
	namaDokter: string;
	flagKontrol: 'True' | 'False' | string;
	kodeDokterPembuat: string | null;
	namaDokterPembuat: string | null;
	namaJnsKontrol: string;
	sep: {
		noSep: string;
		tglSep: string;
		jnsPelayanan: string;
		poli: string;
		diagnosa: string;
		peserta: {
			noKartu: string;
			nama: string;
			tglLahir: string;
			kelamin: string;
			hakKelas: string;
		};
		provUmum: {
			kdProvider: string;
			nmProvider: string;
		};
		provPerujuk: {
			kdProviderPerujuk: string;
			nmProviderPerujuk: string;
			asalRujukan: '1' | '2';
			noRujukan: string;
			tglRujukan: string;
		};
	};
	formPRB: RencanaKontrolPRB;
}

interface RencanaKontrolListItem {
	noSuratKontrol: string;
	jnsPelayanan: string;
	/** 1 = SPRI/Rawat Inap | 2 = Surat Kontrol/Rawat Jalan */
	jnsKontrol: '1' | '2';
	namaJnsKontrol: string;
	tglRencanaKontrol: string;
	tglTerbitKontrol: string;
	noSepAsalKontrol: string;
	poliAsal: string;
	namaPoliAsal: string;
	poliTujuan: string;
	namaPoliTujuan: string;
	tglSEP: string;
	kodeDokter: string;
	namaDokter: string;
	noKartu: string;
	nama: string;
	terbitSEP: 'Belum' | 'Sudah';
}

interface RencanaKontrolInsert {
	/** nomor SEP */
	noSEP: string;

	/** kode dokter JKN */
	kodeDokter: string;

	/** kode poli JKN */
	poliKontrol: string;

	/**
	 * - Rawat Jalan: diisi tanggal rencana kontrol
	 * - Rawat Inap: diisi tanggal SPRI
	 *
	 * format tanggal YYYY-MM-DD
	 */
	tglRencanaKontrol: string;

	/** user pembuat surat kontrol */
	user: string;
}

interface RencanaKontrolWriteResult {
	noSuratKontrol: string;
	tglRencanaKontrol: string;
	namaDokter: string;
	noKartu: string;
	nama: string;
	kelamin: string;
	tglLahir: string;
}

interface RencanaKontrolInsertV2 extends RencanaKontrolInsert {
	formPRB: Omit<RencanaKontrolPRB, 'data'> & {
		data: Partial<RencanaKontrolPRB['data']>;
	};
}

interface RencanaKontrolWriteResultV2 extends RencanaKontrolWriteResult {
	namaDiagnosa: string;
	formPRB: RencanaKontrolPRB;
}

interface RencanaKontrolPRB {
	/** Kode Penyakit PRB
	 *
	 * - 01 = Diabetes Mellitus
	 * - 02 = Hipertensi
	 * - 03 = Asma
	 * - 04 = Penyakit Jantung
	 * - 05 = PPOK
	 * - 06 = Skizofrenia
	 * - 07 = Stroke
	 * - 08 = Epilepsi
	 * - 09 = SLE
	 *
	 * Lihat {@link RencanaKontrol.listPenyakitPRB}
	 */
	kdStatusPRB: string | null;
	data: {
		/** 0.1 s/d 15 atau null */
		HBA1C: number | null;

		/** 10 s/d 500 atau null */
		GDP: number | null;

		/** 10 s/d 500 atau null */
		GD2JPP: number | null;

		/** 5 s/d 150 atau null */
		eGFR: number | null;

		/** 20 s/d 200 atau null */
		TD_Sistolik: number | null;

		/** 20 s/d 200 atau null */
		TD_Diastolik: number | null;

		/** 20 s/d 500 atau null */
		LDL: number | null;

		/** 20 s/d 200 atau null */
		Rata_TD_Sistolik: number | null;

		/** 20 s/d 200 atau null */
		Rata_TD_Diastolik: number | null;

		/** 0 atau 1 atau null */
		JantungKoroner: number | null;

		/** 0 atau 1 atau null */
		Stroke: number | null;

		/** 0 atau 1 atau null */
		VaskularPerifer: number | null;

		/** 0 atau 1 atau null */
		Aritmia: number | null;

		/** 0 atau 1 atau null */
		AtrialFibrilasi: number | null;

		/** 20 s/d 200 atau null */
		NadiIstirahat: number | null;

		/** 0 atau 1 atau null */
		SesakNapas3Bulan: number | null;

		/** 0 atau 1 atau null */
		NyeriDada3Bulan: number | null;

		/** 0 atau 1 atau null */
		SesakNapasAktivitas: number | null;

		/** 0 atau 1 atau null */
		NyeriDadaAktivitas: number | null;

		/** 0 atau 1 atau null */
		Terkontrol: number | null;

		/** 0 atau 1 atau null */
		Gejala2xMinggu: number | null;

		/** 0 atau 1 atau null */
		BangunMalam: number | null;

		/** 0 atau 1 atau null */
		KeterbatasanFisik: number | null;

		/** 0 s/d 100 atau null */
		FungsiParu: number | null;

		/** 0 s/d 40 atau null */
		SkorMMRC: number | null;

		/** 0 atau 1 atau null */
		Eksaserbasi1Tahun: number | null;

		/** 0 atau 1 atau null */
		MampuAktivitas: number | null;

		/** 0 atau 1 atau null */
		Epileptik6Bulan: number | null;

		/** 0 atau 1 atau null */
		EfekSampingOAB: number | null;

		/** 0 atau 1 atau null */
		HamilMenyusui: number | null;

		/** 0 s/d 100 atau null */
		Remisi: number | null;

		/** 0 atau 1 atau null */
		TerapiRumatan: number | null;

		/** 1 s/d 100 atau null */
		Usia: number | null;

		/** 0.1 s/d 20 atau null */
		AsamUrat: number | null;

		/** 0 s/d 100 atau null */
		RemisiSLE: number | null;

		/** 0 atau 1 atau null */
		Hamil: number | null;
	};
}
