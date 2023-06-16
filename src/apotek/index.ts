import { CachedApi } from '../base.js';
import { Monitoring } from './monitoring.js';
import { Obat } from './obat.js';
import { PelayananObat } from './pelayanan-obat.js';
import { Referensi } from './referensi.js';
import { Resep } from './resep.js';
import { SEP } from './sep.js';

export class Apotek {
	private static instance: Apotek | undefined;

	private constructor(private readonly cache: CachedApi) {}

	static getInstance(cache: CachedApi): Apotek {
		if (!this.instance) {
			this.instance = new Apotek(cache);
		}
		return this.instance;
	}

	get referensi() {
		return this.cache.get('apotek_referensi', Referensi);
	}

	get obat() {
		return this.cache.get('apotek_obat', Obat);
	}

	get pelayananObat() {
		return this.cache.get('apotek_pelayanan-obat', PelayananObat);
	}

	get resep() {
		return this.cache.get('apotek_resep', Resep);
	}

	get sep() {
		return this.cache.get('apotek_sep', SEP);
	}

	get monitoring() {
		return this.cache.get('apotek_monitoring', Monitoring);
	}
}
