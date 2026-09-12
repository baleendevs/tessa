export type SharedCardKind = "TS" | "CIE" | "P";
export type SharedCardFormat = "compact" | "legacy-full";

type SharedCardBase = {
  kind: SharedCardKind;
  format: SharedCardFormat;
  surname: string;
  givenName: string;
};

export type SharedHealthCard = SharedCardBase & {
  kind: "TS";
  fiscalCode: string;
  sex: string;
  birthPlace: string;
  birthProvince: string;
  birthDate: string;
  expiryDate: string | null;
  institutionNumber: string | null;
  cardNumber: string | null;
};

export type SharedIdentityCard = SharedCardBase & {
  kind: "CIE";
  fiscalCode: string;
  birthPlace: string;
  birthProvince: string;
  birthDate: string;
  sex: string;
  issuingMunicipality: string | null;
  nationality: string | null;
  serialNumber: string | null;
  height: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  cardAccessNumber: string | null;
  parentsOrGuardians: string | null;
  residenceAddress: string | null;
  birthCertificateDetails: string | null;
  mrz: string | null;
};

export type SharedLicenceCategory = {
  type: string;
  issueDate: string | null;
  expiryDate: string | null;
  codes: string | null;
};

export type SharedDrivingLicence = SharedCardBase & {
  kind: "P";
  licenceNumber: string;
  birthDate: string | null;
  birthPlace: string | null;
  birthProvince: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  issuingAuthority: string | null;
  codes: string | null;
  categories: SharedLicenceCategory[];
  managementField: string | null;
};

export type SharedCard =
  | SharedHealthCard
  | SharedIdentityCard
  | SharedDrivingLicence;

export type ShareDecodeResult =
  | { status: "valid"; card: SharedCard }
  | { status: "missing" }
  | { status: "malformed" }
  | { status: "too-large" }
  | { status: "unsupported"; legacy: boolean };
