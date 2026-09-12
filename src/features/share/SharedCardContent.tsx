import type { Dictionary } from "@/content/dictionaries";
import { ShareStoreLinks } from "./ShareStoreLinks";
import type {
  SharedCard,
  SharedDrivingLicence,
  SharedLicenceCategory,
} from "./types";

type SharedCardContentProps = {
  card: SharedCard;
  dictionary: Dictionary;
};

type Detail = {
  label: string;
  value: string;
  machineReadable?: boolean;
};

function ownerName(card: SharedCard): string {
  return [card.givenName, card.surname]
    .filter((value) => value !== "")
    .join(" ");
}

function displayed(value: string, fallback: string): string {
  return value === "" ? fallback : value;
}

function optionalDetail(
  details: Detail[],
  label: string,
  value: string | null,
  machineReadable = false,
) {
  if (value === null || value === "") return;
  details.push({ label, value, machineReadable });
}

function cardDetails(card: SharedCard, dictionary: Dictionary): Detail[] {
  const fields = dictionary.share.fields;
  const fallback = dictionary.share.notProvided;
  const details: Detail[] = [
    { label: fields.surname, value: displayed(card.surname, fallback) },
    { label: fields.givenName, value: displayed(card.givenName, fallback) },
  ];

  if (card.kind === "TS") {
    details.push(
      {
        label: fields.fiscalCode,
        value: displayed(card.fiscalCode, fallback),
        machineReadable: true,
      },
      { label: fields.sex, value: displayed(card.sex, fallback) },
      {
        label: fields.birthPlace,
        value: displayed(card.birthPlace, fallback),
      },
      {
        label: fields.birthProvince,
        value: displayed(card.birthProvince, fallback),
      },
      {
        label: fields.birthDate,
        value: displayed(card.birthDate, fallback),
      },
    );
    optionalDetail(details, fields.expiryDate, card.expiryDate);
    optionalDetail(
      details,
      fields.institutionNumber,
      card.institutionNumber,
      true,
    );
    optionalDetail(details, fields.cardNumber, card.cardNumber, true);
  } else if (card.kind === "CIE") {
    details.push(
      {
        label: fields.fiscalCode,
        value: displayed(card.fiscalCode, fallback),
        machineReadable: true,
      },
      { label: fields.sex, value: displayed(card.sex, fallback) },
      {
        label: fields.birthPlace,
        value: displayed(card.birthPlace, fallback),
      },
      {
        label: fields.birthProvince,
        value: displayed(card.birthProvince, fallback),
      },
      {
        label: fields.birthDate,
        value: displayed(card.birthDate, fallback),
      },
    );
    optionalDetail(
      details,
      fields.issuingMunicipality,
      card.issuingMunicipality,
    );
    optionalDetail(details, fields.nationality, card.nationality);
    optionalDetail(details, fields.serialNumber, card.serialNumber, true);
    optionalDetail(details, fields.height, card.height);
    optionalDetail(details, fields.issueDate, card.issueDate);
    optionalDetail(details, fields.expiryDate, card.expiryDate);
    optionalDetail(
      details,
      fields.cardAccessNumber,
      card.cardAccessNumber,
      true,
    );
    optionalDetail(
      details,
      fields.parentsOrGuardians,
      card.parentsOrGuardians,
    );
    optionalDetail(
      details,
      fields.residenceAddress,
      card.residenceAddress,
    );
    optionalDetail(
      details,
      fields.birthCertificateDetails,
      card.birthCertificateDetails,
    );
    optionalDetail(details, fields.mrz, card.mrz, true);
  } else {
    details.push({
      label: fields.licenceNumber,
      value: displayed(card.licenceNumber, fallback),
      machineReadable: true,
    });
    optionalDetail(details, fields.birthDate, card.birthDate);
    optionalDetail(details, fields.birthPlace, card.birthPlace);
    optionalDetail(details, fields.birthProvince, card.birthProvince);
    optionalDetail(details, fields.issueDate, card.issueDate);
    optionalDetail(details, fields.expiryDate, card.expiryDate);
    optionalDetail(details, fields.issuingAuthority, card.issuingAuthority);
    optionalDetail(details, fields.codes, card.codes);
    optionalDetail(details, fields.managementField, card.managementField);
  }

  return details;
}

