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
	async updateBed(data: {
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
	}) {
		const { ppkCode } = await this.requiredConfig('ppkCode');
		return this.send({
			path: `/rest/bed/update/${ppkCode}`,
			method: 'POST',
			data
		});
	}
}
