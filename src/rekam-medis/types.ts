/*
 * Unfortunately, we are unable to fully utilize `@types/fhir` here because BPJS
 * TrustMark does not seem to be adhering to the standard FHIR implementation.
 */

export interface Composition extends Omit<fhir4.Composition, 'section'> {
	section: {
		[key: string]: Omit<fhir4.CompositionSection, 'entry'> & { entry: string };
	};
}

export interface Patient extends fhir4.Patient {}

export interface Encounter extends fhir4.Encounter {
	subject: fhir4.Reference & { noSep: string };
	incomingReferral: { identifier: fhir4.Identifier[] }[];
	reason: fhir4.CodeableConcept[];
	diagnosis?:
		| (fhir4.EncounterDiagnosis & {
				condition: fhir4.Reference & { role: fhir4.CodeableConcept; rank: number };
		  })[]
		| undefined;
	hospitalization:
		| (fhir4.EncounterHospitalization & {
				dischargeDisposition?: fhir4.CodeableConcept[] | undefined;
		  })
		| undefined;
}

export interface MedicationRequest extends Omit<
	fhir4.MedicationRequest,
	'identifier' | 'intent' | 'dosageInstruction' | 'requester'
> {
	identifier?: fhir4.Identifier;
	intent: fhir4.MedicationRequest['intent'] | 'final';
	dosageInstruction?: (Omit<fhir4.Dosage, 'timing'> & {
		doseQuantity: Omit<fhir4.Quantity, 'value'> & { value: string };
		timing: {
			repeat: { frequency: string; periodUnit: string; period: number };
		};
	})[];
	requester: {
		agent: fhir4.Reference;
		onBehalfOf: fhir4.Reference;
	};
}

export interface Practitioner extends fhir4.Practitioner {}

export interface Organization extends fhir4.Organization {}

export interface Condition extends Omit<fhir4.Condition, 'clinicalStatus' | 'verificationStatus'> {
	clinicalStatus: string;
	verificationStatus: string;
}

interface Observation extends Omit<
	fhir4.Observation,
	'performer' | 'code' | 'interpretation' | 'referenceRange' | 'valueQuantity'
> {
	performer?: fhir4.Reference;
	code?: { coding: fhir4.Coding; text: string };
	image: {
		comment: string;
		link: {
			reference: string;
			display: string;
		};
	}[];
	conclusion?: string;
	interpretation: Omit<fhir4.CodeableConcept, 'coding'> & { coding: fhir4.Coding };
	referenceRange: fhir4.ObservationReferenceRange;
	valueQuantity: Omit<fhir4.Quantity, 'value'> & { value: string };
}

export interface DiagnosticReport extends Omit<
	fhir4.DiagnosticReport,
	'category' | 'result' | 'code'
> {
	subject: fhir4.Reference & { noSep: string };
	category?: {
		coding: fhir4.Coding;
	};
	result?: Observation[];
	code?: fhir4.CodeableConcept;
}

export interface Procedure extends fhir4.Procedure {
	context: fhir4.Reference;
	performer: (fhir4.ProcedurePerformer & { role: fhir4.CodeableConcept })[];
}

export interface Device extends fhir4.Device {
	model: string;
}

export interface MRBundle extends fhir4.Bundle<
	| Composition
	| Patient
	| Encounter
	| Practitioner
	| Organization
	| Condition
	| Array<MedicationRequest | DiagnosticReport | Procedure | Device>
> {}
