import { createDecipheriv, createHash, createHmac } from 'crypto';
import lz from 'lz-string';

type MaybePromise<T> = T | Promise<T>;

export type Mode = 'development' | 'production';

// TODO: support more api (apotek & pcare)
export type Type = 'vclaim' | 'antrean';

export interface Config {
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

export interface LowerResponse<T> {
	response: T;
	metadata: {
		code: number;
		message: string;
	};
}

export interface CamelResponse<T> {
	response: T;
	metaData: {
		code: string;
		message: string;
	};
}

export type SendResponse<T> = {
	antrean: LowerResponse<T>;
	vclaim: CamelResponse<T>;
};

const api_base_urls: Record<Type, Record<Mode, string>> = {
	vclaim: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/vclaim-rest'
	},
	antrean: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/antreanrs_dev',
		production: 'https://apijkn.bpjs-kesehatan.go.id/antreanrs'
	}
};

export class Fetcher {
	private configured = false;

	private config: Config = {
		mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
		consId: process.env.JKN_CONS_ID ?? '',
		consSecret: process.env.JKN_CONS_SECRET ?? '',
		vclaimUserKey: process.env.JKN_VCLAIM_USER_KEY ?? '',
		antreanUserKey: process.env.JKN_ANTREAN_USER_KEY ?? '',
		throw: false
	};

	constructor(private userConfig?: Partial<Config> | (() => MaybePromise<Partial<Config>>)) {}

	private async applyConfig() {
		if (!this.userConfig || this.configured) return;

		if (typeof this.userConfig === 'object') {
			this.config = {
				...this.config,
				...this.userConfig
			};
		} else if (typeof this.userConfig === 'function') {
			const config = await this.userConfig();
			this.config = {
				...this.config,
				...config
			};
		}

		if (!this.config.consId || !this.config.consSecret) {
			throw new Error(`cons id and secret is not defined`);
		}

		this.configured = true;
	}

	private get userKeyMap(): Record<Type, string | undefined> {
		return {
			vclaim: this.config.vclaimUserKey,
			antrean: this.config.antreanUserKey
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

	async send<T extends Type, R>(
		type: T,
		option: SendOption
	): Promise<SendResponse<R | undefined>[T]> {
		await this.applyConfig();
		if (!option.path.startsWith('/')) throw new Error(`path must be starts with "/"`);

		let response = '';
		try {
			const url = new URL(api_base_urls[type][this.config.mode] + option.path);
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
			const json: SendResponse<R>[T] = JSON.parse(response);

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
			const code = '500';
			console.error(error);
			return {
				metadata: { code: +code, message },
				metaData: { code, message },
				response: undefined
			};
		}
	}

	async invalidateConfig() {
		this.configured = false;
		await this.applyConfig();
	}
}
