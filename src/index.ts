import { Antrean } from './antrean.js';
import { BaseApi } from './base.js';
import { Fetcher, Type } from './fetcher.js';
import { LPK } from './vclaim/lpk.js';
import { Monitoring } from './vclaim/monitoring.js';
import { Peserta } from './vclaim/peserta.js';

export default class JKN extends Fetcher {
	private readonly cached = new Map<`${Type}${string}`, BaseApi>();

	private getApi<T extends `${Type}${string}`, C extends BaseApi>(
		key: T,
		Api: new (...args: ConstructorParameters<typeof BaseApi>) => C
	): C {
		let api = this.cached.get(key);
		if (!api) {
			api = new Api(this);
			this.cached.set(key, api);
		}
		return api as C;
	}

	async invalidateConfig(): Promise<void> {
		this.cached.clear();
		super.invalidateConfig();
	}

	get antrean(): Antrean {
		return this.getApi('antrean', Antrean);
	}

	get vclaim() {
		return {
			lpk: this.getApi('vclaim_lpk', LPK),
			monitoring: this.getApi('vclaim_monitoring', Monitoring),
			peserta: this.getApi('vclaim_peserta', Peserta)
		};
	}
}
