'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Anton } from 'next/font/google';
import { TAPE, type Project } from './constants';

const display = Anton({ subsets: ['latin'], weight: '400' });

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

export default function ProjectCard({
  project: p,
  index: idx,
  isActive: active,
  onToggle,
}: ProjectCardProps) {
  return (
    <li
      className={`border-b-4 border-white transition-colors duration-200 ${
        active ? 'bg-white text-black' : 'hover:bg-white hover:text-black'
      }`}
    >
      <button
        onClick={onToggle}
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
}
