import { VClaimBaseApi } from './base.js';

export class LPK extends VClaimBaseApi {
	private get name() {
		return this.constructor.name + ' -> ';
	}

	/**
	 * Insert Rujukan
	 *
	 * @param data data LPK
	 */
	async insert(data: DataLPK) {
		return this.send<string>({
			name: this.name + 'Insert LPK',
			path: '/LPK/insert',
			method: 'POST',
			data: { request: { t_lpk: data } }
		});
	}

	/**
	 * Update Rujukan
	 *
	 * @param data data LPK
	 */
	async update(data: DataLPK) {
		return this.send<string>({
			name: this.name + 'Update LPK',
			path: '/LPK/update',
			method: 'PUT',
			data: { request: { t_lpk: data } }
		});
	}

	/**
	 * Delete Rujukan
	 */
	async delete(params: {
		/** nomor SEP yang akan dihapus */
		nomorSep: string;
	}) {
		return this.send<string>({
			name: this.name + 'Delete LPK',
			path: '/LPK/delete',
			method: 'DELETE',
			data: { request: { t_lpk: { noSep: params.nomorSep } } }
		});
	}

	/**
	 * Data lembar pengajuan klaim berdasarkan
	 * tanggal masuk dan jenis pelayanan
	 */
	async data(params: {
		/** tanggal masuk dengan format YYYY-MM-DD */
		tanggal: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: number;
	}) {
		return this.send<{
			lpk: {
				list: {
					DPJP: {
						dokter: {
							kode: string;
							nama: string;
						};
					};
					diagnosa: {
						list: {
							level: string;
							list: {
								kode: string;
								nama: string;
							};
						}[];
					};
					jnsPelayanan: string;
					noSep: string;
					perawatan: {
						caraKeluar: {
							kode: string;
							nama: string;
						};
						kelasRawat: {
							kode: string;
							nama: string;
						};
						kondisiPulang: {
							kode: string;
							nama: string;
						};
						ruangRawat: {
							kode: string;
							nama: string;
						};
						spesialistik: {
							kode: string;
							nama: string;
						};
					};
					peserta: {
						kelamin: string;
						nama: string;
						noKartu: string;
						noMR: string;
						tglLahir: string;
					};
					poli: {
						eksekutif: string;
						poli: {
							kode: string;
						};
					};
					procedure: {
						list: {
							list: {
								kode: string;
								nama: string;
							};
						}[];
					};
					rencanaTL: DataLPK['rencanaTL'] | null;
					tglKeluar: string;
					tglMasuk: string;
				}[];
			};
		}>({
			name: this.name + 'Data Pengajuan Lembar Klaim',
			path: `/LPK/TglMasuk/${params.tanggal}/JnsPelayanan/${params.jenis}`,
			method: 'GET'
		});
	}
}

interface DataLPK {
	/** nomor SEP */
	noSep: string;

	/** tanggal dengan format YYYY-MM-DD */
	tglMasuk: string;

	/** tanggal dengan format YYYY-MM-DD */
	tglKeluar: string;

	/** penjamin: (1 = JKN) */
	jaminan: string;

	poli: {
		/** kode poli diambil dari referensi poli */
		poli: string;
	};

	perawatan: {
		/** ruang rawat diambil dari referensi ruang rawat */
		ruangRawat: string;

		/** kelas rawat diambil dari referensi kelas rawat */
		kelasRawat: string;

		/** spesialistik diambil dari referensi spesialistik */
		spesialistik: string;

		/** cara keluar diambil dari referensi cara keluar */
		caraKeluar: string;

		/** kondisi pulang diambil dari referensi kondisi pulang */
		kondisiPulang: string;
	};

	diagnosa: {
		/** kode ICD diagnosa diambil dari referensi diagnosa */
		kode: string;

		/** (1 = Primer) (2 = Sekunder) */
		level: string;
	}[];

	procedure: {
		/** kode ICD prosedur diambil dari referensi prosedur/tindakan */
		kode: string;
	}[];

	rencanaTL: {
		/**
		 * 1) Diperbolehkan Pulang
		 * 2) Pemeriksaan Penunjang
		 * 3) Dirujuk Ke
		 * 4) Kontrol Kembali
		 */
		tindakLanjut: string;

		dirujukKe: {
			/** kode faskes diambil dari referensi faskes */
			kodePPK: string;
		};

		kontrolKembali: {
			/** tanggal kontrol kembali dengan format YYYY-MM-DD */
			tglKontrol: string;

			/** kode poli diambil dari referensi poli */
			poli: string;
		};
	};

	// /** kode dpjp diambil dari referensi dokter */
	DPJP: string;

	/** pengguna atau petugas */
	user: string;
}
