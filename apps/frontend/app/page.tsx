'use client';

import { useState } from 'react';
import { Archivo } from 'next/font/google';
import { CONCRETE } from './components/constants';
import GlobalStyles from './components/GlobalStyles';
import FloatingKanye from './components/FloatingKanye';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import OutroSection from './components/OutroSection';
import NowPlayingBar from './components/NowPlayingBar';

const body = Archivo({ subsets: ['latin'], weight: ['400', '600', '800'] });

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpen((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      className={`${body.className} relative min-h-screen text-white overflow-x-hidden pb-14`}
      style={{ background: CONCRETE }}
    >
      <GlobalStyles />
      <FloatingKanye />
      <HeroSection />
      <ProjectsSection openIndex={open} onToggle={handleToggle} />
      <OutroSection />
      <NowPlayingBar openIndex={open} />
    </div>
  );
}
