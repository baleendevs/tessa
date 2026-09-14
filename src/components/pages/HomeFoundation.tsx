import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { getDictionary } from "@/content/dictionaries";
import type { HomeContent } from "@/content/dictionaries";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { ProductScreenshot } from "@/components/marketing/ProductScreenshot";
import {
  ArrowIcon,
  BackupIcon,
  CheckIcon,
  DeviceIcon,
  FingerprintIcon,
  LinkIcon,
  LockIcon,
  QrIcon,
  WalletIcon,
} from "@/components/marketing/MarketingIcons";
import { StoreBadges } from "@/components/marketing/StoreBadges";
import type { Locale } from "@/lib/site";
import { APP_STORE_URL, assetPath, GOOGLE_PLAY_URL, SITE_URL } from "@/lib/site";

type HomeFoundationProps = { locale: Locale };

const DEMO_IDENTITY = {
  birthDate: "13/01/1938",
  birthPlace: "GENOVA",
  birthProvince: "GE",
  citizenship: "ITA",
  fiscalCode: "RSSGNN38A13D969W",
  givenName: "GIOVANNI",
  sex: "M",
  surname: "ROSSI",
} as const;

const DEMO_DOCUMENTS = [
  {
    fields: [
      { name: "fiscal-code", value: DEMO_IDENTITY.fiscalCode },
      { name: "surname", value: DEMO_IDENTITY.surname },
      { name: "given-name", value: DEMO_IDENTITY.givenName },
      { name: "birth-place", value: DEMO_IDENTITY.birthPlace },
      { name: "birth-province", value: DEMO_IDENTITY.birthProvince },
      { name: "birth-date", value: DEMO_IDENTITY.birthDate },
      { name: "sex", value: DEMO_IDENTITY.sex },
      { name: "expiry-date", value: "13/01/2023" },
    ],
    kind: "ts",
    src: "/img/tessera_sanitaria_card_bg_generic.jpg",
  },
  {
    fields: [
      { name: "municipality", value: DEMO_IDENTITY.birthPlace },
      { name: "document-number", value: "CA12345NA" },
      { name: "surname", value: DEMO_IDENTITY.surname },
      { name: "given-name", value: DEMO_IDENTITY.givenName },
      { name: "birth-place-date", value: `${DEMO_IDENTITY.birthPlace} (${DEMO_IDENTITY.birthProvince}) 13.01.1938` },
      { name: "sex", value: DEMO_IDENTITY.sex },
      { name: "height", value: "175" },
      { name: "citizenship", value: DEMO_IDENTITY.citizenship },
      { name: "issue-date", value: "10.09.2023" },
      { name: "expiry-date", value: "10.09.2033" },
      { name: "access-number", value: "123456" },
    ],
    kind: "cie",
    src: "/img/cie_card_bg_male.jpg",
  },
  {
    fields: [
      { name: "surname", value: DEMO_IDENTITY.surname },
      { name: "given-name", value: DEMO_IDENTITY.givenName },
      { name: "birth-place-date", value: `13.01.1938 ${DEMO_IDENTITY.birthPlace} (${DEMO_IDENTITY.birthProvince})` },
      { name: "issue-date", value: "10.09.2024" },
      { name: "issued-by", value: "UCO DEMO" },
      { name: "expiry-date", value: "10.09.2034" },
      { name: "document-number", value: "XX1234567Z" },
      { name: "categories", value: "B" },
    ],
    kind: "licence",
    src: "/img/license_card_bg_no_gender.jpg",
  },
] as const;

function SectionHeading({ section }: { section: { eyebrow: string; title: string; description: string } }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      <p className="section-intro">{section.description}</p>
    </div>
  );
}

