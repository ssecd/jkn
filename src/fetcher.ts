import lz from 'lz-string';
import { createDecipheriv, createHash, createHmac } from 'node:crypto';

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
	 * User key Aplicares dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_APLICARES_USER_KEY
	 */
	aplicaresUserKey?: string;

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
	 * User key Apotek dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_APOTEK_USER_KEY
	 */
	apotekUserKey?: string;

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
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_ICARE_USER_KEY
	 */
	icareUserKey?: string;

	/**
	 * User key eRekam Medis dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_REKAM_MEDIS_USER_KEY
	 */
	rekamMedisUserKey?: string;

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
	/** name of request, it helpful for log or collect stats */
	name?: string;
	path: `/${string}` | [`/${string}`, Record<string, string | number | undefined | null>];
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

export type SendResponse<Response, ExtraMetadata> = {
	aplicares: LowerResponse<Response, number, ExtraMetadata>;
	antrean: LowerResponse<Response, number, ExtraMetadata>;
	vclaim: CamelResponse<Response, string, ExtraMetadata>;
	apotek: CamelResponse<Response, string, ExtraMetadata>;
	pcare: CamelResponse<Response, number, ExtraMetadata>;
	icare: CamelResponse<Response, number, ExtraMetadata>;
	rekamMedis: LowerResponse<Response, string, ExtraMetadata>;
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
		production: 'https://apijkn.bpjs-kesehatan.go.id/medicalrecord'
	}
};

export class Fetcher {
	// simply using custom event function instead of node:EventEmitter
	public onRequest: ((info: SendOption & { type: Type }) => MaybePromise<void>) | undefined =
		undefined;

	public onResponse:
		| (<T extends Type = Type>(
				info: SendOption & {
					/** in milliseconds */ duration: number;
					type: T;
				},
				result: SendResponse<unknown, unknown>[T]
		  ) => MaybePromise<void>)
		| undefined = undefined;

	public onError: ((error: Error) => MaybePromise<void>) | undefined = undefined;

	private configured = false;

	private config: Config = {
		mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
		ppkCode: process.env.JKN_PPK_CODE ?? '',
		consId: process.env.JKN_CONS_ID ?? '',
		consSecret: process.env.JKN_CONS_SECRET ?? '',
		aplicaresUserKey: process.env.JKN_APLICARES_USER_KEY,
		vclaimUserKey: process.env.JKN_VCLAIM_USER_KEY ?? '',
		antreanUserKey: process.env.JKN_ANTREAN_USER_KEY ?? '',
		apotekUserKey: process.env.JKN_APOTEK_USER_KEY,
		pcareUserKey: process.env.JKN_PCARE_USER_KEY ?? '',
		icareUserKey: process.env.JKN_ICARE_USER_KEY,
		rekamMedisUserKey: process.env.JKN_REKAM_MEDIS_USER_KEY,
		throw: false,
		baseUrls: defaultBaseUrls
	};

	constructor(private userConfig?: Partial<Config> | (() => MaybePromise<Partial<Config>>)) {}

	private async applyConfig() {
		if (this.configured) return;

		if (typeof this.userConfig === 'object') {
			this.config = this.mergeConfig(this.config, this.userConfig);
		} else if (typeof this.userConfig === 'function') {
			const userConfig = await this.userConfig();
			this.config = this.mergeConfig(this.config, userConfig);
		}

		if (!this.config.consId || !this.config.consSecret) {
			throw new Error(`cons id and secret are not defined`);
		}

		// fallback to vclaimUserKey
		for (const key of [
			'aplicaresUserKey',
			'apotekUserKey',
			'icareUserKey',
			'rekamMedisUserKey'
		] satisfies (keyof Config)[]) {
			if (this.config[key]) continue;
			this.config[key] = this.config.vclaimUserKey;
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

		const path = normalizePath(option.path);
		const baseUrl = this.config.baseUrls[type];
		if (!baseUrl) throw new Error(`Invalid base URL for type "${type}"`);

		let result = '';
		try {
			const url = new URL(baseUrl[this.config.mode] + path);
			const init: RequestInit = { method: option.method ?? 'GET' };
			const headers = { ...this.getDefaultHeaders(type), ...(option.headers ?? {}) };

			init.headers = headers;
			if (option.data) {
				if (option.method === 'GET') throw new Error(`Can not pass data with "GET" method`);
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

			this.onRequest?.({ ...option, type });
			const startedAt = performance.now();
			const response = await fetch(url, init);
			result = await response.text();
			if (!result) throw new Error(`The response body is empty (${response.status})`);

			const json: SendResponse<R, M>[T] = JSON.parse(result);
			if (json.response && !option.skipDecrypt) {
				const decrypted = this.decrypt(String(json.response), headers['X-timestamp']);
				json.response = JSON.parse(this.decompress(decrypted));
			}

			const duration = performance.now() - startedAt;
			this.onResponse?.({ ...option, duration, type }, json);
			return json;
		} catch (error: unknown) {
			const customError = new Error(
				error instanceof SyntaxError
					? `The response is not JSON (${parseHtml(result)})`
					: error instanceof Error
						? error.message
						: JSON.stringify(error),
				{ cause: error }
			);

			this.onError?.(customError);
			if (this.config.throw) throw customError;
			console.error(customError);

			// TODO: find better way to infer generic response type
			const code = type === 'icare' ? 500 : '500';
			const message = `An error occurred: "${customError.message}"`;
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

/**
 * A simple HTML parser so ugly HTML error messages
 * don't hurt your eyes anymore.
 */
function parseHtml(html?: string) {
	if (!html) return '[empty]';
	return html
		.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, '')
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]*>/g, '')
		.trim()
		.replace(/\r?\n+/g, ' - ') // newlines to dash
		.replace(/\s+/g, ' '); // normalize whitespace
}

/** @internal */
export function normalizePath(path: SendOption['path']) {
	const [pathname, params] = typeof path == 'string' ? [path] : path;

	if (!pathname.startsWith('/')) throw new Error(`Path must start with "/"`);
	if (!params) return pathname;

	return pathname.replace(/\/:([A-Za-z0-9_]+)(\?)?/g, (_, key: string, optional?: string) => {
		const value = params[key];

		if (value == null) {
			if (optional) return ''; // remove entire `/:param?`
			throw new Error(`Missing params: ${key}`);
		}

		const component = String(value);
		try {
			return '/' + encodeURIComponent(decodeURIComponent(component));
		} catch {
			return '/' + encodeURIComponent(component);
		}
	});
}
