import zlib from 'node:zlib';
import { Config } from '../fetcher.js';
import { createCipheriv, createHash } from 'node:crypto';

export async function gzip(value: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		zlib.gzip(value, (err, buf) => {
			if (err) reject(err);
			else resolve(buf);
		});
	});
}

export function encrypt(value: string, config: Config): string {
	const { consId, consSecret, ppkCode } = config;
	if (!consId || !consSecret || !ppkCode) {
		throw new Error(`consId, consSecret, or ppkCode are not set`);
	}

	const keyPlain = consId + consSecret + ppkCode;
	const key = createHash('sha256').update(keyPlain, 'utf8').digest();
	const iv = Uint8Array.from(key.subarray(0, 16));
	const cipher = createCipheriv('aes-256-cbc', key, iv);
	let enc = cipher.update(value, 'base64', 'utf8');
	enc += cipher.final('utf8');
	return enc;
}
