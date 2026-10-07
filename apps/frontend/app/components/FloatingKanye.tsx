'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import kanyeImg from '../images/kanions.png';

export default function FloatingKanye() {
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

      />
    </motion.div>
  );
}
