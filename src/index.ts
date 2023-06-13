import { Antrean } from './antrean.js';
import { BaseApi } from './base.js';
import { Fetcher, Type } from './fetcher.js';
import { LPK } from './vclaim/lpk.js';
import { Monitoring } from './vclaim/monitoring.js';
import { Peserta } from './vclaim/peserta.js';
import { PRB } from './vclaim/prb.js';
import { Referensi } from './vclaim/referensi.js';
import { RencanaKontrol } from './vclaim/rencana-kontrol.js';
import { Rujukan } from './vclaim/rujukan.js';
import { SEP } from './vclaim/sep.js';

type CacheKey = `${Type}${string}`;

type JKNResponseType<T extends object, K extends keyof T> = NonNullable<
	'response' extends keyof Awaited<ReturnType<T[K]>> ? Awaited<ReturnType<T[K]>>['response'] : never
>;

export default class JKN extends Fetcher {
	private readonly cached = new Map<CacheKey, BaseApi>();

	private getApi<K extends CacheKey, V extends BaseApi>(
		key: K,
		Api: new (...args: ConstructorParameters<typeof BaseApi>) => V
	): V {
		let api = this.cached.get(key);
		if (!api) {
			api = new Api(this);
			this.cached.set(key, api);
		}
		return api as V;
	}

	async invalidateConfig(): Promise<void> {
		this.cached.clear();
		super.invalidateConfig();
	}

	get antrean(): Antrean {
		return this.getApi('antrean', Antrean);
	}

	get vclaim() {
		const root = this;
		return {
			get lpk() {
				return root.getApi('vclaim_lpk', LPK);
			},
			get monitoring() {
				return root.getApi('vclaim_monitoring', Monitoring);
			},
			get peserta() {
				return root.getApi('vclaim_peserta', Peserta);
			},
			get prb() {
				return root.getApi('vclaim_prb', PRB);
			},
			get referensi() {
				return root.getApi('vclaim_referensi', Referensi);
			},
			get rencanaKontrol() {
				return root.getApi('vclaim_rencanaKontrol', RencanaKontrol);
			},
			get rujukan() {
				return root.getApi('vclaim_rujukan', Rujukan);
			},
			get sep() {
				return root.getApi('vclaim_sep', SEP);
			}
		};
	}
}

export type AntreanResponse<K extends keyof Antrean> = JKNResponseType<Antrean, K>;

export type AntreanRequest<K extends keyof Antrean> = Parameters<Antrean[K]>;

type VClaim = JKN['vclaim'];

export type VClaimResponse<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = JKNResponseType<VClaim[T], K>;

export type VClaimRequest<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = Parameters<VClaim[T][K]>;
