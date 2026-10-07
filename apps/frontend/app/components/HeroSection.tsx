import Link from 'next/link';
import { Anton } from 'next/font/google';

const display = Anton({ subsets: ['latin'], weight: '400' });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 overflow-hidden">
      <div
        className="absolute top-8 right-6 md:right-12 w-44 border-2 border-white p-2 text-xs leading-snug font-semibold bg-black"
        style={{ transform: 'rotate(3deg)' }}
      >
        Warning: contains p95 latency numbers and strong opinions about queues.
      </div>

      <h1
        className={`${display.className} uppercase leading-[0.78] tracking-tight select-none`}
        style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
      >
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
  );
}
