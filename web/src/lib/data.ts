export const TOKEN_SUPPLY = 100_000_000;
export const RAISE_TARGET = 5_000_000;
export const RUNWAY_YEARS = 7;
export const TGE_CIRCULATING = 9_200_000;
export const TGE_CIRCULATING_PCT = 9.2;
export const INITIAL_MARKET_CAP = 1_380_000;
export const FDV_AT_LISTING = 15_000_000;
export const DEX_LIQUIDITY = 600_000;

export const ROUNDS = [
  {
    id: 'seed',
    tokens: 17_000_000,
    pct: 17,
    price: 0.05,
    raise: 850_000,
    softCap: 850_000,
    deadline: '6 months from open',
    status: 'open',
  },
  {
    id: 'private',
    tokens: 20_000_000,
    pct: 20,
    price: 0.10,
    raise: 2_000_000,
    softCap: 2_000_000,
    deadline: '6 months from Seed close',
    status: 'upcoming',
  },
  {
    id: 'public',
    tokens: 15_000_000,
    pct: 15,
    price: 0.15,
    raise: 2_250_000,
    softCap: 2_250_000,
    deadline: 'Set by launchpad',
    status: 'upcoming',
  },
] as const;

export const TOKEN_DISTRIBUTION = [
  { id: 'forsale',   label: 'For Sale',            pct: 52, color: '#00E87A' },
  { id: 'team',      label: 'Team',                pct: 20, color: '#F5A623' },
  { id: 'ecosystem', label: 'Ecosystem & Liquidity', pct: 12, color: '#3B82F6' },
  { id: 'advisors',  label: 'Advisors & Sales',    pct: 6,  color: '#8B5CF6' },
  { id: 'reserve',   label: 'Project Reserve',     pct: 5,  color: '#EC4899' },
  { id: 'community', label: 'Community Rewards',   pct: 5,  color: '#F97316' },
];

export const MILESTONE_BURNS = [
  { event: 'Sports City Construction Complete', tokens: 2_000_000 },
  { event: 'First Player Transfer',            tokens: 1_000_000 },
  { event: 'Promotion to Divisional A',        tokens: 1_000_000 },
  { event: 'Promotion to Divisional B',        tokens: 500_000   },
  { event: 'International Cup Qualification',  tokens: 1_500_000 },
];

export const ROADMAP_PHASES = [
  {
    id: 1,
    period: 'Q1–Q2 2026',
    name: 'Foundation & Fundraising',
    milestones: [
      'Seed, Private & Public token rounds completed',
      'SAD legal structure established in Uruguay',
      'Smart contracts deployed & independently audited',
      'Initial DEX liquidity ($600K, protocol-owned)',
    ],
    burn: null,
    success: '~$5M raised, PFG token live, legal entity operational',
  },
  {
    id: 2,
    period: 'Q3 2026 – Q2 2027',
    name: 'Infrastructure Construction',
    milestones: [
      'Sports city facility construction underway',
      'Technical & operational staff hired',
      'Club partnerships established (3–5 local clubs)',
      'Player scouting network launched',
    ],
    burn: { label: 'Construction Complete', tokens: 2_000_000 },
    success: 'Facility completed, full team in place, active partnerships',
  },
  {
    id: 3,
    period: 'Q3 – Q4 2027',
    name: 'Operations Launch',
    milestones: [
      'Facility grand opening',
      'First player cohort onboarded (20–30 athletes)',
      'Training programs and competitions launched',
      'Community advisory governance activated',
    ],
    burn: { label: 'Promotion to Divisional B', tokens: 500_000 },
    success: 'Facility operational, players developing, community engaged',
  },
  {
    id: 4,
    period: '2028 – 2029',
    name: 'Revenue Generation',
    milestones: [
      'First international player transfers executed',
      'Training rights & FIFA Solidarity revenue activated',
      'Sell-on clauses negotiated with buying clubs',
      'Buyback & Burn Pool first activation',
    ],
    burn: { label: 'First Player Transfer', tokens: 1_000_000 },
    success: 'Revenue generating, Buyback Pool active, operationally self-sustaining',
  },
  {
    id: 5,
    period: '2030+',
    name: 'Scaling & Expansion',
    milestones: [
      'Additional facility acquisitions',
      'International partnerships established',
      'Multi-cohort player pipeline active',
      'Full strategic community governance activated',
    ],
    burn: { label: 'Divisional A + International Cup', tokens: 2_500_000 },
    success: 'Sustainable model, regional leadership, active token economy',
  },
];

export const REVENUE_SOURCES = [
  { id: 'transfers', icon: '⚽', min: 300_000,  max: 15_000_000 },
  { id: 'training',  icon: '🎓', pct: 5 },
  { id: 'sellon',    icon: '📈', min: 10,       max: 30 },
  { id: 'tv',        icon: '📺', divA: 2_000_000, divB: 800_000 },
  { id: 'conmebol',  icon: '🏆', min: 250_000,  max: 3_000_000 },
];

export const VESTING_SCHEDULES = [
  { category: 'Team',      cliff: 12, linear: 36, tge: 0  },
  { category: 'Advisors',  cliff: 6,  linear: 18, tge: 0  },
  { category: 'Seed',      cliff: 3,  linear: 24, tge: 10 },
  { category: 'Private',   cliff: 0,  linear: 18, tge: 15 },
  { category: 'Public',    cliff: 0,  linear: 9,  tge: 30 },
];
