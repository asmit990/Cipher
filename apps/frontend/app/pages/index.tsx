'use client';

import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-8 px-4 print:bg-white print:p-0">
      {/* Top Bar */}
      <div className="max-w-[800px] mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-black transition-colors"
        >
          ← Back to Projects
        </Link>
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 text-sm font-medium bg-black text-white rounded hover:bg-neutral-800 transition-colors"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Resume Sheet */}
      <main className="max-w-[800px] mx-auto bg-white shadow-lg p-10 md:p-14 text-[13.5px] leading-snug print:shadow-none print:p-0 print:max-w-none">

        {/* Header */}
        <header className="text-center border-b border-neutral-300 pb-3">
          <h1 className="text-[28px] font-bold tracking-wide uppercase">
            Asmit Pandey
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1.5 text-[12px] text-neutral-600">
            <a href="tel:+919354074216" className="hover:text-black">+91-9354074216</a>
            <span className="text-neutral-400">|</span>
            <a href="mailto:asmitpandey582@gmail.com" className="underline hover:text-black">asmitpandey582@gmail.com</a>
            <span className="text-neutral-400">|</span>
            <a href="https://www.linkedin.com/in/asmithuyar" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">linkedin.com/in/asmithuyar</a>
            <span className="text-neutral-400">|</span>
            <a href="https://github.com/asmit990" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">github.com/asmit990</a>
            <span className="text-neutral-400">|</span>
            <a href="https://asmit.fun" target="_blank" rel="noopener noreferrer" className="underline hover:text-black font-medium">asmit.fun</a>
          </div>
        </header>

        {/* Education */}
        <Section title="Education">
          <div className="flex justify-between items-baseline">
            <span className="font-bold">Gautam Buddha University</span>
            <span className="text-xs text-neutral-500">Greater Noida, UP</span>
          </div>
          <div className="flex justify-between items-baseline text-[12.5px] text-neutral-600 italic mt-0.5">
            <span>Bachelor of Technology in Information Technology</span>
            <span className="not-italic text-xs">2023 — 2027</span>
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <div className="flex justify-between items-baseline">
            <span className="font-bold">Google Developer Groups (GDG) GBU</span>
            <span className="text-xs text-neutral-500">Greater Noida, UP</span>
          </div>
          <div className="flex justify-between items-baseline text-[12.5px] text-neutral-600 italic mt-0.5">
            <span>Core Member</span>
            <span className="not-italic text-xs">2024 — Present</span>
          </div>
          <ul className="list-disc ml-5 mt-1.5 text-[12.5px] text-neutral-700 space-y-1">
            <li>
              Ran technical workshops for <strong>200+ students</strong> on web development fundamentals and open-source contribution, building a peer-learning community around modern web tooling.
            </li>
          </ul>
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="space-y-3">

            <ProjectEntry
              title="Qlue"
              tech="React 19, TypeScript, SQLite WASM, Node.js, WebSockets, RabbitMQ, PostgreSQL, Redis, Gemini AI"
              githubUrl="https://github.com/asmit990/qlue"
              liveUrl="https://qlue.cloud/"
              bullets={[
                'Built a <b>privacy-first conversational BI platform</b> where users ask questions in plain English and get SQL queries, charts, and answers — all executed locally in the browser via <b>SQLite WASM</b>. No raw data ever reaches the server.',
                'Designed a drag-and-drop <b>Workflow Studio</b> using React Flow where users chain Filter, Join, and AI Transform nodes into visual pipelines, compiled into optimized SQLite queries and streamed back in real time over <b>WebSockets</b>.',
                'Shipped team workspaces, Razorpay billing, scheduled email reports, and Google Drive/Sheets integrations. Deployed to <b>Web, Android, and iOS</b> (Capacitor) from a Turborepo monorepo via GitHub Actions to <b>AWS EC2</b>.',
              ]}
            />

            <ProjectEntry
              title="Aegis — Fraud Detection"
              tech="Node.js, TypeScript, Apache Kafka, Redis, PostgreSQL, Gemini AI, React, Docker"
              githubUrl="https://github.com/asmit990/fraud-detection-platform"
              liveUrl="https://theasus-ajetmp186-asmitpandey5848-7532s-projects.vercel.app/"
              bullets={[
                'Architected <b>4 event-driven microservices</b> communicating over Kafka with a Transactional Outbox pattern and a Dead Letter Queue that isolates failed messages after 3 retries. End-to-end detection latency: <b>~0.9s</b>.',
                'Built an <b>idempotency engine</b> (SHA-256 fingerprinting) that replays cached responses in under 20ms, rejects duplicates with 409, and catches tampered payloads with 422. Added Redis-backed consumer deduplication.',
                'Designed a <b>hybrid risk engine</b> combining 8 parallel rule checks (velocity, geo, device, IP) with Gemini AI reasoning, falling back to rules-only on timeout. High-risk alerts auto-dispatch via Kafka to email notifications.',
              ]}
            />

            <ProjectEntry
              title="MiniCDN"
              tech="Go, TypeScript, Redis, MinIO, Docker, Prometheus"
              githubUrl="https://github.com/asmit990/miniCDN"
              bullets={[
                'Built a <b>distributed CDN</b> with 3 Go edge nodes (Mumbai, London, NYC) behind a TypeScript gateway handling GeoIP routing, health probes, and auto-failover. Cut p95 latency from ~300ms to <b>~4ms (75x improvement)</b>.',
                'Wrote a concurrency-safe <b>LRU cache from scratch</b> in Go with TTL/byte-budget eviction and ETag/304 revalidation, reducing origin egress by <b>65%</b>.',
                'Added request coalescing (1,000 concurrent cache misses collapse to 1 origin fetch), a 3-state circuit breaker, sub-5ms Redis Pub/Sub cache purge, and a live <b>Prometheus + React</b> monitoring dashboard.',
              ]}
            />

            <ProjectEntry
              title="ErrorHub"
              tech="React, TypeScript, Node.js, Express 5, PostgreSQL, TanStack Query, Tailwind"
              githubUrl="https://github.com/asmit990/errorhub"
              liveUrl="https://errorhub.vercel.app"
              bullets={[
                'Built a <b>4-package error tracking platform</b> (API, dashboard, JS SDK, CLI). The SDK auto-captures uncaught exceptions and unhandled rejections with full stack traces in both browser and Node.js environments.',
                'Implemented email/password, Google OAuth, and magic-link auth with JWT-protected APIs. The CLI authenticates via a local callback server. Deployed on <b>Vercel + Render</b>.',
              ]}
            />

            <ProjectEntry
              title="Alerter / Cipher"
              tech="Node.js, TypeScript, BullMQ, Redis, PostgreSQL, Gemini AI, Slack Webhooks, Docker"
              bullets={[
                'Engineered an <b>autonomous AI investigation service</b> processing Zendesk customer tickets, running telemetry checks and synthesizing root-cause hypotheses with Gemini AI.',
                'Designed <b>BullMQ distributed job queues</b> with Redis persistence for worker isolation, dead-letter retry logic, and real-time Slack incident notification dispatching.',
              ]}
            />

          </div>
        </Section>

        {/* Technical Skills */}
        <Section title="Technical Skills">
          <div className="text-[12.5px] space-y-1 text-neutral-700">
            <div><strong className="text-neutral-900">Languages:</strong> JavaScript, TypeScript, Go, Python, C++</div>
            <div><strong className="text-neutral-900">Frontend:</strong> React.js, Tailwind CSS, Framer Motion, Recharts, Zustand</div>
            <div><strong className="text-neutral-900">Backend:</strong> Node.js, Express.js, REST APIs, JWT, WebSocket, RabbitMQ, BullMQ, Apache Kafka</div>
            <div><strong className="text-neutral-900">Databases:</strong> PostgreSQL, SQLite, MongoDB, Redis, NeonDB</div>
            <div><strong className="text-neutral-900">DevOps &amp; Tools:</strong> Docker, GitHub Actions, Turborepo, AWS EC2, Vercel, Render, Prometheus, Git</div>
          </div>
        </Section>

        {/* Achievements */}
        <Section title="Achievements">
          <ul className="list-disc ml-5 text-[12.5px] text-neutral-700 space-y-1">
            <li><strong>Hackathon — 2nd Place:</strong> Ranked 2nd of 40+ teams, delivering a production-ready full-stack expense tracker in 7 hours.</li>
            <li><strong>Web Development Head, Frames Club:</strong> Directed end-to-end design and launch of the club&apos;s official website.</li>
            <li><strong>LeetCode:</strong> 150+ questions solved.</li>
          </ul>
        </Section>

      </main>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          @page { size: letter portrait; margin: 0.5in; }
        }
      `}</style>
    </div>
  );
}

/* ---- Helper Components ---- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="text-[14px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-[2px] mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ProjectEntry({
  title,
  tech,
  githubUrl,
  liveUrl,
  bullets,
}: {
  title: string;
  tech: string;
  githubUrl?: string;
  liveUrl?: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-y-0.5 text-[13px]">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-bold text-neutral-900">{title}</span>
          <span className="text-neutral-400">|</span>
          <span className="text-[12px] italic text-neutral-600">{tech}</span>
        </div>
        <div className="text-xs flex items-center gap-1.5 ml-auto">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-black underline">GitHub</a>
          )}
          {githubUrl && liveUrl && <span className="text-neutral-400">|</span>}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-800 font-medium hover:text-blue-700 underline">Live</a>
          )}
        </div>
      </div>
      <ul className="list-disc ml-5 mt-1 text-[12.5px] text-neutral-700 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
        ))}
      </ul>
    </div>
  );
}