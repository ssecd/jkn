import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe(
	'Apotek - Obat',
	() => {
		it.concurrent('saveNonRacikan() - 201 no data provided', async () => {
			const result = await jkn.apotek.obat.saveNonRacikan({
				NOSJP: '',
				NORESEP: '',
				KDOBT: '',
				NMOBAT: '',
				SIGNA1OBT: 0,
				SIGNA2OBT: 0,
				JMLOBT: 0,
				JHO: 0,
				CatKhsObt: ''
			});
			expect(result.metaData.code).toBe('201');
		});

		it.concurrent('saveRacikan() - 201 no data provided', async () => {
			const result = await jkn.apotek.obat.saveRacikan({
				NOSJP: '',
				NORESEP: '',
				JNSROBT: '',
				KDOBT: '',
				NMOBAT: '',
				SIGNA1OBT: 0,
				SIGNA2OBT: 0,
				PERMINTAAN: 0,
				JMLOBT: 0,
				JHO: 0,
				CatKhsObt: ''
			});
			expect(result.metaData.code).toBe('201');
		});
	},
	{ timeout: 25_000 }
);
