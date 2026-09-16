import { describe, expect, it } from "vitest";
import { decodeSharedCard } from "../../src/features/share/decoder";
import {
  compactHealthCard,
  compactIdentityCard,
  drivingLicence,
  encodeFixture,
  invalidShareFixtures,
  legacyAliasIdentityCard,
  nullableDrivingLicence,
  nullableIdentityCard,
  releasedFullKeyHealthCard,
  unicodeHealthCard,
  validShareFixtures,
} from "../fixtures/share/fixture-contract";

describe("decodeSharedCard", () => {
  it.each(validShareFixtures)("decodes $name", (fixture) => {
    const result = decodeSharedCard(fixture.queryValue);
    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.card.kind).toBe(fixture.expectedKind);
    }
  });

  it.each(invalidShareFixtures)("returns $expectedStatus for $name", (fixture) => {
    const result = decodeSharedCard(fixture.queryValue);
    expect(result.status).toBe(fixture.expectedStatus);
  });

  it("decodes UTF-8 without corrupting non-ASCII values", () => {
    const result = decodeSharedCard(encodeFixture(unicodeHealthCard));
    expect(result).toMatchObject({
      status: "valid",
      card: {
        kind: "TS",
        surname: "D’Àuria",
        givenName: "Zoë 🚲",
        birthPlace: "Città Sant’Elia",
      },
    });
  });

  it("repairs plus signs converted to spaces by query parsing", () => {
    const encoded = encodeFixture(unicodeHealthCard);
    expect(encoded).toContain("+");
    expect(decodeSharedCard(encoded.replaceAll("+", " "))).toEqual(
      decodeSharedCard(encoded),
    );
  });

  it("accepts long but bounded UTF-8 field values", () => {
    const longPlace = "Località di prova — ".repeat(180);
    const result = decodeSharedCard(
      encodeFixture({ ...compactHealthCard, l: longPlace }),
    );

    expect(result).toMatchObject({
      status: "valid",
      card: { kind: "TS", birthPlace: longPlace },
    });
  });

  it("rejects a valid JSON object with an invalid field shape", () => {
    expect(
      decodeSharedCard(
        encodeFixture({ ...compactHealthCard, c: ["not", "text"] }),
      ),
    ).toEqual({ status: "malformed" });
  });

  it("normalises current Tessera Sanitaria fields and ignores unknown keys", () => {
    const result = decodeSharedCard(encodeFixture(compactHealthCard));
    expect(result).toEqual({
      status: "valid",
      card: {
        kind: "TS",
        format: "compact",
        fiscalCode: compactHealthCard.cF,
        sex: compactHealthCard.s,
        surname: compactHealthCard.c,
        givenName: compactHealthCard.n,
        birthPlace: compactHealthCard.l,
        birthProvince: compactHealthCard.p,
        birthDate: compactHealthCard.dN,
        expiryDate: compactHealthCard.dS,
        institutionNumber: compactHealthCard.nI,
        cardNumber: compactHealthCard.nT,
      },
    });
  });

  it("restores released full-key health-card compatibility without internal fields", () => {
    const result = decodeSharedCard(encodeFixture(releasedFullKeyHealthCard));
    expect(result).toMatchObject({
      status: "valid",
      card: {
        kind: "TS",
        format: "legacy-full",
        fiscalCode: releasedFullKeyHealthCard.codiceFiscale,
        institutionNumber: "12345",
      },
    });
    if (result.status === "valid") {
      expect(result.card).not.toHaveProperty("note");
      expect(result.card).not.toHaveProperty("dataDiAggiunta");
      expect(result.card).not.toHaveProperty("ultimoUtilizzo");
      expect(result.card).not.toHaveProperty("numeroDiUtilizzi");
    }
  });

  it("supports the CIE place alias and prefers the current key", () => {
    expect(decodeSharedCard(encodeFixture(legacyAliasIdentityCard))).toMatchObject({
      status: "valid",
      card: { kind: "CIE", birthPlace: "Luogo Storico" },
    });
    expect(
      decodeSharedCard(
        encodeFixture({
          ...legacyAliasIdentityCard,
          l: "Luogo Corrente",
        }),
      ),
    ).toMatchObject({
      status: "valid",
      card: { kind: "CIE", birthPlace: "Luogo Corrente" },
    });
  });

  it("keeps nullable CIE fields as null and numeric height as text", () => {
    expect(decodeSharedCard(encodeFixture(nullableIdentityCard))).toMatchObject({
      status: "valid",
      card: {
        kind: "CIE",
        issuingMunicipality: null,
        nationality: null,
        serialNumber: null,
        height: null,
      },
    });
    expect(decodeSharedCard(encodeFixture(compactIdentityCard))).toMatchObject({
      status: "valid",
      card: {
        kind: "CIE",
        fiscalCode: compactIdentityCard.cF,
        surname: compactIdentityCard.c,
        givenName: compactIdentityCard.n,
        birthPlace: compactIdentityCard.l,
        birthProvince: compactIdentityCard.p,
        birthDate: compactIdentityCard.dN,
        sex: compactIdentityCard.s,
        issuingMunicipality: compactIdentityCard.com,
        nationality: compactIdentityCard.nz,
        serialNumber: compactIdentityCard.nS,
        height: "172",
        issueDate: compactIdentityCard.dE,
        expiryDate: compactIdentityCard.dS,
        cardAccessNumber: compactIdentityCard.cAN,
        parentsOrGuardians: compactIdentityCard.cNG,
        residenceAddress: compactIdentityCard.iR,
        birthCertificateDetails: compactIdentityCard.eAN,
        mrz: compactIdentityCard.m,
      },
    });
  });

  it("decodes nested driving-licence categories", () => {
    expect(decodeSharedCard(encodeFixture(drivingLicence))).toMatchObject({
      status: "valid",
      card: {
        kind: "P",
        surname: drivingLicence.c,
        givenName: drivingLicence.n,
        licenceNumber: drivingLicence.nP,
        birthDate: drivingLicence.dN,
        birthPlace: drivingLicence.l,
        birthProvince: drivingLicence.p,
        issueDate: drivingLicence.dR,
        expiryDate: drivingLicence.dS,
        issuingAuthority: drivingLicence.rD,
        codes: drivingLicence.cod,
        managementField: drivingLicence.gP,
        categories: [
          {
            type: "B",
            issueDate: "01/06/2021",
            expiryDate: "01/06/2031",
            codes: "01",
          },
          { type: "AM", issueDate: null, expiryDate: null, codes: null },
        ],
      },
    });
  });

  it("accepts nullable and empty driving-licence fields", () => {
    expect(decodeSharedCard(encodeFixture(nullableDrivingLicence))).toMatchObject({
      status: "valid",
      card: {
        kind: "P",
        birthDate: null,
        codes: "",
        categories: [],
      },
    });
  });

  it("marks Green Pass as legacy rather than treating it as a health card", () => {
    expect(
      decodeSharedCard(encodeFixture({ t: "GP", r: "fixture-certificate" })),
    ).toEqual({ status: "unsupported", legacy: true });
  });

  it("does not reinterpret Base64url as the released standard-Base64 format", () => {
    expect(decodeSharedCard("eyJ0IjoiVFMifQ-_")).toEqual({
      status: "malformed",
    });
  });
});
