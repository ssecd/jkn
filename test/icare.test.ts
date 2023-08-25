import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe(
	'ICare',
	() => {
		it.concurrent('fkrtl()', async () => {
			const result = await jkn.icare.fkrtl({
				param: '0002084717968',
				kodedokter: 292667
			});
			expect(result.metaData.code).toBe(200);
			expect(result.response?.url).not.toBeFalsy();
			expect(result.response?.url).contains('?token=');
		});

		it.concurrent('fktp()', async () => {
			const result = await jkn.icare.fktp({
				param: '0002084717968'
			});
			expect(result.metaData.code).toBe(200);
			expect(result.response?.url).not.toBeFalsy();
		});
	},
	{ timeout: 25_000 }
);
