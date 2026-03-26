import { CachedApi } from '../base.js';
import { SendOption } from '../fetcher.js';
import { PCareBaseApi } from './base.js';
import { Kunjungan } from './kunjungan.js';
import { Peserta } from './peserta.js';
import { Referensi } from './referensi.js';
import { Spesialis } from './spesialis.js';

type RequestOption = SendOption;

export class PCare {
	private static instance: PCare | undefined;

	private constructor(private readonly cache: CachedApi) {}

	static getInstance(cache: CachedApi): PCare {
		if (!this.instance) {
			this.instance = new PCare(cache);
		}
		return this.instance;
	}

	get referensi() {
		return this.cache.get('pcare_referensi', Referensi);
	}

	get peserta() {
		return this.cache.get('pcare_peserta', Peserta);
	}

	get kunjungan() {
		return this.cache.get('pcare_kunjungan', Kunjungan);
	}

	get spesialis() {
		return this.cache.get('pcare_spesialis', Spesialis);
	}

	get api() {
		return this.cache.get('pcare_partial', PartialRequest);
	}
}

/**
 * Implement base api directly since this is for partial support
 */
class PartialRequest extends PCareBaseApi {
	async request<T>(option: RequestOption) {
		return this.send<T>(option);
	}
}
