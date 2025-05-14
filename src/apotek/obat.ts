import { ApotekBaseApi } from './base.js';

export class Obat extends ApotekBaseApi {
	private get name() {
		return this.constructor.name + ' -> ';
	}

	/**
	 * Simpan data obat non racikan
	 */
	async saveNonRacikan(data: {
		/** nomor SEP Resep dari hasil simpan resep */
		NOSJP: string;
		NORESEP: string;
		KDOBT: string;
		NMOBAT: string;
		SIGNA1OBT: number;
		SIGNA2OBT: number;
		JMLOBT: number;
		JHO: number;
		CatKhsObt: string;
	}) {
		return this.send<null>({
			name: this.name + 'Simpan (Non-Racikan)',
			path: `/obatnonracikan/v3/insert`,
			method: 'POST',
			data
		});
	}

	/**
	 * Simpan data obat racikan
	 */
	async saveRacikan(data: {
		/** nomor SEP Resep dari hasil simpan resep */
		NOSJP: string;
		NORESEP: string;
		JNSROBT: string;
		KDOBT: string;
		NMOBAT: string;
		SIGNA1OBT: number;
		SIGNA2OBT: number;
		PERMINTAAN: number;
		JMLOBT: number;
		JHO: number;
		CatKhsObt: string;
	}) {
		return this.send<null>({
			name: this.name + 'Simpan (Racikan)',
			path: `/obatracikan/v3/insert`,
			method: 'POST',
			data
		});
	}
}
