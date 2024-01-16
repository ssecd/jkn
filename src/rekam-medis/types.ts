interface Coding {
	use: string;
	system: string;
	code: string;
	display: string;
}

interface Reference {
	reference: string;
	display: string;
}

export interface Composition {
	resourceType: 'Composition';
	id: string;
	status: string;
	type: {
		coding: Coding[];
		text: string;
	};
	subject: Reference;
	encounter: Reference;
	date: string;
	author: Reference[];
	title: string;
	confidentiality: string;
	section: {
		[key: string]: {
			title: string;
			code: {
				coding: Coding[];
			};
			text: {
				status: string;
				div: string;
			};
			mode: string;
			entry: Reference[];
		};
	};
}

export interface Patient {}

export interface Encounter {}

export interface MedicationRequest {}

export interface Practitioner {}

export interface Organization {}

export interface Condition {}

export interface DiagnosticReport {}

export interface Procedure {}

export interface Device {}

export interface Bundle {}
