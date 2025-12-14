import { VClaimBaseApi } from './base.js';

// TODO: make generic request and response data type as possible
export class PRB extends VClaimBaseApi {
	/**
	 * Insert data rujuk balik
	 */
	async insert(data: {
		/** no sep rawat jalan */
		noSep: string;

		/** nomor kartu peserta */
		noKartu: string;

		/** alamat lengkap peserta */
		alamat: string;

		/** alamat email */
		email: string;

		/** kode program PRB diambil dari referensi */
		programPRB: string;

		/** kode DPJP diambil dari referensi dokter */
		kodeDPJP: string;

		keterangan: string;

		/** saran dokter pemberi rujuk balik */
		saran: string;

		/** pengguna atau petugas insert (harus diisi numeric) */
		user: string;

		obat: {
			/** kode obat generik diambil dari referensi obat generik */
			kdObat: string;
			signa1: string;
			signa2: string;
			jmlObat: string;
		}[];
	}) {
		return this.send<{
			DPJP: {
				kode: string;
				nama: string;
			};
			keterangan: string;
			noSRB: string;
			obat: {
				list: {
					jmlObat: string;
					nmObat: string;
					signa: string;
				}[];
			};
			peserta: {
				alamat: string;
				asalFaskes: {
					kode: string;
					nama: string;
				};
				email: string;
				kelamin: string;
				nama: string;
				noKartu: string;
				noTelepon: string;
				tglLahir: string;
			};
			programPRB: string;
			saran: string;
			tglSRB: string;
		}>({
			name: this.name + 'Insert PRB',
			path: '/PRB/insert',
			method: 'POST',
			data: { request: { t_prb: data } }
		});
	}

	/**
	 * Update data rujuk balik
	 */
	async update(data: {
		/** nomor SRB (Surat Rujuk Balik) */
		noSrb: string;

		/** nomor SEP */
		noSep: string;

		/** alamat lengkap pasien */
		alamat: string;

		/** alamat email pasien */
		email: string;

		/** kode DPJP diambil dari referensi dokter */
		kodeDPJP: string;

		/** keterangan pasien */
		keterangan: string;

		/** saran dari DPJP */
		saran: string;

		/** pengguna atau petugas update (harus diisi numerik) */
		user: string;

		obat: {
			/** kode obat generik diambil dari referensi obat */
			kdObat: string;
			signa1: string;
			signa2: string;
			jmlObat: string;
		}[];
	}) {
		return this.send<string>({
			name: this.name + 'Update PRB',
			path: '/PRB/Update',
			method: 'PUT',
			data: { request: { t_prb: data } }
		});
	}

	/**
	 * Hapus data rujuk balik
	 */
	async delete(data: {
		/** nomor SRB (Surat Rujuk Balik) */
		noSrb: string;

		/** nomor SEP */
		noSep: string;

		/** pengguna atau petugas hapus (harus diisi numerik) */
		user: string;
	}) {
		return this.send<string>({
			name: this.name + 'Hapus PRB',
			path: '/PRB/Delete',
			method: 'DELETE',
			data: { request: { t_prb: data } }
		});
	}

	/**
	 * Pencarian data Rujuk Balik berdasarkan nomor SRB
	 */
	async cariByNomor(params: { nomorSrb: string; nomorSep: string }) {
		return this.send<{
			prb: {
				DPJP: {
					kode: string;
					nama: string;
				};
				noSEP: string;
				noSRB: string;
				obat: {
					obat: {
						jmlObat: string;
						kdObat: string;
						nmObat: string;
						signa1: string;
						signa2: string;
					}[];
				};
				peserta: {
					alamat: string;
					asalFaskes: {
						kode: string;
						nama: string;
					};
					email: string;
					kelamin: string;
					nama: string;
					noKartu: string;
					noTelepon: string;
					tglLahir: string;
				};
				programPRB: {
					kode: string;
					nama: string;
				};
				keterangan: string;
				saran: string;
				tglSRB: string;
			};
		}>({
			name: this.name + 'Cari by Nomor SRB',
			path: ['/prb/:nomorSrb/nosep/:nomorSep', params],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data Rujuk Balik berdasarkan tanggal SRB
	 */
	async cariByTanggal(params: {
		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;
	}) {
		return this.send<{
			prb: {
				list: {
					DPJP: {
						kode: string;
						nama: string;
					};
					noSEP: string;
					noSRB: string;
					peserta: {
						alamat: string;
						email: string;
						nama: string;
						noKartu: string;
						noTelepon: string;
					};
					programPRB: {
						kode: string;
						nama: string;
					};
					keterangan: string;
					saran: string;
					tglSRB: string;
				}[];
			};
		}>({
			name: this.name + 'Cari by Tanggal SRB',
			path: ['/prb/tglMulai/:awal/tglAkhir/:akhir', params],
			method: 'GET'
		});
	}

	/**
	 * Menyediakan data rekap klaim yang diajukan oleh Faskes 2, di mana
	 * dalam klaim tersebut terdapat peserta dengan flagging Potensi PRB.
	 */
	async rekapPotensi(params: { tahun: number; bulan: number }) {
		// TODO: Response returning empty string
		return this.send<{
			list: {
				NamaPeserta: string;
				NomorKartu: string;
				NOSEP: string;
				TanggalPelayanan: string;
				DiagnosaPotensiPRB: string;
				KategoriPenyakitPRB: string;
			}[];
		}>({
			name: this.name + 'Rekap Potensi PRB',
			path: [`/prbpotensi/tahun/:tahun/bulan/:bulan`, params],
			method: 'GET'
		});
	}
}
