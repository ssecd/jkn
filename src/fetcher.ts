import { createDecipheriv, createHash, createHmac } from 'crypto';
import lz from 'lz-string';

type MaybePromise<T> = T | Promise<T>;

export type Mode = 'development' | 'production';

export type Type = 'aplicares' | 'vclaim' | 'antrean' | 'apotek' | 'pcare' | 'icare' | 'rekamMedis';

export interface Config {
	/**
	 * Kode PPK yang diberikan BPJS.
	 *
	 * Diperlukan untuk melakukan proses enkripsi
	 * pada service eRekamMedis and request pada
	 * service Aplicares
	 *
	 * @default process.env.JKN_PPK_CODE
	 */
	ppkCode: string;

	/**
	 * Cons ID dari BPJS
	 *
	 * @default process.env.JKN_CONS_ID
	 */
	consId: string;

	/**
	 * Secret key dari BPJS
	 *
	 * @default process.env.JKN_CONS_SECRET
	 */
	consSecret: string;

	/**
	 * User key Aplicares dari BPJS
	 *
	 * @default process.env.JKN_APLICARES_USER_KEY
	 */
	aplicaresUserKey: string;

	/**
	 * User key VClaim dari BPJS
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY
	 */
	vclaimUserKey: string;

	/**
	 * User key Antrean dari BPJS
	 *
	 * @default process.env.JKN_ANTREAN_USER_KEY
	 */
	antreanUserKey: string;

	/**
	 * User key Apotek dari BPJS
	 *
	 * @default process.env.JKN_APOTEK_USER_KEY
	 */
	apotekUserKey: string;

	/**
	 * User key PCare dari BPJS
	 *
	 * @default process.env.JKN_PCARE_USER_KEY
	 */
	pcareUserKey: string;

	/**
	 * User key i-Care dari BPJS
	 *
	 * Umumnya user key i-Care ini nilai sama dengan user key VClaim
	 * untuk FKRTL dan PCare untuk FKTP
	 *
	 * @default process.env.JKN_ICARE_USER_KEY
	 */
	icareUserKey: string;

	/**
	 * User key eRekam Medis dari BPJS
	 *
	 * @default process.env.JKN_REKAM_MEDIS_USER_KEY
	 */
	rekamMedisUserKey: string;

	/**
	 * Berupa mode "development" dan "production". Secara default akan
	 * membaca nilai environment variable NODE_ENV atau "development"
	 * jika NODE_ENV tidak terdapat nilai. Mode ini berpengaruh pada
	 * nilai konfigurasi yang digunakan dan JKN API base url.
	 *
	 * @default process.env.NODE_ENV || "development"
	 */
	mode: Mode;

	/**
	 * Secara default bernilai `false` sehingga setiap terjadi kesalahan
	 * saat mengirim permintaan ke server JKN menggunakan method `send()`,
	 * pesan kesalahan akan dikembalikan sebagai pesan response dan log
	 * error akan dicetak pada konsol atau terminal. Jika bernilai true,
	 * maka kesalahan akan di-throw.
	 *
	 * @default false
	 */
	throw: boolean;

	/**
	 * Base URL web service dari BPJS. Secara default sudah diatur
	 * berdasarkan base url yang ada di TrustMark. Nilai dapat diatur
	 * secara partial, misalnya:
	 *
	 * ```
	 * baseUrls: {
	 * 	vclaim: {
	 * 		development: 'http://dev.example.com',
	 * 		production: 'http://prod.example.com'
	 * 	}
	 * }
	 * ```
	 */
	baseUrls: Partial<Record<Type, Record<Mode, string>>>;
}

export interface SendOption {
	path: `/${string}`;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data?: unknown;
	skipDecrypt?: boolean;
	headers?: Record<string, string>;

	/**
	 * Mengatur "Content-Type" pada request header menjadi "application/json; charset=utf-8".
	 * Secara default "Content-Type" pada request header adalah "application/x-www-form-urlencoded"
	 * meski pun saat request nilai body dalam format json. Ini tidak standar, namun mengacu pada
	 * panduan bridging pada halaman dokumentasi di situs TrustMark yang memaksa hal tersebut.
	 *
	 * @default undefined
	 */
	skipContentTypeHack?: boolean;
}

export interface LowerResponse<T, C, E> {
	response: T;
	metadata: {
		code: C;
		message: string;
	} & E;
}

export interface CamelResponse<T, C, E> {
	response: T;
	metaData: {
		code: C;
		message: string;
	} & E;
}

export type SendResponse<T, M> = {
	aplicares: LowerResponse<T, number, M>;
	antrean: LowerResponse<T, number, M>;
	vclaim: CamelResponse<T, string, M>;
	apotek: CamelResponse<T, string, M>;
	pcare: CamelResponse<T, number, M>;
	icare: CamelResponse<T, number, M>;
	rekamMedis: LowerResponse<T, string, M>;
};

const defaultBaseUrls: Record<Type, Record<Mode, string>> = {
	aplicares: {
		development: 'https://dvlp.bpjs-kesehatan.go.id:8888/aplicaresws',
		production: 'https://new-api.bpjs-kesehatan.go.id/aplicaresws'
	},
	vclaim: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/vclaim-rest'
	},
	antrean: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/antreanrs_dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/antreanrs'
	},
	apotek: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/apotek-rest-dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/apotek-rest'
	},
	pcare: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/pcare-rest-dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/pcare-rest'
	},
	icare: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/ihs_dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/wsihs'
	},
	rekamMedis: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/erekammedis_dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/erekammedis'
	}
};

export class Fetcher {
	private configured = false;

