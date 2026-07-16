'use client';

import { useState } from 'react';

const COLS = 3;
const ROWS = 2;

export default function HeroShatterVideo({ src }) {
  const [hovered, setHovered] = useState(false);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      tiles.push({ r, c });
    }
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tiles.map(({ r, c }) => {
        const seed = r * COLS + c;
        const dx = ((seed * 37) % 70) - 35;
        const dy = ((seed * 53) % 70) - 35;
        const rot = ((seed * 19) % 26) - 13;

        return (
          <div
            key={`${r}-${c}`}
            className="absolute overflow-hidden transition-transform duration-500 ease-out"
            style={{
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              left: `${(c * 100) / COLS}%`,
              top: `${(r * 100) / ROWS}%`,
              transform: hovered
                ? `translate(${dx}px, ${dy}px) rotate(${rot}deg)`
                : 'translate(0px, 0px) rotate(0deg)',
              willChange: 'transform',
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute opacity-65"
              style={{
                width: `${COLS * 100}%`,
                height: `${ROWS * 100}%`,
                maxWidth: 'none',
                maxHeight: 'none',
                left: `-${c * 100}%`,
                top: `-${r * 100}%`,
                objectFit: 'cover',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
