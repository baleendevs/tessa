import type { Locale } from "@/lib/site";

type MarketingSection = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomeContent = {
  skipLink: string;
  navigation: {
    documents: string;
    howItWorks: string;
    sharing: string;
    privacy: string;
    faq: string;
    download: string;
    menu: string;
  };
  hero: MarketingSection & {
    platformNote: string;
    secondaryAction: string;
    imageAlt: string;
  };
  wallet: MarketingSection & {
    cards: Array<{ short: string; name: string; detail: string }>;
    imageAlt: string;
  };
  access: MarketingSection & {
    detailsLabel: string;
    barcodeLabel: string;
    detailsAlt: string;
    barcodeAlt: string;
  };
  family: MarketingSection & {
    imageAlt: string;
  };
  sharing: MarketingSection & {
    qr: string;
    link: string;
    note: string;
    imageAlt: string;
  };
  privacy: MarketingSection & {
    local: string;
    pin: string;
    biometric: string;
    settingsAlt: string;
    pinAlt: string;
  };
  backup: MarketingSection & {
    create: string;
    manual: string;
    encrypted: string;
    restore: string;
    restoreNote: string;
  };
  showcase: MarketingSection & {
    walletLabel: string;
    detailsLabel: string;
    sharingLabel: string;
    organiseLabel: string;
    walletAlt: string;
    detailsAlt: string;
    sharingAlt: string;
    organiseAlt: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ question: string; answer: string }>;
  };
  finalCta: MarketingSection;
  stores: {
    googleAlt: string;
    appleAlt: string;
  };
  footer: {
    description: string;
    product: string;
    legal: string;
    copyright: string;
  };
};

