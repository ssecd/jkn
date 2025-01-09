import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('Apotek - SEP', { timeout: 25_000 }, () => {
	it.concurrent('kunjungan() - 200 ok', async () => {
		const result = await jkn.apotek.sep.kunjungan({
			nomorSep: '0089S0020523V000001'
		});
		expect(result.metaData.code).toBe('200');
		expect(result.response?.noSep).toBe('0089S0020523V000001');
	});
});
