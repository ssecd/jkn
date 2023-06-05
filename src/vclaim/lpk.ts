import { VClaimBaseApi } from './base.js';

export class LPK extends VClaimBaseApi {
	/**
	 * Insert Rujukan
	 *
	 * @param data data LPK
	 */
	async insertLpk(data: DataLPK) {
		return this.send({
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
	async updateLpk(data: DataLPK) {
		return this.send({
			path: '/LPK/update',
			method: 'PUT',
			data: { request: { t_lpk: data } }
		});
	}

	/**
	 * Delete Rujukan
	 *
	 * @param nomorSep nomor SEP
	 */
	async deleteLpk(nomorSep: string) {
		return this.send<string>({
			path: '/LPK/delete',
			method: 'DELETE',
			data: { request: { t_lpk: { noSep: nomorSep } } }
		});
	}

	/**
	 * Pencarian data peserta berdasarkan NIK Kependudukan
	 *
	 * @param tanggal tanggal masuk
	 * @param jenis jenis pelayanan. (1. Rawat Inap) (2. Rawat Jalan)
	 */
	async dataLpk(tanggal: string, jenis: 1 | 2) {
		return this.send({
			path: `/LPK/TglMasuk/${tanggal}/JnsPelayanan/${jenis}`,
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
	jaminan: '1';

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
