import { BaseApi } from './base.js';

export class Aplicares extends BaseApi<'aplicares'> {
	protected type = 'aplicares' as const;

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

	async updateBed(data: {
		kodekelas: string;
		koderuang: string;
		namaruang: string;
		kapasitas: number;
		tersedia: number;
		tersediapria?: number;
		tersediawanita?: number;
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
