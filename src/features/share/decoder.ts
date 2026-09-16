import type {
  ShareDecodeResult,
  SharedCard,
  SharedDrivingLicence,
  SharedHealthCard,
  SharedIdentityCard,
  SharedLicenceCategory,
} from "./types";

export const SHARE_LIMITS = {
  encodedCharacters: 32_768,
  decodedBytes: 24_576,
  depth: 8,
  nodes: 512,
  objectKeys: 128,
  arrayItems: 64,
  stringCharacters: 8_192,
} as const;

type JsonRecord = Record<string, unknown>;

class ExcessivePayloadError extends Error {}
class MalformedPayloadError extends Error {}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOwn(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function inspectStructure(value: unknown, depth = 0, count = { nodes: 0 }) {
  count.nodes += 1;
  if (count.nodes > SHARE_LIMITS.nodes || depth > SHARE_LIMITS.depth) {
    throw new ExcessivePayloadError();
  }

  if (typeof value === "string") {
    if (value.length > SHARE_LIMITS.stringCharacters) {
      throw new ExcessivePayloadError();
    }
    return;
  }

  if (Array.isArray(value)) {
    if (value.length > SHARE_LIMITS.arrayItems) {
      throw new ExcessivePayloadError();
    }
    for (const item of value) inspectStructure(item, depth + 1, count);
    return;
  }

  if (isRecord(value)) {
    const entries = Object.entries(value);
    if (entries.length > SHARE_LIMITS.objectKeys) {
      throw new ExcessivePayloadError();
    }
    for (const [key, item] of entries) {
      if (key.length > SHARE_LIMITS.stringCharacters) {
        throw new ExcessivePayloadError();
      }
      inspectStructure(item, depth + 1, count);
    }
  }
}

function decodeBase64Utf8(queryValue: string): string {
  if (queryValue.length > SHARE_LIMITS.encodedCharacters) {
    throw new ExcessivePayloadError();
  }

  // Released versions put standard Base64 directly in the query. URL query
  // parsing converts literal `+` characters to spaces, so restore them before
  // validating. A space is not otherwise valid in a Base64 payload.
  const repaired = queryValue.replaceAll(" ", "+");
  const firstPadding = repaired.indexOf("=");
  const core = firstPadding === -1 ? repaired : repaired.slice(0, firstPadding);
  const suppliedPadding =
    firstPadding === -1 ? "" : repaired.slice(firstPadding);

  if (
    core.length === 0 ||
    !/^[A-Za-z0-9+/]+$/.test(core) ||
    (suppliedPadding !== "" && !/^=+$/.test(suppliedPadding)) ||
    core.length % 4 === 1
  ) {
    throw new MalformedPayloadError();
  }

  const canonical = core + "=".repeat((4 - (core.length % 4)) % 4);
  let binary: string;
  try {
    binary = atob(canonical);
  } catch {
    throw new MalformedPayloadError();
  }

  if (binary.length > SHARE_LIMITS.decodedBytes) {
    throw new ExcessivePayloadError();
  }

  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new MalformedPayloadError();
  }
}

