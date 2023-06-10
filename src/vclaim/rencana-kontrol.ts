import { VClaimBaseApi } from './base.js';

// TODO: make generic request and response data type as possible
export class RencanaKontrol extends VClaimBaseApi {
	/**
	 * Insert rencana kontrol
	 */
	async insert(data: {
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
		tglRencanaKontrol: StreamPipeOptions;

		/** user pembuat surat kontrol */
		user: string;
	}) {
		return this.send<{
			noSuratKontrol: string;
			tglRencanaKontrol: string;
			namaDokter: string;
			noKartu: string;
			nama: string;
			kelamin: string;
			tglLahir: string;
		}>({
			path: `/RencanaKontrol/insert`,
			method: 'POST',
			data: { request: data }
		});
	}

	/**
	 * Update rencana kontrol
	 */
	async update(data: {
		/** nomor surat kontrol yang akan di-update */
		noSuratKontrol: string;

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
		tglRencanaKontrol: StreamPipeOptions;

		/** user pembuat surat kontrol */
		user: string;
	}) {
		return this.send<{
			noSuratKontrol: string;
			tglRencanaKontrol: string;
			namaDokter: string;
			noKartu: string;
			nama: string;
			kelamin: string;
			tglLahir: string;
		}>({
			path: `/RencanaKontrol/Update`,
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
			path: `/RencanaKontrol/nosep/${params.nomor}`,
			method: 'GET'
		});
	}

	/**
	 * Melihat detail surat kontrol berdasarkan nomor surat kontrol
	 *
	 * Catatan:
	 * Ketika pembuatan SPRI atau jenis kontrol 1 tidak ada referensi nomor SEP asalnya,
	 * jadi field response SEP kosong atau null. Sedangkan jika pembuatan surat kontrol
	 * atau jenis kontrol 2, akan ter-isi field response SEP karena terdapat referensi
	 * nomor SEP asal ketika pembuatan surat kontrol tersebut.
	 */
	async cari(params: {
		/** nomor surat kontrol */
		nomor: string;
	}) {
		return this.send<{
			noSuratKontrol: string;
			tglRencanaKontrol: string;
			tglTerbit: string;
			jnsKontrol: string;
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
		}>({
			path: `/RencanaKontrol/noSuratKontrol/${params.nomor}`,
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
		filter: 1 | 2;
	}) {
		return this.send<{
			list: {
				noSuratKontrol: string;
				jnsPelayanan: string;
				jnsKontrol: string;
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
				terbitSEP: string;
			}[];
		}>({
			path: `/RencanaKontrol/ListRencanaKontrol/Bulan/${params.bulan}/Tahun/${params.tahun}/Nokartu/${params.nomorKartu}/filter/${params.filter}`,
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
		filter: 1 | 2;
	}) {
		return this.send<{
			list: {
				noSuratKontrol: string;
				jnsPelayanan: string;
				jnsKontrol: string;
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
			};
		}>({
			path: `/RencanaKontrol/ListRencanaKontrol/tglAwal/${params.awal}/tglAkhir/${params.akhir}/filter/${params.filter}`,
			method: 'GET'
		});
	}

	/**
	 * Data poli untuk rencana kontrol
	 */
	async poli(params: {
		/** jenis kontrol (1 = SPRI) (2 = Rencana Kontrol) */
		jenis: 1 | 2;

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
			path: `/RencanaKontrol/ListSpesialistik/JnsKontrol/${params.jenis}/nomor/${params.nomor}/TglRencanaKontrol/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Data dokter untuk rencana kontrol
	 */
	async dokter(params: {
		/** jenis kontrol (1 = SPRI) (2 = Rencana Kontrol) */
		jenis: 1 | 2;

		/** kode poli JKN */
		kodePoli: string;

		/** tanggal rencana kontrol dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send({
			path: `/RencanaKontrol/JadwalPraktekDokter/JnsKontrol/${params.jenis}/KdPoli/${params.kodePoli}/TglRencanaKontrol/${params.tanggal}`,
			method: 'GET'
		});
	}
}
