export interface Bundle<T = fhir4.FhirResource> extends fhir4.Bundle<T> {}

export interface Composition extends fhir4.Composition {}

export interface Patient extends fhir4.Patient {}

export interface Encounter extends fhir4.Encounter {
	subject?: fhir4.Encounter['subject'] & { noSep: string };
}

export interface MedicationRequest extends fhir4.MedicationRequest {}

export interface Practitioner extends fhir4.Practitioner {}

export interface Organization extends fhir4.Organization {}

export interface Condition extends fhir4.Condition {}

export interface DiagnosticReport extends fhir4.DiagnosticReport {}

export interface Procedure extends fhir4.Procedure {}

export interface Device extends fhir4.Device {}

export type RekamMedisFormat =
	| Bundle
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
