export const CONCRETE = '#000000';
export const TAPE = '#e0201b';

export interface Project {
  title: string;
  kanyeBar: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    title: 'Qlue',
    kanyeBar: '"I asked the data a question and it answered in SQL" (Ye, probably)',
    techStack: ['React 19', 'SQLite WASM', 'WebSockets', 'RabbitMQ', 'Gemini AI'],
    description:
      'Privacy-first conversational BI platform. Ask questions in English, get SQL + charts. All executed locally in the browser. No data ever reaches the server.',
    githubUrl: 'https://github.com/asmit990/qlue',
    liveUrl: 'https://qlue.cloud/',
    highlights: [
      'Drag-and-drop Workflow Studio with React Flow',
      'Team workspaces + Razorpay billing',
      'Deployed to Web, Android, iOS via Turborepo + GitHub Actions → AWS EC2',
    ],
  },
  {
    title: 'Aegis: Fraud Detection',
    kanyeBar: '"They tried to play me but my Kafka consumers never sleep" (Ye, 2024)',
    techStack: ['Kafka', 'Redis', 'PostgreSQL', 'Gemini AI', 'Docker'],
    description:
      '4 event-driven microservices catching fraudsters in ~0.9s. Transactional Outbox, Dead Letter Queues, and a hybrid AI risk engine.',
    githubUrl: 'https://github.com/asmit990/fraud-detection-platform',
    liveUrl: 'https://theasus-ajetmp186-asmitpandey5848-7532s-projects.vercel.app/',
    highlights: [
      'SHA-256 idempotency engine: replays cached responses in <20ms',
      '8 parallel rule checks + Gemini AI reasoning fallback',
      'Auto Kafka → email alerts for high-risk transactions',
    ],
  },
  {
    title: 'MiniCDN',
    kanyeBar: '"75x faster. That\'s not improvement, that\'s a resurrection" (Ye, on latency)',
    techStack: ['Go', 'TypeScript', 'Redis', 'MinIO', 'Prometheus'],
    description:
      'Distributed CDN with 3 Go edge nodes (Mumbai, London, NYC). GeoIP routing, health probes, auto-failover. p95 latency: ~300ms → ~4ms.',
    githubUrl: 'https://github.com/asmit990/miniCDN',
    highlights: [
      'Hand-written LRU cache in Go with TTL/byte-budget eviction',
      '1,000 concurrent cache misses → 1 origin fetch (request coalescing)',
      'Live Prometheus + React monitoring dashboard',
    ],
  },
  {
    title: 'ErrorHub',
    kanyeBar: '"My code don\'t have bugs, it has features you haven\'t discovered" (Ye, lying)',
    techStack: ['React', 'Express 5', 'PostgreSQL', 'TanStack Query'],
    description:
      '4-package error tracking platform (API, dashboard, JS SDK, CLI). Auto-captures uncaught exceptions with full stack traces.',
    githubUrl: 'https://github.com/asmit990/errorhub',
    liveUrl: 'https://errorhub.vercel.app',
    highlights: [
      'Email/password, Google OAuth, and magic-link auth',
      'CLI authenticates via local callback server',
      'Deployed on Vercel + Render',
    ],
  },
];
