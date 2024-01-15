import { BaseApi } from '../base.js';
import { Config } from '../fetcher.js';
import { Bundle } from './types.js';
import { encrypt, gzip } from './utils.js';

export class RekamMedis extends BaseApi<'rekamMedis'> {
	protected type = 'rekamMedis' as const;

	async insert(data: {
		/** nomor SEP */
		nomorSEP: string;

		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenisPelayanan: string;

		/** bulan penerbitan SEP (1 sampai 12) */
		bulan: number;

		/** tahun penerbitan SEP misal 2023 */
		tahun: number;

		/**
		 * data rekam medis berupa plain object
		 *
		 * Proses kompresi dan enkripsi akan dilakukan
		 * secara otomatis pada method ini
		 */
		dataRekamMedis: Bundle;
	}) {
		const config = await this.requiredConfig('ppkCode');
		const dataMR = await preprocess(data.dataRekamMedis, config);
		return this.send<{ keterangan: string }>({
			path: `/eclaim/rekammedis/insert`,
			method: 'POST',
			skipContentTypeHack: true,
			skipDecrypt: true,
			headers: { 'Content-Type': 'text/plain' },
			data: {
				request: {
					noSep: data.nomorSEP,
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
async function preprocess(data: Bundle, { consId, consSecret, ppkCode }: Config): Promise<string> {
	try {
		const value = JSON.stringify(data);
		const compressed = await gzip(value);
		const key = consId + consSecret + ppkCode;
		return encrypt(compressed.toString('base64'), key);
	} catch (err) {
		const message = err instanceof Error ? err.message : JSON.stringify(err);
		throw new Error(`failed to compress or encrypt data. ${message}`);
	}
}
