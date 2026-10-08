import {
  EDUCATION,
  EXPERIENCE,
  FEATURED_PROJECT,
  Education,
  Job,
  Language,
  LANGUAGES,
  MORE_PROJECTS,
  MoreProject,
  PROFILE,
  Profile,
  Project,
  SKILLS,
  SkillGroup,
} from './cv.data';

export type Lang = 'en' | 'it' | 'ro';
export const LANGS: readonly Lang[] = ['en', 'it', 'ro'];

/** Every piece of interface text. `{x}` placeholders are filled by `fmt()`. */
export interface Ui {
  mainNav: string;
  nav: { about: string; project: string; experience: string; skills: string; contact: string };
  language: string;
  toLight: string;
  toDark: string;
  toggleMenu: string;
  photoOf: string;
  heroLead: string;
  nowLabel: string;
  downloadCv: string;
  aboutTitle: string;
  aiTitle: string;
  aiItems: string[];
  projectTitle: string;
  visitWebsite: string;
  appStore: string;
  carouselLabel: string;
  prevShot: string;
  nextShot: string;
  showShot: string;
  moreTitle: string;
  viewOnGithub: string;
  experienceTitle: string;
  now: string;
  showLess: string;
  showEarlier: string;
  skillsTitle: string;
  educationTitle: string;
  languagesTitle: string;
  outOf: string;
  contactTitle: string;
  contactLead: string;
  cvPdf: string;
  openToWork: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  formNote: string;
  footerBuilt: string;
  sourceOnGithub: string;
}

export interface Content {
  ui: Ui;
  profile: Profile;
  project: Project;
  moreProjects: MoreProject[];
  experience: Job[];
  skills: SkillGroup[];
  education: Education[];
  languages: Language[];
}

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}

