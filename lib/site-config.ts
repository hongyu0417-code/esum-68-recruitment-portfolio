export const GOOGLE_FORM_URL =
  'https://forms.gle/6JP8NPAjTNjUJSp48';

export const navigationItems = [
  { label: 'ESUM 68', href: '#top' },
  { label: 'About ESUM', href: '#about-esum' },
  { label: 'Why ESUM', href: '#why-esum' },
  { label: 'Departments', href: '#departments' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'Tenure Report', href: '#tenure-report' },
  { label: 'Recruitment Journey', href: '#recruitment-journey' },
  { label: 'Contact', href: '#contact' },
] as const;

export const siteAssets = {
  logo: '/esum-logo.png',
  heroImage: '',
  reportCover: '',
} as const;

export const TENURE_REPORT_URL =
  'https://anyflip.com/pebac/eawv/';

export const INSTAGRAM_URL = 'https://www.instagram.com/esum_official/?hl=en';

export const majorEvents = [
  {
    title: 'Micron x ESUM Case Study Competition 2026',
    photo: '',
    photoPosition: 'center 52%',
  },
  {
    title: 'RExharge x ESUM Case Study Competition 2026',
    photo: '',
    photoPosition: 'center center',
  },
  {
    title: 'Journey to the South 2026 - ESUM Singapore Outbound',
    photo: '',
    photoPosition: 'center 58%',
  },
  {
    title: 'Engineering Your Future @ UM 2.0 Pre-U Talk',
    photo: '',
    photoPosition: 'center center',
  },
  {
    title: 'PD to PD Beach Cleaning Initiative',
    photo: '',
    photoPosition: 'center 52%',
  },
  {
    title: 'Universiti Malaya Young Engenius Camp (UMYEC)',
    photo: '',
    photoPosition: 'center 48%',
  },
  {
    title: 'ESUM Melbourne International Outbound Programme',
    photo: '',
    photoPosition: 'center 56%',
  },
] as const;

export const reportHighlights = [
  { value: '40+', label: 'Events' },
  { value: '616', label: 'Members' },
  { value: '18', label: 'Sponsors' },
  { value: '22', label: 'External partnerships' },
  { value: '27', label: 'Industrial collaborations' },
  { value: '2,630', label: 'Participants' },
] as const;

export const reportPhotos = [] as const;

export const recruitmentJourney = [
  {
    date: '30 September 2026, 10:00 AM',
    title: 'Recruitment starts',
    description: 'The ESUM 68 executive application form opens.',
  },
  {
    date: '18 October 2026, 11:59 PM',
    title: 'Recruitment ends',
    description: 'Submit your completed application before the closing time.',
  },
  {
    date: '20 October 2026, 12:00 PM',
    title: 'Shortlisted candidates announced',
    description: 'Shortlisted applicants will receive the announcement through Gmail.',
  },
  {
    date: '23-25 October 2026',
    title: 'Executive candidate interviews',
    description: 'Selected applicants attend their executive recruitment interview.',
  },
  {
    date: '31 October 2026, 12:00 PM',
    title: 'Results and offer letters',
    description: 'Final outcomes and offer letters are released to successful candidates.',
  },
] as const;

export const contacts = [
  {
    name: 'Khor Hong Yu',
    role: 'Events & Projects Director',
    year: 'Year 2',
    discipline: 'Electrical Engineering',
    phone: '',
    whatsapp: '',
    photo: '',
    photoClass: 'contact-hong-yu',
  },
  {
    name: 'Tan Jiong Xi',
    role: 'Events & Projects Director',
    year: 'Year 2',
    discipline: 'Electrical Engineering',
    phone: '',
    whatsapp: '',
    photo: '',
    photoClass: 'contact-jiong-xi',
  },
  {
    name: 'Chong Shan Yu',
    role: 'Events & Projects Director',
    year: 'Year 2',
    discipline: 'Mechanical Engineering',
    phone: '',
    whatsapp: '',
    photo: '',
    photoClass: 'contact-shan-yu',
  },
] as const;

export const aboutHighlights = [
  { value: '1958', label: 'Established at Universiti Malaya' },
  { value: '68 years', label: 'Engineering excellence and student leadership' },
  { value: 'Student-led', label: 'Ideas planned and delivered by students' },
] as const;

