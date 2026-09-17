import { SITE_URL } from "@/lib/site";
import type { LegalDocument, LegalLink } from "./legal";

const thirdPartyPrivacy: LegalLink[] = [
  { label: "Norme sulla privacy di Google", url: "https://policies.google.com/privacy?hl=it" },
  { label: "Informazioni sulla privacy di Google AdMob", url: "https://support.google.com/admob/answer/6128543?hl=it" },
  { label: "Privacy e sicurezza in Firebase", url: "https://firebase.google.com/support/privacy?hl=it" },
  { label: "Informativa sulla privacy di Apple", url: "https://www.apple.com/it/legal/privacy/it/" },
  { label: "Informativa sulla privacy di GitHub", url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
  { label: "Termini di servizio e privacy di Google Analytics", url: "https://marketingplatform.google.com/about/analytics/terms/it/" },
];

const privacyRightsLinks: LegalLink[] = [
  {
    label: "Garante per la protezione dei dati personali",
    url: "https://www.garanteprivacy.it/",
  },
];

export const italianPrivacyDocument: LegalDocument = {
  effectiveDate: "2026-09-16",
  sections: [
    {
      id: "controller-and-scope",
      title: "Titolare e ambito di applicazione",
      blocks: [
        {
          type: "paragraph",
          text: `La presente Informativa sulla privacy spiega come vengono trattati i dati personali in relazione all’applicazione mobile TesSa: tessere e documenti (l’“App”), al sito collegato disponibile all’indirizzo ${SITE_URL} (il “Sito”) e alle funzionalità offerte tramite essi (congiuntamente, i “Servizi”).`,
        },
        {
          type: "paragraph",
          text: "Il titolare del trattamento descritto nella presente Informativa è Carlo Andreotti, sviluppatore indipendente persona fisica operante con il nome Baleen Developers, Via dei Boschi 30, 15072 Casal Cermelli (AL), Italia (“Baleen Developers”, “noi”, “ci” o “nostro”). Non è stato nominato un responsabile della protezione dei dati, poiché i trattamenti svolti non richiedono attualmente tale nomina ai sensi della normativa applicabile.",
        },
        {
          type: "paragraph",
          text: "TesSa è destinata a utenti in Italia. La presente Informativa riguarda sia le informazioni che rimangono sotto il controllo dell’utente sul dispositivo, sia i limitati dati personali trattati da noi o da servizi di terze parti tramite l’App o il Sito. Deve essere letta insieme alle Condizioni d’uso di TesSa.",
        },
      ],
    },
    {
      id: "local-document-data",
      title: "Dati dei documenti conservati in locale",
      blocks: [
        {
          type: "paragraph",
          text: "L’App consente agli utenti di inserire, importare, acquisire e visualizzare informazioni relative a tessere sanitarie, documenti d’identità, patenti e altri documenti supportati, incluse immagini, dati identificativi, codici a barre e codici QR. Tali contenuti possono essere altamente riservati. Sono conservati localmente in un database cifrato sul dispositivo dell’utente e non vengono caricati o conservati in un account, server o servizio cloud gestito da TesSa.",
        },
        {
          type: "paragraph",
          text: "Non riceviamo, visualizziamo né recuperiamo da remoto il contenuto dei documenti conservati nell’App. Gli utenti controllano tali contenuti e possono modificarli o eliminarli tramite l’App oppure rimuovendo i dati locali dell’App. L’eliminazione della copia locale non elimina backup, schermate, messaggi, link condivisi o altre copie precedentemente create o trasferite dall’utente.",
        },
        {
          type: "paragraph",
          text: "TesSa non fornisce account utente, sincronizzazione tra dispositivi o un servizio di backup cloud. Il sistema operativo o un servizio scelto autonomamente dall’utente può comunque creare o conservare backup del dispositivo secondo le impostazioni e l’informativa del relativo fornitore.",
        },
        {
          type: "paragraph",
          text: "Se un utente conserva informazioni relative a un minore o a un’altra persona, è responsabile di disporre dell’autorità legale necessaria e di utilizzare e condividere tali informazioni nel rispetto della legge.",
        },
      ],
    },
    {
      id: "data-provided-to-us",
      title: "Informazioni fornite direttamente a noi",
      blocks: [
        {
          type: "paragraph",
          text: "Non richiediamo la registrazione e non raccogliamo direttamente nomi, indirizzi postali, numeri di telefono, password, dati completi delle carte di pagamento o contenuti dei documenti per il solo fatto che una persona utilizzi l’App o visiti il Sito.",
        },
        {
          type: "paragraph",
          text: "Se ci contatti per assistenza, per una richiesta relativa alla privacy o per un’altra domanda, riceviamo l’indirizzo email e gli eventuali nome, messaggio, allegati e dettagli tecnici che fornisci volontariamente. Non inviare copie di documenti d’identità, tessere sanitarie, codici a barre completi, file di backup o altre informazioni sensibili, salvo che sia strettamente necessario e che ti sia stato specificamente richiesto attraverso un canale appropriato.",
        },
        {
          type: "list",
          items: [
            "corrispondenza di assistenza e relativa alla privacy, inclusi l’indirizzo email del mittente e il contenuto del messaggio;",
            "informazioni tecniche fornite volontariamente per diagnosticare un problema;",
            "documentazione necessaria per gestire un reclamo, adempiere alla legge o accertare, esercitare o difendere un diritto in sede giudiziaria.",
          ],
        },
      ],
    },
    {
      id: "automatically-processed-data",
      title: "Dati tecnici trattati automaticamente",
      blocks: [
        {
          type: "paragraph",
          text: "L’App e il Sito utilizzano un numero limitato di infrastrutture di terze parti. A seconda della piattaforma, della configurazione, delle autorizzazioni e delle scelte in materia di privacy, tali fornitori possono trattare automaticamente le seguenti categorie di dati:",
        },
        {
          type: "list",
          items: [
            "informazioni sul dispositivo e sull’applicazione, quali tipo di dispositivo, sistema operativo, lingua, versione dell’App, identificativi dell’applicazione o pubblicitari e operatore di rete;",
            "informazioni di rete e localizzazione approssimativa ricavata dall’indirizzo IP, ma non una posizione GPS precisa richiesta da TesSa;",
            "eventi limitati relativi a utilizzo, diagnostica, pubblicità e prestazioni, quali avvio dell’App, sessioni, pagine visitate, impressioni e interazioni con gli annunci e informazioni sugli errori;",
            "scelte relative a privacy, pubblicità e consenso effettuate tramite il sistema operativo, lo store o l’interfaccia di consenso di un fornitore.",
          ],
        },
        {
          type: "paragraph",
          text: "TesSa non crea profili comportamentali personalizzati né registri di utilizzo personalizzati. Google Analytics for Firebase è attualmente incluso su Android e può registrare automaticamente eventi e proprietà del dispositivo; Firebase Analytics è attualmente disabilitato nella configurazione iOS. Google Mobile Ads può registrare automaticamente eventi pubblicitari su entrambe le piattaforme supportate. Il Sito utilizza Google Analytics 4 per statistiche aggregate sugli accessi (previo consenso) e GitHub Pages, in qualità di fornitore di hosting del Sito, registra gli indirizzi IP dei visitatori per finalità di sicurezza.",
        },
      ],
    },
    {
      id: "device-features",
      title: "Autorizzazioni e funzionalità del dispositivo",
      blocks: [
        {
          type: "paragraph",
          text: "L’App può richiedere l’accesso a funzionalità del dispositivo soltanto per fornire funzioni selezionate dall’utente. L’autorizzazione può essere negata o successivamente modificata nelle impostazioni del dispositivo, ma la relativa funzione potrebbe non essere più disponibile.",
        },
        {
          type: "list",
          items: [
            "Fotocamera: per acquisire codici a barre o codici QR supportati e immagini dei documenti quando richiesto;",
            "File, foto o memoria: per importare o salvare immagini e per creare, selezionare o ripristinare file di backup;",
            "Autenticazione biometrica: la verifica facoltativa tramite impronta o volto è eseguita dal sistema operativo; TesSa riceve soltanto l’esito positivo o negativo e non riceve né conserva modelli biometrici.",
          ],
        },
        {
          type: "paragraph",
          text: "TesSa non richiede l’accesso alla posizione geografica precisa, ai contatti, ai calendari, agli SMS, agli account social o al microfono e non utilizza accessi tramite social network.",
        },
      ],
    },
    {
      id: "purposes-and-legal-bases",
      title: "Finalità e basi giuridiche",
      blocks: [
        {
          type: "paragraph",
          text: "Quando si applica il GDPR, trattiamo dati personali soltanto in presenza di una base giuridica. La base applicabile dipende dai dati e dal contesto:",
        },
        {
          type: "list",
          items: [
            "esecuzione di un contratto o misure richieste prima della sua conclusione, per fornire le funzioni dell’App richieste, l’assistenza e l’acquisto TesSa PRO;",
            "consenso, per pubblicità personalizzata e strumenti analitici, identificativi o tecnologie analoghe non essenziali quando il consenso è richiesto dalla legge;",
            "legittimo interesse, per proteggere i Servizi, prevenire frodi e abusi, diagnosticare problemi, comprendere il traffico aggregato del Sito e tutelare o difendere diritti, purché tali interessi non prevalgano sui diritti degli utenti;",
            "adempimento di un obbligo legale, incluse richieste legittime e obblighi contabili, di tutela dei consumatori o di protezione dei dati.",
          ],
        },
        {
          type: "paragraph",
          text: "Il contenuto dei documenti trattato soltanto sul dispositivo è gestito su richiesta dell’utente per fornire la funzionalità scelta e non viene trasmesso a noi per impostazione predefinita. Non utilizziamo dati personali per marketing diretto, non vendiamo dati personali e non adottiamo decisioni che producano effetti giuridici o analogamente significativi tramite profilazione automatizzata.",
        },
      ],
    },
    {
      id: "advertising-and-analytics",
      title: "Pubblicità e analisi",
      blocks: [
        {
          type: "paragraph",
          text: "La versione gratuita dell’App può mostrare pubblicità tramite Google AdMob. AdMob e i relativi partner pubblicitari autorizzati possono trattare identificativi pubblicitari, indirizzo IP, informazioni sul dispositivo e sull’App, scelte di consenso e dati sulle interazioni con gli annunci per fornire, limitare, proteggere e misurare la pubblicità. Il contenuto dei documenti conservati in TesSa non viene intenzionalmente comunicato ad AdMob o agli inserzionisti. TesSa PRO rimuove la pubblicità dall’App.",
        },
        {
          type: "paragraph",
          text: "Quando richiesto dalla legge, la pubblicità personalizzata e l’accesso a identificativi non essenziali del dispositivo devono basarsi su un consenso valido. In assenza di un consenso valido, Google e i suoi partner possono trattare dati soltanto quando si applica un’altra base giuridica, anche per pubblicità limitata o contestuale, sicurezza, prevenzione delle frodi, limitazione della frequenza o misurazione ove legalmente consentito.",
        },
        {
          type: "paragraph",
          text: "Sul Sito, Google Analytics 4 (fornito da Google Ireland Limited / Google LLC) è utilizzato esclusivamente per misurare gli accessi e le visualizzazioni in forma aggregata. I cookie analitici vengono impostati soltanto previo consenso esplicito dell'utente tramite il banner cookie. La conservazione dei dati degli eventi è impostata a 2 mesi. Le pagine di visualizzazione dei documenti (/share) non contengono alcun codice analitico e i dati dei documenti non vengono mai comunicati a Google. Ulteriori informazioni e il componente aggiuntivo del browser per l'opt-out sono disponibili nelle pagine privacy di Google.",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "purchases",
      title: "Acquisti tramite gli store",
      blocks: [
        {
          type: "paragraph",
          text: "L’acquisto opzionale una tantum di TesSa PRO è elaborato esclusivamente da Apple tramite App Store o da Google tramite Google Play. Non riceviamo né conserviamo direttamente numeri di carte di pagamento o dati completi di fatturazione. Lo store applicabile può fornire all’App informazioni limitate, quali identificativo del prodotto, dati della transazione o della ricevuta e stato dell’acquisto o dell’abilitazione, affinché PRO possa essere attivato o ripristinato.",
        },
        {
          type: "paragraph",
          text: "Apple e Google trattano i dati dell’account dello store, di pagamento, fiscali, di rimborso e della transazione secondo le rispettive condizioni e informative sulla privacy. Le richieste relative ai metodi di pagamento o ai registri delle transazioni dello store devono essere rivolte allo store interessato.",
        },
        {
          type: "links",
          items: [
            { label: "Informativa sulla privacy di Apple", url: "https://www.apple.com/it/legal/privacy/it/" },
            { label: "Norme sulla privacy di Google", url: "https://policies.google.com/privacy?hl=it" },
          ],
        },
      ],
    },
    {
      id: "backups-and-sharing",
      title: "Backup e condivisione controllati dall’utente",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa può creare localmente un file di backup cifrato. Non riceviamo né conserviamo automaticamente una copia. L’utente sceglie dove conservare o trasmettere il backup ed è responsabile di proteggerlo e di proteggere le informazioni necessarie per accedervi. Un servizio di archiviazione, messaggistica o cloud scelto dall’utente tratta il file secondo la propria informativa sulla privacy.",
        },
        {
          type: "paragraph",
          text: "Quando un utente sceglie di condividere informazioni di un documento, TesSa può generare un link o un codice QR contenente nell’URL i dati selezionati. I dati sono codificati, anche tramite codifica Base64, ma non sono cifrati né protetti da password. Chiunque ottenga il link o il codice QR può essere in grado di decodificarne, leggere, copiare o condividere ulteriormente il contenuto.",
        },
        {
          type: "paragraph",
          text: "Il link e il suo contenuto possono comparire in messaggi, cronologia del browser, anteprime dei link, schermate, log di accesso o sicurezza e servizi utilizzati per condividerlo o aprirlo, incluso il fornitore di hosting del Sito. Non manteniamo una copia separata dei dati del documento condiviso in un database controllato da TesSa e non possiamo revocare o eliminare da remoto un link dopo la condivisione.",
        },
        {
          type: "paragraph",
          text: "La condivisione è avviata e controllata dall’utente. Gli utenti devono verificare i dati inclusi, scegliere destinatari fidati e canali appropriati ed eliminare le copie da messaggi, cronologie o servizi di terzi quando non sono più necessarie.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Destinatari e servizi di terze parti",
      blocks: [
        {
          type: "paragraph",
          text: "A seconda della funzione e della piattaforma utilizzata, dati personali limitati possono essere trattati dai seguenti destinatari. Essi ricevono soltanto le categorie necessarie ai rispettivi servizi e possono agire come responsabili o titolari autonomi in base alle circostanze e alle proprie condizioni:",
        },
        {
          type: "list",
          items: [
            "Google, inclusi AdMob, Google Analytics for Firebase, Google Play e il servizio email utilizzato per l’assistenza;",
            "Apple, per la distribuzione tramite App Store, l’elaborazione degli acquisti in-app e i servizi di piattaforma;",
            "Google, tramite Google Analytics 4, per la misurazione aggregata degli accessi al Sito (previo consenso);",
            "GitHub, tramite GitHub Pages, per l’hosting statico del Sito e i log di sicurezza dell’hosting;",
            "autorità pubbliche, organi giudiziari, consulenti professionali o altri soggetti quando la comunicazione è imposta dalla legge o ragionevolmente necessaria per accertare, esercitare o difendere un diritto in sede giudiziaria.",
          ],
        },
        {
          type: "paragraph",
          text: "Non comunichiamo dati personali a società affiliate, intermediari di dati, fornitori di liste commerciali o partner commerciali e non vendiamo né concediamo in locazione dati personali. I servizi indipendenti scelti deliberatamente dall’utente, come un servizio di messaggistica o cloud usato per condividere un link o un backup, ricevono i dati dall’utente e non da un server controllato da TesSa.",
        },
        { type: "links", items: thirdPartyPrivacy },
      ],
    },
    {
      id: "international-transfers",
      title: "Trasferimenti internazionali di dati",
      blocks: [
        {
          type: "paragraph",
          text: "Il contenuto dei documenti conservato soltanto nell’App non viene trasferito internazionalmente da noi. Alcuni fornitori terzi sono stabiliti, conservano dati o consentono l’accesso da Paesi esterni allo Spazio economico europeo, inclusi gli Stati Uniti. Le loro infrastrutture e i loro subfornitori possono operare in ulteriori Paesi.",
        },
        {
          type: "paragraph",
          text: "Quando richiesto, tali trasferimenti sono protetti mediante una decisione di adeguatezza applicabile, l’adesione del fornitore a un quadro riconosciuto per il trasferimento dei dati, clausole contrattuali standard della Commissione europea o un’altra garanzia legittima descritta nelle condizioni del fornitore. Non dichiariamo di possedere una nostra certificazione ai sensi dell’EU–US Data Privacy Framework. Consulta le informative collegate dei fornitori per conoscere ubicazioni e garanzie aggiornate.",
        },
      ],
    },
    {
      id: "retention",
      title: "Conservazione dei dati",
      blocks: [
        {
          type: "paragraph",
          text: "Conserviamo i dati personali soltanto per il tempo ragionevolmente necessario alla finalità per cui sono trattati, secondo i seguenti criteri:",
        },
        {
          type: "list",
          items: [
            "i dati dei documenti rimangono localmente sul dispositivo finché l’utente non li elimina o rimuove i dati dell’App; i backup esportati e le copie condivise rimangono finché non vengono eliminati dall’utente o dal terzo che li detiene;",
            "la corrispondenza di assistenza e relativa alla privacy è conservata per il tempo necessario a rispondere e dare seguito e più a lungo soltanto quando occorre per un obbligo legale o una pretesa giuridica;",
            "le informazioni locali sull’abilitazione PRO rimangono finché non vengono eliminati i dati dell’App, mentre Apple o Google conserva i registri delle transazioni secondo i propri obblighi legali e la propria informativa;",
            "le informazioni analitiche, pubblicitarie, di hosting e di sicurezza sono conservate secondo le impostazioni e le informative del fornitore applicabile e vengono eliminate o aggregate quando non sono più necessarie per la finalità dichiarata.",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Sicurezza",
      blocks: [
        {
          type: "paragraph",
          text: "TesSa utilizza misure progettate per proteggere le informazioni conservate localmente, tra cui un database locale cifrato, file di backup cifrati, l’isolamento dell’applicazione fornito dal sistema operativo e controlli facoltativi di accesso all’App, come PIN o autenticazione biometrica del dispositivo. L’accesso alla fotocamera e ai file è soggetto alle autorizzazioni del sistema operativo.",
        },
        {
          type: "paragraph",
          text: "Nessun metodo di conservazione o trasmissione è completamente sicuro. Gli utenti devono proteggere il dispositivo, il codice di accesso all’App, i backup e i link di condivisione, installare gli aggiornamenti di sicurezza ed evitare dispositivi sottoposti a root o jailbreak. Il contenuto dei link di condivisione è codificato ma non cifrato e non deve essere considerato riservato dopo la comunicazione a un’altra persona o servizio.",
        },
      ],
    },
    {
      id: "minors",
      title: "Minori",
      blocks: [
        {
          type: "paragraph",
          text: "I Servizi sono destinati a utenti di età pari o superiore a 18 anni e non sono rivolti ai minori. Non richiediamo consapevolmente dati personali direttamente a minori. Se veniamo a conoscenza del fatto che un minore ci ha inviato dati personali senza adeguata autorizzazione, adotteremo misure ragionevoli per eliminarli ove richiesto.",
        },
        {
          type: "paragraph",
          text: "Un adulto autorizzato può utilizzare l’App per conservare informazioni riguardanti un minore affidato alle sue cure. Tali informazioni rimangono in locale, salvo che l’adulto scelga di esportarle o condividerle, e l’adulto è responsabile di disporre di un’adeguata base giuridica e di proteggere le informazioni del minore.",
        },
      ],
    },
    {
      id: "rights",
      title: "I tuoi diritti in materia di privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Fatte salve le condizioni e le eccezioni previste dalla normativa applicabile, puoi avere il diritto di:",
        },
        {
          type: "list",
          items: [
            "ottenere conferma che siano o meno trattati dati personali che ti riguardano e richiederne l’accesso;",
            "chiedere la rettifica di dati personali inesatti o incompleti;",
            "chiedere la cancellazione dei dati personali;",
            "chiedere la limitazione del trattamento;",
            "opporti al trattamento fondato sul legittimo interesse o al marketing diretto;",
            "ricevere i dati forniti in un formato portabile quando ricorrono i requisiti di legge;",
            "revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente;",
            "presentare reclamo all’autorità di controllo competente, incluso il Garante per la protezione dei dati personali.",
          ],
        },
        {
          type: "paragraph",
          text: "Le richieste possono essere inviate a baleen.devs@gmail.com. Potremmo chiedere le informazioni ragionevolmente necessarie per verificare la richiesta, ma non siamo tenuti a raccogliere dati aggiuntivi al solo scopo di identificare una persona. Se non possiamo collegare dati tecnici o aggregati al richiedente, spiegheremo di non essere in grado di individuare il dato interessato, salvo che il richiedente fornisca informazioni che rendano possibile l’identificazione.",
        },
        {
          type: "paragraph",
          text: "Non possiamo accedere, esportare, rettificare o eliminare da remoto i dati dei documenti presenti soltanto sul dispositivo dell’utente. L’utente può gestire tali dati direttamente nell’App. Le richieste riguardanti dati controllati autonomamente da Apple, Google, GitHub o da un servizio scelto dall’utente potrebbero dover essere presentate al relativo fornitore.",
        },
        {
          type: "paragraph",
          text: "Quando il trattamento si basa sul consenso, questo può essere revocato tramite gli eventuali controlli di consenso messi a disposizione dal fornitore interessato, mediante le impostazioni privacy applicabili del dispositivo o della piattaforma oppure contattandoci. La revoca può incidere sulla pubblicità personalizzata o sugli strumenti analitici facoltativi, ma non sulle funzioni principali di conservazione locale dei documenti nell’App.",
        },
        { type: "links", items: privacyRightsLinks },
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookie e tecnologie analoghe",
      blocks: [
        {
          type: "paragraph",
          text: "L’App non si basa su cookie del browser per le proprie funzioni di conservazione locale dei documenti. Gli SDK mobili di terze parti possono invece utilizzare istanze dell’applicazione, identificativi pubblicitari, memoria locale o tecnologie analoghe come descritto sopra.",
        },
        {
          type: "paragraph",
          text: "Il Sito utilizza cookie di Google Analytics 4 per il conteggio aggregato degli accessi esclusivamente previo consenso espresso tramite il banner cookie. Gli utenti possono gestire o revocare le proprie preferenze in qualsiasi momento tramite il link “Preferenze cookie” nel footer o attraverso le impostazioni del browser. Il rifiuto dei cookie facoltativi non impedisce in alcun modo l'accesso al Sito o alle funzioni principali dell'App.",
        },
        {
          type: "paragraph",
          text: "Il browser, GitHub Pages e i siti esterni raggiunti tramite link possono applicare cookie, memoria locale o log di sicurezza secondo le rispettive informative. TesSa non risponde ai precedenti segnali “Do Not Track” dei browser, poiché non esiste uno standard tecnico uniforme per tali segnali; restano impregiudicate le scelte di consenso e opposizione richieste dalla legge.",
        },
      ],
    },
    {
      id: "third-party-sites",
      title: "Siti e servizi di terze parti",
      blocks: [
        {
          type: "paragraph",
          text: "I Servizi possono contenere collegamenti a siti e servizi indipendenti di terze parti o interagire con essi. Non controlliamo i relativi contenuti o pratiche in materia di privacy. Consulta l’informativa pertinente prima di fornire dati o utilizzare un servizio esterno. Ciò non limita le responsabilità che ci competono ai sensi della legge applicabile per la nostra scelta o integrazione di un fornitore.",
        },
      ],
    },
    {
      id: "changes",
      title: "Modifiche alla presente Informativa",
      blocks: [
        {
          type: "paragraph",
          text: "Potremmo aggiornare la presente Informativa per riflettere modifiche ai Servizi, ai fornitori o alla legge. La versione aggiornata sarà pubblicata su questa pagina con una nuova data di efficacia. Quando richiesto dalla legge o quando una modifica incide in modo sostanziale sul trattamento dei dati personali, forniremo un avviso aggiuntivo tramite un canale appropriato.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contatti",
      blocks: [
        {
          type: "paragraph",
          text: "Per domande sulla privacy o per esercitare i diritti applicabili, contatta Carlo Andreotti, operante con il nome Baleen Developers, all’indirizzo baleen.devs@gmail.com oppure per posta a Via dei Boschi 30, 15072 Casal Cermelli (AL), Italia.",
        },
        {
          type: "paragraph",
          text: "Questo canale di contatto non consente l’accesso da remoto alle informazioni conservate soltanto sul dispositivo dell’utente. Descrivi la richiesta senza inviare copie non necessarie di documenti o altri dati sensibili.",
        },
      ],
    },
  ],
};
