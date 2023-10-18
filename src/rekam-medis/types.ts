export interface Bundle<T = fhir5.FhirResource> extends fhir5.Bundle<T> {}

export interface Composition extends fhir5.Composition {}

export interface Patient extends fhir5.Patient {}

export interface Encounter extends fhir5.Encounter {
	subject?: fhir5.Encounter['subject'] & { noSep: string };
}

export interface MedicationRequest extends fhir5.MedicationRequest {}

export interface Practitioner extends fhir5.Practitioner {}

export interface Organization extends fhir5.Organization {}

export interface Condition extends fhir5.Condition {}

export interface DiagnosticReport extends fhir5.DiagnosticReport {}

export interface Procedure extends fhir5.Procedure {}

export interface Device extends fhir5.Device {}

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
