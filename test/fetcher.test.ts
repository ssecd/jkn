import { describe, expect, it } from 'vitest';
import { Fetcher, normalizePath } from '../src/fetcher';

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

	it.concurrent('optional config keys', async () => {
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

describe('normalizePath', () => {
	it('throws when path not starts with /', () => {
		expect(() => normalizePath('users/:id' as `/`)).toThrowError('Path must start with "/"');
		expect(() => normalizePath(['users/:id' as `/`, {}])).toThrowError('Path must start with "/"');
	});

	it('replaces required params', () => {
		expect(normalizePath(['/users/:id', { id: '123' }])).toBe('/users/123');
	});

	it('throws when required param is missing', () => {
		expect(() => normalizePath(['/users/:id', {}])).toThrowError('Missing params: id');
	});

	it('supports optional param using :param? when provided', () => {
		expect(normalizePath(['/users/:id/:group?', { id: '123', group: 5 }])).toBe('/users/123/5');
	});

	it('removes optional segment when missing', () => {
		expect(normalizePath(['/users/:id/:group?', { id: '123' }])).toBe('/users/123');
	});

	it('treats undefined/null as missing (optional removed)', () => {
		expect(normalizePath(['/users/:id/:group?', { id: '123', group: undefined }])).toBe(
			'/users/123'
		);
		expect(normalizePath(['/users/:id/:group?', { id: '123', group: null }])).toBe('/users/123');
	});

	it('encodes unsafe characters', () => {
		expect(normalizePath(['/search/:q', { q: 'hello world' }])).toBe('/search/hello%20world');
		expect(normalizePath(['/tags/:t', { t: 'a/b' }])).toBe('/tags/a%2Fb');
	});

	it('does not double-encode if value is already encoded', () => {
		expect(normalizePath(['/search/:q', { q: 'hello%20world' }])).toBe('/search/hello%20world');
		expect(normalizePath(['/p/:x', { x: 'a%2Fb' }])).toBe('/p/a%2Fb');
	});

	it("encodes '%' safely if value is not valid percent-encoding", () => {
		// decodeURIComponent("100%") throws => fallback branch should encode it
		expect(normalizePath(['/discount/:v', { v: '100%' }])).toBe('/discount/100%25');
	});

	it('supports multiple params in one path', () => {
		expect(normalizePath(['/orgs/:org/users/:id', { org: 'acme', id: 7 }])).toBe(
			'/orgs/acme/users/7'
		);
	});

	it('replaces same param name multiple times', () => {
		expect(normalizePath(['/compare/:id/vs/:id', { id: 'x' }])).toBe('/compare/x/vs/x');
	});

	it('keeps path unchanged when there are no :params', () => {
		expect(normalizePath(['/health', { anything: 'x' }])).toBe('/health');
	});

	it('does not swallow other segments when optional is in the middle', () => {
		expect(normalizePath(['/a/:x?/b', { x: '1' }])).toBe('/a/1/b');
		expect(normalizePath(['/a/:x?/b', { x: undefined }])).toBe('/a/b');
	});

	it('does not treat 0 as missing', () => {
		expect(normalizePath(['/page/:n', { n: 0 }])).toBe('/page/0');
	});

	it('accept single string path param', () => {
		expect(normalizePath('/a')).toBe('/a');
	});
});
