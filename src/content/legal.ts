import { italianPrivacyDocument } from "./privacy-it";

export { italianPrivacyDocument };

export type LegalLink = {
  label: string;
  url: string;
};

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "links"; items: LegalLink[] }
  | { type: "attribution"; before: string; links: LegalLink[]; between?: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  effectiveDate: string;
  sections: LegalSection[];
};

const thirdPartyTerms: LegalLink[] = [
  { label: "Google Play Services", url: "https://policies.google.com/terms" },
  { label: "AdMob", url: "https://developers.google.com/admob/terms" },
  {
    label: "Google Analytics for Firebase",
    url: "https://firebase.google.com/terms/analytics",
  },
];

const storeTerms: LegalLink[] = [
  {
    label: "Apple Standard End User License Agreement",
    url: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  },
  {
    label: "Google Play Terms of Service",
    url: "https://play.google.com/about/play-terms/",
  },
];

const thirdPartyPrivacy: LegalLink[] = [
  {
    label: "Google Privacy Policy",
    url: "https://policies.google.com/privacy",
  },
  {
    label: "Google AdMob privacy information",
    url: "https://support.google.com/admob/answer/6128543?hl=en",
  },
  {
    label: "Firebase privacy and security information",
    url: "https://firebase.google.com/support/privacy",
  },
  {
    label: "Apple Privacy Policy",
    url: "https://www.apple.com/legal/privacy/",
  },
  {
    label: "GitHub Privacy Statement",
    url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
  },
  {
    label: "ShinyStat privacy information",
    url: "https://www.shinystat.com/en/informativa_privacy_generale.html?id=6",
  },
];

const privacyRightsLinks: LegalLink[] = [
  {
    label: "Italian Data Protection Authority (Garante per la protezione dei dati personali)",
    url: "https://www.garanteprivacy.it/",
  },
];

