import { describe, expect, it } from 'vitest';
import { Patient } from '../../src/rekam-medis/types';
import jkn from '../jkn';

describe(
	'RekamMedis',
	() => {
		it.concurrent('insert()', async () => {
			const result = await jkn.rekamMedis.insert<Patient>({
				bulan: 5,
				tahun: 2023,
				jenisPelayanan: '2',
				nomorSEP: '0089S0020523V000001',
				dataRekamMedis: {
					resourceType: 'Bundle',
					id: '123456',
					meta: {
						lastUpdated: '2023-05-31 10:18:35'
					},
					identifier: {
						system: 'sep',
						value: '0089S0020523V000001'
					},
					type: 'document',
					entry: [
						{
							resource: {
								resourceType: 'Patient',
								gender: 'male'
							}
						}
					]
				}
			});
			expect(result.metadata.code).toBe('200');
		});
	},
	{ timeout: 25_000 }
);
