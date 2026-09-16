import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import { assetPath } from "@/lib/site";
import type {
  SharedCard,
  SharedDrivingLicence,
  SharedHealthCard,
  SharedIdentityCard,
} from "./types";

type PreviewProps<T extends SharedCard> = {
  card: T;
  dictionary: Dictionary;
};

function ownerName(card: SharedCard): string {
  return [card.givenName, card.surname].filter(Boolean).join(" ");
}

function accessibleDocumentName(card: SharedCard, documentType: string): string {
  const name = ownerName(card);
  return name ? `${documentType}: ${name}` : documentType;
}

function previewValue(value: string | null): string | null {
  return value && value.trim() ? value.toUpperCase() : null;
}

function DocumentArtwork({ src }: { src: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className="share-document__artwork"
      fill
      priority
      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 720px, 650px"
      src={assetPath(src)}
      unoptimized
    />
  );
}

function Field({ name, value }: { name: string; value: string | null }) {
  if (!value) return null;
  return (
    <span className="share-document__field" data-field={name}>
      {value}
    </span>
  );
}

function AccessibleFieldList({
  fields,
}: {
  fields: Array<{ label: string; value: string | null }>;
}) {
  const activeFields = fields.filter(
    (field): field is { label: string; value: string } => Boolean(field.value),
  );

  return (
    <dl
      className="sr-only"
      data-testid="accessible-document-fields"
    >
      {activeFields.map((field) => (
        <div key={field.label}>
          <dt>{field.label}</dt>
          <dd>{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function HealthCardPreview({ card, dictionary }: PreviewProps<SharedHealthCard>) {
  const labels = dictionary.share.fieldLabels;
  const fields = [
    { label: labels.fiscalCode, value: previewValue(card.fiscalCode) },
    { label: labels.surname, value: previewValue(card.surname) },
    { label: labels.givenName, value: previewValue(card.givenName) },
    { label: labels.birthPlace, value: previewValue(card.birthPlace) },
    { label: labels.birthProvince, value: previewValue(card.birthProvince) },
    { label: labels.birthDate, value: previewValue(card.birthDate) },
    { label: labels.sex, value: previewValue(card.sex) },
    { label: labels.expiryDate, value: previewValue(card.expiryDate) },
  ];

  return (
    <article
      aria-label={accessibleDocumentName(card, dictionary.share.documentTypes.TS)}
      className="share-document share-document--ts"
      data-document-kind="TS"
      data-testid="document-preview"
    >
      <DocumentArtwork src="/img/tessera_sanitaria_card_bg_generic.jpg" />
      <div aria-hidden="true" className="share-document__fields">
        <Field name="fiscal-code" value={previewValue(card.fiscalCode)} />
        <Field name="surname" value={previewValue(card.surname)} />
        <Field name="given-name" value={previewValue(card.givenName)} />
        <Field name="birth-place" value={previewValue(card.birthPlace)} />
        <Field name="birth-province" value={previewValue(card.birthProvince)} />
        <Field name="birth-date" value={previewValue(card.birthDate)} />
        <Field name="sex" value={previewValue(card.sex)} />
        <Field name="expiry-date" value={previewValue(card.expiryDate)} />
      </div>
      <AccessibleFieldList fields={fields} />
    </article>
  );
}

function IdentityCardPreview({
  card,
  dictionary,
}: PreviewProps<SharedIdentityCard>) {
  const labels = dictionary.share.fieldLabels;
  const birth = [previewValue(card.birthPlace), previewValue(card.birthProvince) ? `(${previewValue(card.birthProvince)})` : null, previewValue(card.birthDate)]
    .filter(Boolean)
    .join(" ");
  const artwork = card.sex.trim().toUpperCase() === "F"
    ? "/img/cie_card_bg_female.jpg"
    : "/img/cie_card_bg_male.jpg";
  const fields = [
    { label: labels.issuingMunicipality, value: previewValue(card.issuingMunicipality) },
    { label: labels.serialNumber, value: previewValue(card.serialNumber) },
    { label: labels.surname, value: previewValue(card.surname) },
    { label: labels.givenName, value: previewValue(card.givenName) },
    { label: labels.birthPlaceDate, value: birth || null },
    { label: labels.sex, value: previewValue(card.sex) },
    { label: labels.height, value: previewValue(card.height) },
    { label: labels.nationality, value: previewValue(card.nationality) },
    { label: labels.issueDate, value: previewValue(card.issueDate) },
    { label: labels.expiryDate, value: previewValue(card.expiryDate) },
    { label: labels.cardAccessNumber, value: previewValue(card.cardAccessNumber) },
  ];

  return (
    <article
      aria-label={accessibleDocumentName(card, dictionary.share.documentTypes.CIE)}
      className="share-document share-document--cie"
      data-document-kind="CIE"
      data-testid="document-preview"
    >
      <DocumentArtwork src={artwork} />
      <div aria-hidden="true" className="share-document__fields">
        <Field name="municipality" value={previewValue(card.issuingMunicipality)} />
        <Field name="document-number" value={previewValue(card.serialNumber)} />
        <Field name="surname" value={previewValue(card.surname)} />
        <Field name="given-name" value={previewValue(card.givenName)} />
        <Field name="birth-place-date" value={birth || null} />
        <Field name="sex" value={previewValue(card.sex)} />
        <Field name="height" value={previewValue(card.height)} />
        <Field name="citizenship" value={previewValue(card.nationality)} />
        <Field name="issue-date" value={previewValue(card.issueDate)} />
        <Field name="expiry-date" value={previewValue(card.expiryDate)} />
        <Field name="access-number" value={previewValue(card.cardAccessNumber)} />
      </div>
      <AccessibleFieldList fields={fields} />
    </article>
  );
}

function DrivingLicencePreview({
  card,
  dictionary,
}: PreviewProps<SharedDrivingLicence>) {
  const labels = dictionary.share.fieldLabels;
  const birth = [previewValue(card.birthDate), previewValue(card.birthPlace), previewValue(card.birthProvince) ? `(${previewValue(card.birthProvince)})` : null]
    .filter(Boolean)
    .join("     ");
  const categories = card.categories
    .map((category) => previewValue(category.type))
    .filter(Boolean)
    .join(" ");
  const fields = [
    { label: labels.surname, value: previewValue(card.surname) },
    { label: labels.givenName, value: previewValue(card.givenName) },
    { label: labels.birthPlaceDate, value: birth || null },
    { label: labels.issueDate, value: previewValue(card.issueDate) },
    { label: labels.issuingAuthority, value: previewValue(card.issuingAuthority) },
    { label: labels.expiryDate, value: previewValue(card.expiryDate) },
    { label: labels.licenceNumber, value: previewValue(card.licenceNumber) },
    { label: labels.categories, value: categories || null },
  ];

  return (
    <article
      aria-label={accessibleDocumentName(card, dictionary.share.documentTypes.P)}
      className="share-document share-document--licence"
      data-document-kind="P"
      data-testid="document-preview"
    >
      <DocumentArtwork src="/img/license_card_bg_no_gender.jpg" />
      <div aria-hidden="true" className="share-document__fields">
        <Field name="surname" value={previewValue(card.surname)} />
        <Field name="given-name" value={previewValue(card.givenName)} />
        <Field name="birth-place-date" value={birth || null} />
        <Field name="issue-date" value={previewValue(card.issueDate)} />
        <Field name="issued-by" value={previewValue(card.issuingAuthority)} />
        <Field name="expiry-date" value={previewValue(card.expiryDate)} />
        <Field name="document-number" value={previewValue(card.licenceNumber)} />
        <Field name="categories" value={categories || null} />
      </div>
      <AccessibleFieldList fields={fields} />
    </article>
  );
}

export function SharedDocumentPreview({
  card,
  dictionary,
}: PreviewProps<SharedCard>) {
  if (card.kind === "TS") {
    return <HealthCardPreview card={card} dictionary={dictionary} />;
  }
  if (card.kind === "CIE") {
    return <IdentityCardPreview card={card} dictionary={dictionary} />;
  }
  return <DrivingLicencePreview card={card} dictionary={dictionary} />;
}
