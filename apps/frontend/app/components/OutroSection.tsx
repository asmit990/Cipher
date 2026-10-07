import Link from 'next/link';
import { Anton } from 'next/font/google';

const display = Anton({ subsets: ['latin'], weight: '400' });

export default function OutroSection() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <p
        className={`${display.className} uppercase text-4xl md:text-6xl leading-[0.95]`}
      >
        "I'm not a businessman, I'm a business, man."
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
  );
}
