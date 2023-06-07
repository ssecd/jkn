import { VClaimBaseApi } from './base.js';

// TODO: make generic request and response data type as possible
export class Rujukan extends VClaimBaseApi {
	/**
	 * Pencarian data rujukan berdasarkan nomor rujukan
	 */
	cariByNomor(params: {
		/** nomor rujukan */
		nomor: string;

		/**
		 * sumber rujukan
		 *
		 * 1 = Faskes tingkat 1 atau PCare
		 *
		 * 2 = Faskes tingkat 2 atau Rumah Sakit dan Klinik Utama */
		sumber: 1 | 2;
	}) {
		const paths: Record<1 | 2, `/${string}`> = {
			1: `/Rujukan/${params.nomor}`,
			2: `/Rujukan/RS/${params.nomor}`
		};
		return this.send<{ rujukan: DataRujukan }>({
			path: paths[params.sumber],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data rujukan berdasarkan nomor kartu peserta
	 */
	cariByNoka(params: {
		/** nomor kartu peserta */
		nomor: string;

		/**
		 * sumber rujukan
		 *
		 * 1 = Faskes tingkat 1 atau PCare
		 *
		 * 2 = Faskes tingkat 2 atau Rumah Sakit dan Klinik Utama */
		sumber: 1 | 2;
	}) {
		const paths: Record<1 | 2, `/${string}`> = {
			1: `/Rujukan/Peserta/${params.nomor}`,
			2: `/Rujukan/RS/Peserta/${params.nomor}`
		};
		return this.send<{ rujukan: DataRujukan }>({
			path: paths[params.sumber],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data rujukan berdasarkan nomor kartu peserta (Multi records)
	 */
	cariByNokaMulti(params: {
		/** nomor kartu peserta */
		nomor: string;

		/**
		 * sumber rujukan
		 *
		 * 1 = Faskes tingkat 1 atau PCare
		 *
		 * 2 = Faskes tingkat 2 atau Rumah Sakit dan Klinik Utama */
		sumber: 1 | 2;
	}) {
		const paths: Record<1 | 2, `/${string}`> = {
			1: `/Rujukan/List/Peserta/${params.nomor}`,
			2: `/Rujukan/RS/List/Peserta/${params.nomor}`
		};
		return this.send<{ rujukan: DataRujukan[] }>({
			path: paths[params.sumber],
			method: 'GET'
		});
	}

	/**
	 * Insert rujukan
	 *
	 * Catatan:
	 * Untuk tipe rujukan `1` maka response adalah `null`
	 */
	async insert(data: {
		/** nomor SEP */
		noSep: string;

		/** tanggal rujukan dengan format YYYY-MM-DD */
		tglRujukan: string;

		/** faskes dirujuk diambil dari referensi faskes */
		ppkDirujuk: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** catatan rujukan */
		catatan: string;

		/** kode diagnosa rujukan berdasarkan referensi rujukan */
		diagRujukan: string;

		/** tipe rujukan (0 = penuh) (1 = Partial) (2 = rujuk balik) */
		tipeRujukan: string;

		/** kode poli rujukan diambil dari referensi poli */
		poliRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<null | {
			rujukan: {
				AsalRujukan: {
					kode: string;
					nama: string;
				};
				diagnosa: {
					kode: string;
					nama: string;
				};
				noRujukan: string;
				peserta: {
					asuransi: string;
					hakKelas: string | null;
					jnsPeserta: string;
					kelamin: string;
					nama: string;
					noKartu: string;
					noMr: string;
					tglLahir: string;
				};
				poliTujuan: {
					kode: string;
					nama: string;
				};
				tglRujukan: string;
				tujuanRujukan: {
					kode: string;
					nama: string;
				};
			};
		}>({
			path: `/Rujukan/insert`,
			method: 'POST',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Update data rujukan
	 */
	async update(data: {
		/** nomor rujukan yang akan di-update */
		noRujukan: string;

		/** faskes dirujuk diambil dari referensi faskes */
		ppkDirujuk: string;

		/** tipe rujukan (0 = penuh) (1 = Partial) (2 = rujuk balik) */
		tipe: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** catatan rujukan */
		catatan: string;

		/** kode diagnosa rujukan berdasarkan referensi rujukan */
		diagRujukan: string;

		/** tipe rujukan (0 = penuh) (1 = Partial) (2 = rujuk balik) */
		tipeRujukan: string;

		/** kode poli rujukan diambil dari referensi poli */
		poliRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<string>({
			path: `/Rujukan/update`,
			method: 'PUT',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Hapus data rujukan
	 */
	async delete(data: {
		/** nomor rujukan yang akan dihapus */
		noRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<string>({
			path: `/Rujukan/delete`,
			method: 'DELETE',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Insert rujukan khusus
	 */
	async insertKhusus(data: {
		/** nomor rujukan */
		noRujukan: string;

		/** diagnosa rujukan */
		diagnosa: { kode: string }[];

		/** prosedur rujukan */
		procedure: { kode: string }[];

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<{
			rujukan: {
				norujukan: string;
				nokapst: string;
				nmpst: string;
				diagppk: string;
				tglrujukan_awal: string;
				tglrujukan_berakhir: string;
			};
		}>({
			path: `/Rujukan/Khusus/insert`,
			method: 'POST',
			data
		});
	}

	/**
	 * Delete atau hapus rujukan khusus
	 */
	async deleteKhusus(data: {
		/** id rujukan */
		idRujukan: string;

		/** nomor rujukan */
		noRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<string>({
			path: `/Rujukan/Khusus/delete`,
			method: 'POST',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Insert rujukan menggunakan versi 2.0
	 */
	async insertV2(data: {
		/** nomor SEP */
		noSep: string;

		/** tanggal rujukan dengan format YYYY-MM-DD */
		tglRujukan: string;

		/** tanggal rencana kunjungan dengan format YYYY-MM-DD */
		tglRencanaKunjungan: string;

		/** faskes dirujuk diambil dari referensi faskes */
		ppkDirujuk: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** catatan rujukan */
		catatan: string;

		/** kode diagnosa rujukan berdasarkan referensi rujukan */
		diagRujukan: string;

		/** tipe rujukan (0 = penuh) (1 = Partial) (2 = rujuk balik) */
		tipeRujukan: string;

		/** kode poli rujukan diambil dari referensi poli */
		poliRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<{
			rujukan: {
				rujukan: {
					AsalRujukan: {
						kode: string;
						nama: string;
					};
					diagnosa: {
						kode: string;
						nama: string;
					};
					noRujukan: string;
					peserta: {
						asuransi: string;
						hakKelas: string | null;
						jnsPeserta: string;
						kelamin: string;
						nama: string;
						noKartu: string;
						noMr: string;
						tglLahir: string;
					};
					poliTujuan: {
						kode: string;
						nama: string;
					};
					tglBerlakuKunjungan: string;
					tglRencanaKunjungan: string;
					tglRujukan: string;
					tujuanRujukan: {
						kode: string;
						nama: string;
					};
				};
			};
		}>({
			path: `/Rujukan/2.0/insert`,
			method: 'POST',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Update data rujukan menggunakan versi 2.0
	 */
	async updateV2(data: {
		/** nomor rujukan yang akan di-update */
		noRujukan: string;

		/** tanggal rujukan dengan format YYYY-MM-DD */
		tglRujukan: string;

		/** tanggal rencana kunjungan dengan format YYYY-MM-DD */
		tglRencanaKunjungan: string;

		/** faskes dirujuk diambil dari referensi faskes */
		ppkDirujuk: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** catatan rujukan */
		catatan: string;

		/** kode diagnosa rujukan berdasarkan referensi rujukan */
		diagRujukan: string;

		/** tipe rujukan (0 = penuh) (1 = Partial) (2 = rujuk balik) */
		tipeRujukan: string;

		/** kode poli rujukan diambil dari referensi poli */
		poliRujukan: string;

		/** user atau petugas entri */
		user: string;
	}) {
		return this.send<string>({
			path: `/Rujukan/2.0/Update`,
			method: 'PUT',
			data: { request: { t_rujukan: data } }
		});
	}

	/**
	 * Data spesialistik rujukan
	 */
	async listSpesialistik(params: {
		/** 8 digit kode PPK rujukan */
		kodePpk: string;

		/** tanggal rujukan dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				kodeSpesialis: string;
				namaSpesialis: string;
				kapasitas: string;
				jumlahRujukan: string;
				persentase: string;
			}[];
		}>({
			path: `/Rujukan/ListSpesialistik/PPKRujukan/${params.kodePpk}/TglRujukan/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Data sarana rujukan
	 */
	async listSarana(params: {
		/** 8 digit kode PPK rujukan */
		kodePpk: string;
	}) {
		return this.send<{
			list: {
				kodeSarana: string;
				namaSarana: string;
			}[];
		}>({
			path: `/Rujukan/ListSarana/PPKRujukan/${params.kodePpk}`,
			method: 'GET'
		});
	}

	/**
	 * Data rujukan keluar rumah sakit atau klinik utama
	 */
	async listKeluar(params: {
		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;
	}) {
		return this.send<{
			list: {
				noRujukan: string;
				tglRujukan: string;
				jnsPelayanan: string;
				noSep: string;
				noKartu: string;
				nama: string;
				ppkDirujuk: string;
				namaPpkDirujuk: string;
			}[];
		}>({
			path: `/Rujukan/Keluar/List/tglMulai/${params.awal}/tglAkhir/${params.akhir}`,
			method: 'GET'
		});
	}

	/**
	 * Detail rujukan keluar rumah sakit atau klinik utama berdasarkan
	 * nomor rujukan
	 */
	async keluarByNomor(params: {
		/** nomor rujukan */
		nomor: string;
	}) {
		return this.send<{
			rujukan: {
				noRujukan: string;
				noSep: string;
				noKartu: string;
				nama: string;
				kelasRawat: string;
				kelamin: string;
				tglLahir: string;
				tglSep: string;
				tglRujukan: string;
				tglRencanaKunjungan: string;
				ppkDirujuk: string;
				namaPpkDirujuk: string;
				jnsPelayanan: string;
				catatan: string;
				diagRujukan: string;
				namaDiagRujukan: string;
				tipeRujukan: string;
				namaTipeRujukan: string;
				poliRujukan: string;
				namaPoliRujukan: string;
			};
		}>({
			path: `/Rujukan/Keluar/${params.nomor}`,
			method: 'GET'
		});
	}

	/**
	 * Jumlah SEP yang terbentuk berdasarkan nomor rujukan yang masuk ke
	 * rumah sakit atau klinik utama
	 */
	async jumlahSep(params: {
		/** jenis rujukan (1 = FKTP) (2 = FKRTL) */
		jenis: 1 | 2;

		/** nomor rujukan */
		nomor: string;
	}) {
		return this.send<{ jumlahSEP: string }>({
			path: `/Rujukan/JumlahSEP/${params.jenis}/${params.nomor}`,
			method: 'GET'
		});
	}
}

interface DataRujukan {
	diagnosa: {
		kode: string;
		nama: string;
	};
	keluhan: string;
	noKunjungan: string;
	pelayanan: {
		kode: string;
		nama: string;
	};
	peserta: {
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
			noMR: string;
			noTelepon: string | null;
		};
		nama: string;
		nik: string | null;
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
	};
	poliRujukan: {
		kode: string;
		nama: string;
	};
	provPerujuk: {
		kode: string;
		nama: string;
	};
	tglKunjungan: string;
}
