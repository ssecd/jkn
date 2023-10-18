export interface MRBundle {
	resourceType: string;
	id: string;
	meta: { lastUpdated: Date };
	identifier: {
		system: string;
		value: string;
	};
	type: string;
	entry: {
		resource: {
			resourceType: string;
			id: string;
			status: string;
			type: {
				coding: {
					system: string;
					code: string;
				}[];
				text: string;
			};
			subject: {
				reference: string;
				display: string;
			};
			encounter: { reference: string };
			/** date with time. example: 2018-12-31 17:08:43 */
			date: string;
			author: {
				reference: string;
				display: string;
			}[];
			title: string;
			confidentiality: string;
			section: {
				title: string;
				code: {
					coding: {
						system: string;
						code: string;
						display: string;
					}[];
				};
				text: {
					status: string;
					div: string;
				};
				entry?: { reference: string }[];
				mode?: string;
			}[];
		};
	}[];
}

export interface Composition {}

export interface Patient {}

export interface Encounter {}

export interface MedicationRequest {}

export interface Practitioner {}

export interface Organization {}

export interface Condition {}

export interface DiagnosticReport {}

export interface Procedure {}

export interface Device {}

export type RekamMedisFormat =
	| MRBundle
	| Composition
	| Patient
	| Encounter
	| MedicationRequest
	| Practitioner
	| Organization
	| Condition
	| DiagnosticReport
	| Procedure
	| Device;
