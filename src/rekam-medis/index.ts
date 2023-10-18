import { BaseApi } from '../base.js';

export class RekamMedis extends BaseApi<'rekamMedis'> {
	protected type = 'rekamMedis' as const;

	async insert(data: {
		/** nomor SEP */
		nomorSep: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenisPelayanan: string;

		/** bulan penerbitan SEP (1 sampai 12) */
		bulan: number;

		/** tahun penerbitan SEP misal 2023 */
		tahun: number;

		/** data rekam medis yang akan dikirim */
		dataRekamMedis: unknown;
	}) {
		const dataMR = preprocess(data.dataRekamMedis);
		return this.send({
			path: `/`,
			method: 'POST',
			skipContentTypeHack: true,
			headers: { 'Content-Type': 'text/plain' },
			data: {
				request: {
					noSep: data.nomorSep,
					jnsPelayanan: data.jenisPelayanan,
					bulan: String(data.bulan),
					tahun: String(data.tahun),
					dataMR
				}
			}
		});
	}
}

/**
 * Pengolahan data berupa compression menggunakan metode GZIP
 * and encryption dengan key berupa kombinasi CONS ID, SECRET KEY,
 * dan KODE PPK. Ini berdasarkan spesifikasi yang telah ditentukan
 * pada halaman TrustMark BPJS Kesehatan.
 */
function preprocess(data: unknown): string {
	return 'TODO' + data;
}
