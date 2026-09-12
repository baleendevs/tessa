import { SHARE_LIMITS } from "../../../src/features/share/decoder";
import type {
  ShareDecodeResult,
  SharedCardKind,
} from "../../../src/features/share/types";

export type ValidShareFixture = {
  name: string;
  queryValue: string;
  expectedKind: SharedCardKind;
};

export type InvalidShareFixture = {
  name: string;
  queryValue: string | null;
  expectedStatus: Exclude<ShareDecodeResult["status"], "valid">;
};

export function encodeFixture(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

export const compactHealthCard = {
  t: "TS",
  cF: "TSTPLA80A01H000X",
  s: "F",
  c: "Esempio",
  n: "Paola",
  l: "Città Prova",
  p: "TP",
  dN: "01/01/1980",
  dS: "31/12/2030",
  nI: "ENTE-PROVA-001",
  nT: "00000000000000000000",
  ignoredFutureField: "not rendered",
} as const;

export const unicodeHealthCard = {
  t: "ts",
  cF: "TSTZOE90B02H000Y",
  s: "F",
  c: "D’Àuria",
  n: "Zoë 🚲",
  l: "Città Sant’Elia",
  p: "EE",
  dN: "02/02/1990",
} as const;

export const compactHealthCardWithoutType = {
  cF: "TSTLCA70C03H000Z",
  s: "M",
  c: "Collaudo",
  n: "Luca",
  l: "Borgo Test",
  p: "BT",
  dN: "03/03/1970",
} as const;

export const releasedFullKeyHealthCard = {
  codiceFiscale: "TSTANT60D04H000W",
  sesso: "F",
  cognome: "Storica",
  nome: "Anna",
  luogoDiNascita: "Paese Demo",
  provincia: "PD",
  dataDiNascita: "04/04/1960",
  dataDiScadenza: "04/04/2030",
  numeroIstituzione: 12345,
  numeroTessera: "11111111111111111111",
  note: "internal fixture note — must never be rendered",
  dataDiAggiunta: 1600000000000,
  ultimoUtilizzo: 1600000000001,
  numeroDiUtilizzi: 7,
} as const;

export const compactIdentityCard = {
  t: "CIE",
  cF: "TSTGDA85E05H000V",
  c: "Guida",
  n: "Ada",
  l: "Località Demo",
  p: "LD",
  dN: "05.05.1985",
  s: "F",
  com: "Comune Campione",
  nz: "ITA",
  nS: "CA00000ZZ",
  st: 172,
  dE: "05.05.2020",
  dS: "05.05.2030",
  cAN: "123456",
  cNG: "Persona Uno, Persona Due",
  iR: "Via del Collaudo 1",
  eAN: "00000.0.Z00",
  m: "IDITACA00000ZZ<<<<<<<<<<<<<<<\n8505050F3005050ITA<<<<<<<<<<<0",
} as const;

export const nullableIdentityCard = {
  t: "cie",
  cF: "TSTMRA88F06H000U",
  c: "Nullabile",
  n: "Mara",
  l: "Città Fittizia",
  p: "CF",
  dN: "06.06.1988",
  s: "F",
  com: null,
  nz: null,
  nS: null,
  st: null,
  dE: null,
  dS: null,
  cAN: null,
  cNG: null,
  iR: null,
  eAN: null,
  m: null,
} as const;

export const legacyAliasIdentityCard = {
  t: "CiE",
  cF: "TSTNCL82G07H000T",
  c: "Alias",
  n: "Nicola",
  lN: "Luogo Storico",
  p: "LS",
  dN: "07.07.1982",
  s: "M",
  com: null,
  nz: null,
} as const;

export const drivingLicence = {
  t: "P",
  c: "Categoria",
  n: "Elena",
  nP: "PX0000000Q",
  dN: "08/08/1992",
  l: "Centro Prova",
  p: "CP",
  dR: "01/06/2021",
  dS: "01/06/2031",
  rD: "AUTORITÀ DEMO",
  cod: "01",
  dP: JSON.stringify([
    { t: "B", dR: "01/06/2021", dS: "01/06/2031", c: "01" },
    { t: "AM", dR: null, dS: null, c: null },
  ]),
  gP: "CAMPO-DEMO",
} as const;

export const nullableDrivingLicence = {
  t: "p",
  c: "Minima",
  n: "Iris",
  nP: "PX0000001R",
  dN: null,
  l: null,
  p: null,
  dR: null,
  dS: null,
  rD: null,
  cod: "",
  dP: null,
  gP: null,
} as const;

const unicodeEncoded = encodeFixture(unicodeHealthCard);

export const validShareFixtures: ValidShareFixture[] = [
  {
    name: "current compact Tessera Sanitaria",
    queryValue: encodeFixture(compactHealthCard),
    expectedKind: "TS",
  },
  {
    name: "compact Tessera Sanitaria without a type",
    queryValue: encodeFixture(compactHealthCardWithoutType),
    expectedKind: "TS",
  },
  {
    name: "released full-key Tessera Sanitaria",
    queryValue: encodeFixture(releasedFullKeyHealthCard),
    expectedKind: "TS",
  },
  {
    name: "current compact CIE",
    queryValue: encodeFixture(compactIdentityCard),
    expectedKind: "CIE",
  },
  {
    name: "CIE with explicit nullable values",
    queryValue: encodeFixture(nullableIdentityCard),
    expectedKind: "CIE",
  },
  {
    name: "CIE using the legacy lN alias",
    queryValue: encodeFixture(legacyAliasIdentityCard),
    expectedKind: "CIE",
  },
  {
    name: "driving licence with nested categories",
    queryValue: encodeFixture(drivingLicence),
    expectedKind: "P",
  },
  {
    name: "driving licence with nullable values",
    queryValue: encodeFixture(nullableDrivingLicence),
    expectedKind: "P",
  },
  {
    name: "UTF-8 payload",
    queryValue: unicodeEncoded,
    expectedKind: "TS",
  },
  {
    name: "omitted Base64 padding",
    queryValue: encodeFixture(compactHealthCard).replace(/=+$/, ""),
    expectedKind: "TS",
  },
  {
    name: "irregular trailing Base64 padding",
    queryValue: `${encodeFixture(compactHealthCard).replace(/=+$/, "")}====`,
    expectedKind: "TS",
  },
  {
    name: "query-decoded spaces restored to plus signs",
    queryValue: unicodeEncoded.replaceAll("+", " "),
    expectedKind: "TS",
  },
];

const deeplyNested = {
  ...compactHealthCard,
  future: { a: { b: { c: { d: { e: { f: { g: { h: "too deep" } } } } } } } },
};

export const invalidShareFixtures: InvalidShareFixture[] = [
  { name: "missing payload", queryValue: null, expectedStatus: "missing" },
  { name: "empty payload", queryValue: "", expectedStatus: "malformed" },
  {
    name: "invalid Base64",
    queryValue: "not-base64!",
    expectedStatus: "malformed",
  },
  {
    name: "malformed JSON",
    queryValue: Buffer.from("{", "utf8").toString("base64"),
    expectedStatus: "malformed",
  },
  {
    name: "invalid UTF-8",
    queryValue: Buffer.from([0xff]).toString("base64"),
    expectedStatus: "malformed",
  },
  {
    name: "non-object JSON",
    queryValue: encodeFixture([compactHealthCard]),
    expectedStatus: "malformed",
  },
  {
    name: "missing required field",
    queryValue: encodeFixture({ ...compactHealthCard, cF: null }),
    expectedStatus: "malformed",
  },
  {
    name: "invalid nested licence categories",
    queryValue: encodeFixture({ ...drivingLicence, dP: "not-json" }),
    expectedStatus: "malformed",
  },
  {
    name: "unsupported document type",
    queryValue: encodeFixture({ t: "FUTURE", n: "Test" }),
    expectedStatus: "unsupported",
  },
  {
    name: "legacy Green Pass",
    queryValue: encodeFixture({ t: "GP", r: "fixture-certificate" }),
    expectedStatus: "unsupported",
  },
  {
    name: "excessive encoded payload",
    queryValue: "A".repeat(SHARE_LIMITS.encodedCharacters + 1),
    expectedStatus: "too-large",
  },
  {
    name: "excessive nesting",
    queryValue: encodeFixture(deeplyNested),
    expectedStatus: "too-large",
  },
  {
    name: "excessive nested category count",
    queryValue: encodeFixture({
      ...drivingLicence,
      dP: JSON.stringify(
        Array.from({ length: SHARE_LIMITS.arrayItems + 1 }, (_, index) => ({
          t: `F${index}`,
        })),
      ),
    }),
    expectedStatus: "too-large",
  },
];
