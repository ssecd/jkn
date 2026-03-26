import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('PCare - Partial Request', { timeout: 25_000 }, () => {
	interface PCareDiagnosa {
		count: number;
		list: {
			kdDiag: string;
			nmDiag: string;
			nonSpesialis: boolean;
		}[];
	}

	it.concurrent('api() - 200 ok', async () => {
		const result = await jkn.pcare.api.request<PCareDiagnosa>({
			path: `/diagnosa/A00/1/5`,
			method: 'GET'
		});
		expect(result.metaData.code).toBe(200);
	});
});