const EN_UI: Ui = {
  mainNav: 'Main',
  nav: { about: 'About', project: 'Project', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
  language: 'Language',
  toLight: 'Switch to light mode',
  toDark: 'Switch to dark mode',
  toggleMenu: 'Toggle menu',
  photoOf: 'Photo of {name}',
  heroLead:
    'Building with Angular and TypeScript since {since}, now working across Power Platform and Dynamics 365, with AI and LLM tools built into my everyday workflow.',
  nowLabel: 'Now',
  downloadCv: 'Download CV',
  aboutTitle: 'About me',
  aiTitle: 'How I work with AI',
  aiItems: [
    'Prototype features and UI faster with LLM coding assistants',
    'Speed up debugging and refactoring of large codebases',
    'Learn new stacks quickly, like Power Apps, Dynamics 365 and .NET',
    'Always review, test and own the code that ships',
  ],
  projectTitle: 'Featured project',
  visitWebsite: 'Visit the website',
  appStore: 'Download on the App Store',
  carouselLabel: '{name} screenshots',
  prevShot: 'Previous screenshot',
  nextShot: 'Next screenshot',
  showShot: 'Show screenshot {n} of {total}',
  moreTitle: 'More projects',
  viewOnGithub: 'View on GitHub',
  experienceTitle: 'Experience',
  now: 'Now',
  showLess: 'Show less',
  showEarlier: 'Show earlier experience ({n})',
  skillsTitle: 'Skills',
  educationTitle: 'Education & courses',
  languagesTitle: 'Languages',
  outOf: '{n} out of 5',
  contactTitle: "Let's talk",
  contactLead: 'Interested in working together, or want to know more about my experience? Send me a message.',
  cvPdf: 'CV (PDF)',
  openToWork: 'Open to new opportunities',
  formName: 'Name',
  formEmail: 'Email',
  formMessage: 'Message',
  formSend: 'Send message',
  formSending: 'Sending…',
  formSuccess: 'Thanks! Your message was sent. I will get back to you soon.',
  formError: 'Something went wrong. Please try again, or email me directly.',
  formNote: 'Messages are delivered through FormSubmit.',
  footerBuilt: 'Built with Angular 21 & signals',
  sourceOnGithub: 'source on GitHub',
};

const EN: Content = {
  ui: EN_UI,
  profile: PROFILE,
  project: FEATURED_PROJECT,
  moreProjects: MORE_PROJECTS,
  experience: EXPERIENCE,
  skills: SKILLS,
  education: EDUCATION,
  languages: LANGUAGES,
};

/** Overlay translated text on the shared (language-neutral) data, matching items by position. */
function overlay<T extends object>(base: T[], texts: Partial<T>[]): T[] {
  return base.map((item, i) => ({ ...item, ...texts[i] }));
}

const IT: Content = {
  ui: {
    mainNav: 'Principale',
    nav: { about: 'Chi sono', project: 'Progetto', experience: 'Esperienza', skills: 'Competenze', contact: 'Contatti' },
    language: 'Lingua',
    toLight: 'Passa alla modalità chiara',
    toDark: 'Passa alla modalità scura',
    toggleMenu: 'Apri o chiudi il menu',
    photoOf: 'Foto di {name}',
    heroLead:
      'Sviluppo con Angular e TypeScript dal {since}. Oggi lavoro anche con Power Platform e Dynamics 365, con strumenti di AI e LLM integrati nel mio lavoro quotidiano.',
    nowLabel: 'Adesso',
    downloadCv: 'Scarica il CV',
    aboutTitle: 'Chi sono',
    aiTitle: "Come lavoro con l'AI",
    aiItems: [
      'Prototipo funzionalità e interfacce più velocemente con assistenti di codice basati su LLM',
      'Accelero debug e refactoring di codebase di grandi dimensioni',
      'Imparo rapidamente nuovi stack, come Power Apps, Dynamics 365 e .NET',
      'Rivedo, testo e mi assumo sempre la responsabilità del codice che rilascio',
    ],
    projectTitle: 'Progetto in evidenza',
    visitWebsite: 'Visita il sito',
    appStore: "Scarica dall'App Store",
    carouselLabel: 'Schermate di {name}',
    prevShot: 'Schermata precedente',
    nextShot: 'Schermata successiva',
    showShot: 'Mostra la schermata {n} di {total}',
    moreTitle: 'Altri progetti',
    viewOnGithub: 'Vedi su GitHub',
    experienceTitle: 'Esperienza',
    now: 'Oggi',
    showLess: 'Mostra meno',
    showEarlier: 'Mostra le esperienze precedenti ({n})',
    skillsTitle: 'Competenze',
    educationTitle: 'Formazione e corsi',
    languagesTitle: 'Lingue',
    outOf: '{n} su 5',
    contactTitle: 'Parliamone',
    contactLead: 'Vuoi collaborare o saperne di più sulla mia esperienza? Scrivimi.',
    cvPdf: 'CV (PDF, in inglese)',
    openToWork: 'Aperto a nuove opportunità',
    formName: 'Nome',
    formEmail: 'Email',
    formMessage: 'Messaggio',
    formSend: 'Invia messaggio',
    formSending: 'Invio in corso…',
    formSuccess: 'Grazie! Il tuo messaggio è stato inviato. Ti risponderò presto.',
    formError: 'Qualcosa è andato storto. Riprova o scrivimi direttamente via email.',
    formNote: 'I messaggi vengono recapitati tramite FormSubmit.',
    footerBuilt: 'Realizzato con Angular 21 e signals',
    sourceOnGithub: 'codice su GitHub',
  },
  profile: {
    ...PROFILE,
    title: 'Sviluppatore Full Stack',
    location: 'Bucarest, Romania',
    now: 'Sviluppatore Full Stack presso LINKSOFT · Angular, Power Apps, Dynamics 365',
    about: [
      'Sviluppo applicazioni web professionali con Angular e TypeScript dal 2019. Vengo dal mondo della logistica e dei trasporti e porto ancora le stesse abitudini nel mio codice: affidabilità, senso di responsabilità e consegne puntuali.',
      "Oggi sviluppo funzionalità e risolvo bug su progetti Angular, ampliando le mie competenze nell'ecosistema Microsoft: Power Apps, Dynamics 365, C# e .NET. Uso ogni giorno strumenti moderni di AI e LLM per prototipare più velocemente, rilasciare prima, fare debug in modo più efficace e mantenere alta la qualità del codice.",
      "Fuori dal lavoro progetto e pubblico i miei prodotti, dall'idea al rilascio. L'ultimo è CommunityBuilds, un'app per appassionati di auto, ora disponibile su App Store e sul web.",
    ],
  },
  project: {
    ...FEATURED_PROJECT,
    role: 'Ideatore e sviluppatore',
    status: 'Disponibile su App Store e sul web',
    summary:
      'Una piattaforma in cui gli appassionati di auto mostrano le loro auto modificate e personalizzate, documentano ogni modifica e scoprono altri costruttori.',
    highlights: [
      "Progettato, sviluppato e lanciato l'intero prodotto, dall'idea al rilascio.",
      'Feed, esplora, marketplace, classifiche, ricerca, account utente e voti della community sulle auto.',
      'Pubblicata come app nativa su Apple App Store e come web app responsive.',
    ],
    tags: ['Progetto personale', 'Mobile e web', 'Community'],
    screens: overlay(FEATURED_PROJECT.screens, [
      { alt: "Schermata iniziale con il logo CommunityBuilds, lo slogan e il pulsante Explore builds" },
      { alt: 'Schermata Explore con le auto della community come schede con foto' },
      { alt: 'Pagina di una build con galleria fotografica, titolo e prezzo' },
      { alt: 'Schermata Rankings con le build più amate' },
      { alt: 'Schermata Marketplace con filtri per marca, modello, prezzo, chilometraggio e anno' },
    ]),
  },
  moreProjects: overlay(MORE_PROJECTS, [
    { description: 'Tiene traccia dei membri che partecipano a un viaggio in auto.' },
    { description: 'Un tracker delle spese con un back end PostgreSQL.' },
    { description: 'Una dating app full-stack: back end in C# e front end in TypeScript.' },
  ]),
  experience: overlay(EXPERIENCE, [
    {
      role: 'Sviluppatore Full Stack',
      location: 'Bucarest',
      period: 'Feb 2026 – Oggi',
      highlights: [
        'Sviluppo nuove funzionalità e risolvo bug su progetti Angular.',
        'Ho creato un nuovo progetto Canvas App.',
        'Studio Microsoft Power Platform, con focus su Power Apps.',
        'Studio e lavoro con Microsoft Dynamics 365.',
      ],
    },
    {
      role: 'Sviluppatore Angular',
      location: 'Bucarest',
      period: 'Mag 2023 – Ago 2025',
      highlights: [
        'Ho guidato lo sviluppo di una piattaforma web back-office realizzata con Angular 17 e 18.',
        'Ho progettato e implementato componenti e interfacce scalabili con HTML5, TypeScript e SCSS.',
        'Ho collaborato in un team Agile, partecipato alle code review e supportato sviluppatori junior.',
        'Ho curato manutenibilità, design responsive e compatibilità tra browser.',
      ],
    },
    {
      role: 'Sviluppatore Angular',
      location: 'Bucarest',
      period: 'Mag 2021 – Apr 2023',
      highlights: [
        'Ho sviluppato e mantenuto un sito di gaming live e la relativa applicazione back-office.',
        'Ho effettuato il refactoring di codebase legacy per rispondere a nuovi requisiti di business.',
        'Ho rilasciato nuove funzionalità in un ambiente dinamico con deploy frequenti.',
      ],
    },
    {
      role: 'Sviluppatore Angular',
      location: 'Torino, Italia',
      period: 'Giu 2019 – Mar 2021',
      highlights: [
        'Ho sviluppato e mantenuto portali back-office per diverse aziende clienti.',
        "Ho collaborato a stretto contatto con i team di design e backend per garantire un'integrazione funzionale.",
      ],
    },
  ]),
  skills: [
    { ...SKILLS[0], items: SKILLS[0].items.map((i) => (i === 'Responsive design' ? 'Design responsive' : i)) },
    { ...SKILLS[1], title: 'Microsoft e backend' },
    {
      title: 'Strumenti e metodo di lavoro',
      items: SKILLS[2].items.map((i) =>
        i === 'AI-assisted development (LLMs)' ? 'Sviluppo assistito da AI (LLM)' : i === 'Code reviews' ? 'Code review' : i,
      ),
    },
  ],
  education: overlay(EDUCATION, [
    {
      title: 'Corso Java',
      place: '480 ore, livello base + intermedio',
      period: 'Mag 2019',
      detail: 'Java, OOP, design pattern (MVC, DAO, Singleton), Spring MVC, API REST, MySQL, AngularJS.',
    },
    {
      title: 'Diploma in ragioneria',
      detail: 'Scienze naturali, matematica e statistica.',
    },
  ]),
  languages: overlay(LANGUAGES, [
    { name: 'Italiano', level: 'Madrelingua' },
    { name: 'Rumeno', level: 'Madrelingua' },
    { name: 'Inglese', level: 'Professionale' },
  ]),
};

const RO: Content = {
  ui: {
    mainNav: 'Principal',
    nav: { about: 'Despre mine', project: 'Proiect', experience: 'Experiență', skills: 'Abilități', contact: 'Contact' },
    language: 'Limba',
    toLight: 'Treci la tema deschisă',
    toDark: 'Treci la tema întunecată',
    toggleMenu: 'Deschide sau închide meniul',
    photoOf: 'Fotografie cu {name}',
    heroLead:
      'Dezvolt aplicații cu Angular și TypeScript din {since}. Acum lucrez și cu Power Platform și Dynamics 365, iar instrumentele de AI și LLM fac parte din munca mea de zi cu zi.',
    nowLabel: 'Acum',
    downloadCv: 'Descarcă CV-ul',
    aboutTitle: 'Despre mine',
    aiTitle: 'Cum lucrez cu AI',
    aiItems: [
      'Prototipez funcționalități și interfețe mai repede cu asistenți de cod bazați pe LLM',
      'Accelerez depanarea și refactorizarea codului de mari dimensiuni',
      'Învăț rapid tehnologii noi, precum Power Apps, Dynamics 365 și .NET',
      'Revizuiesc, testez și îmi asum mereu codul pe care îl livrez',
    ],
    projectTitle: 'Proiect principal',
    visitWebsite: 'Vizitează site-ul',
    appStore: 'Descarcă din App Store',
    carouselLabel: 'Capturi de ecran {name}',
    prevShot: 'Captura anterioară',
    nextShot: 'Captura următoare',
    showShot: 'Arată captura {n} din {total}',
    moreTitle: 'Alte proiecte',
    viewOnGithub: 'Vezi pe GitHub',
    experienceTitle: 'Experiență',
    now: 'Acum',
    showLess: 'Arată mai puțin',
    showEarlier: 'Arată experiența anterioară ({n})',
    skillsTitle: 'Abilități',
    educationTitle: 'Educație și cursuri',
    languagesTitle: 'Limbi',
    outOf: '{n} din 5',
    contactTitle: 'Hai să vorbim',
    contactLead: 'Vrei să colaborăm sau să afli mai multe despre experiența mea? Scrie-mi.',
    cvPdf: 'CV (PDF, în engleză)',
    openToWork: 'Deschis către noi oportunități',
    formName: 'Nume',
    formEmail: 'Email',
    formMessage: 'Mesaj',
    formSend: 'Trimite mesajul',
    formSending: 'Se trimite…',
    formSuccess: 'Mulțumesc! Mesajul tău a fost trimis. Îți voi răspunde în curând.',
    formError: 'Ceva nu a funcționat. Încearcă din nou sau scrie-mi direct pe email.',
    formNote: 'Mesajele sunt livrate prin FormSubmit.',
    footerBuilt: 'Construit cu Angular 21 și signals',
    sourceOnGithub: 'cod sursă pe GitHub',
  },
  profile: {
    ...PROFILE,
    title: 'Dezvoltator Full Stack',
    location: 'București, România',
    now: 'Dezvoltator Full Stack la LINKSOFT · Angular, Power Apps, Dynamics 365',
    about: [
      'Construiesc aplicații web profesionale cu Angular și TypeScript din 2019. Am venit în programare din logistică și transport și păstrez aceleași obiceiuri în cod: fiabilitate, responsabilitate și livrare la termen.',
      'Astăzi dezvolt funcționalități și rezolv bug-uri în proiecte Angular, extinzându-mă în ecosistemul Microsoft: Power Apps, Dynamics 365, C# și .NET. Folosesc zilnic instrumente moderne de AI și LLM pentru a prototipa mai repede, a livra mai devreme, a depana mai eficient și a menține calitatea codului ridicată.',
      'În afara serviciului îmi proiectez și lansez propriile produse, de la idee la lansare. Cel mai recent este CommunityBuilds, o aplicație pentru pasionații de mașini, disponibilă acum în App Store și pe web.',
    ],
  },
  project: {
    ...FEATURED_PROJECT,
    role: 'Creator și dezvoltator',
    status: 'Disponibil în App Store și pe web',
    summary:
      'O platformă în care pasionații de mașini își prezintă mașinile modificate și personalizate, documentează fiecare modificare și descoperă alți constructori.',
    highlights: [
      'Am proiectat, dezvoltat și lansat întregul produs, de la idee la lansare.',
      'Feed, explorare, marketplace, clasamente, căutare, conturi de utilizator și voturi din partea comunității pentru mașini.',
      'Publicată ca aplicație nativă în Apple App Store și ca aplicație web responsive.',
    ],
    tags: ['Proiect personal', 'Mobil și web', 'Comunitate'],
    screens: overlay(FEATURED_PROJECT.screens, [
      { alt: 'Ecranul principal cu logo-ul CommunityBuilds, sloganul și butonul Explore builds' },
      { alt: 'Ecranul Explore cu mașinile comunității sub formă de carduri cu fotografii' },
      { alt: 'Pagina unei mașini cu galerie foto, titlu și preț' },
      { alt: 'Ecranul Rankings cu cele mai apreciate mașini' },
      { alt: 'Ecranul Marketplace cu filtre pentru marcă, model, preț, kilometraj și an' },
    ]),
  },
  moreProjects: overlay(MORE_PROJECTS, [
    { description: 'Ține evidența membrilor care participă la o excursie cu mașina.' },
    { description: 'Un tracker de cheltuieli cu back end PostgreSQL.' },
    { description: 'O aplicație de dating full-stack: back end în C# și front end în TypeScript.' },
  ]),
  experience: overlay(EXPERIENCE, [
    {
      role: 'Dezvoltator Full Stack',
      location: 'București',
      period: 'Feb 2026 – Prezent',
      highlights: [
        'Dezvolt funcționalități noi și rezolv bug-uri în proiecte Angular.',
        'Am creat un proiect nou Canvas App.',
        'Învăț Microsoft Power Platform, cu accent pe Power Apps.',
        'Învăț și lucrez cu Microsoft Dynamics 365.',
      ],
    },
    {
      role: 'Dezvoltator Angular',
      location: 'București',
      period: 'Mai 2023 – Aug 2025',
      highlights: [
        'Am condus dezvoltarea unei platforme web de back-office construite cu Angular 17 și 18.',
        'Am proiectat și implementat componente și interfețe scalabile cu HTML5, TypeScript și SCSS.',
        'Am colaborat într-o echipă Agile, am participat la code review-uri și am sprijinit dezvoltatori juniori.',
        'M-am concentrat pe mentenabilitate, design responsive și compatibilitate între browsere.',
      ],
    },
    {
      role: 'Dezvoltator Angular',
      location: 'București',
      period: 'Mai 2021 – Apr 2023',
      highlights: [
        'Am dezvoltat și întreținut un site de gaming live și aplicația sa de back-office.',
        'Am refactorizat coduri legacy pentru a răspunde noilor cerințe de business.',
        'Am livrat funcționalități noi într-un mediu dinamic, cu deploy-uri frecvente.',
      ],
    },
    {
      role: 'Dezvoltator Angular',
      location: 'Torino, Italia',
      period: 'Iun 2019 – Mar 2021',
      highlights: [
        'Am construit și întreținut portaluri de back-office pentru diverse companii client.',
        'Am colaborat îndeaproape cu echipele de design și backend pentru o integrare funcțională.',
      ],
    },
  ]),
  skills: [
    { ...SKILLS[0], items: SKILLS[0].items.map((i) => (i === 'Responsive design' ? 'Design responsive' : i)) },
    { ...SKILLS[1], title: 'Microsoft și backend' },
    {
      title: 'Instrumente și mod de lucru',
      items: SKILLS[2].items.map((i) =>
        i === 'AI-assisted development (LLMs)' ? 'Dezvoltare asistată de AI (LLM)' : i === 'Code reviews' ? 'Code review-uri' : i,
      ),
    },
  ],
  education: overlay(EDUCATION, [
    {
      title: 'Curs de Java',
      place: '480 de ore, nivel începător + intermediar',
      period: 'Mai 2019',
      detail: 'Java, OOP, design patterns (MVC, DAO, Singleton), Spring MVC, API-uri REST, MySQL, AngularJS.',
    },
    {
      title: 'Diplomă de contabilitate',
      detail: 'Științe ale naturii, matematică și statistică.',
    },
  ]),
  languages: overlay(LANGUAGES, [
    { name: 'Italiană', level: 'Nativ' },
    { name: 'Română', level: 'Nativ' },
    { name: 'Engleză', level: 'Profesional' },
  ]),
};

export const CONTENT: Record<Lang, Content> = { en: EN, it: IT, ro: RO };
