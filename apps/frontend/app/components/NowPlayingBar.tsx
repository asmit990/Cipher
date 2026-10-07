'use client';

import { motion } from 'framer-motion';
import { TAPE, projects } from './constants';

interface NowPlayingBarProps {
  openIndex: number | null;
}

export default function NowPlayingBar({ openIndex }: NowPlayingBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 h-12 bg-black text-white flex items-center px-4 md:px-12 gap-4 text-sm font-semibold">
      <span style={{ color: TAPE }}>
        {openIndex === null ? '■' : '▶'}
      </span>

      <span className="truncate">
        {openIndex === null
          ? 'Pick a track'
          : `Now playing: ${projects[openIndex].title}`}
      </span>

      <div className="ml-auto h-1 w-24 md:w-56 bg-white/20 overflow-hidden">
        {openIndex !== null && (
          <motion.div
            key={openIndex}
            className="h-full"
            style={{ background: TAPE }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 40, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
}