function scalarText(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function requiredText(record: JsonRecord, ...keys: string[]): string {
  for (const key of keys) {
    if (!hasOwn(record, key) || record[key] === null) continue;
    const value = scalarText(record[key]);
    if (value !== null) return value;
    throw new MalformedPayloadError();
  }
  throw new MalformedPayloadError();
}

function optionalText(record: JsonRecord, ...keys: string[]): string | null {
  for (const key of keys) {
    if (!hasOwn(record, key) || record[key] === null) continue;
    const value = scalarText(record[key]);
    if (value !== null) return value;
    throw new MalformedPayloadError();
  }
  return null;
}

function normaliseHealthCard(
  record: JsonRecord,
  format: SharedHealthCard["format"],
): SharedHealthCard {
  const compact = format === "compact";
  return {
    kind: "TS",
    format,
    fiscalCode: requiredText(record, compact ? "cF" : "codiceFiscale"),
    sex: requiredText(record, compact ? "s" : "sesso"),
    surname: requiredText(record, compact ? "c" : "cognome"),
    givenName: requiredText(record, compact ? "n" : "nome"),
    birthPlace: requiredText(record, compact ? "l" : "luogoDiNascita"),
    birthProvince: requiredText(record, compact ? "p" : "provincia"),
    birthDate: requiredText(record, compact ? "dN" : "dataDiNascita"),
    expiryDate: optionalText(record, compact ? "dS" : "dataDiScadenza"),
    institutionNumber: optionalText(
      record,
      compact ? "nI" : "numeroIstituzione",
    ),
    cardNumber: optionalText(record, compact ? "nT" : "numeroTessera"),
  };
}

function normaliseIdentityCard(record: JsonRecord): SharedIdentityCard {
  return {
    kind: "CIE",
    format: "compact",
    fiscalCode: requiredText(record, "cF"),
    surname: requiredText(record, "c"),
    givenName: requiredText(record, "n"),
    birthPlace: requiredText(record, "l", "lN"),
    birthProvince: requiredText(record, "p"),
    birthDate: requiredText(record, "dN"),
    sex: requiredText(record, "s"),
    issuingMunicipality: optionalText(record, "com"),
    nationality: optionalText(record, "nz"),
    serialNumber: optionalText(record, "nS"),
    height: optionalText(record, "st"),
    issueDate: optionalText(record, "dE"),
    expiryDate: optionalText(record, "dS"),
    cardAccessNumber: optionalText(record, "cAN"),
    parentsOrGuardians: optionalText(record, "cNG"),
    residenceAddress: optionalText(record, "iR"),
    birthCertificateDetails: optionalText(record, "eAN"),
    mrz: optionalText(record, "m"),
  };
}

function normaliseCategories(value: unknown): SharedLicenceCategory[] {
  if (value === undefined || value === null || value === "") return [];
  if (typeof value !== "string") throw new MalformedPayloadError();

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new MalformedPayloadError();
  }
  inspectStructure(parsed);
  if (!Array.isArray(parsed)) throw new MalformedPayloadError();

  return parsed.map((entry) => {
    if (!isRecord(entry)) throw new MalformedPayloadError();
    return {
      type: requiredText(entry, "t"),
      issueDate: optionalText(entry, "dR"),
      expiryDate: optionalText(entry, "dS"),
      codes: optionalText(entry, "c"),
    };
  });
}

function normaliseDrivingLicence(record: JsonRecord): SharedDrivingLicence {
  return {
    kind: "P",
    format: "compact",
    surname: requiredText(record, "c"),
    givenName: requiredText(record, "n"),
    licenceNumber: requiredText(record, "nP"),
    birthDate: optionalText(record, "dN"),
    birthPlace: optionalText(record, "l"),
    birthProvince: optionalText(record, "p"),
    issueDate: optionalText(record, "dR"),
    expiryDate: optionalText(record, "dS"),
    issuingAuthority: optionalText(record, "rD"),
    codes: optionalText(record, "cod"),
    categories: normaliseCategories(record.dP),
    managementField: optionalText(record, "gP"),
  };
}

function normaliseCard(record: JsonRecord): ShareDecodeResult {
  const rawType = hasOwn(record, "t") ? record.t : undefined;
  if (rawType !== undefined && rawType !== null && typeof rawType !== "string") {
    return { status: "malformed" };
  }

  const type = typeof rawType === "string" ? rawType.toUpperCase() : "TS";
  if (type === "GP") return { status: "unsupported", legacy: true };
  if (type !== "TS" && type !== "CIE" && type !== "P") {
    return { status: "unsupported", legacy: false };
  }

  let card: SharedCard;
  if (type === "TS") {
    const legacyFull = !hasOwn(record, "cF") && hasOwn(record, "codiceFiscale");
    card = normaliseHealthCard(record, legacyFull ? "legacy-full" : "compact");
  } else if (type === "CIE") {
    card = normaliseIdentityCard(record);
  } else {
    card = normaliseDrivingLicence(record);
  }
  return { status: "valid", card };
}

export function decodeSharedCard(
  queryValue: string | null | undefined,
): ShareDecodeResult {
  if (queryValue === null || queryValue === undefined) {
    return { status: "missing" };
  }
  if (queryValue === "") return { status: "malformed" };

  try {
    const json = decodeBase64Utf8(queryValue);
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { status: "malformed" };
    }
    inspectStructure(parsed);
    if (!isRecord(parsed)) return { status: "malformed" };
    return normaliseCard(parsed);
  } catch (error) {
    if (error instanceof ExcessivePayloadError) return { status: "too-large" };
    return { status: "malformed" };
  }
}
