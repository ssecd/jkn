import { VClaimBaseApi } from './base.js';

// TODO: make generic request and response data type as possible
export class SEP extends VClaimBaseApi {
	private get name() {
		return this.constructor.name + ' -> ';
	}

	/**
	 * Buat SEP
	 */
	async insert(data: {
		/** nomor kartu JKN/BPJS */
		noKartu: string;

		/** tanggal penerbitan SEP dalam format YYYY-MM-DD */
		tglSep: string;

		/** kode faskes pemberi pelayanan */
		ppkPelayanan: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** kelas rawat antara 1, 2, atau 3 */
		klsRawat: string;

		/** nomor rekam medis pasien */
		noMR: string;

		rujukan: {
			/** asal rujukan (1 = FKTP) (2 = FKRTL) */
			asalRujukan: string;

			/** tanggal rujukan dalam format YYYY-MM-DD */
			tglRujukan: string;

			/** nomor rujukan */
			noRujukan: string;

			/** kode faskes rujukan diambil dari referensi faskes */
			ppkRujukan: string;
		};

		/** catatan peserta */
		catatan: string;

		/** diagnosa awal ICD10 diambil dari referensi ICD */
		diagAwal: string;

		poli: {
			/** kode poli diambil dari referensi poli */
			tujuan: string;

			/** poli eksekutif (0 = Tidak) (1 = Ya) */
			eksekutif: string;
		};

		cob: {
			/** jaminan COB (0 = Tidak) (1 = Ya) */
			cob: string;
		};

		katarak: {
			/** katarak (0 = Tidak) (1 = Ya) */
			katarak: string;
		};

		jaminan: {
			/** kecelakaan lalulintas (0 = Tidak) (1 = Ya) */
			lakaLantas: string;

			penjamin: {
				/**
				 * penjamin laka lantas
				 * - 1 = Jasa raharja PT
				 * - 2 = BPJS Ketenagakerjaan
				 * - 3 = TASPEN PT
				 * - 4 = ASABRI PT
				 *
				 * Catatan:
				 * Jika lebih dari satu penjamin maka diisi menggunakan
				 * delimiter koma. contoh: `"1,2"`
				 */
				penjamin: string;

				/** tanggal kejadian kecelakaan lalu lintas dalam format YYYY-MM-DD */
				tglKejadian: string;

				/** keterangan tentang kecelakaan lalu lintas */
				keterangan: string;

				suplesi: {
					/** suplesi (0 = Tidak) (1 = Ya) */
					suplesi: string;

					/** nomor SEP jika terdapat suplesi */
					noSepSuplesi: string;

					lokasiLaka: {
						/** kode provinsi diambil dari referensi provinsi */
						kdPropinsi: string;

						/** kode kabupaten diambil dari referensi kabupaten */
						kdKabupaten: string;

						/** kode kecamatan diambil dari referensi kecamatan */
						kdKecamatan: string;
					};
				};
			};
		};

		skdp: {
			/** nomor SKDP atau surat kontrol */
			noSurat: string;

			/** kode DPJP diambil dari referensi DPJP atau dokter */
			kodeDPJP: string;
		};

		/** nomor telepon peserta */
		noTelp: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<{
			sep: {
				catatan: string;
				diagnosa: string;
				jnsPelayanan: string;
				kelasRawat: string;
				noSep: string;
				penjamin: string;
				peserta: {
					asuransi: string;
					hakKelas: string;
					jnsPeserta: string;
					kelamin: string;
					nama: string;
					noKartu: string;
					noMr: string;
					tglLahir: string;
				};
				informasi: {
					Dinsos: string | null;
					prolanisPRB: string | null;
					noSKTM: string | null;
				};
				poli: string;
				poliEksekutif: string;
				tglSep: string;
			};
		}>({
			name: this.name + 'Insert',
			path: `/SEP/1.1/insert`,
			method: 'POST',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Update SEP
	 *
	 * @returns nomor SEP
	 */
	async update(data: {
		/** nomor SEP yang akan di-update */
		noSep: string;

		/** kelas rawat antara 1, 2, atau 3 */
		klsRawat: string;

		/** nomor rekam medis pasien */
		noMR: string;

		rujukan: {
			/** asal rujukan (1 = FKTP) (2 = FKRTL) */
			asalRujukan: string;

			/** tanggal rujukan dalam format YYYY-MM-DD */
			tglRujukan: string;

			/** nomor rujukan */
			noRujukan: string;

			/** kode faskes rujukan diambil dari referensi faskes */
			ppkRujukan: string;
		};

		/** catatan peserta */
		catatan: string;

		/** diagnosa awal ICD10 diambil dari referensi ICD */
		diagAwal: string;

		poli: {
			/** poli eksekutif (0 = Tidak) (1 = Ya) */
			eksekutif: string;
		};

		cob: {
			/** jaminan COB (0 = Tidak) (1 = Ya) */
			cob: string;
		};

		katarak: {
			/** katarak (0 = Tidak) (1 = Ya) */
			katarak: string;
		};

		skdp: {
			/** nomor SKDP atau surat kontrol */
			noSurat: string;

			/** kode DPJP diambil dari referensi DPJP atau dokter */
			kodeDPJP: string;
		};

		jaminan: {
			/** kecelakaan lalulintas (0 = Tidak) (1 = Ya) */
			lakaLantas: string;

			penjamin: {
				/**
				 * penjamin laka lantas
				 * - 1 = Jasa raharja PT
				 * - 2 = BPJS Ketenagakerjaan
				 * - 3 = TASPEN PT
				 * - 4 = ASABRI PT
				 *
				 * Catatan:
				 * Jika lebih dari satu penjamin maka diisi menggunakan
				 * delimiter koma. contoh: `"1,2"`
				 */
				penjamin: string;

				/** tanggal kejadian kecelakaan lalu lintas dalam format YYYY-MM-DD */
				tglKejadian: string;

				/** keterangan tentang kecelakaan lalu lintas */
				keterangan: string;

				suplesi: {
					/** suplesi (0 = Tidak) (1 = Ya) */
					suplesi: string;

					/** nomor SEP jika terdapat suplesi */
					noSepSuplesi: string;

					lokasiLaka: {
						/** kode provinsi diambil dari referensi provinsi */
						kdPropinsi: string;

						/** kode kabupaten diambil dari referensi kabupaten */
						kdKabupaten: string;

						/** kode kecamatan diambil dari referensi kecamatan */
						kdKecamatan: string;
					};
				};
			};
		};

		/** nomor telepon peserta */
		noTelp: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Update',
			path: `/SEP/1.1/Update`,
			method: 'PUT',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Hapus SEP
	 */
	async delete(data: {
		/** nomor SEP yang akan dihapus */
		noSep: string;

		/** pengguna atau user yang menghapus */
		user: string;
	}) {
		return this.send<string>({
			path: `/SEP/Delete`,
			method: 'DELETE',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Detail data SEP berdasarkan nomor SEP
	 */
	async cari(params: {
		/** nomor SEP */
		nomor: string;
	}) {
		return this.send<SEPDetail>({
			name: this.name + 'Hapus',
			path: `/SEP/${params.nomor}`,
			method: 'GET'
		});
	}

	/**
	 * Detail data SEP terakhir berdasarkan nomor rujukan
	 */
	async cariByRujukan(params: {
		/** Nomor rujukan */
		nomorRujukan: string;
	}) {
		return this.send<SEPDetail>({
			name: this.name + 'Cari',
			path: `/Rujukan/lastsep/norujukan/${params.nomorRujukan}`,
			method: 'GET'
		});
	}

	/**
	 * Insert SEP V2.0
	 */
	async insertV2(data: {
		/** nomor kartu JKN/BPJS */
		noKartu: string;

		/** tanggal penerbitan SEP dalam format YYYY-MM-DD */
		tglSep: string;

		/** kode faskes pemberi pelayanan */
		ppkPelayanan: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		klsRawat: {
			/** sesuai kelas rawat peserta (1 = Kelas 1) (2 = Kelas 2) (3 = Kelas 3) */
			klsRawatHak: string;

			/**
			 * diisi jika naik kelas rawat
			 * - 1 = VVIP
			 * - 2 = VIP
			 * - 3 = Kelas 1
			 * - 4 = Kelas 2
			 * - 5 = Kelas 3
			 * - 6 = ICCU
			 * - 7 = ICU
			 * - 8 = Di atas Kelas 1
			 */
			klsRawatNaik: string;

			/**
			 * diisi jika naik kelas rawat
			 * - 1 = Pribadi
			 * - 2 = Pemberi Kerja
			 * - 3 = Asuransi Kesehatan Tambahan
			 */
			pembiayaan: string;

			/**
			 * diisi jika naik kelas rawat
			 * nilai sesuai nama pembiayaan, contoh jika `pembiayaan` = `"1"`
			 * maka `penanggungJawab` = `"Pribadi"`
			 */
			penanggungJawab: string;
		};

		/** nomor rekam medis pasien dari faskes */
		noMR: string;

		rujukan: {
			/** asal rujukan (1 = FKTP) (2 = FKRTL) */
			asalRujukan: string;

			/** tanggal rujukan dalam format YYYY-MM-DD */
			tglRujukan: string;

			/** nomor rujukan */
			noRujukan: string;

			/** kode faskes rujukan diambil dari referensi faskes */
			ppkRujukan: string;
		};

		/** catatan peserta */
		catatan: string;

		/** diagnosa awal ICD10 diambil dari referensi ICD */
		diagAwal: string;

		poli: {
			/** kode poli diambil dari referensi poli */
			tujuan: string;

			/** poli eksekutif (0 = Tidak) (1 = Ya) */
			eksekutif: string;
		};

		cob: {
			/** jaminan COB (0 = Tidak) (1 = Ya) */
			cob: string;
		};

		katarak: {
			/** katarak (0 = Tidak) (1 = Ya) */
			katarak: string;
		};

		jaminan: {
			/**
			 * Jenis kecelakaan
			 * - 0 = Bukan Kecelakaan lalu lintas (BKLL)
			 * - 1 = Kecelakaan lalu lintas (KLL) dan bukan kecelakaan Kerja (BKK)
			 * - 2 = Kecelakaan lalu lintas (KLL) dan kecelakaan Kerja (KK)
			 * - 3 = Kecelakaan Kerja (KK)
			 */
			lakaLantas: string;

			/** nomor laporan polisi */
			noLP: string;

			penjamin: {
				/** tanggal kejadian kecelakaan lalu lintas dalam format YYYY-MM-DD */
				tglKejadian: string;

				/** keterangan tentang kecelakaan lalu lintas */
				keterangan: string;

				suplesi: {
					/** suplesi (0 = Tidak) (1 = Ya) */
					suplesi: string;

					/** nomor SEP jika terdapat suplesi */
					noSepSuplesi: string;

					lokasiLaka: {
						/** kode provinsi diambil dari referensi provinsi */
						kdPropinsi: string;

						/** kode kabupaten diambil dari referensi kabupaten */
						kdKabupaten: string;

						/** kode kecamatan diambil dari referensi kecamatan */
						kdKecamatan: string;
					};
				};
			};
		};

		/**
		 * Tujuan kunjungan
		 * - 0 = Normal
		 * - 1 = Prosedur
		 * - 2 = Konsul Dokter
		 */
		tujuanKunj: string;

		/**
		 * Flag prosedur
		 * - 0 = Prosedur Tidak Berkelanjutan
		 * - 1 = Prosedur dan Terapi Berkelanjutan
		 *
		 * Catatan: diisi `""` jika `tujuanKunj` = `"0"`
		 */
		flagProcedure: string;

		/**
		 * Kode penunjang
		 * - 1 = Radioterapi
		 * - 2 = Kemoterapi
		 * - 3 = Rehabilitasi Medik
		 * - 4 = Rehabilitasi Psikososial
		 * - 5 = Transfusi Darah
		 * - 6 = Pelayanan Gigi
		 * - 7 = Laboratorium
		 * - 8 = USG
		 * - 9 = Farmasi
		 * - 10 = Lain-Lain
		 * - 11 = MRI
		 * - 12 = HEMODIALISA
		 *
		 * Catatan: diisi `""` jika `tujuanKunj` = `"0"`
		 */
		kdPenunjang: string;

		/**
		 * Asesmen pelayanan
		 * - 1 = Poli spesialis tidak tersedia pada hari sebelumnya
		 * - 2 = Jam Poli telah berakhir pada hari sebelumnya
		 * - 3 = Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya
		 * - 4 = Atas Instruksi RS
		 * - 5 = Tujuan Kontrol
		 *
		 * Catatan: wajib diisi jika `tujuanKunj` = `"2"` atau `"0"`
		 * (poli tujuan beda dengan poli rujukan dan hari beda)
		 */
		assesmentPel: string;

		/**
		 * kode DPJP diambil dari referensi DPJP
		 *
		 * Catatan: tidak diisi jika `jnsPelayanan` = `"1"` (Rawat Inap)
		 */
		dpjpLayan: string;

		skdp: {
			/** nomor SKDP atau surat kontrol */
			noSurat: string;

			/** kode DPJP diambil dari referensi DPJP atau dokter */
			kodeDPJP: string;
		};

		/** nomor telepon peserta */
		noTelp: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<{
			sep: {
				assestmenPel: string;
				catatan: string;
				diagnosa: string;
				flagProcedure: string;
				informasi: {
					dinsos: string | null;
					eSEP: string;
					noSKTM: string | null;
					prolanisPRB: string | null;
				};
				jnsPelayanan: string;
				kdPenunjang: string;
				kdPoli: string;
				kelasRawat: string;
				noRujukan: string;
				noSep: string;
				penjamin: string;
				peserta: {
					asuransi: string;
					hakKelas: string;
					jnsPeserta: string;
					kelamin: string;
					nama: string;
					noKartu: string;
					noMr: string;
					tglLahir: string;
				};
				poli: string;
				poliEksekutif: string;
				tglSep: string;
				tujuanKunj: string;
			};
		}>({
			name: this.name + 'Insert V2',
			path: `/SEP/2.0/insert`,
			method: 'POST',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Update SEP V2.0
	 *
	 * @returns nomor SEP
	 */
	async updateV2(data: {
		/** nomor SEP yang akan di-update */
		noSep: string;

		klsRawat: {
			/** sesuai kelas rawat peserta (1 = Kelas 1) (2 = Kelas 2) (3 = Kelas 3) */
			klsRawatHak: string;

			/**
			 * diisi jika naik kelas rawat
			 * - 1 = VVIP
			 * - 2 = VIP
			 * - 3 = Kelas 1
			 * - 4 = Kelas 2
			 * - 5 = Kelas 3
			 * - 6 = ICCU
			 * - 7 = ICU
			 * - 8 = Di atas Kelas 1
			 */
			klsRawatNaik: string;

			/**
			 * diisi jika naik kelas rawat
			 * - 1 = Pribadi
			 * - 2 = Pemberi Kerja
			 * - 3 = Asuransi Kesehatan Tambahan
			 */
			pembiayaan: string;

			/**
			 * diisi jika naik kelas rawat
			 * nilai sesuai nama pembiayaan, contoh jika `pembiayaan` = `"1"`
			 * maka `penanggungJawab` = `"Pribadi"`
			 */
			penanggungJawab: string;
		};

		/** nomor rekam medis pasien dari faskes */
		noMR: string;

		/** catatan peserta */
		catatan: string;

		/** diagnosa awal ICD10 diambil dari referensi ICD */
		diagAwal: string;

		poli: {
			/** kode poli diambil dari referensi poli */
			tujuan: string;

			/** poli eksekutif (0 = Tidak) (1 = Ya) */
			eksekutif: string;
		};

		cob: {
			/** jaminan COB (0 = Tidak) (1 = Ya) */
			cob: string;
		};

		katarak: {
			/** katarak (0 = Tidak) (1 = Ya) */
			katarak: string;
		};

		jaminan: {
			/**
			 * Jenis kecelakaan
			 * - 0 = Bukan Kecelakaan lalu lintas (BKLL)
			 * - 1 = Kecelakaan lalu lintas (KLL) dan bukan kecelakaan Kerja (BKK)
			 * - 2 = Kecelakaan lalu lintas (KLL) dan kecelakaan Kerja (KK)
			 * - 3 = Kecelakaan Kerja (KK)
			 */
			lakaLantas: string;

			penjamin: {
				/** tanggal kejadian kecelakaan lalu lintas dalam format YYYY-MM-DD */
				tglKejadian: string;

				/** keterangan tentang kecelakaan lalu lintas */
				keterangan: string;

				suplesi: {
					/** suplesi (0 = Tidak) (1 = Ya) */
					suplesi: string;

					/** nomor SEP jika terdapat suplesi */
					noSepSuplesi: string;

					lokasiLaka: {
						/** kode provinsi diambil dari referensi provinsi */
						kdPropinsi: string;

						/** kode kabupaten diambil dari referensi kabupaten */
						kdKabupaten: string;

						/** kode kecamatan diambil dari referensi kecamatan */
						kdKecamatan: string;
					};
				};
			};
		};

		/**
		 * kode DPJP diambil dari referensi DPJP
		 *
		 * Catatan: tidak diisi jika `jnsPelayanan` = `"1"` (Rawat Inap)
		 */
		dpjpLayan: string;

		/** nomor telepon peserta */
		noTelp: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Update V2',
			path: `/SEP/2.0/update`,
			method: 'PUT',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Hapus SEP V2.0
	 *
	 * @returns nomor SEP
	 */
	async deleteV2(data: {
		/** nomor SEP yang akan dihapus */
		noSep: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Hapus V2',
			path: `/SEP/2.0/delete`,
			method: 'DELETE',
			skipDecrypt: true,
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Pencarian data potensi SEP sebagai Suplesi Jasa Raharja
	 */
	async suplesiJasaRaharja(params: {
		/** nomor kartu peserta JKN/BPJS */
		nomorKartu: string;

		/** tanggal pelayanan dengan format YYYY-MM-DD */
		tanggalPelayanan: string;
	}) {
		return this.send<{
			jaminan: {
				noRegister: string;
				noSep: string;
				noSepAwal: string;
				noSuratJaminan: string;
				tglKejadian: string;
				tglSep: string;
			}[];
		}>({
			name: this.name + 'Suplesi Jasa Raharja',
			path: `/sep/JasaRaharja/Suplesi/${params.nomorKartu}/tglPelayanan/${params.tanggalPelayanan}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data SEP Induk Kecelakaan Lalu Lintas
	 */
	async dataIndukKecelakaan(params: {
		/** nomor kartu peserta JKN/BPJS */
		nomorKartu: string;
	}) {
		return this.send<{
			list: {
				noSEP: string;
				tglKejadian: string;
				ppkPelSEP: string;
				kdProp: string;
				kdKab: string;
				kdKec: string;
				ketKejadian: string;
				noSEPSuplesi: string;
			}[];
		}>({
			name: this.name + 'Data Induk Kecelakaan',
			path: `/sep/KllInduk/List/${params.nomorKartu}`,
			method: 'GET'
		});
	}

	/**
	 * Pengajuan SEP
	 *
	 * @returns nomor kartu peserta
	 */
	async pengajuan(data: {
		/** nomor kartu peserta JKN/BPJS */
		noKartu: string;

		/** tanggal penerbitan SEP dengan format YYYY-MM-DD */
		tglSep: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/** jenis pengajuan (1 = pengajuan backdate) (2 = pengajuan finger print) */
		jnsPengajuan: string;

		/** keterangan pengajuan */
		keterangan: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Pengajuan Penjamin',
			path: `/Sep/pengajuanSEP`,
			method: 'POST',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Approval pengajuan SEP
	 *
	 * @returns nomor kartu peserta
	 */
	async approvalPengajuan(data: {
		/** nomor kartu peserta JKN/BPJS */
		noKartu: string;

		/** tanggal penerbitan SEP dengan format YYYY-MM-DD */
		tglSep: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jnsPelayanan: string;

		/**
		 * jenis pengajuan
		 * - 1 = pengajuan backdate
		 * - 2 = pengajuan finger print)
		 *
		 * @default "1"
		 */
		jnsPengajuan?: string;

		/** keterangan pengajuan */
		keterangan: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Approval Pengajuan',
			path: `/Sep/aprovalSEP`,
			method: 'POST',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Data persetujuan SEP
	 */
	async listPersetujuan(params: {
		/** bulan penerbitan SEP (1 sampai 12) */
		bulan: number;

		/** tahun penerbitan SEP */
		tahun: number;
	}) {
		const bulan = String(params.bulan || 0).padStart(2, '0');
		return this.send<{
			list: {
				noKartu: string;
				nama: string;
				tglsep: string;
				jnspelayanan: string;
				persetujuan: string;
				status: string;
			}[];
		}>({
			name: this.name + 'List Approval',
			path: `/Sep/persetujuanSEP/list/bulan/${bulan}/tahun/${params.tahun}`,
			method: 'GET'
		});
	}

	/**
	 * Update tanggal pulang SEP
	 */
	async updateTanggalPulang(data: {
		/** nomor SEP */
		noSep: string;

		/**
		 * tanggal pulang dengan format YYYY-MM-DD HH:mm:ss
		 *
		 * Contoh: 2016-06-12 09:00:00
		 */
		tglPlg: string;

		/** kode PPK pelayanan SEP */
		ppkPelayanan: string;
	}) {
		// TODO: clarify response type because in doc is invalid
		return this.send<unknown>({
			name: this.name + 'Update Tanggal Pulang',
			path: `/Sep/updtglplg`,
			method: 'PUT',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Update tanggal pulang V2.0
	 */
	async updateTanggalPulangV2(data: {
		/** nomor SEP */
		noSep: string;

		/**
		 * Status pulang
		 * - 1 = Atas Persetujuan Dokter
		 * - 3 = Atas Permintaan Sendiri
		 * - 4 = Meninggal
		 * - 5 = Lain-lain
		 */
		statusPulang: string;

		/** diisi jika `statusPulang` = `"4"` selain itu kosong */
		noSuratMeninggal: string;

		/** diisi dengan format YYYY-MM-DD jika `statusPulang` = `"4"` selain itu kosong */
		tglMeninggal: string;

		/** tanggal pulang dengan format YYYY-MM-DD */
		tglPulang: string;

		/** diisi jika SEP-nya adalah KLL */
		noLPManual: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<null>({
			name: this.name + 'Update Tanggal Pulang V2',
			path: `/SEP/2.0/updtglplg`,
			method: 'PUT',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Data update tanggal pulang
	 */
	async listTanggalPulang(params: {
		/** bulan terbit SEP (1 sampai 12) */
		bulan: number;

		/** tahun terbit SEP */
		tahun: number;

		/**
		 * teks filter, apabila dikosongkan akan menampilkan semua
		 * data pada bulan dan tahun pilihan
		 */
		filter?: string;
	}) {
		const bulan = String(params.bulan || 0).padStart(2, '0');
		const filter = params.filter || '';
		return this.send<{
			list: {
				noSep: string;
				noSepUpdating: string;
				jnsPelayanan: string;
				ppkTujuan: string;
				noKartu: string;
				nama: string;
				tglSep: string;
				tglPulang: string;
				status: string;
				tglMeninggal: string;
				noSurat: string;
				keterangan: string;
				user: string;
			}[];
		}>({
			name: this.name + 'List Update Tanggal Pulang',
			path: `/Sep/updtglplg/list/bulan/${bulan}/tahun/${params.tahun}/${filter}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian nomor SEP untuk aplikasi Inacbg 4.1
	 */
	async inacbg(params: {
		/** nomor SEP */
		nomor: string;
	}) {
		return this.send<{
			pesertasep: {
				kelamin: string;
				klsRawat: string;
				nama: string;
				noKartuBpjs: string;
				noMr: string;
				noRujukan: string;
				tglLahir: string;
				tglPelayanan: string;
				tktPelayanan: string;
			};
		}>({
			name: this.name + 'INACBG',
			path: `/sep/cbg/${params.nomor}`,
			method: 'GET',
			skipDecrypt: true
		});
	}

	/**
	 * Data SEP internal
	 */
	async listInternal(params: {
		/** nomor SEP */
		nomor: string;
	}) {
		return this.send<{
			count: string;
			list: {
				tujuanrujuk: string;
				nmtujuanrujuk: string;
				nmpoliasal: string;
				tglrujukinternal: string;
				nosep: string;
				nosepref: string;
				ppkpelsep: string;
				nokapst: string;
				tglsep: string;
				nosurat: string;
				flaginternal: string;
				kdpoliasal: string;
				kdpolituj: string;
				kdpenunjang: string;
				nmpenunjang: string | null;
				diagppk: string;
				kddokter: string;
				nmdokter: string;
				flagprosedur: string | null;
				opsikonsul: string;
				flagsep: string;
				fuser: string;
				fdate: string;
				nmdiag: string;
			}[];
		}>({
			name: this.name + 'List Internal',
			path: `/SEP/Internal/${params.nomor}`,
			method: 'GET'
		});
	}

	/**
	 * Hapus SEP internal
	 *
	 * @returns nomor SEP
	 */
	async deleteInternal(data: {
		/** nomor SEP internal yang akan dihapus */
		noSep: string;

		/** nomor surat */
		noSurat: string;

		/** tanggal rujukan dengan format YYYY-MM-DD */
		tglRujukanInternal: string;

		/** kode poli tujuan */
		kdPoliTuj: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Hapus Internal',
			path: `/SEP/Internal/delete`,
			method: 'DELETE',
			data: { request: { t_sep: data } }
		});
	}

	/**
	 * Status fingerprint pasien per tanggal pelayanan
	 */
	async fingerPrint(params: {
		/** nomor kartu peserta */
		nomorKartu: string;

		/** tanggal pelayanan dalam format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			/** kode status (1 = sudah validasi) (0 = belum validasi) */
			kode: '1' | '0';

			/** keterangan status */
			status: string;
		}>({
			name: this.name + 'Status Fingerprint',
			path: `/SEP/FingerPrint/Peserta/${params.nomorKartu}/TglPelayanan/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Data peserta fingerprint
	 */
	async listFingerPrint(params: {
		/** tanggal pelayanan dalam format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				noKartu: string;
				noSEP: string;
			}[];
		}>({
			name: this.name + 'List Fingerprint',
			path: `/SEP/FingerPrint/List/Peserta/TglPelayanan/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Data random questions
	 */
	async listRandomQuestions(params: {
		/** nomor kartu peserta */
		nomorKartu: string;

		/** tanggal pelayanan */
		tanggal: string;
	}) {
		return this.send<{
			faskes: {
				kode: string;
				nama: string;
			}[];
		}>({
			// TODO: solve error endpoint not found
			name: this.name + 'List Random Question',
			path: `/SEP/FingerPrint/randomquestion/faskesterdaftar/nokapst/${params.nomorKartu}/tglsep/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Kirim jawaban dari random questions
	 *
	 * @returns
	 * - `"True"` jika jawaban benar
	 * - `"False"` jika jawaban salah
	 */
	async sendRandomQuestionAnswers(data: {
		/** nomor kartu peserta */
		noKartu: string;

		/** tanggal SEP dengan format YYYY-MM-DD */
		tglSep: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenPel: string;

		/** kode PPK pelayanan */
		ppkPelSep: string;

		/** tanggal lahir peserta */
		tglLahir: string;

		/** kode PPK peserta */
		ppkPst: string;

		/** pengguna atau user entri */
		user: string;
	}) {
		return this.send<'False' | 'True'>({
			name: this.name + 'Post Random Question',
			path: `/SEP/FingerPrint/randomanswer`,
			method: 'POST',
			data: { request: { t_sep: data } }
		});
	}
}

interface SEPDetail {
	noSep: string;
	tglSep: string;
	jnsPelayanan: string;
	kelasRawat: string;
	diagnosa: string;
	noRujukan: string;
	poli: string;
	poliEksekutif: string;
	catatan: string;
	penjamin: string | null;
	kdStatusKecelakaan: string;
	nmstatusKecelakaan: string;
	informasi: string | null;
	lokasiKejadian: {
		kdKab: string | null;
		kdKec: string | null;
		kdProp: string | null;
		ketKejadian: string | null;
		lokasi: string | null;
		tglKejadian: string | null;
	};
	dpjp: {
		kdDPJP: string;
		nmDPJP: string;
	};
	peserta: {
		asuransi: string | null;
		hakKelas: string;
		jnsPeserta: string;
		kelamin: string;
		nama: string;
		noKartu: string;
		noMr: string;
		tglLahir: string;
	};
	klsRawat: {
		klsRawatHak: string;
		klsRawatNaik: string | null;
		pembiayaan: string | null;
		penanggungJawab: string | null;
	};
	kontrol: {
		kdDokter: string;
		nmDokter: string;
		noSurat: string;
	};
	cob: string;
	katarak: string;
	tujuanKunj: {
		kode: string;
		nama: string;
	};
	flagProcedure: {
		kode: string;
		nama: string;
	};
	kdPenunjang: {
		kode: string;
		nama: string;
	};
	assestmenPel: {
		kode: string;
		nama: string;
	};
	eSEP: string;
}
