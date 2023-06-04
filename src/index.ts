import { Antrean } from './antrean.js';
import { Fetcher } from './fetcher.js';

export default class JKN extends Fetcher {
	private cachedAntrean: Antrean | undefined;

	get antrean(): Antrean {
		if (!this.cachedAntrean) {
			this.cachedAntrean = new Antrean(this);
		}
		return this.cachedAntrean;
	}

	async invalidateConfig(): Promise<void> {
		this.cachedAntrean = undefined;
		super.invalidateConfig();
	}
}
