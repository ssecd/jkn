import { Antrean } from './antrean.js';
import { Apotek } from './apotek/index.js';
import { CachedApi } from './base.js';
import { Fetcher } from './fetcher.js';
import { ICare } from './icare.js';
import { PCare } from './pcare/index.js';
import { VClaim } from './vclaim/index.js';

export default class JKN extends Fetcher {
	private readonly cache = new CachedApi(this);

	async invalidateConfig(): Promise<void> {
		this.cache.clear();
		await super.invalidateConfig();
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

	get icare(): ICare {
		return this.cache.get('icare', ICare);
	}
}

type JKNResponseType<T extends object, K extends keyof T> = NonNullable<
	// @ts-expect-error T[K] will always a method of class T
	'response' extends keyof Awaited<ReturnType<T[K]>> ? Awaited<ReturnType<T[K]>>['response'] : never
>;

// cannot use built-in Parameters type helper with class type that return from method eg. VClaim[T][K]
type MethodParameters<T> = T extends (...args: infer P) => unknown ? P : never;

export type AntreanResponse<K extends keyof Antrean> = JKNResponseType<Antrean, K>;

export type AntreanParams<K extends keyof Antrean> = MethodParameters<Antrean[K]>;

export type VClaimResponse<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = JKNResponseType<VClaim[T], K>;

export type VClaimParams<
	T extends keyof VClaim, //
	K extends keyof VClaim[T]
> = MethodParameters<VClaim[T][K]>;

export type ApotekResponse<
	T extends keyof Apotek, //
	K extends keyof Apotek[T]
> = JKNResponseType<Apotek[T], K>;

export type ApotekParams<
	T extends keyof Apotek, //
	K extends keyof Apotek[T]
> = MethodParameters<Apotek[T][K]>;

export type ICareResponse<K extends keyof ICare> = JKNResponseType<ICare, K>;

export type ICareParams<K extends keyof ICare> = MethodParameters<ICare[K]>;
