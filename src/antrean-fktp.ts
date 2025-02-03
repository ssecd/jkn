import { BaseApi } from './base.js';

export class AntreanFKTP extends BaseApi<'pcare'> {
	protected type = 'pcare' as const;

	/**
	 * Melihat referensi poli berdasarkan tanggal pelayanan
	 */
	async refPoli(params: {
		/** tanggal pelayanan */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				namapoli: string;
				nmsubspesialis: string;
				kdsubspesialis: string;
				kodepoli: string;
			}[];
		}>({
			path: `/ref/poli/tanggal/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Melihat data dokter berdasarkan tanggal pelayanan dan poli
	 */
	async refDokter(params: {
		/** tanggal pelayanan */
		tanggal: string;

		/** kode poli dari referensi poli */
		kodePoli: string;
	}) {
		return this.send<{
			list: {
				namadokter: string;
				kodedokter: number;
				jampraktek: string;
				kapasitas: number;
			}[];
		}>({
			path: `/ref/dokter/kodepoli/${params.kodePoli}/tanggal/${params.tanggal}`,
			method: 'GET'
		});
	}

	async tambah(data: {
		nomorkartu: string;
		nik: string;
		nohp: string;
		kodepoli: string;
		namapoli: string;
		norm: string;
		tanggalperiksa: string;
		kodedokter: number;
		namadokter: string;
		jampraktek: string;
		nomorantrean: string;
		angkaantrean: number;
		keterangan: string;
	}) {
		return this.send({
			path: `/antrean/add`,
			method: 'POST',
			data
		});
	}

	async updateStatus(data: {
		/** tanggal periksa atau pelayanan */
		tanggalperiksa: string;

		/** kode poli pelayanan dari referensi poli */
		kodepoli: string;

		/** nomor kartu peserta */
		nomorkartu: string;

		/** status antrean
		 *
		 * 1 = Hadir
		 *
		 * 2 = Tidak Hadir
		 */
		status: 1 | 2;

		/** waktu batal dalam bentuk timestamp millisecond, misalnya: 1616559330000 */
		waktu: number;
	}) {
		return this.send({
			path: `/antrean/panggil`,
			method: 'POST',
			data
		});
	}

	/**
	 * Batalkan antrean pasien
	 */
	async batal(data: {
		/** tanggal pelayanan atau periksa */
		tanggalperiksa: string;

		/** kode poli pelayanan */
		kodepoli: string;

		/** nomor kartu peserta */
		nomorkartu: string;

		/** alasan pembatalan */
		alasan: string;
	}) {
		return this.send({
			path: `/antrean/batal`,
			method: 'POST',
			data
		});
	}
}
