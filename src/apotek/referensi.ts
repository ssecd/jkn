import { ApotekBaseApi } from './base.js';

export class Referensi extends ApotekBaseApi {
	/**
	 * Daftar obat DPHO
	 */
	async dpho() {
		return this.send<{
			list: {
				kodeobat: string;
				namaobat: string;
				prb: 'True' | 'False';
				kronis: 'True' | 'False';
				kemo: 'True' | 'False';
				harga: string;
				restriksi: string;
				generik: string;
				aktif: string | null;
				sedia: string;
				stok: string;
			}[];
		}>({
			name: this.name + 'DPHO',
			path: `/referensi/dpho`,
			method: 'GET'
		});
	}

	/**
	 * Daftar referensi poli
	 */
	async poli(params: {
		/** kata kunci kode atau nama poli */
		keyword: string;
	}) {
		return this.send<{
			poli: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Poli',
			path: `/referensi/poli/${encodeURIComponent(params.keyword)}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data fasilitas kesehatan
	 */
	async faskes(params: {
		/**
		 * jenis faskes
		 * - 1 = FKTP atau faskes tingkat 1
		 * - 2 = FKRTL atau faskes tingkat 2
		 */
		jenis: number;

		/** nama atau penggalan kata dari nama faskes */
		nama: string;
	}) {
		return this.send<{
			faskes: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Fasilitas Kesehatan',
			path: `/referensi/ppk/${params.jenis}/${encodeURIComponent(params.nama)}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian setting apotek
	 */
	async settingApotek(params: {
		/** kode apotek */
		kodeApotek: string;
	}) {
		return this.send<{
			kode: string;
			namaapoteker: string;
			namakepala: string;
			jabatankepala: string;
			nipkepala: string;
			siup: string;
			alamat: string;
			kota: string;
			namaverifikator: string;
			nppverifikator: string;
			namapetugasapotek: string;
			nippetugasapotek: string;
			checkstock: 'True' | 'False';
		}>({
			name: this.name + 'Setting',
			path: `/referensi/settingppk/read/${encodeURIComponent(params.kodeApotek)}`,
			method: 'GET'
		});
	}

	/**
	 * Data spesialistik
	 */
	async spesialistik() {
		return this.send<{
			list: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Spesialistik',
			path: `/referensi/spesialistik`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data obat
	 */
	async obat(param: {
		/** kode jenis obat */
		jenis: string;

		/** tanggal resep dengan format YYYY-MM-DD */
		tanggal: string;

		/** filter nama obat */
		filter?: string;
	}) {
		const filter = encodeURIComponent(param.filter ?? '');
		return this.send<{
			list: {
				kode: string;
				nama: string;
				harga: string;
			}[];
		}>({
			name: this.name + 'Cari Obat',
			path: `/referensi/obat/${encodeURIComponent(param.jenis)}/${param.tanggal}/${filter}`,
			method: 'GET'
		});
	}
}