export type Dictionary = {
  localeName: string;
  languageSwitchLabel: string;
  navigation: {
    home: string;
    terms: string;
    privacy: string;
  };
  theme: {
    switchToDark: string;
    switchToLight: string;
  };
  home: HomeContent;
  share: {
    eyebrow: string;
    title: string;
    description: string;
    notice: string;
    loading: string;
    detailsTitle: string;
    categoriesTitle: string;
    categoryLabel: string;
    notProvided: string;
    documentTypes: {
      TS: string;
      CIE: string;
      P: string;
    };
    fields: {
      surname: string;
      givenName: string;
      fiscalCode: string;
      sex: string;
      birthPlace: string;
      birthProvince: string;
      birthDate: string;
      expiryDate: string;
      institutionNumber: string;
      cardNumber: string;
      issuingMunicipality: string;
      nationality: string;
      serialNumber: string;
      height: string;
      issueDate: string;
      cardAccessNumber: string;
      parentsOrGuardians: string;
      residenceAddress: string;
      birthCertificateDetails: string;
      mrz: string;
      licenceNumber: string;
      issuingAuthority: string;
      codes: string;
      managementField: string;
      category: string;
    };
    states: {
      missingTitle: string;
      missingDescription: string;
      malformedTitle: string;
      malformedDescription: string;
      tooLargeTitle: string;
      tooLargeDescription: string;
      unsupportedTitle: string;
      unsupportedDescription: string;
      legacyTitle: string;
      legacyDescription: string;
      backHome: string;
    };
    appPrompt: string;
    android: string;
    ios: string;
  };
  legal: {
    termsTitle: string;
    privacyTitle: string;
    eyebrow: string;
    preservedLabel: string;
    pendingReview: string;
    sourceLanguageNote: string;
    contentsLabel: string;
    effectiveDateLabel: string;
    updatedDateLabel: string;
    updatedDateUnavailable: string;
    providerLabel: string;
    reviewStatusLabel: string;
    reviewStatus: string;
    backHome: string;
  };
  notFound: {
    title: string;
    description: string;
    action: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  it: {
    localeName: "Italiano",
    languageSwitchLabel: "Passa all'inglese",
    navigation: {
      home: "Home",
      terms: "Condizioni d'uso",
      privacy: "Privacy",
    },
    theme: {
      switchToDark: "Passa al tema scuro",
      switchToLight: "Passa al tema chiaro",
    },
    home: {
      skipLink: "Vai al contenuto",
      navigation: {
        documents: "Documenti",
        howItWorks: "Come funziona",
        sharing: "Condivisione",
        privacy: "Privacy",
        faq: "FAQ",
        download: "Scarica",
        menu: "Menu",
      },
      hero: {
        eyebrow: "TesSa per Android e iOS",
        title: "I tuoi documenti, sempre a portata di mano.",
        description:
          "TesSa è l'app per tenere insieme Tessera Sanitaria, CIE e patente di guida sul tuo dispositivo. Disponibile per Android e iOS.",
        platformNote: "Nessun account necessario per organizzare il tuo portafoglio.",
        secondaryAction: "Scopri come funziona",
        imageAlt:
          "Schermata reale di TesSa con Tessera Sanitaria, CIE e altri documenti nel portafoglio",
      },
      wallet: {
        eyebrow: "Il tuo portafoglio",
        title: "Un portafoglio. I documenti che usi davvero.",
        description:
          "Raccogli Tessera Sanitaria, CIE e patente di guida e ritrovale per persona o tipologia.",
        cards: [
          { short: "TS", name: "Tessera Sanitaria", detail: "Dati e codici a barre supportati" },
          { short: "CIE", name: "Carta d'Identità Elettronica", detail: "Dettagli personali essenziali" },
          { short: "B", name: "Patente di guida", detail: "Categorie e scadenze" },
        ],
        imageAlt: "Vista compatta reale del portafoglio TesSa con documenti di più persone",
      },
      access: {
        eyebrow: "Pronto all'uso",
        title: "Quello che ti serve, in pochi secondi.",
        description:
          "Apri i dati del documento e i codici a barre supportati senza cercare tra foto e appunti.",
        detailsLabel: "Dettagli ordinati",
        barcodeLabel: "Codici a barre a schermo intero",
        detailsAlt: "Schermata reale con i dettagli ordinati di una Tessera Sanitaria",
        barcodeAlt: "Schermata reale di TesSa che mostra un codice a barre a schermo intero",
      },
      family: {
        eyebrow: "Più persone, un dispositivo",
        title: "I tuoi documenti. E quelli della tua famiglia.",
        description:
          "Organizza sullo stesso dispositivo i documenti di più persone e trova subito quello che serve.",
        imageAlt: "Schermata reale del portafoglio TesSa organizzato per più persone",
      },
      sharing: {
        eyebrow: "Un gesto intenzionale",
        title: "Condividi quando lo decidi tu.",
        description:
          "Avvia da TesSa il trasferimento di una tessera tramite codice QR o link.",
        qr: "Codice QR",
        link: "Link",
        note: "La condivisione parte sempre da una tua azione nell'app.",
        imageAlt: "Schermata reale di TesSa con il codice QR per condividere una tessera",
      },
      privacy: {
        eyebrow: "Locale per scelta",
        title: "I dati del portafoglio restano sul tuo dispositivo.",
        description:
          "TesSa memorizza localmente i dati dei documenti e non usa un cloud proprietario per conservare il tuo portafoglio. Puoi proteggere l'accesso con PIN o biometria.",
        local: "Memorizzazione locale",
        pin: "PIN facoltativo",
        biometric: "Accesso biometrico",
        settingsAlt: "Schermata reale delle impostazioni TesSa con PIN, biometria e backup",
        pinAlt: "Schermata reale di accesso a TesSa protetto da PIN e impronta digitale",
      },
      backup: {
        eyebrow: "Continuità sotto il tuo controllo",
        title: "Il tuo portafoglio, pronto a seguirti.",
        description:
          "Crea un backup cifrato, esportalo dove preferisci e ripristinalo quando serve. Backup e ripristino sono disponibili gratuitamente.",
        create: "Creazione del backup",
        manual: "Esportazione manuale",
        encrypted: "File cifrato nell'app",
        restore: "Ripristino quando serve",
        restoreNote:
          "Il ripristino sostituisce il portafoglio corrente solo dopo la tua conferma.",
      },
      showcase: {
        eyebrow: "Il prodotto, davvero",
        title: "TesSa, nei gesti di ogni giorno.",
        description:
          "Cerca, consulta, condividi e gestisci i tuoi documenti con un'interfaccia semplice e riconoscibile.",
        walletLabel: "Cerca e filtra",
        detailsLabel: "Consulta i dettagli",
        sharingLabel: "Condividi con QR o link",
        organiseLabel: "Aggiungi ciò che serve",
        walletAlt: "Portafoglio reale TesSa con ricerca e filtri per tipo di documento",
        detailsAlt: "Dettaglio reale di un documento in TesSa",
        sharingAlt: "Pannello reale di condivisione tramite codice QR in TesSa",
        organiseAlt: "Menu reale di TesSa per aggiungere un documento",
      },
      faq: {
        eyebrow: "Domande frequenti",
        title: "Prima di mettere tutto in ordine.",
        description: "Risposte chiare alle domande più comuni su TesSa.",
        items: [
          { question: "Quali documenti posso aggiungere a TesSa?", answer: "TesSa supporta Tessera Sanitaria, Carta d'Identità Elettronica (CIE) e patente di guida." },
          { question: "Posso organizzare i documenti di più persone?", answer: "Sì. Puoi tenere sullo stesso dispositivo i documenti di più persone, per esempio quelli dei tuoi familiari. TesSa non richiede la creazione di un account." },
          { question: "Dove conserva TesSa i dati dei miei documenti?", answer: "I dati del tuo portafoglio sono memorizzati localmente sul dispositivo. TesSa non li salva su un proprio servizio cloud." },
          { question: "Come condivido un documento tramite codice QR o link?", answer: "Apri il documento in TesSa e scegli di condividerlo tramite codice QR o link. La condivisione parte sempre da una tua azione nell'app." },
          { question: "Cosa devo sapere sui link condivisi?", answer: "Il link contiene i dati del documento condiviso e non è cifrato né protetto da password. Chi riceve il link può visualizzare le informazioni condivise: invialo quindi solo alla persona giusta e trattalo come un documento personale." },
          { question: "Come funzionano backup e ripristino?", answer: "TesSa ti permette gratuitamente di creare un file di backup cifrato del tuo portafoglio. Puoi poi esportarlo manualmente per conservarne una copia dove preferisci e, quando serve, utilizzarlo per ripristinare il portafoglio. Il ripristino sostituisce i dati attuali solo dopo la tua conferma." },
          { question: "Dove trovo il backup che ho creato?", answer: "Quando crei un backup, il file rimane nello spazio interno di TesSa e non compare automaticamente tra i file del dispositivo. Per conservarne una copia fuori dall'app, usa la funzione di esportazione e scegli dove salvarlo o condividerlo." },
          { question: "Come posso proteggere l'accesso ai miei documenti?", answer: "Puoi proteggere l'accesso a TesSa con un PIN e, sui dispositivi compatibili, utilizzare anche l'autenticazione biometrica." },
          { question: "TesSa è un'app ufficiale della Pubblica Amministrazione?", answer: "No. TesSa è un'app indipendente e non è un'app ufficiale della Pubblica Amministrazione. Ti aiuta a organizzare e consultare i dati dei tuoi documenti, ma non sostituisce i documenti originali." },
          { question: "Su quali dispositivi posso usare TesSa?", answer: "TesSa è disponibile per Android e iOS." },
        ],
      },
      finalCta: {
        eyebrow: "Pronta per Android e iOS",
        title: "Metti ordine nei tuoi documenti.",
        description: "Scarica TesSa per Android o iOS.",
      },
      stores: {
        googleAlt: "Scarica TesSa da Google Play",
        appleAlt: "Scarica TesSa dall'App Store",
      },
      footer: {
        description: "Il portafoglio locale per i documenti personali che usi ogni giorno.",
        product: "Prodotto",
        legal: "Informazioni legali",
        copyright: "Baleen Developers. Tutti i diritti riservati.",
      },
    },
    share: {
      eyebrow: "Condivisione TesSa",
      title: "Tessera condivisa",
      description:
        "I dettagli visualizzati provengono dal link che hai aperto.",
      notice:
        "Questo link contiene i dati mostrati qui. Trattalo come un documento personale.",
      loading: "Lettura della tessera condivisa…",
      detailsTitle: "Dettagli condivisi",
      categoriesTitle: "Categorie della patente",
      categoryLabel: "Categoria",
      notProvided: "Non indicato",
      documentTypes: {
        TS: "Tessera Sanitaria",
        CIE: "Carta d'Identità Elettronica",
        P: "Patente di guida",
      },
      fields: {
        surname: "Cognome",
        givenName: "Nome",
        fiscalCode: "Codice Fiscale",
        sex: "Sesso",
        birthPlace: "Luogo di nascita",
        birthProvince: "Provincia / Stato",
        birthDate: "Data di nascita",
        expiryDate: "Data di scadenza",
        institutionNumber: "Numero istituzione",
        cardNumber: "Numero tessera",
        issuingMunicipality: "Comune di emissione",
        nationality: "Cittadinanza",
        serialNumber: "Numero di serie",
        height: "Statura",
        issueDate: "Data di emissione",
        cardAccessNumber: "Card Access Number",
        parentsOrGuardians: "Genitori / tutori",
        residenceAddress: "Indirizzo di residenza",
        birthCertificateDetails: "Estremi dell'atto di nascita",
        mrz: "MRZ",
        licenceNumber: "Numero patente",
        issuingAuthority: "Rilasciata da",
        codes: "Codici / restrizioni",
        managementField: "Gestione patente",
        category: "Categoria",
      },
      states: {
        missingTitle: "Nessuna tessera condivisa",
        missingDescription:
          "Apri il link completo creato da TesSa per visualizzare una tessera.",
        malformedTitle: "Non riusciamo a leggere questo link",
        malformedDescription:
          "Il link potrebbe essere incompleto o danneggiato. Chiedi a chi lo ha condiviso di generarne uno nuovo.",
        tooLargeTitle: "Questo link non può essere aperto",
        tooLargeDescription:
          "La quantità di dati nel link supera i limiti previsti per una tessera TesSa.",
        unsupportedTitle: "Documento non supportato",
        unsupportedDescription:
          "Questa versione dell'anteprima non riconosce il tipo di documento contenuto nel link.",
        legacyTitle: "Contenuto legacy non disponibile",
        legacyDescription:
          "Questo tipo di contenuto precedente non può essere visualizzato in questa anteprima.",
        backHome: "Torna al sito TesSa",
      },
      appPrompt: "TesSa è disponibile per Android e iOS.",
      android: "Scarica da Google Play",
      ios: "Scarica dall'App Store",
    },
    legal: {
      termsTitle: "Condizioni d'uso",
      privacyTitle: "Informativa sulla privacy",
      eyebrow: "Informazioni legali",
      preservedLabel: "Testo pubblico esistente conservato",
      pendingReview:
        "Il testo seguente è il documento pubblico esistente, conservato in inglese senza modifiche sostanziali. Risale al 30 settembre 2020 e richiede revisione legale e traduzione prima del lancio.",
      sourceLanguageNote: "Il contenuto sostanziale è disponibile nella lingua originale inglese.",
      contentsLabel: "In questa pagina",
      effectiveDateLabel: "Data di efficacia dichiarata",
      updatedDateLabel: "Ultimo aggiornamento",
      updatedDateUnavailable: "Non indicato nel testo esistente",
      providerLabel: "Fornitore indicato",
      reviewStatusLabel: "Stato della revisione",
      reviewStatus: "Revisione sostanziale e traduzione in sospeso",
      backHome: "Torna a TesSa",
    },
    notFound: {
      title: "Pagina non trovata",
      description: "La pagina richiesta non è disponibile.",
      action: "Torna a TesSa",
    },
  },
  en: {
    localeName: "English",
    languageSwitchLabel: "Switch to Italian",
    navigation: {
      home: "Home",
      terms: "Terms of Use",
      privacy: "Privacy",
    },
    theme: {
      switchToDark: "Switch to dark theme",
      switchToLight: "Switch to light theme",
    },
    home: {
      skipLink: "Skip to content",
      navigation: {
        documents: "Documents",
        howItWorks: "How it works",
        sharing: "Sharing",
        privacy: "Privacy",
        faq: "FAQ",
        download: "Download",
        menu: "Menu",
      },
      hero: {
        eyebrow: "TesSa for Android and iOS",
        title: "Your documents, ready when you need them.",
        description:
          "TesSa is the mobile app for keeping your Italian health card, CIE and driving licence together on your device. Available for Android and iOS.",
        platformNote: "No account is needed to organise your wallet.",
        secondaryAction: "See how it works",
        imageAlt:
          "Real TesSa screen showing an Italian health card, CIE and other documents in the wallet",
      },
      wallet: {
        eyebrow: "Your wallet",
        title: "One wallet. The documents you actually use.",
        description:
          "Bring together your Italian health card, CIE and driving licence, then find them by person or type.",
        cards: [
          { short: "TS", name: "Italian health card", detail: "Details and supported barcodes" },
          { short: "CIE", name: "Electronic Identity Card", detail: "Essential personal details" },
          { short: "B", name: "Driving licence", detail: "Categories and expiry dates" },
        ],
        imageAlt: "Real compact TesSa wallet view showing documents for several people",
      },
      access: {
        eyebrow: "Ready to use",
        title: "What you need, in seconds.",
        description:
          "Open document details and supported barcodes without searching through photos and notes.",
        detailsLabel: "Organised details",
        barcodeLabel: "Full-screen barcodes",
        detailsAlt: "Real screen showing organised Italian health card details in TesSa",
        barcodeAlt: "Real TesSa screen showing a barcode at full size",
      },
      family: {
        eyebrow: "Several people, one device",
        title: "Your documents. And your family's.",
        description:
          "Organise documents for several people on the same device and find the right one quickly.",
        imageAlt: "Real TesSa wallet screen organised for several people",
      },
      sharing: {
        eyebrow: "A deliberate action",
        title: "Share when you choose.",
        description:
          "Start a card transfer from TesSa using a QR code or link.",
        qr: "QR code",
        link: "Link",
        note: "Sharing always starts with an action you take in the app.",
        imageAlt: "Real TesSa screen showing a QR code used to share a card",
      },
      privacy: {
        eyebrow: "Local by design",
        title: "Your document records stay on your device.",
        description:
          "TesSa stores document records locally and does not use a proprietary cloud service to hold your wallet. You can protect access with a PIN or biometrics.",
        local: "Local storage",
        pin: "Optional PIN",
        biometric: "Biometric access",
        settingsAlt: "Real TesSa settings screen showing PIN, biometrics and backup",
        pinAlt: "Real TesSa access screen protected by PIN and fingerprint",
      },
      backup: {
        eyebrow: "Continuity on your terms",
        title: "Take your wallet with you.",
        description:
          "Create an encrypted backup, export it wherever you choose and restore it when needed. Backup and restore are available free to everyone.",
        create: "Create a backup",
        manual: "Manual export",
        encrypted: "Encrypted file stored in TesSa",
        restore: "Restore when needed",
        restoreNote:
          "Restoring replaces the current wallet only after you confirm it.",
      },
      showcase: {
        eyebrow: "The real product",
        title: "TesSa in everyday use.",
        description:
          "Find, view, share and manage documents through a clear, familiar interface.",
        walletLabel: "Search and filter",
        detailsLabel: "View the details",
        sharingLabel: "Share by QR code or link",
        organiseLabel: "Add what you need",
        walletAlt: "Real TesSa wallet with search and document-type filters",
        detailsAlt: "Real document detail view in TesSa",
        sharingAlt: "Real TesSa sharing panel with a QR code",
        organiseAlt: "Real TesSa menu for adding a document",
      },
      faq: {
        eyebrow: "Frequently asked questions",
        title: "Before you bring everything together.",
        description: "Clear answers to common questions about TesSa.",
        items: [
          { question: "Which documents can I add to TesSa?", answer: "TesSa supports the Italian health card, Electronic Identity Card (CIE) and driving licence." },
          { question: "Can I organise documents for more than one person?", answer: "Yes. You can keep documents for several people on the same device, for example members of your family. TesSa does not require you to create an account." },
          { question: "Where does TesSa store my document data?", answer: "Your wallet data is stored locally on your device. TesSa does not store it on its own cloud service." },
          { question: "How do I share a document using a QR code or link?", answer: "Open the document in TesSa and choose to share it using a QR code or link. Sharing always starts with an action you take in the app." },
          { question: "What should I know about shared links?", answer: "The link contains the data from the shared document and is not encrypted or password-protected. Anyone who receives the link can view the shared information, so send it only to the intended person and treat it like a personal document." },
          { question: "How do backup and restore work?", answer: "TesSa lets you create an encrypted backup file of your wallet free of charge. You can then export it manually to keep a copy wherever you prefer and use it to restore your wallet when needed. Restoring replaces your current data only after you confirm." },
          { question: "Where can I find the backup I created?", answer: "When you create a backup, the file remains in TesSa's internal app storage and does not automatically appear among the files on your device. To keep a copy outside the app, use the export function and choose where to save or share it." },
          { question: "How can I protect access to my documents?", answer: "You can protect access to TesSa with a PIN and, on compatible devices, also use biometric authentication." },
          { question: "Is TesSa an official Public Administration app?", answer: "No. TesSa is an independent app and is not an official Public Administration app. It helps you organise and view your document data, but it does not replace the original documents." },
          { question: "Which devices can I use TesSa on?", answer: "TesSa is available for Android and iOS." },
        ],
      },
      finalCta: {
        eyebrow: "Ready for Android and iOS",
        title: "Bring your documents together.",
        description: "Download TesSa for Android or iOS.",
      },
      stores: {
        googleAlt: "Get TesSa on Google Play",
        appleAlt: "Download TesSa on the App Store",
      },
      footer: {
        description: "The local-first wallet for the personal documents you use every day.",
        product: "Product",
        legal: "Legal information",
        copyright: "Baleen Developers. All rights reserved.",
      },
    },
    share: {
      eyebrow: "TesSa sharing",
      title: "Shared card",
      description:
        "The details displayed here come from the link you opened.",
      notice:
        "This link contains the details shown here. Treat it like a personal document.",
      loading: "Reading the shared card…",
      detailsTitle: "Shared details",
      categoriesTitle: "Driving licence categories",
      categoryLabel: "Category",
      notProvided: "Not provided",
      documentTypes: {
        TS: "Italian health card",
        CIE: "Electronic Identity Card (CIE)",
        P: "Driving licence",
      },
      fields: {
        surname: "Surname",
        givenName: "Given name",
        fiscalCode: "Fiscal Code",
        sex: "Sex",
        birthPlace: "Place of birth",
        birthProvince: "Province / country",
        birthDate: "Date of birth",
        expiryDate: "Expiry date",
        institutionNumber: "Institution number",
        cardNumber: "Card number",
        issuingMunicipality: "Issuing municipality",
        nationality: "Nationality",
        serialNumber: "Serial number",
        height: "Height",
        issueDate: "Issue date",
        cardAccessNumber: "Card Access Number",
        parentsOrGuardians: "Parents / guardians",
        residenceAddress: "Residential address",
        birthCertificateDetails: "Birth certificate details",
        mrz: "MRZ",
        licenceNumber: "Licence number",
        issuingAuthority: "Issuing authority",
        codes: "Codes / restrictions",
        managementField: "Licence management field",
        category: "Category",
      },
      states: {
        missingTitle: "No shared card found",
        missingDescription:
          "Open the complete link created by TesSa to view a shared card.",
        malformedTitle: "We can't read this link",
        malformedDescription:
          "The link may be incomplete or damaged. Ask the sender to create a new one.",
        tooLargeTitle: "This link can't be opened",
        tooLargeDescription:
          "The link contains more data than a TesSa shared card is expected to contain.",
        unsupportedTitle: "Unsupported document",
        unsupportedDescription:
          "This version of the preview does not recognise the document type in the link.",
        legacyTitle: "Legacy content unavailable",
        legacyDescription:
          "This earlier content type cannot be displayed in this preview.",
        backHome: "Return to the TesSa website",
      },
      appPrompt: "TesSa is available for Android and iOS.",
      android: "Get it on Google Play",
      ios: "Download on the App Store",
    },
    legal: {
      termsTitle: "Terms of Use",
      privacyTitle: "Privacy Policy",
      eyebrow: "Legal information",
      preservedLabel: "Preserved existing public text",
      pendingReview:
        "The text below is the existing public document, preserved in English without substantive changes. It dates from 30 September 2020 and requires legal review before launch.",
      sourceLanguageNote: "The substantive content is shown in its original English.",
      contentsLabel: "On this page",
      effectiveDateLabel: "Stated effective date",
      updatedDateLabel: "Last updated",
      updatedDateUnavailable: "Not stated in the existing text",
      providerLabel: "Named provider",
      reviewStatusLabel: "Review status",
      reviewStatus: "Substantive legal review pending",
      backHome: "Return to TesSa",
    },
    notFound: {
      title: "Page not found",
      description: "The requested page is not available.",
      action: "Return to TesSa",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
