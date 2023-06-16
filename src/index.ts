import { Antrean } from './antrean.js';
import { Apotek } from './apotek/index.js';
import { CachedApi } from './base.js';
import { Fetcher } from './fetcher.js';
import { PCare } from './pcare/index.js';
import { VClaim } from './vclaim/index.js';

type JKNResponseType<T extends object, K extends keyof T> = NonNullable<
	'response' extends keyof Awaited<ReturnType<T[K]>> ? Awaited<ReturnType<T[K]>>['response'] : never
>;

export default class JKN extends Fetcher {
	private readonly cache = new CachedApi(this);

	async invalidateConfig(): Promise<void> {
		this.cache.clear();
		super.invalidateConfig();
	}

	get antrean(): Antrean {
		return this.cache.get('antrean', Antrean);
	}

	get vclaim(): VClaim {
		return VClaim.getInstance(this.cache);
	}

	get apotek(): Apotek {
		return Apotek.getInstance(this.cache);
	}

	get pcare(): PCare {
		return this.cache.get('pcare', PCare);
	}
}

export type AntreanResponse<K extends keyof Antrean> = JKNResponseType<Antrean, K>;

export type AntreanParams<K extends keyof Antrean> = Parameters<Antrean[K]>;

export type VClaimResponse<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = JKNResponseType<VClaim[T], K>;

export type VClaimParams<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = Parameters<VClaim[T][K]>;

export type ApotekResponse<
	T extends keyof Apotek, //
	K extends keyof Apotek[T]
> = JKNResponseType<Apotek[T], K>;

export type ApotekParams<
	T extends keyof Apotek, //
	K extends keyof Apotek[T]
> = Parameters<Apotek[T][K]>;