export const termsDocument: LegalDocument = {
  effectiveDate: "2026-09-16",
  sections: [
    {
      id: "operator-and-scope",
      title: "Operator and scope",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms of Use govern the TesSa: tessere e documenti mobile application (the “App”), the related website at https://baleendevs.github.io/tessa (the “Site”) and the features made available through them (together, the “Services”). The Services are made available by Carlo Andreotti, an independent individual developer operating under the name Baleen Developers, Via dei Boschi 30, 15072 Casal Cermelli (AL), Italy (“Baleen Developers”, “we”, “us” or “our”).",
        },
        {
          type: "paragraph",
          text: "By downloading, accessing or using the Services, you agree to these Terms. If you do not agree, do not use the Services. Any mandatory rights you have under applicable consumer law remain unaffected.",
        },
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      blocks: [
        {
          type: "paragraph",
          text: "The Services are intended for users who are at least 18 years old. A person under 18 must not use the Services independently. An adult may use the App to manage information relating to a minor or another person only where the adult is legally authorised to do so.",
        },
      ],
    },
    {
      id: "purpose-and-official-status",
      title: "Purpose of the App and no official status",
      blocks: [
        {
          type: "paragraph",
          text: "The App allows you to create, store and display digital representations of Italian health cards, identity documents, driving licences and other supported documents, and to scan or display barcodes and QR codes. TesSa is an independent application. It is not issued, operated, endorsed or approved by the Italian Government, the Ministry of Health, any public authority or any document issuer.",
        },
        {
          type: "paragraph",
          text: "A digital representation, image, barcode or QR code displayed by the App does not replace the original document and may not be accepted by authorities, healthcare providers, businesses or other third parties. The App does not independently verify the authenticity, accuracy, validity, expiry date or legal status of information that you enter, import or scan. You are responsible for checking that information is correct and current, retaining the original document where required and complying with the rules governing its presentation and use.",
        },
        {
          type: "paragraph",
          text: "The App is a personal convenience tool only. It is not an identity, certification, healthcare, medical, legal, emergency or public-administration service. Do not rely on it where failure, unavailability or rejection of a digital representation could affect your health, safety, identity verification, access to treatment or public services, compliance with a deadline or exercise of a legal right. Always retain and use the original document or the relevant official channel when required.",
        },
      ],
    },
    {
      id: "licence-and-intellectual-property",
      title: "Licence and intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "The App is licensed, not sold. Subject to these Terms and the applicable app-store rules, you receive a personal, limited, non-exclusive, non-transferable and revocable licence to use the App on devices that you own or control, solely for lawful personal use. For an App obtained through Apple’s App Store, Apple’s Standard End User License Agreement also applies. Your use of Google Play is subject to the Google Play Terms of Service.",
        },
        {
          type: "paragraph",
          text: "The App, Site, Baleen Developers and TesSa names and logos, visual design, text and other original materials are protected by intellectual-property laws and belong to us or our licensors. Except where applicable law or an open-source licence expressly permits it, you may not copy, modify, distribute, sell, sublicense, reverse engineer, decompile or create derivative works from the Services.",
        },
        { type: "links", items: storeTerms },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        {
          type: "paragraph",
          text: "You must use the Services lawfully and must not:",
        },
        {
          type: "list",
          items: [
            "create, store, display or share personal or document data unless you are authorised to do so;",
            "use a digital representation or sharing link to impersonate another person, commit fraud or present it as an official or legally valid document;",
            "infringe another person’s privacy, intellectual-property or other rights;",
            "interfere with, damage, bypass or test the security of the Services, or introduce malicious code;",
            "use the Services for any unlawful, harmful or misleading purpose.",
          ],
        },
        {
          type: "paragraph",
          text: "To the extent permitted by law, you are responsible for reasonable losses and costs directly caused to us by your intentional, fraudulent or otherwise unlawful use of the Services, including substantiated third-party claims resulting from that use.",
        },
      ],
    },
    {
      id: "local-storage-and-backups",
      title: "Local storage, device security and backups",
      blocks: [
        {
          type: "paragraph",
          text: "Information, document images and digital representations created or imported in the App are primarily stored locally on your device. We do not provide an account, cloud storage or cloud backup service for this information. You are responsible for securing your device and access to the App, keeping sufficient storage available and exporting any backup you wish to retain before uninstalling the App, resetting the device or changing devices.",
        },
        {
          type: "paragraph",
          text: "Backup files may contain sensitive personal and document data. Once a backup is exported, copied, uploaded to a third-party service or otherwise shared outside the App, you are responsible for its security, storage, transmission and deletion. The App uses technical safeguards intended to protect locally stored data and backups, but no electronic storage or encryption method can be guaranteed to be completely secure. Rooting, jailbreaking or otherwise weakening the device’s security may compromise the App and its data.",
        },
        {
          type: "paragraph",
          text: "The App is not a backup, archival or disaster-recovery service. We cannot recover information that remains only on your device or in a backup controlled by you. You assume the risk of irreversible loss caused by deletion, uninstalling, device loss or damage, insufficient storage, operating-system actions, failed migration, a lost password or encryption key, or failure to keep an independent usable backup.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Sharing links and third-party data",
      blocks: [
        {
          type: "paragraph",
          text: "The App may let you generate and share links or QR codes containing selected document data. The selected data is encoded in the link for transmission, but it is not encrypted. Anyone who obtains the link may be able to read the information it contains. Links are not protected by a TesSa account or password and cannot be revoked through the App. Review the included information before sharing and send links only to trusted recipients through appropriate channels.",
        },
        {
          type: "paragraph",
          text: "You may create, store, display or share information relating to another person only where you are legally authorised to do so. You are responsible for obtaining any required permission and for complying with applicable law. We do not control how recipients, messaging services, browsers, cloud-storage providers or other third parties store, use or redistribute information after you choose to share it.",
        },
        {
          type: "paragraph",
          text: "Creating or sending a sharing link is a disclosure initiated by you. You assume the risks of choosing the wrong data, recipient or communication channel, forwarding by a recipient, interception, copying, screenshots, browser or messaging history and any later use of the information by persons who obtain the link.",
        },
      ],
    },
    {
      id: "pro-purchase",
      title: "TesSa PRO purchase",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa may offer an optional one-time, non-consumable PRO in-app purchase that removes advertising and unlocks additional features. It is not a subscription. The price and any applicable taxes are shown by Apple’s App Store or Google Play before purchase. The relevant store processes the payment; we do not directly collect your payment-card details.",
        },
        {
          type: "paragraph",
          text: "Purchase confirmation, restoration, cancellation and refund requests are handled under the rules and procedures of the store through which you purchased PRO. Access may depend on the store account used for the purchase and on the store’s restoration mechanisms. Nothing in these Terms limits any refund, conformity or other remedy available to you under mandatory consumer law.",
        },
      ],
    },
    {
      id: "third-party-services",
      title: "Advertising and third-party services",
      blocks: [
        {
          type: "paragraph",
          text: "The free version of the App may display advertising supplied by third parties. The App and Site also rely on third-party components or services, and may contain links to services that we do not control. Their own terms and privacy notices apply. We are responsible for our choice and integration of third-party components to the extent required by law, but we do not control independent third-party content, availability or practices.",
        },
        {
          type: "paragraph",
          text: "Some features require an internet connection. Your network provider’s terms and charges, including roaming charges, may apply.",
        },
        { type: "links", items: thirdPartyTerms },
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Our Privacy Policy explains how personal data is processed when you use the App and Site. It also describes the distinction between information kept locally in the App and data processed by third-party services.",
        },
        {
          type: "links",
          items: [
            {
              label: "TesSa Privacy Policy",
              url: "https://baleendevs.github.io/tessa/en/privacy",
            },
          ],
        },
      ],
    },
    {
      id: "availability-and-updates",
      title: "Availability, compatibility and updates",
      blocks: [
        {
          type: "paragraph",
          text: "We may maintain, correct, improve or change the Services and their technical requirements. We will provide updates, including security updates, where and for as long as required by applicable law. You should install updates made available through the relevant app store within a reasonable time. Where the law permits, we are not responsible for a problem caused solely by your failure to install an update after you were informed of its availability and the consequences of not installing it.",
        },
        {
          type: "paragraph",
          text: "We do not guarantee that every feature will remain compatible with every device or operating-system version, or that the Services will always be uninterrupted or error-free. We may suspend or discontinue all or part of the Services for legal, security, technical or commercial reasons, giving reasonable notice where practicable and respecting rights attached to purchases and other mandatory consumer rights.",
        },
        {
          type: "paragraph",
          text: "Availability may also be affected by app stores, operating-system providers, device manufacturers, network operators and events beyond our reasonable control. To the extent permitted by law, we are not responsible for delay, interruption or inability to perform caused by such events.",
        },
      ],
    },
    {
      id: "responsibility",
      title: "Responsibility",
      blocks: [
        {
          type: "paragraph",
          text: "You are responsible for the information you enter or import, the people whose information you manage, the recipients you choose, the security and availability of your device and backups, and your compliance with applicable law. Do not rely on the App as the sole place where you keep information or as a substitute for an original document.",
        },
        {
          type: "paragraph",
          text: "Except for guarantees and warranties that cannot lawfully be excluded, the Services are provided on an “as is” and “as available” basis. We do not make additional warranties that the Services will be uninterrupted, error-free, secure, compatible with every device or system, that scans, barcodes, QR codes or user-entered data will be accurate, or that any digital representation will be accepted for a particular purpose.",
        },
        {
          type: "paragraph",
          text: "To the maximum extent permitted by law, we are not responsible for loss caused by unauthorised, improper or unlawful use of the Services; inaccurate, incomplete or outdated user-supplied data; reliance on a digital representation instead of an original or official channel; loss or compromise of a device, local data or exported backup; disclosure of a sharing link by you or a recipient; failure of an independent third-party service; or failure to maintain connectivity, storage, credentials, backups or a supported operating system. These exclusions apply only where the loss is not attributable to our breach of an applicable legal duty.",
        },
        {
          type: "paragraph",
          text: "To the maximum extent permitted by law, we are not liable for indirect, incidental, special or consequential loss, loss or corruption of data, loss of profit, revenue, opportunity or reputation, missed deadlines or appointments, denial of access to a benefit or service, or the cost of obtaining substitute services, where such loss was not a reasonably foreseeable consequence of our breach or results from a risk placed under your responsibility by these Terms.",
        },
        {
          type: "paragraph",
          text: "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for fraud, wilful misconduct or gross negligence, death or personal injury caused by our act or omission, violations of public-order obligations, or any rights and remedies granted to consumers by mandatory law.",
        },
      ],
    },
    {
      id: "termination",
      title: "Ending use of the Services",
      blocks: [
        {
          type: "paragraph",
          text: "You may stop using the Services and uninstall the App at any time. Export any backup you wish to keep before uninstalling or deleting local data. Your licence to use the App ends automatically if you materially breach these Terms, subject to any notice or remedy period required by law. Provisions that by their nature should continue after termination, including those on intellectual property, responsibility, governing law and disputes, will remain in effect.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these Terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may update these Terms to reflect changes to the Services, the law, security requirements or our business. The updated version will be posted on this page with a new effective date. Where required by law, or where a change materially and adversely affects paid functionality, we will provide additional notice through an appropriate channel before the change takes effect. Changes apply prospectively and do not remove rights already acquired under mandatory law.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and disputes",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms are governed by Italian law. If you are a consumer, this choice does not deprive you of the protection of mandatory provisions of the country in which you habitually reside, and disputes may be brought before the courts competent under applicable consumer law, including the court of your place of residence or domicile where provided. In other cases, the courts of Alessandria, Italy, have exclusive jurisdiction.",
        },
        {
          type: "paragraph",
          text: "Before starting formal proceedings, you may contact us so that we can try to resolve the matter informally. This does not restrict your right to seek a judicial or other remedy available under applicable law.",
        },
      ],
    },
    {
      id: "general",
      title: "General provisions",
      blocks: [
        {
          type: "paragraph",
          text: "If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in effect, and the affected provision will apply to the maximum extent permitted by law. A failure to enforce a provision is not a waiver. These Terms, together with any applicable store terms and the Privacy Policy, form the agreement governing your use of the Services; mandatory law prevails in the event of conflict.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "For questions, complaints or support concerning these Terms or the Services, contact Carlo Andreotti, operating under the name Baleen Developers, at baleen.devs@gmail.com or by post at Via dei Boschi 30, 15072 Casal Cermelli (AL), Italy.",
        },
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  effectiveDate: "2026-09-16",
  sections: [
    {
      id: "controller-and-scope",
      title: "Controller and scope",
      blocks: [
        {
          type: "paragraph",
          text: "This Privacy Policy explains how personal data is processed in connection with the TesSa: tessere e documenti mobile application (the “App”), the related website at https://baleendevs.github.io/tessa (the “Site”) and the features made available through them (together, the “Services”).",
        },
        {
          type: "paragraph",
          text: "The data controller for the processing described in this Policy is Carlo Andreotti, an independent individual developer operating under the name Baleen Developers, Via dei Boschi 30, 15072 Casal Cermelli (AL), Italy (“Baleen Developers”, “we”, “us” or “our”). No data protection officer has been appointed because the processing carried out does not currently require one under applicable law.",
        },
        {
          type: "paragraph",
          text: "TesSa is intended for users in Italy. This Policy covers both information kept under the user’s control on the device and the limited personal data processed by us or by third-party services through the App or Site. It should be read together with the TesSa Terms of Use.",
        },
      ],
    },
    {
      id: "local-document-data",
      title: "Document data stored locally",
      blocks: [
        {
          type: "paragraph",
          text: "The App lets users enter, import, scan and display information relating to health cards, identity documents, driving licences and other supported documents, including images, identifying details, barcodes and QR codes. This content may be highly confidential. It is stored locally in an encrypted database on the user’s device and is not uploaded to or retained in a TesSa-operated account, server or cloud-storage service.",
        },
        {
          type: "paragraph",
          text: "We do not receive, view or remotely retrieve document content kept in the App. Users control that content and can edit or delete it through the App or remove the App’s local data. Deleting the local copy does not delete backups, screenshots, messages, shared links or other copies previously created or transferred by the user.",
        },
        {
          type: "paragraph",
          text: "TesSa does not provide user accounts, synchronisation between devices or a cloud backup service. The operating system or a service independently chosen by the user may nevertheless create or retain device backups under that provider’s settings and privacy terms.",
        },
        {
          type: "paragraph",
          text: "If a user stores information relating to a minor or another person, the user is responsible for having the legal authority to do so and for using and sharing that information lawfully.",
        },
      ],
    },
    {
      id: "data-provided-to-us",
      title: "Information provided directly to us",
      blocks: [
        {
          type: "paragraph",
          text: "We do not require registration and do not directly collect names, postal addresses, phone numbers, passwords, payment-card details or document content merely because a person uses the App or visits the Site.",
        },
        {
          type: "paragraph",
          text: "If you contact us for support, a privacy request or another enquiry, we receive the email address and any name, message, attachments and technical details that you voluntarily provide. Please do not send copies of identity documents, health cards, full barcodes, backup files or other sensitive information unless it is strictly necessary and we have specifically asked you to do so through an appropriate channel.",
        },
        {
          type: "list",
          items: [
            "support and privacy correspondence, including the sender’s email address and message content;",
            "technical information voluntarily supplied to diagnose a problem;",
            "records necessary to handle a complaint, comply with law or establish, exercise or defend legal claims.",
          ],
        },
      ],
    },
    {
      id: "automatically-processed-data",
      title: "Technical data processed automatically",
      blocks: [
        {
          type: "paragraph",
          text: "The App and Site use limited third-party infrastructure. Depending on the platform, configuration, permissions and privacy choices, those providers may automatically process the following categories of data:",
        },
        {
          type: "list",
          items: [
            "device and application information, such as device type, operating system, language, app version, application or advertising identifiers and network provider;",
            "network and approximate-location information derived from the IP address, but not precise GPS location requested by TesSa;",
            "limited usage, diagnostic, advertising and performance events, such as app launches, sessions, pages viewed, ad impressions, ad interactions and error information;",
            "privacy, advertising and consent choices made through the operating system, app store or a provider’s consent interface.",
          ],
        },
        {
          type: "paragraph",
          text: "TesSa does not create custom behavioural profiles or custom usage logs. Google Analytics for Firebase is currently included on Android and may automatically record events and device properties; Firebase Analytics is currently disabled in the iOS configuration. Google Mobile Ads may automatically record advertising events on both supported platforms. The Site uses ShinyStat for aggregate access statistics, and GitHub Pages, as the Site host, logs visitor IP addresses for security purposes.",
        },
      ],
    },
    {
      id: "device-features",
      title: "Device permissions and features",
      blocks: [
        {
          type: "paragraph",
          text: "The App may request access to device features only to provide functions selected by the user. Permission can be denied or later changed in the device settings, although the related feature may then be unavailable.",
        },
        {
          type: "list",
          items: [
            "Camera: to scan supported barcodes or QR codes and acquire document images when requested;",
            "Files, photos or storage: to import or save images and to create, select or restore backup files;",
            "Biometric authentication: optional fingerprint or facial verification is performed by the operating system; TesSa receives only the success or failure result and does not receive or store biometric templates.",
          ],
        },
        {
          type: "paragraph",
          text: "TesSa does not request access to precise geolocation, contacts, calendars, SMS messages, social-media accounts or the microphone, and does not use social login.",
        },
      ],
    },
    {
      id: "purposes-and-legal-bases",
      title: "Purposes and legal bases",
      blocks: [
        {
          type: "paragraph",
          text: "Where the GDPR applies, we process personal data only when a legal basis is available. The applicable basis depends on the data and context:",
        },
        {
          type: "list",
          items: [
            "performance of a contract or steps requested before entering one, to provide requested App functions, support and the TesSa PRO purchase;",
            "consent, for personalised advertising and non-essential analytics, identifiers or similar technologies where consent is required by law;",
            "legitimate interests, to secure the Services, prevent fraud and abuse, diagnose problems, understand aggregate Site traffic and protect or defend legal rights, provided those interests are not overridden by users’ rights;",
            "compliance with a legal obligation, including lawful requests and accounting, consumer-protection or data-protection requirements.",
          ],
        },
        {
          type: "paragraph",
          text: "Document content processed only on the device is handled at the user’s request to provide the chosen functionality and is not transmitted to us by default. We do not use personal data for direct marketing, sell personal data, or make decisions producing legal or similarly significant effects through automated profiling.",
        },
      ],
    },
    {
      id: "advertising-and-analytics",
      title: "Advertising and analytics",
      blocks: [
        {
          type: "paragraph",
          text: "The free version of the App may display advertising through Google AdMob. AdMob and its authorised advertising partners may process advertising identifiers, IP address, device and app information, consent choices and ad interaction data to deliver, limit, secure and measure advertising. The content of documents stored in TesSa is not intentionally provided to AdMob or advertisers. TesSa PRO removes advertising from the App.",
        },
        {
          type: "paragraph",
          text: "Where required by law, personalised advertising and access to non-essential device identifiers must be based on valid consent. Without valid consent, Google and its partners may process data only where another legal basis applies, including for limited or contextual advertising, security, fraud prevention, frequency capping or measurement where legally permitted.",
        },
        {
          type: "paragraph",
          text: "On the Site, ShinyStat is used only to measure aggregate visits. According to ShinyStat, IP addresses and navigation data are anonymised and aggregated in real time and complete IP addresses and non-aggregated navigation logs are not stored on disk by its analytics system. ShinyStat may use analytics cookies or similar technology and provides further information and an opt-out through its privacy page.",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "purchases",
      title: "App-store purchases",
      blocks: [
        {
          type: "paragraph",
          text: "The optional one-time TesSa PRO purchase is processed exclusively by Apple through the App Store or by Google through Google Play. We do not directly receive or store payment-card numbers or complete billing details. The applicable store may provide the App with limited information such as the product identifier, transaction or receipt data and purchase or entitlement status so that PRO can be activated or restored.",
        },
        {
          type: "paragraph",
          text: "Apple and Google process store-account, payment, tax, refund and transaction information under their own terms and privacy policies. Requests concerning payment methods or the store’s transaction records should be directed to the relevant store.",
        },
        {
          type: "links",
          items: [
            { label: "Apple Privacy Policy", url: "https://www.apple.com/legal/privacy/" },
            { label: "Google Privacy Policy", url: "https://policies.google.com/privacy" },
          ],
        },
      ],
    },
    {
      id: "backups-and-sharing",
      title: "Backups and user-controlled sharing",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa can create an encrypted backup file locally. We do not automatically receive or retain a copy. The user chooses where a backup is stored or transmitted and is responsible for protecting it and any information needed to access it. A storage, messaging or cloud service selected by the user processes the file under its own privacy terms.",
        },
        {
          type: "paragraph",
          text: "When a user chooses to share document information, TesSa may generate a link or QR code containing selected data in the URL. The data is encoded, including through Base64 encoding, but is not encrypted or password-protected. Anyone who obtains the link or QR code may be able to decode, read, copy or further share its contents.",
        },
        {
          type: "paragraph",
          text: "The link and its contents may appear in messages, browser history, link previews, screenshots, access or security logs, and services used to share or open it, including the Site hosting provider. We do not maintain a separate TesSa-controlled database copy of the shared document data and cannot revoke or remotely delete a link after it has been shared.",
        },
        {
          type: "paragraph",
          text: "Sharing is initiated and controlled by the user. Users should review the included data, choose trusted recipients and appropriate channels, and remove copies from messages, histories or third-party services when no longer needed.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Recipients and third-party services",
      blocks: [
        {
          type: "paragraph",
          text: "Depending on the feature and platform used, limited personal data may be processed by the following recipients. They receive only the categories necessary for their respective services and may act as processors or independent controllers according to the circumstances and their terms:",
        },
        {
          type: "list",
          items: [
            "Google, including AdMob, Google Analytics for Firebase, Google Play and the email service used for support;",
            "Apple, for App Store distribution, in-app purchase processing and platform services;",
            "Sevendata S.p.A., through ShinyStat, for aggregate Site access measurement;",
            "GitHub, through GitHub Pages, for static Site hosting and hosting security logs;",
            "public authorities, courts, professional advisers or other persons where disclosure is required by law or reasonably necessary to establish, exercise or defend legal claims.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not disclose personal data to corporate affiliates, data brokers, marketing-list providers or business partners, and we do not sell or rent personal data. Independent services deliberately selected by a user, such as a messaging or cloud-storage provider used to share a link or backup, receive data from the user rather than from a TesSa-controlled server.",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "international-transfers",
      title: "International data transfers",
      blocks: [
        {
          type: "paragraph",
          text: "Document content kept only in the App is not transferred internationally by us. Some third-party providers are established in, store data in, or permit access from countries outside the European Economic Area, including the United States. Their infrastructure and subprocessors may operate in additional countries.",
        },
        {
          type: "paragraph",
          text: "Where required, such transfers are protected through an applicable adequacy decision, a provider’s participation in a recognised data-transfer framework, European Commission standard contractual clauses or another lawful safeguard described in the provider’s terms. We do not claim our own certification under the EU–US Data Privacy Framework. Users should consult the linked provider notices for current locations and safeguards.",
        },
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      blocks: [
        {
          type: "paragraph",
          text: "We retain personal data only for as long as reasonably necessary for the purpose for which it is processed, subject to the following criteria:",
        },
        {
          type: "list",
          items: [
            "document data remains locally on the device until the user deletes it or removes the App data; exported backups and shared copies remain until deleted by the user or the third party holding them;",
            "support and privacy correspondence is kept for the time needed to answer and follow up, and longer only where necessary for a legal obligation or legal claim;",
            "locally stored PRO entitlement information remains until the App data is deleted, while Apple or Google retains transaction records under its own legal obligations and policy;",
            "analytics, advertising, hosting and security information is retained according to the applicable provider settings and policies and is deleted or aggregated when no longer required for the stated purpose.",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa uses measures designed to protect locally stored information, including an encrypted local database, encrypted backup files, the operating system’s application sandbox and optional App access controls such as a PIN or device biometric authentication. Access to camera and files is subject to operating-system permissions.",
        },
        {
          type: "paragraph",
          text: "No storage or transmission method is completely secure. Users must protect their device, App access code, backups and sharing links, install security updates and avoid rooted or jailbroken devices. Sharing-link payloads are encoded but not encrypted and should not be treated as confidential once disclosed to another person or service.",
        },
      ],
    },
    {
      id: "minors",
      title: "Minors",
      blocks: [
        {
          type: "paragraph",
          text: "The Services are intended for users aged 18 or over and are not directed to minors. We do not knowingly solicit personal data directly from minors. If we learn that a minor has sent personal data to us without appropriate authorisation, we will take reasonable steps to delete it where required.",
        },
        {
          type: "paragraph",
          text: "An authorised adult may use the App to store information concerning a minor under that adult’s care. That information remains local unless the adult chooses to export or share it, and the adult is responsible for having an appropriate legal basis and protecting the minor’s information.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your privacy rights",
      blocks: [
        {
          type: "paragraph",
          text: "Subject to the conditions and exceptions in applicable law, you may have the right to:",
        },
        {
          type: "list",
          items: [
            "obtain confirmation of whether personal data concerning you is processed and request access to it;",
            "request correction of inaccurate or incomplete personal data;",
            "request deletion of personal data;",
            "request restriction of processing;",
            "object to processing based on legitimate interests or to direct marketing;",
            "receive data you provided in a portable format where the legal requirements are met;",
            "withdraw consent at any time without affecting earlier lawful processing;",
            "lodge a complaint with the competent supervisory authority, including the Italian Data Protection Authority.",
          ],
        },
        {
          type: "paragraph",
          text: "Requests may be sent to baleen.devs@gmail.com. We may ask for information reasonably necessary to verify the request, but we are not required to collect additional data solely to identify a person. If we cannot link technical or aggregate data to the requester, we will explain that we are unable to identify the relevant record unless the requester provides information that makes identification possible.",
        },
        {
          type: "paragraph",
          text: "We cannot access, export, correct or remotely delete document data that exists only on a user’s device. The user can manage that data directly in the App. Requests concerning data controlled independently by Apple, Google, GitHub, ShinyStat or a service chosen by the user may need to be submitted to that provider.",
        },
        {
          type: "paragraph",
          text: "Where consent applies, it may be withdrawn through any consent controls made available by the relevant provider, through applicable device or platform privacy settings, or by contacting us. Withdrawal may affect personalised advertising or optional analytics but does not affect the App’s core local document-storage functions.",
        },
        { type: "links", items: privacyRightsLinks },
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies and similar technologies",
      blocks: [
        {
          type: "paragraph",
          text: "The App does not rely on browser cookies for its local document-storage functions. Third-party mobile SDKs may instead use application instances, advertising identifiers, local storage or similar technology as described above.",
        },
        {
          type: "paragraph",
          text: "The Site uses ShinyStat analytics cookies or similar technology for aggregate access counting. Users can manage cookies through their browser and use any opt-out made available on ShinyStat’s privacy page. Blocking optional technology may reduce measurement or advertising relevance but should not prevent access to the App’s core local functions.",
        },
        {
          type: "paragraph",
          text: "The browser, GitHub Pages and external websites reached through links may apply their own cookies, local storage or security logging under their respective policies. TesSa does not respond to legacy browser “Do Not Track” signals because there is no consistent technical standard for those signals; legally required consent and opt-out choices remain unaffected.",
        },
      ],
    },
    {
      id: "third-party-sites",
      title: "Third-party sites and services",
      blocks: [
        {
          type: "paragraph",
          text: "The Services may contain links to or interact with independent third-party sites and services. We do not control their content or privacy practices. Review the relevant privacy notice before providing data or using an external service. This does not limit any responsibility we have under applicable law for our own selection or integration of a provider.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this Policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Policy to reflect changes to the Services, providers or law. The revised version will be posted on this page with a new effective date. Where required by law, or where a change materially affects how personal data is processed, we will provide additional notice through an appropriate channel.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "For privacy questions or to exercise applicable rights, contact Carlo Andreotti, operating under the name Baleen Developers, at baleen.devs@gmail.com or by post at Via dei Boschi 30, 15072 Casal Cermelli (AL), Italy.",
        },
        {
          type: "paragraph",
          text: "This contact channel does not provide remote access to information stored only on a user’s device. Please describe the request without sending unnecessary copies of documents or other sensitive data.",
        },
      ],
    },
  ],
};

export const italianTermsDocument: LegalDocument = {
  effectiveDate: "2026-09-16",
  sections: [
    {
      id: "operator-and-scope",
      title: "Titolare e ambito di applicazione",
      blocks: [
        {
          type: "paragraph",
          text: "Le presenti Condizioni d’uso disciplinano l’applicazione mobile TesSa: tessere e documenti (l’“App”), il sito collegato disponibile all’indirizzo https://baleendevs.github.io/tessa (il “Sito”) e le funzionalità offerte tramite essi (congiuntamente, i “Servizi”). I Servizi sono messi a disposizione da Carlo Andreotti, sviluppatore indipendente persona fisica operante con il nome Baleen Developers, Via dei Boschi 30, 15072 Casal Cermelli (AL), Italia (“Baleen Developers”, “noi”, “ci” o “nostro”).",
        },
        {
          type: "paragraph",
          text: "Scaricando, accedendo o utilizzando i Servizi accetti le presenti Condizioni. Se non le accetti, non utilizzare i Servizi. Restano impregiudicati tutti i diritti inderogabili riconosciuti dalla normativa applicabile a tutela dei consumatori.",
        },
      ],
    },
    {
      id: "eligibility",
      title: "Requisiti di età",
      blocks: [
        {
          type: "paragraph",
          text: "I Servizi sono destinati a utenti che abbiano compiuto 18 anni. Una persona di età inferiore a 18 anni non deve utilizzare autonomamente i Servizi. Un adulto può utilizzare l’App per gestire informazioni relative a un minore o a un’altra persona soltanto se legalmente autorizzato a farlo.",
        },
      ],
    },
    {
      id: "purpose-and-official-status",
      title: "Finalità dell’App e assenza di valore ufficiale",
      blocks: [
        {
          type: "paragraph",
          text: "L’App consente di creare, conservare e visualizzare rappresentazioni digitali di tessere sanitarie italiane, documenti d’identità, patenti e altri documenti supportati, nonché di acquisire o visualizzare codici a barre e codici QR. TesSa è un’applicazione indipendente: non è emessa, gestita, approvata o patrocinata dal Governo italiano, dal Ministero della Salute, da autorità pubbliche o dagli enti che rilasciano i documenti.",
        },
        {
          type: "paragraph",
          text: "Le rappresentazioni digitali, le immagini, i codici a barre e i codici QR mostrati dall’App non sostituiscono i documenti originali e potrebbero non essere accettati da autorità, strutture sanitarie, imprese o altri soggetti. L’App non verifica autonomamente autenticità, esattezza, validità, scadenza o valore giuridico delle informazioni inserite, importate o acquisite. È tua responsabilità verificarne la correttezza e l’aggiornamento, conservare il documento originale quando richiesto e rispettare le regole applicabili alla sua esibizione e al suo utilizzo.",
        },
        {
          type: "paragraph",
          text: "L’App è esclusivamente uno strumento personale di comodità. Non costituisce un servizio di identificazione, certificazione, assistenza sanitaria, consulenza medica o legale, emergenza o pubblica amministrazione. Non fare affidamento sull’App quando un malfunzionamento, l’indisponibilità o il rifiuto di una rappresentazione digitale potrebbe incidere su salute, sicurezza, identificazione, accesso a cure o servizi pubblici, rispetto di una scadenza o esercizio di un diritto. Conserva e utilizza sempre il documento originale o il canale ufficiale pertinente quando richiesto.",
        },
      ],
    },
    {
      id: "licence-and-intellectual-property",
      title: "Licenza e proprietà intellettuale",
      blocks: [
        {
          type: "paragraph",
          text: "L’App è concessa in licenza e non venduta. Nel rispetto delle presenti Condizioni e delle regole dello store applicabile, ti viene concessa una licenza personale, limitata, non esclusiva, non trasferibile e revocabile per utilizzare l’App sui dispositivi che possiedi o controlli, esclusivamente per finalità personali lecite. Per l’App ottenuta tramite App Store si applica anche la Licenza standard per l’utente finale di Apple. L’utilizzo di Google Play è soggetto ai Termini di servizio di Google Play.",
        },
        {
          type: "paragraph",
          text: "L’App, il Sito, i nomi e i loghi Baleen Developers e TesSa, la grafica, i testi e gli altri materiali originali sono tutelati dalle norme sulla proprietà intellettuale e appartengono a noi o ai nostri licenzianti. Salvo quanto espressamente consentito dalla legge applicabile o da una licenza open source, non puoi copiare, modificare, distribuire, vendere, concedere in sublicenza, effettuare reverse engineering, decompilare o creare opere derivate dai Servizi.",
        },
        { type: "links", items: storeTerms },
      ],
    },
    {
      id: "acceptable-use",
      title: "Uso consentito",
      blocks: [
        {
          type: "paragraph",
          text: "Devi utilizzare i Servizi nel rispetto della legge e non puoi:",
        },
        {
          type: "list",
          items: [
            "creare, conservare, mostrare o condividere dati personali o documentali senza esserne autorizzato;",
            "utilizzare una rappresentazione digitale o un link di condivisione per impersonare un’altra persona, commettere frodi o presentarla come documento ufficiale o giuridicamente valido;",
            "violare la riservatezza, la proprietà intellettuale o altri diritti altrui;",
            "interferire con i Servizi, danneggiarli, aggirarne o verificarne senza autorizzazione le misure di sicurezza oppure introdurre codice dannoso;",
            "utilizzare i Servizi per finalità illecite, dannose o ingannevoli.",
          ],
        },
        {
          type: "paragraph",
          text: "Nei limiti consentiti dalla legge, sei responsabile delle perdite e dei costi ragionevoli direttamente causati a noi dal tuo utilizzo intenzionale, fraudolento o comunque illecito dei Servizi, incluse le pretese documentate di terzi derivanti da tale utilizzo.",
        },
      ],
    },
    {
      id: "local-storage-and-backups",
      title: "Archiviazione locale, sicurezza e backup",
      blocks: [
        {
          type: "paragraph",
          text: "Le informazioni, le immagini dei documenti e le rappresentazioni digitali create o importate nell’App sono conservate principalmente in locale sul tuo dispositivo. Non forniamo account, archiviazione cloud o un servizio di backup cloud per tali informazioni. Sei responsabile della sicurezza del dispositivo e dell’accesso all’App, dello spazio di archiviazione disponibile e dell’esportazione degli eventuali backup che desideri conservare prima di disinstallare l’App, reimpostare il dispositivo o cambiarlo.",
        },
        {
          type: "paragraph",
          text: "I file di backup possono contenere dati personali e documentali sensibili. Dopo l’esportazione, la copia, il caricamento su un servizio di terzi o altra condivisione al di fuori dell’App, sei responsabile della loro sicurezza, conservazione, trasmissione e cancellazione. L’App adotta misure tecniche volte a proteggere i dati locali e i backup, ma nessun metodo di archiviazione elettronica o cifratura può essere garantito come completamente sicuro. Il root, il jailbreak o altre modifiche che indeboliscono la sicurezza del dispositivo possono compromettere l’App e i suoi dati.",
        },
        {
          type: "paragraph",
          text: "L’App non è un servizio di backup, archiviazione o ripristino di emergenza. Non possiamo recuperare informazioni rimaste soltanto sul tuo dispositivo o in un backup sotto il tuo controllo. Assumi il rischio della perdita irreversibile causata da cancellazione, disinstallazione, perdita o danneggiamento del dispositivo, spazio insufficiente, operazioni del sistema operativo, migrazione non riuscita, smarrimento di password o chiavi di cifratura o mancata conservazione di un backup indipendente e utilizzabile.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Link di condivisione e dati di terzi",
      blocks: [
        {
          type: "paragraph",
          text: "L’App può consentirti di generare e condividere link o codici QR contenenti dati documentali selezionati. I dati scelti sono codificati nel link per la trasmissione, ma non sono cifrati. Chiunque ottenga il link potrebbe leggere le informazioni che contiene. I link non sono protetti da un account o da una password TesSa e non possono essere revocati tramite l’App. Controlla le informazioni incluse prima di condividerle e invia i link soltanto a destinatari fidati, attraverso canali appropriati.",
        },
        {
          type: "paragraph",
          text: "Puoi creare, conservare, mostrare o condividere informazioni relative a un’altra persona soltanto se sei legalmente autorizzato a farlo. Sei responsabile dell’ottenimento degli eventuali consensi o autorizzazioni necessari e del rispetto della normativa applicabile. Non controlliamo il modo in cui destinatari, servizi di messaggistica, browser, servizi di archiviazione cloud o altri terzi conservano, utilizzano o ridistribuiscono le informazioni dopo che hai scelto di condividerle.",
        },
        {
          type: "paragraph",
          text: "La creazione o l’invio di un link costituisce una comunicazione di dati avviata da te. Assumi i rischi derivanti dalla scelta di dati, destinatario o canale errati, dall’inoltro da parte del destinatario, dall’intercettazione, dalla copia, dagli screenshot, dalla cronologia del browser o della messaggistica e da qualsiasi successivo utilizzo delle informazioni da parte di chi ottenga il link.",
        },
      ],
    },
    {
      id: "pro-purchase",
      title: "Acquisto di TesSa PRO",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa può offrire un acquisto in-app PRO opzionale, una tantum e non consumabile, che rimuove la pubblicità e sblocca funzionalità aggiuntive. Non si tratta di un abbonamento. Il prezzo e le eventuali imposte sono mostrati da App Store o Google Play prima dell’acquisto. Il pagamento è elaborato dallo store interessato; non raccogliamo direttamente i dati della tua carta di pagamento.",
        },
        {
          type: "paragraph",
          text: "Conferma, ripristino, annullamento e richieste di rimborso dell’acquisto sono gestiti secondo le regole e le procedure dello store tramite il quale hai acquistato PRO. L’accesso può dipendere dall’account dello store utilizzato e dai relativi meccanismi di ripristino. Le presenti Condizioni non limitano il diritto a rimborsi, rimedi per difetto di conformità o altri rimedi riconosciuti dalla normativa inderogabile a tutela dei consumatori.",
        },
      ],
    },
    {
      id: "third-party-services",
      title: "Pubblicità e servizi di terze parti",
      blocks: [
        {
          type: "paragraph",
          text: "La versione gratuita dell’App può mostrare pubblicità fornita da terzi. L’App e il Sito utilizzano inoltre componenti o servizi di terze parti e possono contenere collegamenti a servizi che non controlliamo. A tali servizi si applicano le rispettive condizioni e informative sulla privacy. Rispondiamo della scelta e dell’integrazione dei componenti di terzi nella misura prevista dalla legge, ma non controlliamo i contenuti, la disponibilità o le pratiche indipendenti di tali soggetti.",
        },
        {
          type: "paragraph",
          text: "Alcune funzionalità richiedono una connessione Internet. Possono applicarsi le condizioni e i costi del tuo operatore di rete, inclusi quelli di roaming.",
        },
        { type: "links", items: thirdPartyTerms },
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "La nostra Informativa sulla privacy spiega come vengono trattati i dati personali durante l’utilizzo dell’App e del Sito. Descrive inoltre la distinzione tra le informazioni conservate localmente nell’App e i dati trattati dai servizi di terze parti.",
        },
        {
          type: "links",
          items: [
            {
              label: "Informativa sulla privacy di TesSa",
              url: "https://baleendevs.github.io/tessa/privacy",
            },
          ],
        },
      ],
    },
    {
      id: "availability-and-updates",
      title: "Disponibilità, compatibilità e aggiornamenti",
      blocks: [
        {
          type: "paragraph",
          text: "Possiamo mantenere, correggere, migliorare o modificare i Servizi e i relativi requisiti tecnici. Forniremo gli aggiornamenti, inclusi quelli di sicurezza, nei casi e per il periodo previsti dalla legge applicabile. Devi installare entro un termine ragionevole gli aggiornamenti resi disponibili tramite lo store pertinente. Nei limiti consentiti dalla legge, non rispondiamo di un problema causato esclusivamente dalla mancata installazione di un aggiornamento dopo che sei stato informato della sua disponibilità e delle conseguenze della mancata installazione.",
        },
        {
          type: "paragraph",
          text: "Non garantiamo che ogni funzionalità rimanga compatibile con qualsiasi dispositivo o versione del sistema operativo, né che i Servizi siano sempre ininterrotti o privi di errori. Possiamo sospendere o interrompere tutti o parte dei Servizi per ragioni legali, di sicurezza, tecniche o commerciali, fornendo un preavviso ragionevole ove possibile e rispettando i diritti connessi agli acquisti e gli altri diritti inderogabili dei consumatori.",
        },
        {
          type: "paragraph",
          text: "La disponibilità può inoltre dipendere da store, fornitori dei sistemi operativi, produttori dei dispositivi, operatori di rete ed eventi al di fuori del nostro ragionevole controllo. Nei limiti consentiti dalla legge, non rispondiamo di ritardi, interruzioni o impossibilità di adempiere causati da tali eventi.",
        },
      ],
    },
    {
      id: "responsibility",
      title: "Responsabilità",
      blocks: [
        {
          type: "paragraph",
          text: "Sei responsabile delle informazioni che inserisci o importi, delle persone di cui gestisci le informazioni, dei destinatari che scegli, della sicurezza e disponibilità del dispositivo e dei backup e del rispetto della legge applicabile. Non fare affidamento sull’App come unico luogo di conservazione delle informazioni o come sostituto del documento originale.",
        },
        {
          type: "paragraph",
          text: "Fatte salve le garanzie che non possono essere escluse per legge, i Servizi sono forniti “così come sono” e “secondo disponibilità”. Non prestiamo ulteriori garanzie circa continuità, assenza di errori, sicurezza, compatibilità con ogni dispositivo o sistema, esattezza delle acquisizioni, dei codici a barre, dei codici QR o dei dati inseriti dall’utente, né circa l’accettazione di una rappresentazione digitale per uno scopo particolare.",
        },
        {
          type: "paragraph",
          text: "Nella misura massima consentita dalla legge, non rispondiamo delle perdite causate da uso non autorizzato, improprio o illecito dei Servizi; dati inesatti, incompleti o non aggiornati forniti dall’utente; affidamento su una rappresentazione digitale anziché sull’originale o sul canale ufficiale; perdita o compromissione del dispositivo, dei dati locali o di un backup esportato; divulgazione di un link da parte tua o di un destinatario; malfunzionamento di un servizio indipendente di terzi; oppure mancata disponibilità di connessione, spazio, credenziali, backup o sistema operativo supportato. Tali esclusioni si applicano soltanto quando la perdita non è imputabile alla violazione di un nostro obbligo di legge.",
        },
        {
          type: "paragraph",
          text: "Nella misura massima consentita dalla legge, non rispondiamo di danni indiretti, incidentali, speciali o consequenziali, perdita o corruzione di dati, perdita di profitti, ricavi, opportunità o reputazione, scadenze o appuntamenti mancati, negato accesso a benefici o servizi o costi sostenuti per servizi sostitutivi, quando tali conseguenze non erano ragionevolmente prevedibili in caso di nostro inadempimento o derivano da un rischio posto a tuo carico dalle presenti Condizioni.",
        },
        {
          type: "paragraph",
          text: "Nessuna disposizione delle presenti Condizioni esclude o limita responsabilità che non possono essere escluse o limitate per legge, incluse quelle derivanti da frode, dolo o colpa grave, morte o danni alla persona causati da un nostro fatto od omissione, violazione di obblighi di ordine pubblico, né i diritti e i rimedi riconosciuti ai consumatori da norme inderogabili.",
        },
      ],
    },
    {
      id: "termination",
      title: "Cessazione dell’utilizzo",
      blocks: [
        {
          type: "paragraph",
          text: "Puoi interrompere l’utilizzo dei Servizi e disinstallare l’App in qualsiasi momento. Prima della disinstallazione o della cancellazione dei dati locali, esporta gli eventuali backup che desideri conservare. La licenza d’uso termina automaticamente in caso di violazione sostanziale delle presenti Condizioni, fatti salvi il preavviso o il termine per porre rimedio eventualmente richiesti dalla legge. Le disposizioni che per loro natura devono continuare a produrre effetti, incluse quelle in materia di proprietà intellettuale, responsabilità, legge applicabile e controversie, restano efficaci.",
        },
      ],
    },
    {
      id: "changes",
      title: "Modifiche alle Condizioni",
      blocks: [
        {
          type: "paragraph",
          text: "Possiamo aggiornare le presenti Condizioni per riflettere modifiche ai Servizi, alla legge, ai requisiti di sicurezza o alla nostra attività. La versione aggiornata sarà pubblicata su questa pagina con una nuova data di entrata in vigore. Quando richiesto dalla legge, o se una modifica incide in modo sostanziale e sfavorevole su funzionalità a pagamento, forniremo un ulteriore avviso tramite un canale appropriato prima della sua efficacia. Le modifiche valgono per il futuro e non eliminano diritti già acquisiti in base a norme inderogabili.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Legge applicabile e controversie",
      blocks: [
        {
          type: "paragraph",
          text: "Le presenti Condizioni sono regolate dalla legge italiana. Se sei un consumatore, tale scelta non ti priva della tutela assicurata dalle norme inderogabili del Paese in cui risiedi abitualmente e le controversie possono essere proposte davanti ai giudici competenti ai sensi della normativa applicabile a tutela dei consumatori, incluso, quando previsto, il foro del tuo luogo di residenza o domicilio. Negli altri casi è competente in via esclusiva il Foro di Alessandria.",
        },
        {
          type: "paragraph",
          text: "Prima di avviare un procedimento formale puoi contattarci per tentare una soluzione informale. Ciò non limita il tuo diritto di ricorrere all’autorità giudiziaria o ad altri rimedi previsti dalla legge applicabile.",
        },
      ],
    },
    {
      id: "general",
      title: "Disposizioni generali",
      blocks: [
        {
          type: "paragraph",
          text: "Se una disposizione delle presenti Condizioni è ritenuta invalida o inefficace, le restanti disposizioni rimangono efficaci e quella interessata si applica nella misura massima consentita dalla legge. Il mancato esercizio di un diritto non costituisce rinuncia. Le presenti Condizioni, insieme alle eventuali condizioni dello store applicabile e all’Informativa sulla privacy, costituiscono l’accordo che disciplina l’utilizzo dei Servizi; in caso di contrasto prevalgono le norme inderogabili.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contatti",
      blocks: [
        {
          type: "paragraph",
          text: "Per domande, reclami o assistenza relativi alle presenti Condizioni o ai Servizi, puoi contattare Carlo Andreotti, operante con il nome Baleen Developers, all’indirizzo baleen.devs@gmail.com oppure per posta a Via dei Boschi 30, 15072 Casal Cermelli (AL), Italia.",
        },
      ],
    },
  ],
};

export const legalDocuments = {
  terms: termsDocument,
  privacy: privacyDocument,
} as const;

export const legalDocumentsByLocale = {
  it: {
    terms: italianTermsDocument,
    privacy: italianPrivacyDocument,
  },
  en: legalDocuments,
} as const;