export function SharedCardContent({
  card,
  dictionary,
}: SharedCardContentProps) {
  const documentName = dictionary.share.documentTypes[card.kind];
  const name = ownerName(card) || dictionary.share.notProvided;

  return (
    <section data-card-kind={card.kind} data-testid="shared-card-content">
      <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12">
        <div className="min-w-0">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-label text-primary">
              {documentName}
            </p>
            <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
              {name}
            </h2>
          </div>
          <DocumentPreview
            card={card}
            dictionary={dictionary}
            documentName={documentName}
          />
        </div>

        <div className="min-w-0 rounded-container bg-surface p-5 sm:p-7">
          <h3 className="text-xl font-semibold tracking-tight">
            {dictionary.share.detailsTitle}
          </h3>
          <DetailList details={cardDetails(card, dictionary)} />
          {card.kind === "P" && card.categories.length > 0 ? (
            <LicenceCategories card={card} dictionary={dictionary} />
          ) : null}
        </div>
      </div>

      <ShareStoreLinks dictionary={dictionary} />
    </section>
  );
}

function DetailList({ details }: { details: Detail[] }) {
  return (
    <dl className="mt-5 divide-y divide-outline/45">
      {details.map((detail) => (
        <div
          className="grid min-w-0 gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
          key={detail.label}
        >
          <dt className="text-sm font-medium text-on-surface-muted">
            {detail.label}
          </dt>
          <dd
            className={`min-w-0 whitespace-pre-wrap break-words text-[0.95rem] leading-6 ${detail.machineReadable ? "font-mono tracking-wide" : ""}`}
          >
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function LicenceCategories({
  card,
  dictionary,
}: {
  card: SharedDrivingLicence;
  dictionary: Dictionary;
}) {
  return (
    <section className="mt-7 border-t border-outline/60 pt-6">
      <h3 className="text-lg font-semibold">
        {dictionary.share.categoriesTitle}
      </h3>
      <div className="mt-4 grid gap-3">
        {card.categories.map((category, index) => (
          <CategoryDetails
            category={category}
            dictionary={dictionary}
            index={index}
            key={`${category.type}-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryDetails({
  category,
  dictionary,
  index,
}: {
  category: SharedLicenceCategory;
  dictionary: Dictionary;
  index: number;
}) {
  const fields = dictionary.share.fields;
  const details: Detail[] = [
    {
      label: fields.category,
      value: displayed(category.type, dictionary.share.notProvided),
    },
  ];
  optionalDetail(details, fields.issueDate, category.issueDate);
  optionalDetail(details, fields.expiryDate, category.expiryDate);
  optionalDetail(details, fields.codes, category.codes);

  return (
    <article className="rounded-control bg-surface-container p-4">
      <h4 className="font-semibold">
        {dictionary.share.categoryLabel} {index + 1}
      </h4>
      <DetailList details={details} />
    </article>
  );
}

function DocumentPreview({
  card,
  dictionary,
  documentName,
}: {
  card: SharedCard;
  dictionary: Dictionary;
  documentName: string;
}) {
  const fields = dictionary.share.fields;
  const number = card.kind === "P" ? card.licenceNumber : card.fiscalCode;
  const secondaryLabel =
    card.kind === "P" ? fields.licenceNumber : fields.fiscalCode;
  const secondaryValue = displayed(number, dictionary.share.notProvided);
  const initial = Array.from(card.givenName || card.surname || "T")[0];

  return (
    <article
      aria-label={`${documentName}: ${ownerName(card)}`}
      className="shared-document"
      data-document-kind={card.kind}
      data-testid="document-preview"
    >
      <div aria-hidden="true" className="shared-document__orb" />
      <header className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-label opacity-75">
            TesSa
          </p>
          <p className="mt-1 break-words text-lg font-semibold leading-tight sm:text-xl">
            {documentName}
          </p>
        </div>
        <span className="shared-document__chip">{card.kind}</span>
      </header>

      <div className="relative mt-8 grid min-w-0 grid-cols-[3.75rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5">
        <div aria-hidden="true" className="shared-document__portrait">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="shared-document__label">{fields.surname}</p>
          <p className="break-words text-lg font-semibold leading-tight sm:text-xl">
            {displayed(card.surname, dictionary.share.notProvided)}
          </p>
          <p className="shared-document__label mt-3">{fields.givenName}</p>
          <p className="break-words font-medium leading-tight sm:text-lg">
            {displayed(card.givenName, dictionary.share.notProvided)}
          </p>
        </div>
      </div>

      <footer className="relative mt-7 min-w-0 border-t border-current/20 pt-4">
        <p className="shared-document__label">{secondaryLabel}</p>
        <p className="break-words font-mono text-sm font-semibold tracking-wide sm:text-base">
          {secondaryValue}
        </p>
      </footer>
    </article>
  );
}
