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
}
