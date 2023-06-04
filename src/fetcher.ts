import { createDecipheriv, createHash, createHmac } from 'crypto';
import { decompressFromEncodedURIComponent } from 'lz-string';

type MaybePromise<T> = T | Promise<T>;

type Mode = 'development' | 'production';

// TODO: support more api (apotek & pcare)
type Type = 'vclaim' | 'antrean';

export interface Config {
	mode: Mode;
	consId: string;
	consSecret: string;
	vclaimUserKey: string;
	antreanUserKey: string;
}

export interface SendOption<T extends Type> {
	type: T;
	path: `/${string}`;
	method?: 'GET' | 'POST';
	data?: unknown;
	skipDecrypt?: boolean;
	headers?: Record<string, string>;
}

interface LowerResponse<T> {
	response: T;
	metadata: {
		code: number;
		message: string;
	};
}

interface CamelResponse<T> {
	response: T;
	metaData: {
		code: string;
		message: string;
	};
}

type SendResponse<T> = {
	antrean: LowerResponse<T>;
	vclaim: CamelResponse<T>;
};

const api_base_urls: Record<Type, Record<Mode, string>> = {
	vclaim: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev',
		production: ''
	},
	antrean: {
		development: 'https://apijkn-dev.bpjs-kesehatan.go.id/antreanrs_dev',
		production: ''
	}
};

export class Fetcher {
	private configured = false;

	private config: Config = {
		mode: (process.env.NODE_ENV as Mode) ?? 'development',
		consId: process.env.JKN_CONS_ID ?? '',
		consSecret: process.env.JKN_CONS_SECRET ?? '',
		vclaimUserKey: process.env.JKN_VCLAIM_USER_KEY ?? '',
		antreanUserKey: process.env.JKN_ANTREAN_USER_KEY ?? ''
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
		const key_plain = `${consId}${consSecret}${requestTimestamp}`;
		const key = createHash('sha256').update(key_plain, 'utf8').digest();
		const iv = Uint8Array.from(key.subarray(0, 16));
		const decipher = createDecipheriv('aes-256-cbc', key, iv);
		let dec = decipher.update(responseText, 'base64', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}

	private decompress(text: string): string {
		return decompressFromEncodedURIComponent(text);
	}

	async send<R>(option: SendOption<'vclaim'>): Promise<SendResponse<R | undefined>['vclaim']>;

	async send<R>(option: SendOption<'antrean'>): Promise<SendResponse<R | undefined>['antrean']>;

	async send<R>(option: SendOption<Type>): Promise<SendResponse<R | undefined>[Type]> {
		await this.applyConfig();
		if (!option.path.startsWith('/')) throw new Error(`path must be starts with "/"`);

		let response = '';
		try {
			const url = new URL(api_base_urls[option.type][this.config.mode] + option.path);
			const init: RequestInit = { method: option.method ?? 'GET' };
			const headers = { ...this.getDefaultHeaders(option.type), ...(option.headers ?? {}) };

			init.headers = headers;
			if (option.data) {
				if (option.method === 'GET') throw new Error(`can not pass data with "GET" method`);
				init.body = JSON.stringify(option.data);
				init.headers = {
					...init.headers,
					/**
					 * The content-type is actually invalid because the body is in json format,
					 * but it's just follow the JKN doc / TrustMark. What a weird API.
					 */
					'Content-Type': 'Application/x-www-form-urlencoded'
				};
			}

			response = await fetch(url, init).then((r) => r.text());
			const json: SendResponse<R>[Type] = JSON.parse(response);

			if (json.response && !option.skipDecrypt) {
				const decrypted = this.decrypt(String(json.response), headers['X-timestamp']);
				json.response = JSON.parse(this.decompress(decrypted));
			}

			return json;
		} catch (error: unknown) {
			let message =
				error instanceof SyntaxError
					? 'Received response from the JKN API appears to be in an unexpected format'
					: 'An error occurred while requesting information from the JKN API';
			if (error instanceof Error) message += `. ` + error.message;
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
