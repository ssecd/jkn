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

	it.concurrent('optional keys', async () => {
		const originalEnv = structuredClone(process.env);

		process.env.JKN_VCLAIM_USER_KEY = 'X';
		delete process.env.JKN_APOTEK_USER_KEY;
		delete process.env.JKN_ICARE_USER_KEY;
		delete process.env.JKN_REKAM_MEDIS_USER_KEY;
		delete process.env.JKN_APLICARES_USER_KEY;

		const fetcher = new Fetcher();
		const config = await fetcher.getConfig();

		expect(config.apotekUserKey).toEqual(config.vclaimUserKey);
		expect(config.icareUserKey).toEqual(config.vclaimUserKey);
		expect(config.rekamMedisUserKey).toEqual(config.vclaimUserKey);
		expect(config.aplicaresUserKey).toEqual(config.vclaimUserKey);

		process.env = originalEnv;

		const fetcher2 = new Fetcher({ vclaimUserKey: 'Y' });
		const config2 = await fetcher2.getConfig();

		expect(config2.apotekUserKey).toEqual(config2.vclaimUserKey);
	});
});