	private config: Config = {
		mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
		ppkCode: process.env.JKN_PPK_CODE ?? '',
		consId: process.env.JKN_CONS_ID ?? '',
		consSecret: process.env.JKN_CONS_SECRET ?? '',
		aplicaresUserKey: process.env.JKN_APLICARES_USER_KEY ?? '',
		vclaimUserKey: process.env.JKN_VCLAIM_USER_KEY ?? '',
		antreanUserKey: process.env.JKN_ANTREAN_USER_KEY ?? '',
		apotekUserKey: process.env.JKN_APOTEK_USER_KEY ?? '',
		pcareUserKey: process.env.JKN_PCARE_USER_KEY ?? '',
		icareUserKey: process.env.JKN_ICARE_USER_KEY ?? '',
		rekamMedisUserKey: process.env.JKN_REKAM_MEDIS_USER_KEY ?? '',
		throw: false,
		baseUrls: defaultBaseUrls
	};

	constructor(private userConfig?: Partial<Config> | (() => MaybePromise<Partial<Config>>)) {}

	private async applyConfig() {
		if (!this.userConfig || this.configured) return;

		if (typeof this.userConfig === 'object') {
			this.config = this.mergeConfig(this.config, this.userConfig);
		} else if (typeof this.userConfig === 'function') {
			const userConfig = await this.userConfig();
			this.config = this.mergeConfig(this.config, userConfig);
		}

		if (!this.config.consId || !this.config.consSecret) {
			throw new Error(`cons id and secret is not defined`);
		}

		this.configured = true;
	}

	private mergeConfig(target: Config, source: Partial<Config>): Config {
		// simple object merge strategy because only baseUrls is typeof object for now
		const baseUrls = { ...target.baseUrls, ...source.baseUrls };
		return { ...target, ...source, baseUrls };
	}

	private get userKeyMap(): Record<Type, string | undefined> {
		return {
			aplicares: this.config.aplicaresUserKey,
			vclaim: this.config.vclaimUserKey,
			antrean: this.config.antreanUserKey,
			apotek: this.config.apotekUserKey,
			pcare: this.config.pcareUserKey,
			icare: this.config.icareUserKey,
			rekamMedis: this.config.rekamMedisUserKey
		};
	}

	private getDefaultHeaders(type: Type) {
		const userKey = this.userKeyMap[type];
		if (!userKey) throw new Error(`failed to get user key of type "${type}"`);

		const { consId, consSecret } = this.config;
		const timestamp = Math.round(Date.now() / 1000);
		const message = `${consId}&${timestamp}`;
		const signature = createHmac('SHA256', consSecret).update(message).digest('base64');
		return {
			'X-cons-id': consId,
			'X-timestamp': String(timestamp),
			'X-signature': encodeURI(signature),
			user_key: userKey
		};
	}

	private decrypt(responseText: string, requestTimestamp: string) {
		const { consId, consSecret } = this.config;
		const keyPlain = `${consId}${consSecret}${requestTimestamp}`;
		const key = createHash('sha256').update(keyPlain, 'utf8').digest();
		const iv = Uint8Array.from(key.subarray(0, 16));
		const decipher = createDecipheriv('aes-256-cbc', key, iv);
		let dec = decipher.update(responseText, 'base64', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}

	private decompress(text: string): string {
		return lz.decompressFromEncodedURIComponent(text);
	}

	async send<T extends Type, R, M>(
		type: T,
		option: SendOption
	): Promise<SendResponse<R | undefined, M | undefined>[T]> {
		await this.applyConfig();
		if (!option.path.startsWith('/')) throw new Error(`path must be starts with "/"`);

		let response = '';
		try {
			const baseUrl = this.config.baseUrls[type];
			if (!baseUrl) throw new Error(`base url of type "${type}" is invalid`);

			const url = new URL(baseUrl[this.config.mode] + option.path);
			const init: RequestInit = { method: option.method ?? 'GET' };
			const headers = { ...this.getDefaultHeaders(type), ...(option.headers ?? {}) };

			init.headers = headers;
			if (option.data) {
				if (option.method === 'GET') throw new Error(`can not pass data with "GET" method`);
				init.body = JSON.stringify(option.data);

				// default fetch content type in request header is json
				if (!option.skipContentTypeHack) {
					init.headers = {
						...init.headers,
						/**
						 * The "Content-Type" is actually invalid because the body is in json format,
						 * but it simply adheres to the JKN doc or TrustMark. What a weird API.
						 */
						'Content-Type': 'Application/x-www-form-urlencoded'
					};
				}
			}

			response = await fetch(url, init).then((r) => r.text());
			const json: SendResponse<R, M>[T] = JSON.parse(response);

			if (json.response && !option.skipDecrypt) {
				const decrypted = this.decrypt(String(json.response), headers['X-timestamp']);
				json.response = JSON.parse(this.decompress(decrypted));
			}

			return json;
		} catch (error: unknown) {
			if (this.config.throw) {
				if (error instanceof Error) {
					error.message += `. \nResponse: ${response}`;
				}
				throw error;
			}
			let message =
				error instanceof SyntaxError
					? 'Received response from the JKN API appears to be in an unexpected format'
					: 'An error occurred while requesting information from the JKN API';
			if (error instanceof Error) message += `. ` + error.message;
			message += '. ' + response;
			console.error(error);

			// TODO: find better way to infer generic response type
			const code = type === 'icare' ? 500 : '500';
			return {
				metadata: { code: +code, message },
				metaData: { code, message },
				response: undefined
			} as unknown as SendResponse<R, M>[T];
		}
	}

	async invalidateConfig() {
		this.configured = false;
		await this.applyConfig();
	}

	async getConfig(): Promise<Config> {
		await this.applyConfig();
		return this.config;
	}
}
