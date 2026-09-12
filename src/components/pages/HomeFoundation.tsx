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

function SectionHeading({ section }: { section: { eyebrow: string; title: string; description: string } }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      <p className="section-intro">{section.description}</p>
    </div>
  );
}

function AbstractDocumentStack({ cards }: { cards: HomeContent["wallet"]["cards"] }) {
  const kinds = ["ts", "cie", "licence"];
  return (
    <div className="abstract-wallet" aria-label={cards.map((card) => card.name).join(", ")} role="img">
      {cards.map((card, index) => (
        <article className="abstract-document" data-kind={kinds[index]} key={card.short}>
          <div className="abstract-document__top"><span>{card.short}</span><i /></div>
          <div className="abstract-document__body">
            <div aria-hidden="true" className="abstract-document__portrait" />
            <div><strong>{card.name}</strong><p>{card.detail}</p><div aria-hidden="true" className="abstract-document__lines"><i /><i /><i /></div></div>
          </div>
        </article>
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
            <AbstractDocumentStack cards={home.wallet.cards} />
          </div>
        </section>

        <section className="access-story" aria-labelledby="access-title">
          <div className="section-shell access-story__inner">
            <div className="access-story__media">
              <figure className="screenshot-crop screenshot-crop--details">
                <ProductScreenshot alt={home.access.detailsAlt} name="details" />
                <figcaption>{home.access.detailsLabel}</figcaption>
              </figure>
              <figure className="screenshot-crop screenshot-crop--barcode">
                <ProductScreenshot alt={home.access.barcodeAlt} name="barcode" />
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
              <div className="family-orbits" aria-hidden="true"><span>G</span><span>T</span><span>+</span></div>
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
              <div className="local-device" aria-hidden="true"><div><DeviceIcon /><span><LockIcon /></span></div></div>
            </div>
          </div>
        </section>

        <section className="backup-story" aria-labelledby="backup-title">
          <div className="section-shell backup-story__inner">
            <div className="section-heading"><p className="eyebrow">{home.backup.eyebrow}</p><h2 id="backup-title">{home.backup.title}</h2><p className="section-intro">{home.backup.description}</p><p className="support-note">{home.backup.restoreNote}</p></div>
            <div className="backup-flow" role="img" aria-label={`${home.backup.manual}; ${home.backup.encrypted}; ${home.backup.restore}`}>
              <div><span><BackupIcon /></span><strong>{home.backup.manual}</strong></div><i><ArrowIcon /></i><div className="backup-file"><span><LockIcon /></span><strong>{home.backup.encrypted}</strong></div><i><ArrowIcon /></i><div><span><DeviceIcon /></span><strong>{home.backup.restore}</strong></div>
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
                <details key={item.question} open={index === 0}><summary><span>{item.question}</span><i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>
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
