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

const thirdPartyPrivacy: LegalLink[] = [
  {
    label: "Google Play Services",
    url: "https://www.google.com/policies/privacy/",
  },
  {
    label: "AdMob",
    url: "https://support.google.com/admob/answer/6128543?hl=en",
  },
  {
    label: "Google Analytics for Firebase",
    url: "https://firebase.google.com/policies/analytics",
  },
];

export const termsDocument: LegalDocument = {
  effectiveDate: "2020-09-30",
  sections: [
    {
      id: "terms-and-intellectual-property",
      title: "Terms and intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Baleen Developers.",
        },
        {
          type: "paragraph",
          text: "Baleen Developers is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.",
        },
        {
          type: "paragraph",
          text: "The TesSa app stores and processes personal data that you have provided to us, in order to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the TesSa app won’t work properly or at all.",
        },
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      blocks: [
        {
          type: "paragraph",
          text: "The app does use third party services that declare their own Terms and Conditions.",
        },
        {
          type: "paragraph",
          text: "Link to Terms and Conditions of third party service providers used by the app",
        },
        { type: "links", items: thirdPartyTerms },
      ],
    },
    {
      id: "connectivity-and-responsibility",
      title: "Connectivity and responsibility",
      blocks: [
        {
          type: "paragraph",
          text: "You should be aware that there are certain things that Baleen Developers will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but Baleen Developers cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.",
        },
        {
          type: "paragraph",
          text: "If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.",
        },
        {
          type: "paragraph",
          text: "Along the same lines, Baleen Developers cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Baleen Developers cannot accept responsibility.",
        },
        {
          type: "paragraph",
          text: "With respect to Baleen Developers’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Baleen Developers accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.",
        },
      ],
    },
    {
      id: "updates-and-termination",
      title: "Updates and termination",
      blocks: [
        {
          type: "paragraph",
          text: "At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Baleen Developers does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Terms and Conditions",
      blocks: [
        {
          type: "paragraph",
          text: "I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page.",
        },
        {
          type: "paragraph",
          text: "These terms and conditions are effective as of 2020-09-30",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me at baleendevs@gmail.com.",
        },
        {
          type: "attribution",
          before: "This Terms and Conditions page was generated by ",
          links: [
            {
              label: "App Privacy Policy Generator",
              url: "https://app-privacy-policy-generator.firebaseapp.com/",
            },
          ],
        },
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  effectiveDate: "2020-09-30",
  sections: [
    {
      id: "overview",
      title: "Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          text: "Baleen Developers built the TesSa app as an Ad Supported app. This SERVICE is provided by Baleen Developers at no cost and is intended for use as is.",
        },
        {
          type: "paragraph",
          text: "This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.",
        },
        {
          type: "paragraph",
          text: "If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.",
        },
        {
          type: "paragraph",
          text: "The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at TesSa unless otherwise defined in this Privacy Policy.",
        },
      ],
    },
    {
      id: "information-collection-and-use",
      title: "Information Collection and Use",
      blocks: [
        {
          type: "paragraph",
          text: "For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.",
        },
        {
          type: "paragraph",
          text: "The app does use third party services that may collect information used to identify you.",
        },
        {
          type: "paragraph",
          text: "Link to privacy policy of third party service providers used by the app",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "log-data",
      title: "Log Data",
      blocks: [
        {
          type: "paragraph",
          text: "I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "paragraph",
          text: "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.",
        },
        {
          type: "paragraph",
          text: "This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.",
        },
      ],
    },
    {
      id: "service-providers",
      title: "Service Providers",
      blocks: [
        {
          type: "paragraph",
          text: "I may employ third-party companies and individuals due to the following reasons:",
        },
        {
          type: "list",
          items: [
            "To facilitate our Service;",
            "To provide the Service on our behalf;",
            "To perform Service-related services; or",
            "To assist us in analyzing how our Service is used.",
          ],
        },
        {
          type: "paragraph",
          text: "I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "paragraph",
          text: "I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.",
        },
      ],
    },
    {
      id: "links-to-other-sites",
      title: "Links to Other Sites",
      blocks: [
        {
          type: "paragraph",
          text: "This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      title: "Children’s Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          text: "I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.",
        },
        { type: "paragraph", text: "This policy is effective as of 2020-09-30" },
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: "If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at baleendevs@gmail.com.",
        },
        {
          type: "attribution",
          before: "This privacy policy page was created at ",
          between: " and modified/generated by ",
          links: [
            {
              label: "privacypolicytemplate.net",
              url: "https://privacypolicytemplate.net",
            },
            {
              label: "App Privacy Policy Generator",
              url: "https://app-privacy-policy-generator.firebaseapp.com/",
            },
          ],
        },
      ],
    },
  ],
};

export const italianTermsDocument: LegalDocument = {
  effectiveDate: "2020-09-30",
  sections: [
    {
      id: "terms-and-intellectual-property",
      title: "Termini e proprietà intellettuale",
      blocks: [
        {
          type: "paragraph",
          text: "Scaricando o utilizzando l'app, i presenti termini si applicheranno automaticamente all'utente; è pertanto necessario leggerli attentamente prima di utilizzare l'app. Non è consentito copiare o modificare l'app, alcuna parte dell'app o i nostri marchi in alcun modo. Non è consentito tentare di estrarre il codice sorgente dell'app, né provare a tradurre l'app in altre lingue o a crearne versioni derivate. L'app stessa, nonché tutti i marchi, i diritti d'autore, i diritti sulle banche dati e gli altri diritti di proprietà intellettuale a essa relativi, continuano ad appartenere a Baleen Developers.",
        },
        {
          type: "paragraph",
          text: "Baleen Developers si impegna a fare in modo che l'app sia il più utile ed efficiente possibile. Per questo motivo, ci riserviamo il diritto di apportare modifiche all'app o di addebitare costi per i suoi servizi, in qualsiasi momento e per qualsiasi ragione. Non verrà mai addebitato alcun costo per l'app o per i suoi servizi senza indicare con assoluta chiarezza per cosa si sta pagando.",
        },
        {
          type: "paragraph",
          text: "L'app TesSa memorizza e tratta i dati personali che ci hai fornito al fine di erogare il mio Servizio. È tua responsabilità mantenere sicuri il telefono e l'accesso all'app. Raccomandiamo pertanto di non effettuare il jailbreak o il root del telefono, ossia il processo di rimozione delle restrizioni e delle limitazioni software imposte dal sistema operativo ufficiale del dispositivo. Ciò potrebbe rendere il telefono vulnerabile a malware, virus o programmi dannosi, compromettere le funzioni di sicurezza del telefono e comportare il funzionamento non corretto o il mancato funzionamento dell'app TesSa.",
        },
      ],
    },
    {
      id: "third-party-services",
      title: "Servizi di terze parti",
      blocks: [
        {
          type: "paragraph",
          text: "L'app utilizza servizi di terze parti che dichiarano i propri Termini e condizioni.",
        },
        {
          type: "paragraph",
          text: "Link ai Termini e condizioni dei fornitori di servizi terzi utilizzati dall'app",
        },
        { type: "links", items: thirdPartyTerms },
      ],
    },
    {
      id: "connectivity-and-responsibility",
      title: "Connettività e responsabilità",
      blocks: [
        {
          type: "paragraph",
          text: "È opportuno essere consapevoli che vi sono determinate circostanze per le quali Baleen Developers non si assume responsabilità. Alcune funzioni dell'app richiederanno che l'app disponga di una connessione Internet attiva. La connessione può avvenire tramite Wi-Fi o essere fornita dall'operatore di rete mobile, ma Baleen Developers non può assumersi la responsabilità del mancato funzionamento dell'app con tutte le sue funzionalità se non si dispone dell'accesso al Wi-Fi e si è esaurito il traffico dati disponibile.",
        },
        {
          type: "paragraph",
          text: "Se utilizzi l'app al di fuori di un'area coperta dal Wi-Fi, ricorda che continueranno ad applicarsi i termini dell'accordo con il tuo operatore di rete mobile. Di conseguenza, l'operatore di telefonia mobile potrebbe addebitarti il costo dei dati per la durata della connessione durante l'accesso all'app, o potrebbero esserti addebitati altri costi da terze parti. Utilizzando l'app, accetti la responsabilità di tali costi, inclusi i costi per il traffico dati in roaming qualora utilizzi l'app al di fuori del tuo territorio di residenza (ossia regione o Paese) senza disattivare il roaming dati. Se non sei la persona che paga la fattura del dispositivo sul quale utilizzi l'app, tieni presente che presumiamo che tu abbia ottenuto il permesso di utilizzare l'app da parte di chi paga la fattura.",
        },
        {
          type: "paragraph",
          text: "Analogamente, Baleen Developers non può sempre assumersi la responsabilità del modo in cui utilizzi l'app. Ad esempio, devi assicurarti che il dispositivo rimanga carico: se la batteria si esaurisce e non riesci ad accenderlo per usufruire del Servizio, Baleen Developers non può assumersene la responsabilità.",
        },
        {
          type: "paragraph",
          text: "Per quanto riguarda la responsabilità di Baleen Developers in relazione al tuo utilizzo dell'app, è importante tenere presente che, sebbene ci impegniamo a garantire che sia sempre aggiornata e corretta, ci affidiamo a terze parti affinché ci forniscano informazioni da mettere a tua disposizione. Baleen Developers non si assume alcuna responsabilità per eventuali perdite, dirette o indirette, subite per aver fatto totale affidamento su questa funzionalità dell'app.",
        },
      ],
    },
    {
      id: "updates-and-termination",
      title: "Aggiornamenti e cessazione",
      blocks: [
        {
          type: "paragraph",
          text: "A un certo punto potremmo voler aggiornare l'app. L'app è attualmente disponibile su Android e iOS; i requisiti di entrambi i sistemi, e di eventuali ulteriori sistemi ai quali decidessimo di estendere la disponibilità dell'app, potrebbero cambiare e, per continuare a utilizzare l'app, dovrai scaricare gli aggiornamenti. Baleen Developers non promette che aggiornerà sempre l'app affinché rimanga pertinente per te e/o funzioni con la versione di Android o iOS installata sul tuo dispositivo. Ti impegni tuttavia ad accettare sempre gli aggiornamenti dell'applicazione quando ti vengono proposti. Potremmo inoltre decidere di interrompere la fornitura dell'app e potremmo cessarne l'utilizzo in qualsiasi momento senza darti preavviso. Salvo diversa comunicazione, in caso di cessazione: (a) i diritti e le licenze concessi ai sensi dei presenti termini cesseranno; (b) dovrai smettere di utilizzare l'app e, se necessario, eliminarla dal tuo dispositivo.",
        },
      ],
    },
    {
      id: "changes",
      title: "Modifiche ai presenti Termini e condizioni",
      blocks: [
        {
          type: "paragraph",
          text: "Potrei aggiornare periodicamente i nostri Termini e condizioni. Ti consigliamo pertanto di consultare periodicamente questa pagina per verificare eventuali modifiche. Ti informerò di qualsiasi modifica pubblicando i nuovi Termini e condizioni su questa pagina.",
        },
        {
          type: "paragraph",
          text: "I presenti termini e condizioni sono in vigore dal 2020-09-30",
        },
      ],
    },
    {
      id: "contact",
      title: "Contatti",
      blocks: [
        {
          type: "paragraph",
          text: "In caso di domande o suggerimenti riguardo ai miei Termini e condizioni, non esitare a contattarmi all'indirizzo baleendevs@gmail.com.",
        },
        {
          type: "attribution",
          before: "Questa pagina dei Termini e condizioni è stata generata da ",
          links: [
            {
              label: "App Privacy Policy Generator",
              url: "https://app-privacy-policy-generator.firebaseapp.com/",
            },
          ],
        },
      ],
    },
  ],
};

export const italianPrivacyDocument: LegalDocument = {
  effectiveDate: "2020-09-30",
  sections: [
    {
      id: "overview",
      title: "Informativa sulla privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Baleen Developers ha realizzato l'app TesSa come app supportata dalla pubblicità. Questo SERVIZIO è fornito gratuitamente da Baleen Developers ed è destinato all'uso così com'è.",
        },
        {
          type: "paragraph",
          text: "Questa pagina serve a informare i visitatori sulle mie politiche relative alla raccolta, all'uso e alla divulgazione delle Informazioni personali, qualora decidessero di utilizzare il mio Servizio.",
        },
        {
          type: "paragraph",
          text: "Se scegli di utilizzare il mio Servizio, accetti la raccolta e l'uso delle informazioni in relazione alla presente informativa. Le Informazioni personali che raccolgo sono utilizzate per fornire e migliorare il Servizio. Non utilizzerò né condividerò le tue informazioni con nessuno, salvo quanto descritto nella presente Informativa sulla privacy.",
        },
        {
          type: "paragraph",
          text: "I termini utilizzati nella presente Informativa sulla privacy hanno lo stesso significato attribuito loro nei nostri Termini e condizioni, accessibili tramite TesSa, salvo che siano definiti diversamente nella presente Informativa sulla privacy.",
        },
      ],
    },
    {
      id: "information-collection-and-use",
      title: "Raccolta e utilizzo delle informazioni",
      blocks: [
        {
          type: "paragraph",
          text: "Per offrire un'esperienza migliore, durante l'utilizzo del nostro Servizio potrei chiederti di fornirci determinate informazioni di identificazione personale. Le informazioni che richiedo saranno conservate sul tuo dispositivo e non saranno raccolte da me in alcun modo.",
        },
        {
          type: "paragraph",
          text: "L'app utilizza servizi di terze parti che potrebbero raccogliere informazioni utilizzate per identificarti.",
        },
        {
          type: "paragraph",
          text: "Link alle informative sulla privacy dei fornitori di servizi terzi utilizzati dall'app",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "log-data",
      title: "Dati di registro",
      blocks: [
        {
          type: "paragraph",
          text: "Desidero informarti che, ogni volta che utilizzi il mio Servizio, in caso di errore nell'app raccolgo dati e informazioni sul tuo telefono, tramite prodotti di terze parti, denominati Dati di registro. Questi Dati di registro possono includere informazioni quali l'indirizzo del protocollo Internet (“IP”) del dispositivo, il nome del dispositivo, la versione del sistema operativo, la configurazione dell'app durante l'utilizzo del mio Servizio, l'ora e la data di utilizzo del Servizio e altre statistiche.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookie",
      blocks: [
        {
          type: "paragraph",
          text: "I cookie sono file contenenti una piccola quantità di dati, comunemente utilizzati come identificatori univoci anonimi. Vengono inviati al tuo browser dai siti web che visiti e sono memorizzati nella memoria interna del tuo dispositivo.",
        },
        {
          type: "paragraph",
          text: "Questo Servizio non utilizza esplicitamente tali “cookie”. Tuttavia, l'app potrebbe utilizzare codice e librerie di terze parti che impiegano “cookie” per raccogliere informazioni e migliorare i propri servizi. Puoi scegliere di accettare o rifiutare questi cookie e sapere quando un cookie viene inviato al tuo dispositivo. Se scegli di rifiutare i nostri cookie, potresti non essere in grado di utilizzare alcune parti di questo Servizio.",
        },
      ],
    },
    {
      id: "service-providers",
      title: "Fornitori di servizi",
      blocks: [
        {
          type: "paragraph",
          text: "Potrei avvalermi di società e persone terze per i seguenti motivi:",
        },
        {
          type: "list",
          items: [
            "Per facilitare il nostro Servizio;",
            "Per fornire il Servizio per nostro conto;",
            "Per svolgere servizi correlati al Servizio; oppure",
            "Per aiutarci ad analizzare come viene utilizzato il nostro Servizio.",
          ],
        },
        {
          type: "paragraph",
          text: "Desidero informare gli utenti di questo Servizio che tali terze parti hanno accesso alle loro Informazioni personali. Ciò avviene per svolgere per nostro conto i compiti loro assegnati. Tuttavia, sono tenute a non divulgare né utilizzare le informazioni per qualsiasi altro scopo.",
        },
      ],
    },
    {
      id: "security",
      title: "Sicurezza",
      blocks: [
        {
          type: "paragraph",
          text: "Tengo alla fiducia che riponi in noi fornendoci le tue Informazioni personali e pertanto ci impegniamo a utilizzare mezzi commercialmente accettabili per proteggerle. Ricorda tuttavia che nessun metodo di trasmissione su Internet o di archiviazione elettronica è sicuro e affidabile al 100% e non posso garantirne la sicurezza assoluta.",
        },
      ],
    },
    {
      id: "links-to-other-sites",
      title: "Link ad altri siti",
      blocks: [
        {
          type: "paragraph",
          text: "Questo Servizio potrebbe contenere link ad altri siti. Se fai clic su un link di terze parti, verrai indirizzato a tale sito. Tieni presente che questi siti esterni non sono gestiti da me. Ti consiglio pertanto vivamente di consultare l'Informativa sulla privacy di tali siti web. Non esercito alcun controllo e non mi assumo alcuna responsabilità per i contenuti, le informative sulla privacy o le pratiche di siti o servizi di terze parti.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      title: "Privacy dei minori",
      blocks: [
        {
          type: "paragraph",
          text: "Questi Servizi non sono rivolti a persone di età inferiore a 13 anni. Non raccolgo consapevolmente informazioni di identificazione personale da minori di 13 anni. Qualora scoprissi che un minore di 13 anni mi ha fornito informazioni personali, le elimino immediatamente dai nostri server. Se sei un genitore o tutore e sei a conoscenza del fatto che tuo figlio ci ha fornito informazioni personali, contattami affinché possa adottare le misure necessarie.",
        },
      ],
    },
    {
      id: "changes",
      title: "Modifiche alla presente Informativa sulla privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Potrei aggiornare periodicamente la nostra Informativa sulla privacy. Ti consigliamo pertanto di consultare periodicamente questa pagina per verificare eventuali modifiche. Ti informerò di qualsiasi modifica pubblicando la nuova Informativa sulla privacy su questa pagina.",
        },
        {
          type: "paragraph",
          text: "La presente informativa è in vigore dal 2020-09-30",
        },
      ],
    },
    {
      id: "contact",
      title: "Contatti",
      blocks: [
        {
          type: "paragraph",
          text: "In caso di domande o suggerimenti riguardo alla mia Informativa sulla privacy, non esitare a contattarmi all'indirizzo baleendevs@gmail.com.",
        },
        {
          type: "attribution",
          before: "Questa pagina dell'Informativa sulla privacy è stata creata su ",
          between: " e modificata/generata da ",
          links: [
            {
              label: "privacypolicytemplate.net",
              url: "https://privacypolicytemplate.net",
            },
            {
              label: "App Privacy Policy Generator",
              url: "https://app-privacy-policy-generator.firebaseapp.com/",
            },
          ],
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
