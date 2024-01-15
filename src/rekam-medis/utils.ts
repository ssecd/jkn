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

export function encrypt(value: string, plainKey: string): string {
	const key = createHash('sha256').update(plainKey, 'utf8').digest();
	const iv = Uint8Array.from(key.subarray(0, 16));
	const cipher = createCipheriv('aes-256-cbc', key, iv);
	const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
	return encrypted.toString('base64');
}
