import { BaseApi } from './base.js';

export class Aplicares extends BaseApi<'aplicares'> {
	protected type = 'aplicares' as const;

	/**
	 * Referensi Kamar
	 */
	async refKamar() {
		return this.send<
			{
				list: {
					kodekelas: string;
					namakelas: string;
				}[];
			},
			{ totalitems: number }
		>({
			name: 'Referensi Kamar',
			path: `/rest/ref/kelas`,
			method: 'GET',
			skipDecrypt: true
		});
	}

	/**
	 * Update Ketersediaan Tempat Tidur
	 *
	 * Property `tersediapria`, `tersediawanita`, dan `tersediapriawanita`
	 * digunakan untuk faskes yang ingin mencantumkan informasi ketersediaan
	 * tempat tidur untuk pasien laki-laki, perempuan, dan laki–laki atau
	 * perempuan.
	 */
	async update(data: AplicaresBedData) {
		const { ppkCode } = await this.requiredConfig('ppkCode');
		return this.send({
			name: 'Update Ketersediaan Tempat Tidur',
			path: `/rest/bed/update/${encodeURIComponent(ppkCode)}`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'application/json' },
			data
		});
	}

	/**
	 * Buat Ruangan Baru
	 *
	 * Property `tersediapria`, `tersediawanita`, dan `tersediapriawanita`
	 * digunakan untuk faskes yang ingin mencantumkan informasi ketersediaan
	 * tempat tidur untuk pasien laki-laki, perempuan, dan laki–laki atau
	 * perempuan.
	 */
	async create(data: AplicaresBedData) {
		const { ppkCode } = await this.requiredConfig('ppkCode');
		return this.send<undefined>({
			name: 'Ruangan Baru',
			path: `/rest/bed/create/${encodeURIComponent(ppkCode)}`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'application/json' },
			data
		});
	}

	/**
	 * Melihat Data Ketersediaan Kamar Faskes
	 *
	 * Property `start` dan `limit` berfungsi untuk paging, jika faskes
	 * ingin menampilkan data dari baris pertama sampai baris kesepuluh
	 * maka `start` = `1` dan `limit` = `1`, nilai `start` dimulai dari `1`.
	 */
	async read(params: {
		/** paging start */
		start: number;

		/** paging limit */
		limit: number;
	}) {
		const { ppkCode } = await this.requiredConfig('ppkCode');
		return this.send<
			{
				list: (AplicaresBedData & {
					kodeppk: string;
					rownumber: number;
					lastupdate: string;
				})[];
			},
			{ totalitems: number }
		>({
			name: 'Ketersediaan Kamar Faskes',
			path: `/rest/bed/read/${encodeURIComponent(ppkCode)}/${params.start}/${params.limit}`,
			method: 'GET',
			skipDecrypt: true
		});
	}

	/**
	 * Hapus Ruangan
	 */
	async delete(data: {
		/** kode kelas ruang rawat sesuai dengan mapping BPJS Kesehatan */
		kodekelas: string;

		/** kode ruangan faskes */
		koderuang: string;
	}) {
		const { ppkCode } = await this.requiredConfig('ppkCode');
		return this.send<undefined>({
			name: 'Hapus Ruangan',
			path: `/rest/bed/delete/${encodeURIComponent(ppkCode)}`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'application/json' },
			data
		});
	}
}

interface AplicaresBedData {
	/** kode kelas ruang rawat sesuai dengan mapping BPJS Kesehatan */
	kodekelas: string;

	/** kode ruangan faskes */
	koderuang: string;

	/** nama ruang rawat faskes */
	namaruang: string;

	/** kapasitas ruang faskes */
	kapasitas: number;

	/** jumlah tempat tidur yang kosong atau dapat ditempati pasien baru */
	tersedia: number;

	/** jumlah tempat tidur yang kosong atau dapat ditempati pasien baru laki – laki */
	tersediapria?: number;

	/** jumlah tempat tidur yang kosong atau dapat ditempati pasien baru perempuan */
	tersediawanita?: number;

	/** jumlah tempat tidur yang kosong atau dapat ditempati pasien baru laki – laki atau perempuan */
	tersediapriawanita?: number;
}