export const benefits = [
  {
    id: 'experience',
    title: 'Build real event and project experience',
    description: 'Plan and deliver student-led initiatives while learning how to coordinate people, solve problems, and complete work with purpose.',
    image: '',
    imageAlt: 'ESUM members working and celebrating together',
  },
  {
    id: 'industry',
    title: 'Meet industry partners',
    description: 'Take part in industry visits, technical programmes, career initiatives, and professional engagement beyond the classroom.',
    image: '',
    imageAlt: 'ESUM representatives meeting engineering alumni and industry partners',
  },
  {
    id: 'leadership',
    title: 'Develop leadership and communication',
    description: 'Lead teams, communicate with professionals, make decisions, and take responsibility for outcomes that matter.',
    image: '',
    imageAlt: 'Engineering students presenting and collaborating at a competition',
  },
  {
    id: 'growth',
    title: 'Grow confidence, teamwork, and networks',
    description: 'Build confidence through shared challenges, stronger teamwork, and relationships that continue beyond a single event.',
    image: '',
    imageAlt: 'ESUM student leaders gathered as a team',
  },
] as const;

export const departments = [
  {
    id: 'events-projects',
    code: 'EP',
    name: 'Events and Projects',
    description: 'Turn ideas into well-run experiences for engineering students.',
    jobScope: [
      'Plan and execute flagship events, workshops, competitions, and programmes.',
      'Develop new event concepts and projects for engineering students.',
      'Build collaborations with societies, organisations, industry partners, and communities.',
      'Manage registration, logistics, manpower, and on-ground operations.',
      'Organise internal bonding and member engagement activities.',
    ],
    examples: ['Universiti Malaya Young Engenius Camp (UMYEC)', 'Family Day', 'Annual Dinner and Gala Night'],
    skills: ['Event planning', 'Logistics', 'Team coordination', 'On-ground operations'],
  },
  {
    id: 'industrial-relations',
    code: 'IR',
    name: 'Industrial Relations',
    description: 'Connect students with companies, careers, and the wider engineering industry.',
    jobScope: [
      'Secure internship, scholarship, and career opportunities for engineering students.',
      'Connect and liaise with companies and industry players.',
      'Organise physical industrial talks and industrial visits.',
    ],
    examples: [
      'Micron x ESUM Case Study Competition 2026',
      'RExharge x ESUM Case Study Competition 2026',
      'Journey to the South 2026 - ESUM Singapore Outbound',
    ],
    skills: ['Industry communication', 'Professional liaison', 'Opportunity sourcing', 'Programme coordination'],
  },
  {
    id: 'partnership-development',
    code: 'PD',
    name: 'Partnership Development',
    description: 'Grow the relationships and support that help ESUM operate and stay visible.',
    jobScope: [
      'Manage partner relationships and source new partners.',
      'Find sponsors for ESUM operations.',
      'Source media partners to maintain ESUM exposure.',
      'Manage public relations and collaborations.',
      'Maintain ESUM exposure among partners.',
    ],
    examples: [
      'Journey to the South 2026 - ESUM Singapore Outbound',
      'Engineering Your Future @ UM 2.0 Pre-U Talk',
      'PD to PD Beach Cleaning Initiative',
    ],
    skills: ['Partnership management', 'Sponsorship outreach', 'Public relations', 'Stakeholder communication'],
  },
  {
    id: 'content-marketing',
    code: 'C&M',
    name: 'Content and Marketing',
    description: 'Shape how ESUM looks, communicates, and reaches students online.',
    jobScope: [
      'Create designs and produce content for marketing purposes.',
      'Manage ESUM social media and official website.',
      'Develop strategies to publicise ESUM events.',
      'Handle technical aspects for ESUM events.',
    ],
    examples: ['Event publicity campaigns', 'Social media content', 'Website and event technical support'],
    skills: ['Visual communication', 'Content production', 'Digital strategy', 'Technical support'],
  },
] as const;

export type LeadershipProfileData = {
  name: string;
  role: string;
  photo: string;
  discipline?: string;
  year?: string;
  photoPosition: string;
  photoPositionMobile?: string;
};

export type LeadershipDepartmentData = {
  id: string;
  code: string;
  name: string;
  description: string;
  bods: readonly LeadershipProfileData[];
};

