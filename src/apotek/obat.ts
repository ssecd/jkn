import { ApotekBaseApi } from './base.js';

export class Obat extends ApotekBaseApi {
	/**
	 * Simpan data obat non racikan
	 */
	async saveNonRacikan(data: {
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
			path: `/obatnonracikan/v3/insert`,
			method: 'POST',
			data
		});
	}

	/**
	 * Simpan data obat racikan
	 */
	async saveRacikan(data: {
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
			path: `/obatracikan/v3/insert`,
			method: 'POST',
			data
		});
	}
}
