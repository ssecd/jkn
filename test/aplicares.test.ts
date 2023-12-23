import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe(
	'Aplicares',
	() => {
		it.concurrent('refKamar()', async () => {
			const { response, metadata } = await jkn.aplicares.refKamar();
			expect(response?.list.length).toBe(metadata.totalitems);
		});

		it.concurrent('read()', async () => {
			const { response, metadata } = await jkn.aplicares.read({ start: 1, limit: 2 });
			console.log(metadata, response);
			expect(1).toBe(1);
		});
	},
	{ timeout: 25_000 }
);
