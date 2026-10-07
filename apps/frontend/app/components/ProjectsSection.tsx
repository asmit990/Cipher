'use client';

import { Anton } from 'next/font/google';
import { projects } from './constants';
import ProjectCard from './ProjectCard';

const display = Anton({ subsets: ['latin'], weight: '400' });

interface ProjectsSectionProps {
  openIndex: number | null;
  onToggle: (idx: number) => void;
}

export default function ProjectsSection({
  openIndex,
  onToggle,
}: ProjectsSectionProps) {
  return (
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
        {projects.map((p, idx) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={idx}
            isActive={openIndex === idx}
            onToggle={() => onToggle(idx)}
          />
        ))}
      </ol>
    </section>
  );
}
