import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe(
	'Aplicares',
	() => {
		it.concurrent('refKamar()', async () => {
			const { response, metadata } = await jkn.aplicares.refKamar();
			expect(response?.list.length).toBe(metadata.totalitems);
		});
	},
	{ timeout: 25_000 }
);
