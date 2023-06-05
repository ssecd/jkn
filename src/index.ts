import { Antrean } from './antrean.js';
import { BaseApi } from './base.js';
import { Fetcher, Type } from './fetcher.js';

export default class JKN extends Fetcher {
	private readonly cached = new Map<Type, BaseApi>();

	private getApi<T extends Type, C extends BaseApi<T>>(
		type: T,
		ApiClass: new (...args: ConstructorParameters<typeof BaseApi>) => C
	): C {
		let api = this.cached.get(type);
		if (!api) {
			api = new ApiClass(this);
			this.cached.set(type, api);
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
}
