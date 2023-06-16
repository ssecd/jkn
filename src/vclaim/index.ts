import { CachedApi } from '../base.js';
import { LPK } from './lpk.js';
import { Monitoring } from './monitoring.js';
import { Peserta } from './peserta.js';
import { PRB } from './prb.js';
import { Referensi } from './referensi.js';
import { RencanaKontrol } from './rencana-kontrol.js';
import { Rujukan } from './rujukan.js';
import { SEP } from './sep.js';

export class VClaim {
	private static instance: VClaim | undefined;

	private constructor(private readonly cache: CachedApi) {}

	static getInstance(cache: CachedApi): VClaim {
		if (!this.instance) {
			this.instance = new VClaim(cache);
		}
		return this.instance;
	}

	get lpk() {
		return this.cache.get('vclaim_lpk', LPK);
	}

	get monitoring() {
		return this.cache.get('vclaim_monitoring', Monitoring);
	}

	get peserta() {
		return this.cache.get('vclaim_peserta', Peserta);
	}

	get prb() {
		return this.cache.get('vclaim_prb', PRB);
	}

	get referensi() {
		return this.cache.get('vclaim_referensi', Referensi);
	}

	get rencanaKontrol() {
		return this.cache.get('vclaim_rencanaKontrol', RencanaKontrol);
	}

	get rujukan() {
		return this.cache.get('vclaim_rujukan', Rujukan);
	}

	get sep() {
		return this.cache.get('vclaim_sep', SEP);
	}
}