function DocumentStack({ cards }: { cards: HomeContent["wallet"]["cards"] }) {
  return (
    <div className="document-stack" aria-label={cards.map((card) => card.name).join(", ")} role="img">
      {cards.map((card, index) => (
        <span aria-hidden="true" className="document-card" data-kind={DEMO_DOCUMENTS[index].kind} key={card.short}>
          <Image alt="" height={315} src={assetPath(DEMO_DOCUMENTS[index].src)} unoptimized width={500} />
          <span className="document-card__fields">
            {DEMO_DOCUMENTS[index].fields.map((field) => (
              <span className="document-field" data-field={field.name} key={field.name}>{field.value}</span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

function FeaturePill({ icon, label }: { icon: ReactNode; label: string }) {
  return <span className="feature-pill">{icon}<span>{label}</span></span>;
}

export function HomeFoundation({ locale }: HomeFoundationProps) {
  const dictionary = getDictionary(locale);
  const home = dictionary.home;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TesSa",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android, iOS",
    url: locale === "it" ? `${SITE_URL}/` : `${SITE_URL}/en/`,
    downloadUrl: [GOOGLE_PLAY_URL, APP_STORE_URL],
    description: home.hero.description,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{home.skipLink}</a>
      <MarketingHeader dictionary={dictionary} locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__shape hero__shape--one" aria-hidden="true" />
          <div className="hero__shape hero__shape--two" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="eyebrow">{home.hero.eyebrow}</p>
              <h1 id="hero-title">{home.hero.title}</h1>
              <p className="hero__intro">{home.hero.description}</p>
              <StoreBadges labels={home.stores} locale={locale} />
              <a className="text-action" href="#how-it-works">{home.hero.secondaryAction}<ArrowIcon /></a>
              <p className="hero__note"><CheckIcon />{home.hero.platformNote}</p>
            </div>
            <div className="hero__product" aria-label={home.hero.imageAlt}>
              <div className="phone-frame phone-frame--hero">
                <ProductScreenshot alt={home.hero.imageAlt} name="wallet" priority />
              </div>
            </div>
          </div>
        </section>

        <section className="wallet-story" id="documents" aria-labelledby="wallet-title">
          <div className="section-shell wallet-story__inner">
            <div className="section-heading" id="how-it-works">
              <p className="eyebrow">{home.wallet.eyebrow}</p>
              <h2 id="wallet-title">{home.wallet.title}</h2>
              <p className="section-intro">{home.wallet.description}</p>
            </div>
            <DocumentStack cards={home.wallet.cards} />
          </div>
        </section>

        <section className="access-story" aria-labelledby="access-title">
          <div className="section-shell access-story__inner">
            <div className="access-story__media">
              <figure className="product-preview-card product-preview-card--details">
                <div className="product-preview-card__viewport">
                  <ProductScreenshot alt={home.access.detailsAlt} name="details" />
                </div>
                <figcaption>{home.access.detailsLabel}</figcaption>
              </figure>
              <figure className="product-preview-card product-preview-card--barcode">
                <div className="product-preview-card__viewport">
                  <ProductScreenshot alt={home.access.barcodeAlt} name="barcode" />
                </div>
                <figcaption>{home.access.barcodeLabel}</figcaption>
              </figure>
            </div>
            <div className="section-heading"><p className="eyebrow">{home.access.eyebrow}</p><h2 id="access-title">{home.access.title}</h2><p className="section-intro">{home.access.description}</p></div>
          </div>
        </section>

        <section className="family-story" aria-labelledby="family-title">
          <div className="section-shell family-story__inner">
            <div className="section-heading"><p className="eyebrow">{home.family.eyebrow}</p><h2 id="family-title">{home.family.title}</h2><p className="section-intro">{home.family.description}</p></div>
            <figure className="family-story__media">
              <div className="screenshot-window screenshot-window--family"><ProductScreenshot alt={home.family.imageAlt} name="family" /></div>
            </figure>
          </div>
        </section>

        <section className="sharing-story" id="sharing" aria-labelledby="sharing-title">
          <div className="section-shell sharing-story__inner">
            <div className="sharing-story__visual">
              <div className="share-path" aria-hidden="true"><span><WalletIcon /></span><i /><span><QrIcon /></span><i /><span><DeviceIcon /></span></div>
              <figure className="screenshot-window screenshot-window--sharing"><ProductScreenshot alt={home.sharing.imageAlt} name="sharing" /></figure>
            </div>
            <div>
              <div className="section-heading"><p className="eyebrow">{home.sharing.eyebrow}</p><h2 id="sharing-title">{home.sharing.title}</h2><p className="section-intro">{home.sharing.description}</p></div>
              <div className="feature-pills"><FeaturePill icon={<QrIcon />} label={home.sharing.qr} /><FeaturePill icon={<LinkIcon />} label={home.sharing.link} /></div>
              <p className="support-note">{home.sharing.note}</p>
            </div>
          </div>
        </section>

        <section className="privacy-story" id="privacy" aria-labelledby="privacy-title">
          <div className="section-shell">
            <div className="privacy-story__heading"><div className="section-heading"><p className="eyebrow">{home.privacy.eyebrow}</p><h2 id="privacy-title">{home.privacy.title}</h2><p className="section-intro">{home.privacy.description}</p></div><div className="feature-pills"><FeaturePill icon={<DeviceIcon />} label={home.privacy.local} /><FeaturePill icon={<LockIcon />} label={home.privacy.pin} /><FeaturePill icon={<FingerprintIcon />} label={home.privacy.biometric} /></div></div>
            <div className="privacy-story__media">
              <figure className="screenshot-window screenshot-window--settings"><ProductScreenshot alt={home.privacy.settingsAlt} name="settings" /></figure>
              <figure className="screenshot-window screenshot-window--pin"><ProductScreenshot alt={home.privacy.pinAlt} name="pin" /></figure>
              <div className="privacy-connector" aria-hidden="true"><i /><span><LockIcon /></span></div>
            </div>
          </div>
        </section>

        <section className="backup-story" aria-labelledby="backup-title">
          <div className="section-shell backup-story__inner">
            <div className="section-heading"><p className="eyebrow">{home.backup.eyebrow}</p><h2 id="backup-title">{home.backup.title}</h2><p className="section-intro">{home.backup.description}</p><p className="support-note">{home.backup.restoreNote}</p></div>
            <div className="backup-flow" role="img" aria-label={`${home.backup.create}: ${home.backup.encrypted}; ${home.backup.manual}; ${home.backup.restore}`}>
              <div className="backup-file"><span><LockIcon /></span><div className="backup-flow__copy"><strong>{home.backup.create}</strong><small>{home.backup.encrypted}</small></div></div><i><ArrowIcon /></i><div><span><BackupIcon /></span><strong>{home.backup.manual}</strong></div><i><ArrowIcon /></i><div><span><DeviceIcon /></span><strong>{home.backup.restore}</strong></div>
            </div>
          </div>
        </section>

        <section className="showcase-story" aria-labelledby="showcase-title">
          <div className="section-shell">
            <SectionHeading section={home.showcase} />
            <div className="showcase-grid">
              {([
                ["wallet", home.showcase.walletLabel, home.showcase.walletAlt, "top"],
                ["details", home.showcase.detailsLabel, home.showcase.detailsAlt, "middle"],
                ["sharing", home.showcase.sharingLabel, home.showcase.sharingAlt, "bottom"],
                ["add-menu", home.showcase.organiseLabel, home.showcase.organiseAlt, "menu"],
              ] as const).map(([name, label, alt, crop], index) => (
                <figure className="showcase-card" key={name} style={{ "--delay": `${index * 60}ms` } as CSSProperties}>
                  <div className={`showcase-card__crop showcase-card__crop--${crop}`}><ProductScreenshot alt={alt} name={name} /></div>
                  <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-story" id="faq" aria-labelledby="faq-title">
          <div className="section-shell faq-story__inner">
            <div className="section-heading"><p className="eyebrow">{home.faq.eyebrow}</p><h2 id="faq-title">{home.faq.title}</h2><p className="section-intro">{home.faq.description}</p></div>
            <div className="faq-list">
              {home.faq.items.map((item, index) => (
                <details key={item.question} open={index === 0}><summary><span>{item.question}</span><i aria-hidden="true"><svg focusable="false" viewBox="0 0 24 24"><path d="m7 9.5 5 5 5-5" /></svg></i></summary><p>{item.answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="download-story" id="download" aria-labelledby="download-title">
          <div className="section-shell download-story__inner">
            <Image alt="" className="download-story__mark" height={422} src={assetPath("/media/brand/tessa-wallet-mark.png")} unoptimized width={488} />
            <div><p className="eyebrow">{home.finalCta.eyebrow}</p><h2 id="download-title">{home.finalCta.title}</h2><p>{home.finalCta.description}</p><StoreBadges labels={home.stores} locale={locale} /></div>
          </div>
        </section>
      </main>
      <MarketingFooter dictionary={dictionary} locale={locale} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </>
  );
}
