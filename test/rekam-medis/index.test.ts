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
								active: true,
								identifier: [
									{
										use: 'usual',
										type: {
											coding: [
												{
													system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
													code: 'MR'
												}
											]
										},
										value: '010038',
										assigner: {
											display: 'KU MATA SILAMPARI SRIWIJAYA EC'
										}
									},
									{
										use: 'official',
										type: {
											coding: [
												{
													system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
													code: 'MB'
												}
											]
										},
										value: '0002084717968',
										assigner: {
											display: 'BPJS KESEHATAN'
										}
									},
									{
										use: 'official',
										type: {
											coding: [
												{
													system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
													code: 'NNIDN'
												}
											]
										},
										value: '3301097112650109',
										assigner: {
											display: 'KEMENDAGRI'
										}
									}
								],
								name: [
									{
										use: 'official',
										text: 'KERIYAH'
									}
								],
								gender: 'female',
								birthDate: '1966-01-22',
								maritalStatus: {
									coding: [
										{
											system: 'http://hl7.org/fhir/ValueSet/marital-status',
											code: 'W'
										}
									]
								},
								telecom: [
									{
										system: 'phone',
										use: 'mobile',
										value: '089695791118'
									}
								]
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
