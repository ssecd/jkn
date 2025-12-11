import { BaseApi } from './base.js';

export class AntreanFKTP extends BaseApi<'pcare'> {
	protected type = 'pcare' as const;

	/**
	 * Melihat referensi poli berdasarkan tanggal pelayanan
	 */
	async refPoli(params: {
		/** tanggal pelayanan format YYYY-MM-DD */
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
			name: this.name + 'Referensi Poli',
			path: `/ref/poli/tanggal/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Melihat data dokter berdasarkan tanggal pelayanan dan poli
	 */
	async refDokter(params: {
		/** tanggal pelayanan format YYYY-MM-DD */
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
			name: this.name + 'Referensi Dokter',
			path: `/ref/dokter/kodepoli/${encodeURIComponent(params.kodePoli)}/tanggal/${params.tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Tambah antrean baru
	 */
	async tambah(data: {
		/** nomor kartu peserta/pasien BPJS, diisi kosong jika Non-JKN/BPJS */
		nomorkartu: string;

		/** NIK atau nomor induk kependudukan pasien */
		nik: string;

		/** nomor handphone pasien */
		nohp: string;

		/** kode poli sub-spesialis BPJS */
		kodepoli: string;

		/** nama poli sesuai kode poli */
		namapoli: string;

		/** nomor rekam medis pasien */
		norm: string;

		/** tanggal periksa atau pelayanan */
		tanggalperiksa: string;

		/** kode dokter BPJS */
		kodedokter: number;

		/** nama dokter sesuai kode dokter */
		namadokter: string;

		/** jam praktik dokter */
		jampraktek: string;

		/** nomor antrean lengkap */
		nomorantrean: string;

		/** hanya angka urut antrean sesuai nomor antrean */
		angkaantrean: number;

		/** informasi untuk pasien */
		keterangan: string;
	}) {
		return this.send({
			name: this.name + 'Tambah Antrean',
			path: `/antrean/add`,
			method: 'POST',
			data
		});
	}

	/**
	 * Update status antrean untuk pernyataan hadir atau
	 * tidak hadir dalam pelayanan/pemeriksaan
	 */
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
			name: this.name + 'Update Status / Panggil Antrean',
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
			name: this.name + 'Batal Antrean',
			path: `/antrean/batal`,
			method: 'POST',
			data
		});
	}
}
