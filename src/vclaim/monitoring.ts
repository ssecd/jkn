import { VClaimBaseApi } from './base.js';

export class Monitoring extends VClaimBaseApi {
	/**
	 * Pencarian data kunjungan
	 *
	 * @param tanggal tanggal SEP dengan format YYYY-MM-DD
	 * @param jenis jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan)
	 */
	async kunjungan(params: {
		/** tanggal SEP dengan format YYYY-MM-DD */
		tanggal: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: number;
	}) {
		return this.send<{
			sep: {
				diagnosa: string;
				jnsPelayanan: string;
				kelasRawat: string;
				nama: string;
				noKartu: string;
				noSep: string;
				noRujukan: string;
				poli: string | null;
				tglPlgSep: string;
				tglSep: string;
			}[];
		}>({
			name: this.name + 'Data Kunjungan',
			path: `/Monitoring/Kunjungan/Tanggal/${params.tanggal}/JnsPelayanan/${params.jenis}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data klaim
	 */
	async klaim(params: {
		/** tanggal pulang dalam format YYYY-MM-DD */
		tanggal: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: number;

		/** status klaim (1 = Proses Verifikasi) (2 = Pending Verifikasi) (3 = Klaim) */
		status: number;
	}) {
		return this.send<{
			klaim: {
				Inacbg: {
					kode: string;
					nama: string;
				};
				biaya: {
					byPengajuan: string;
					bySetujui: string;
					byTarifGruper: string;
					byTarifRS: string;
					byTopup: string;
				};
				kelasRawat: string;
				noFPK: string;
				noSEP: string;
				peserta: {
					nama: string;
					noKartu: string;
					noMR: string;
				};
				poli: string;
				status: string;
				tglPulang: string;
				tglSep: string;
			}[];
		}>({
			name: this.name + 'Data Klaim',
			path: `/Monitoring/Klaim/Tanggal/${params.tanggal}/JnsPelayanan/${params.jenis}/Status/${params.status}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian history atau riwayat pelayanan per peserta
	 */
	async riwayatPelayanan(params: {
		/** nomor kartu JKN/BPJS peserta */
		nomorKartu: string;

		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;
	}) {
		return this.send<{
			histori: {
				diagnosa: string;
				jnsPelayanan: string;
				kelasRawat: string;
				namaPeserta: string;
				noKartu: string;
				noSep: string;
				noRujukan: string;
				poli: string;
				ppkPelayanan: string;
				tglPlgSep: string;
				tglSep: string;
			}[];
		}>({
			name: this.name + 'Data Histori Pelayanan Peserta',
			path: `/monitoring/HistoriPelayanan/NoKartu/${encodeURIComponent(params.nomorKartu)}/tglMulai/${params.awal}/tglAkhir/${params.akhir}`,
			method: 'GET'
		});
	}

	/**
	 * Monitoring data klaim jaminan Jasa Raharja
	 */
	async klaimJasaRaharja(params: {
		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: number;

		/** tanggal awal dengan format YYYY-MM-DD */
		awal: string;

		/** tanggal akhir dengan format YYYY-MM-DD */
		akhir: string;
	}) {
		return this.send<{
			jaminan: {
				sep: {
					noSEP: string;
					tglSEP: string;
					tglPlgSEP: string;
					noMr: string;
					jnsPelayanan: string;
					poli: string;
					diagnosa: string;
					peserta: {
						noKartu: string;
						nama: string;
						noMR: string;
					};
				};
				jasaRaharja: {
					tglKejadian: string;
					noRegister: string;
					ketStatusDijamin: string;
					ketStatusDikirim: string;
					biayaDijamin: string;
					plafon: string;
					jmlDibayar: string;
					resultsJasaRaharja: string;
				};
			}[];
		}>({
			name: this.name + 'Data Klaim Jaminan Jasa Raharja',
			path: `/monitoring/JasaRaharja/JnsPelayanan/${params.jenis}/tglMulai/${params.awal}/tglAkhir/${params.akhir}`,
			method: 'GET'
		});
	}
}
