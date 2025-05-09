import { describe, expect, it } from 'vitest';
import jkn from '../jkn';

describe('RekamMedis', { timeout: 25_000 }, () => {
	it.concurrent('insert()', async () => {
		const result = await jkn.rekamMedis.insert({
			bulan: 5,
			tahun: 2023,
			jenisPelayanan: '2',
			nomorSEP: process.env.TEST_SEP_NUM!,
			debug: 'file',
			dataRekamMedis: {
				resourceType: 'Bundle',
				id: '123456',
				meta: {
					lastUpdated: '2023-05-31 10:18:35'
				},
				identifier: {
					system: 'sep',
					value: process.env.TEST_SEP_NUM!
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
									value: process.env.TEST_RM_NUM!,
									assigner: {
										display: process.env.TEST_FASKES_NAME!
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
									value: process.env.TEST_PATIENT_JKN_CARD_NUM!,
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
									value: process.env.TEST_PATIENT_NIK!,
									assigner: {
										display: 'KEMENDAGRI'
									}
								}
							],
							name: [
								{
									use: 'official',
									text: process.env.TEST_PATIENT_NAME
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
									value: process.env.TEST_PATIENT_PHONE
								}
							]
						}
					}
				]
			}
		});
		expect(result.metadata.code).toBe('200');
	});
});