export const highCommittee: readonly LeadershipProfileData[] = [
  {
    name: 'Tan Zi Hao',
    role: 'President',
    photo: '',
    discipline: 'Mechanical Engineering',
    photoPosition: '43% 45%',
    photoPositionMobile: '43% 40%',
  },
  {
    name: 'Lim Jit Hay',
    role: 'Vice President',
    photo: '',
    discipline: 'Mechanical Engineering',
    photoPosition: '50% 44%',
    photoPositionMobile: '50% 36%',
  },
  {
    name: 'Lim Ching Suen',
    role: 'Secretary',
    photo: '',
    discipline: 'Electrical Engineering',
    photoPosition: '50% 57%',
    photoPositionMobile: '50% 50%',
  },
  {
    name: 'Ong Kah Weng',
    role: 'Vice Secretary',
    photo: '',
    discipline: 'Mechanical Engineering',
    photoPosition: '55% 40%',
    photoPositionMobile: '54% 34%',
  },
  {
    name: 'Pung Hong Sheng',
    role: 'Treasurer',
    photo: '',
    discipline: 'Biomedical Engineering',
    photoPosition: '50% 0%',
    photoPositionMobile: '50% 18%',
  },
  {
    name: 'Neo En Hong',
    role: 'Vice Treasurer',
    photo: '',
    discipline: 'Mechanical Engineering',
    photoPosition: '47% 44%',
    photoPositionMobile: '50% 34%',
  },
];

export const leadershipDepartments: readonly LeadershipDepartmentData[] = [
  {
    id: 'events-projects-leadership',
    code: 'EP',
    name: 'Events and Projects',
    description: departments[0].description,
    bods: [
      {
        name: 'Khor Hong Yu',
        role: 'Director',
        photo: '',
        discipline: 'Electrical Engineering',
        year: 'Year 2',
        photoPosition: '50% 39%',
      },
      {
        name: 'Tan Jiong Xi',
        role: 'Director',
        photo: '',
        discipline: 'Electrical Engineering',
        year: 'Year 2',
        photoPosition: '51% 44%',
      },
      {
        name: 'Chong Shan Yu',
        role: 'Director',
        photo: '',
        discipline: 'Mechanical Engineering',
        year: 'Year 2',
        photoPosition: '50% 49%',
      },
    ],
  },
  {
    id: 'partnership-development-leadership',
    code: 'PD',
    name: 'Partnership Development',
    description: departments[2].description,
    bods: [
      {
        name: 'Chuah Yi Xin',
        role: 'Director',
        photo: '',
        discipline: 'Biomedical Engineering',
        year: 'Year 2',
        photoPosition: '50% 36%',
      },
      {
        name: 'Elson Ting',
        role: 'Director',
        photo: '',
        discipline: 'Mechanical Engineering',
        year: 'Year 2',
        photoPosition: '50% 29%',
      },
      {
        name: 'Neoh Han Xue',
        role: 'Director',
        photo: '',
        discipline: 'Mechanical Engineering',
        year: 'Year 2',
        photoPosition: '58% 34%',
      },
    ],
  },
  {
    id: 'industrial-relations-leadership',
    code: 'IR',
    name: 'Industrial Relations',
    description: departments[1].description,
    bods: [
      {
        name: 'Beh Sook Mun',
        role: 'Director',
        photo: '',
        discipline: 'Chemical Engineering',
        year: 'Year 2',
        photoPosition: '50% 27%',
      },
      {
        name: 'Lim Kayser',
        role: 'Director',
        photo: '',
        discipline: 'Electrical Engineering',
        year: 'Year 2',
        photoPosition: '42% 31%',
      },
      {
        name: 'Aiden Soon Min Wei',
        role: 'Director',
        photo: '',
        discipline: 'Electrical Engineering',
        year: 'Year 2',
        photoPosition: '48% 29%',
      },
    ],
  },
  {
    id: 'content-marketing-leadership',
    code: 'C&M',
    name: 'Content and Marketing',
    description: departments[3].description,
    bods: [
      {
        name: 'Chong Kar Mei',
        role: 'Director',
        photo: '',
        discipline: 'Biomedical Engineering',
        year: 'Year 2',
        photoPosition: '52% 27%',
      },
      {
        name: 'Hasviniy Ganasan',
        role: 'Director',
        photo: '',
        discipline: 'Biomedical Engineering',
        year: 'Year 2',
        photoPosition: '50% 29%',
      },
      {
        name: 'Sim Yu En',
        role: 'Director',
        photo: '',
        discipline: 'Electrical Engineering',
        year: 'Year 2',
        photoPosition: '50% 38%',
      },
    ],
  },
];

// Prepared for later phases. Disabled content is intentionally not rendered.
export const futureContent = {
  introductionVideo: { enabled: false, url: '' },
  eventGallery: { enabled: false, images: [] as string[] },
  departmentGalleries: { enabled: false, departments: [] as unknown[] },
  testimonials: { enabled: false, entries: [] as unknown[] },
} as const;
