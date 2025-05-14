import { BaseApi } from './base.js';

export class ICare extends BaseApi<'icare'> {
	protected type = 'icare' as const;

	async fkrtl(data: {
		/** Nomor kartu peserta */
		param: string;

		/** Kode dokter */
		kodedokter: number;
	}) {
		return this.send<{ url: string }>({
			name: 'FKRTL',
			path: `/api/rs/validate`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'Application/json' },
			data
		});
	}

	async fktp(data: {
		/** Nomor kartu peserta */
		param: string;
	}) {
		return this.send<{ url: string }>({
			name: 'FKTP',
			path: `/api/pcare/validate`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'Application/json' },
			data
		});
	}
}
