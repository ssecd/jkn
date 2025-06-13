import { AntreanFKTP } from './antrean-fktp.js';
import { Antrean } from './antrean.js';
import { Aplicares } from './aplicares.js';
import { Apotek } from './apotek/index.js';
import { CachedApi } from './base.js';
import { Fetcher } from './fetcher.js';
import { ICare } from './icare.js';
import { PCare } from './pcare/index.js';
import { RekamMedis } from './rekam-medis/index.js';
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

	get aplicares(): Aplicares {
		return this.cache.get('aplicares', Aplicares);
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

	get antreanFktp(): AntreanFKTP {
		return this.cache.get('antrean-fktp', AntreanFKTP);
	}

	get icare(): ICare {
		return this.cache.get('icare', ICare);
	}

	get rekamMedis(): RekamMedis {
		return this.cache.get('rekamMedis', RekamMedis);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JKNResponseType<T extends Record<string, any>, K extends keyof T> = NonNullable<
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

export type AplicaresResponse<K extends keyof Aplicares> = JKNResponseType<Aplicares, K>;

export type AplicaresParams<K extends keyof Aplicares> = MethodParameters<Aplicares[K]>;

export type * from './rekam-medis/types.js';
