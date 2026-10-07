'use client';

import { TAPE } from './constants';

export default function GlobalStyles() {
  return (
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
  );
}
