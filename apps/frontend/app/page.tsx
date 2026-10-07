'use client';

import Image from 'next/image';

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Anton, Archivo } from 'next/font/google';

import kanyeImg from './images/kanions.png';



const display = Anton({ subsets: ['latin'], weight: '400' });

const body = Archivo({ subsets: ['latin'], weight: ['400', '600', '800'] });







interface Project {

  title: string;

  kanyeBar: string;

  techStack: string[];

  description: string;

  githubUrl?: string;

  liveUrl?: string;

  highlights: string[];

}



const projects: Project[] = [

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



const CONCRETE = '#000000';

const TAPE = '#e0201b';



export default function Home() {

  const [open, setOpen] = useState<number | null>(null);
  const [yePos, setYePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveToRandom = () => {
      const pad = 80;
      const maxX = window.innerWidth - pad;
      const maxY = window.innerHeight - pad;
      setYePos({
        x: Math.max(pad, Math.random() * maxX),
        y: Math.max(pad, Math.random() * maxY),
      });
    };
    moveToRandom();
    const interval = setInterval(moveToRandom, 3000);
    return () => clearInterval(interval);
  }, []);







  return (

    <div

      className={`${body.className} relative min-h-screen text-white overflow-x-hidden pb-14`}

      style={{ background: CONCRETE }}

    >

      <style>{`

        @keyframes tape-scroll {

          from { transform: translateX(0); }

          to { transform: translateX(-50%); }

        }



        .tape-run {

          animation: tape-scroll 90s linear infinite;

        }



        @media (prefers-reduced-motion: reduce) {

          .tape-run {

            animation: none;

          }

        }



        .focus-ring:focus-visible {

          outline: 3px solid ${TAPE};

          outline-offset: 2px;

        }

      `}</style>



      {/* Ye floating randomly */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{ x: yePos.x, y: yePos.y }}
        transition={{ duration: 3, ease: 'linear' }}
      >
        <Image
          src={kanyeImg}
          alt=""
          width={72}
          height={72}
          className="rounded-full border-4 border-white"
        />
      </motion.div>



      {/* Hero */}

      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 overflow-hidden">

        <div

          className="absolute top-8 right-6 md:right-12 w-44 border-2 border-white p-2 text-xs leading-snug font-semibold bg-black"

          style={{ transform: 'rotate(3deg)' }}

        >

          Warning: contains p95 latency numbers and strong opinions about queues.

        </div>



        <h1 className={`${display.className} uppercase leading-[0.78] tracking-tight select-none`}

          style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}>



          Hiiiii, I'm

        </h1>

        <h1

          className={`${display.className} uppercase leading-[0.78] tracking-tight select-none`}

          style={{ fontSize: 'clamp(7rem, 30vw, 30rem)' }}

        >



          Asmit

        </h1>







        <p className="mt-8 max-w-md text-lg font-semibold leading-snug">

          Full-stack engineer who likes systems that don't fall over.

        </p>



        <div className="mt-8 flex flex-wrap gap-3">

          <a

            href="#projects"

            className="focus-ring px-7 py-3 bg-white text-black font-extrabold hover:bg-black hover:text-white transition-colors"

          >

            Hear the tracks

          </a>



          <Link

            href="/pages"

            className="focus-ring px-7 py-3 border-2 border-white text-white font-extrabold hover:bg-white hover:text-black transition-colors"

          >

            Resume

          </Link>

        </div>

      </section>



      {/* Projects */}

      <section

        id="projects"

        className="px-6 md:px-12 pt-20 max-w-5xl mx-auto"

      >

        <h2

          className={`${display.className} uppercase text-6xl md:text-8xl leading-none`}

        >

          Projects

        </h2>



        <p className="mt-3 mb-12 text-lg font-semibold">

          Four projects. Pick one.

        </p>



        <ol className="border-t-4 border-white">

          {projects.map((p, idx) => {

            const active = open === idx;



            return (

              <li

                key={p.title}

                className={`border-b-4 border-white transition-colors duration-200 ${active ? 'bg-white text-black' : 'hover:bg-white hover:text-black'

                  }`}

              >

                <button

                  onClick={() => setOpen(active ? null : idx)}

                  aria-expanded={active}

                  className="focus-ring w-full text-left px-3 md:px-5 py-6 md:py-8 cursor-pointer"

                >

                  <div className="flex items-baseline gap-4 md:gap-8">

                    <span

                      className={`${display.className} text-5xl md:text-7xl w-14 md:w-24 shrink-0`}

                      style={{ color: active ? TAPE : undefined }}

                    >

                      {idx + 1}

                    </span>



                    <div className="flex-1 min-w-0">

                      <h3

                        className={`${display.className} uppercase text-4xl md:text-6xl leading-none`}

                      >

                        {p.title}

                      </h3>



                      <p className="mt-3 max-w-prose leading-relaxed">

                        {p.description}

                      </p>



                      <p className="mt-2 text-sm opacity-70">

                        feat. {p.techStack.join(', ')}

                      </p>

                    </div>



                    <span className="text-3xl font-extrabold shrink-0">

                      {active ? '×' : '+'}

                    </span>

                  </div>

                </button>



                <AnimatePresence initial={false}>

                  {active && (

                    <motion.div

                      initial={{ height: 0 }}

                      animate={{ height: 'auto' }}

                      exit={{ height: 0 }}

                      transition={{ duration: 0.25 }}

                      className="overflow-hidden"

                    >

                      <div className="px-3 md:px-5 pb-8 pl-[4.5rem] md:pl-[8.5rem]">

                        <p className="italic mb-5 opacity-80">

                          {p.kanyeBar}

                        </p>



                        <p className="font-extrabold mb-2">

                          Liner notes

                        </p>



                        <ul className="space-y-2">

                          {p.highlights.map((h) => (

                            <li key={h} className="flex gap-3">

                              <span

                                style={{ color: TAPE }}

                                className="font-extrabold"

                              >

                                /

                              </span>



                              <span>{h}</span>

                            </li>

                          ))}

                        </ul>



                        <div className="flex gap-6 mt-6 font-extrabold">

                          {p.githubUrl && (

                            <a

                              href={p.githubUrl}

                              target="_blank"

                              rel="noopener noreferrer"

                              className="focus-ring underline underline-offset-4 decoration-2 hover:text-[#e0201b]"

                            >

                              Source

                            </a>

                          )}



                          {p.liveUrl && (

                            <a

                              href={p.liveUrl}

                              target="_blank"

                              rel="noopener noreferrer"

                              className="focus-ring underline underline-offset-4 decoration-2 hover:text-[#e0201b]"

                            >

                              Live demo

                            </a>

                          )}

                        </div>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </li>

            );

          })}

        </ol>

      </section>



      {/* Outro */}

      <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto">

        <p

          className={`${display.className} uppercase text-4xl md:text-6xl leading-[0.95]`}

        >

          “I'm not a businessman, I'm a business, man.”

        </p>



        <p className="mt-3 font-semibold">

          Jay-Z, but also me, deploying at 3am.

        </p>



        <div className="mt-10 flex flex-wrap gap-3">

          <Link

            href="/pages"

            className="focus-ring px-8 py-4 bg-white text-black font-extrabold hover:bg-black hover:text-white transition-colors"

          >

            Full resume

          </Link>



          <a

            href="https://github.com/asmit990"

            target="_blank"

            rel="noopener noreferrer"

            className="focus-ring px-8 py-4 border-2 border-white text-white font-extrabold hover:bg-white hover:text-black transition-colors"

          >

            GitHub

          </a>

        </div>



        <p className="mt-16 text-sm opacity-70">

          Built by Asmit on caffeine and Ye's discography.

        </p>

      </section>



      {/* Now playing */}

      <div className="fixed bottom-0 inset-x-0 z-40 h-12 bg-black text-white flex items-center px-4 md:px-12 gap-4 text-sm font-semibold">

        <span style={{ color: TAPE }}>

          {open === null ? '■' : '▶'}

        </span>



        <span className="truncate">

          {open === null

            ? 'Pick a track'

            : `Now playing: ${projects[open].title}`}

        </span>



        <div className="ml-auto h-1 w-24 md:w-56 bg-white/20 overflow-hidden">

          {open !== null && (

            <motion.div

              key={open}

              className="h-full"

              style={{ background: TAPE }}

              initial={{ width: '0%' }}

              animate={{ width: '100%' }}

              transition={{ duration: 40, ease: 'linear' }}

            />

          )}

        </div>

      </div>

    </div>

  );

}
