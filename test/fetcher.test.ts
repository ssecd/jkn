import { describe, expect, it } from 'vitest';
import { Fetcher } from '../src/fetcher';

describe('Fetcher', () => {
	it.concurrent('validate config', async () => {
		const userConfig = {
			ppkCode: '12345',
			baseUrls: {
				pcare: {
					development: 'http://dev.example.com',
					production: 'http://example.com'
				}
			}
		};
		const fetcher = new Fetcher(userConfig);
		const config = await fetcher.getConfig();

		expect(config.ppkCode).toBe(userConfig.ppkCode);
		expect(config.baseUrls.pcare).toEqual(userConfig.baseUrls.pcare);
		expect(config.baseUrls.pcare?.development).toBe(userConfig.baseUrls.pcare.development);
		expect(config.baseUrls.vclaim?.development).toBe(
			'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev'
		);
	});
});
