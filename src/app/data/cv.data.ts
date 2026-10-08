export interface Link {
  label: string;
  url: string;
}

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  name: string;
  role: string;
  status: string;
  url: string;
  appStoreUrl: string;
  screens: Screenshot[];
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
  dots: number;
}

export interface Education {
  title: string;
  place: string;
  period: string;
  detail: string;
}

export interface MoreProject {
  name: string;
  description: string;
  stack: string[];
  year: string;
  url: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  headline: string;
  location: string;
  since: number;
  now: string;
  /** Shows the "open to new opportunities" badge in the hero. */
  openToWork: boolean;
  /** Set to null to show initials instead of a photo. */
  photo: string | null;
  cv: string;
  email: string;
  links: { github: string; linkedin: string };
  about: string[];
}

export const PROFILE: Profile = {
  name: 'Razvan Resmerita',
  initials: 'RR',
  title: 'Full Stack Developer',
  headline: 'Angular · TypeScript · Power Platform · Dynamics 365',
  location: 'Bucharest, Romania',
  since: 2019,
  now: 'Full Stack Developer at LINKSOFT · Angular, Power Apps, Dynamics 365',
  openToWork: true,
  photo: 'profile.jpg',
  cv: 'CV-Resmerita-Razvan.pdf',
  email: 'resmeritarazvan93@gmail.com',
  links: {
    github: 'https://github.com/RazRes',
    linkedin: 'https://www.linkedin.com/in/razvan-resmerita-16221814a',
  },
  about: [
    'I’ve been building professional web applications with Angular and TypeScript since 2019. I came into software from logistics and transportation, and I still bring the same habits to my code: reliability, ownership and getting things delivered on time.',
    'Today I build features and fix bugs on Angular projects while expanding into the Microsoft ecosystem: Power Apps, Dynamics 365, C# and .NET. I work with modern AI and LLM tools every day, using them to prototype faster, ship sooner, debug smarter and keep code quality high.',
    'Outside my day job I design and ship my own products end to end. The latest is CommunityBuilds, a community app for car enthusiasts, now live on the App Store and the web.',
  ],
};

export const FEATURED_PROJECT: Project = {
  name: 'CommunityBuilds',
  role: 'Creator & Developer',
  status: 'Live on App Store & Web',
  url: 'https://community-builds-nu.vercel.app',
  appStoreUrl: 'https://apps.apple.com/ro/app/communitybuilds-app/id6810118751',
  screens: [
    { src: 'screens/home.jpg', alt: 'Home screen with the CommunityBuilds logo, tagline and the Explore builds button' },
    { src: 'screens/explore.jpg', alt: 'Explore screen listing community builds as photo cards' },
    { src: 'screens/build.jpg', alt: 'Build page with a photo gallery, title and price' },
    { src: 'screens/rankings.jpg', alt: 'Rankings screen with the most-loved builds' },
    { src: 'screens/marketplace.jpg', alt: 'Marketplace screen with filters for make, model, price, mileage and year' },
  ],
  summary:
    'A platform where car enthusiasts showcase their modified and customized builds, document every mod and discover other builders.',
  highlights: [
    'Designed, built and launched the full product end to end.',
    'Feed, explore, marketplace, rankings, search, user accounts and community voting on builds.',
    'Published as a native app on the Apple App Store and as a responsive web app.',
  ],
  tags: ['Side project', 'Mobile & Web', 'Community'],
};

export const EXPERIENCE: Job[] = [
  {
    role: 'Full Stack Developer',
    company: 'LINKSOFT',
    location: 'Bucharest',
    period: 'Feb 2026 – Present',
    current: true,
    highlights: [
      'Building new features and solving bugs on Angular projects.',
      'Created a new Canvas App project.',
      'Learning the Microsoft Power Platform, with a focus on Power Apps.',
      'Learning and working with Microsoft Dynamics 365.',
    ],
    stack: ['Angular 21', 'Go', 'C#', '.NET', 'Power Apps', 'Dynamics 365'],
  },
  {
    role: 'Angular Developer',
    company: 'PlentyOne Development',
    location: 'Bucharest',
    period: 'May 2023 – Aug 2025',
    highlights: [
      'Led development of a back-office web platform built with Angular 17 and 18.',
      'Designed and implemented scalable components and user interfaces with HTML5, TypeScript and SCSS.',
      'Collaborated in an Agile team, took part in code reviews and supported junior developers.',
      'Focused on maintainability, responsive design and cross-browser compatibility.',
    ],
    stack: ['Angular 17/18', 'TypeScript', 'RxJS', 'NgRx', 'SASS', 'Azure', 'Jira'],
  },
  {
    role: 'Angular Developer',
    company: 'REI Development Services',
    location: 'Bucharest',
    period: 'May 2021 – Apr 2023',
    highlights: [
      'Developed and maintained a live gaming website and its back-office application.',
      'Refactored legacy codebases to meet updated business requirements.',
      'Delivered new features in a fast-paced environment with frequent deployments.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'GitLab', 'Azure', 'Jasmine', 'Karma'],
  },
  {
    role: 'Angular Developer',
    company: 'Finance Evolution SRL',
    location: 'Turin, Italy',
    period: 'Jun 2019 – Mar 2021',
    highlights: [
      'Built and maintained back-office portals for various client companies.',
      'Collaborated closely with design and backend teams to ensure functional integration.',
    ],
    stack: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'GitLab'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'NgRx', 'HTML5', 'CSS3', 'SASS/SCSS', 'Responsive design'],
  },
  {
    title: 'Microsoft & backend',
    items: ['Power Apps (Canvas Apps)', 'Dynamics 365', 'C#', '.NET', 'Go', 'Node.js', 'REST APIs'],
  },
  {
    title: 'Tools & ways of working',
    items: ['AI-assisted development (LLMs)', 'ChatGPT', 'Claude', 'Git', 'GitLab', 'Azure', 'Jira', 'Jasmine & Karma', 'Agile/Scrum', 'Code reviews'],
  },
];

export const EDUCATION: Education[] = [
  {
    title: 'Java Course',
    place: '480 hours, Basic + Intermediate',
    period: 'May 2019',
    detail: 'Java, OOP, design patterns (MVC, DAO, Singleton), Spring MVC, REST APIs, MySQL, AngularJS.',
  },
  {
    title: 'Accounting Diploma',
    place: 'Istituto Superiore "B. Vittone", Chieri',
    period: '2012 – 2017',
    detail: 'Natural sciences, mathematics and statistics.',
  },
];

export const LANGUAGES: Language[] = [
  { name: 'Italian', level: 'Native', dots: 5 },
  { name: 'Romanian', level: 'Native', dots: 5 },
  { name: 'English', level: 'Professional', dots: 4 },
];

/** Public GitHub repos, described only from what their code and GitHub metadata show. */
export const MORE_PROJECTS: MoreProject[] = [
  {
    name: 'car-trip',
    description: 'Keeps track of the members who join a car trip.',
    stack: ['HTML'],
    year: '2026',
    url: 'https://github.com/RazRes/car-trip',
  },
  {
    name: 'ExpensesTracker',
    description: 'An expenses tracker with a PostgreSQL back end.',
    stack: ['HTML', 'JavaScript', 'PostgreSQL'],
    year: '2026',
    url: 'https://github.com/RazRes/ExpensesTracker',
  },
  {
    name: 'DatingApp',
    description: 'A full-stack dating app: a C# back end with a TypeScript front end.',
    stack: ['C#', 'TypeScript'],
    year: '2025',
    url: 'https://github.com/RazRes/DatingApp',
  },
];
