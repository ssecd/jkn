import { PCareBaseApi } from './base.js';

export class Peserta extends PCareBaseApi {
	/**
	 * Pencarian data peserta berdasarkan nomor kartu
	 */
	async nomorKartu(params: {
		/** nomor kartu JKN atau BPJS */
		nomor: string;
	}) {
		return this.send<DataPeserta>({
			name: this.name + 'No. Kartu BPJS',
			path: ['/peserta/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data peserta berdasarkan Jenis Kartu
	 */
	async jenisKartu(params: {
		/** jenis kartu  [nomor induk kependudukan = nik, nomor kartu BPJS = noka]*/
		jenis: string;
		/** nomor NIK/NOKA BPJS */
		nomor: string;
	}) {
		return this.send<DataPeserta>({
			name: this.name + 'Peserta by Jenis Kartu',
			path: ['/peserta/:jenis/:nomor', params],
			method: 'GET'
		});
	}
}

interface DataPeserta {
	noKartu: string;
	nama: string;
	hubunganKeluarga: string;
	sex: string;
	tglLahir: string;
	tglMulaiAktif: string;
	tglAkhirBerlaku: string;
	kdProviderPst: {
		kdProvider: string;
		nmProvider: string;
	};
	kdProviderGigi: {
		kdProvider: string | null;
		nmProvider: string | null;
	};
	jnsKelas: {
		nama: string;
		kode: string;
	};
	jnsPeserta: {
		nama: string;
		kode: string;
	};
	golDarah: string;
	noHP: string;
	noKTP: string;
	pstProl: string;
	pstPrb: string;
	aktif: boolean;
	ketAktif: string;
	asuransi: {
		kdAsuransi: string | null;
		nmAsuransi: string | null;
		noAsuransi: string | null;
		cob: boolean;
	};
	tunggakan: number;
}
