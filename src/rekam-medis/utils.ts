import { createCipheriv, createHash } from 'node:crypto';
import zlib from 'node:zlib';

export async function gzip(value: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		zlib.gzip(value, (err, buf) => {
			if (err) reject(err);
			else resolve(buf);
		});
	});
}

export function encrypt(value: string, keyCombinations: string[]): string {
	if (keyCombinations.some((k) => !k)) {
		throw new Error(`consId, consSecret, or ppkCode are not set`);
	}

	const keyPlain = keyCombinations.join('');
	const key = createHash('sha256').update(keyPlain, 'utf8').digest();
	const iv = Uint8Array.from(key.subarray(0, 16));
	const cipher = createCipheriv('aes-256-cbc', key, iv);
	let enc = cipher.update(value, 'utf8', 'base64');
	enc += cipher.final('base64');
	return enc;
}
