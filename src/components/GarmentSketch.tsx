import type { Silhouette } from '../data/products';

/*
  Flat technical sketch of a garment, the kind a pattern cutter draws.
  Used in place of a product photo until the shoot is ready, so the grid
  stays honest instead of reusing someone else's photo.
*/

const SHORT_BODY =
  'M62 46 L86 34 Q100 44 114 34 L138 46 L168 76 L150 94 L140 86 L140 224 L60 224 L60 86 L50 94 L32 76 Z';
const LONG_BODY =
  'M62 46 L86 32 Q100 42 114 32 L138 46 Q160 60 166 120 L176 214 L156 218 L142 120 L140 224 L60 224 L58 120 L44 218 L24 214 L34 120 Q40 60 62 46 Z';

function Parts({ kind }: { kind: Silhouette }) {
  switch (kind) {
    case 'tee':
      return (
        <>
          <path d={SHORT_BODY} />
          <path d="M86 34 Q100 52 114 34" />
        </>
      );
    case 'polo':
      return (
        <>
          <path d={SHORT_BODY} />
          <path d="M86 34 L93 56 L100 44 L107 56 L114 34" />
          <path d="M100 44 V82" />
          <circle cx="104" cy="58" r="1.6" />
          <circle cx="104" cy="70" r="1.6" />
        </>
      );
    case 'zip':
    case 'fullzip':
      return (
        <>
          <path d={LONG_BODY} />
          <path d="M84 20 H116 L114 34 Q100 42 86 34 Z" />
          <path d={kind === 'zip' ? 'M100 22 V104' : 'M100 22 V224'} strokeDasharray="2 3" />
          <path d="M60 212 H140" />
          <path d="M100 22 V30" />
        </>
      );
    case 'sweat':
      return (
        <>
          <path d={LONG_BODY} />
          <path d="M86 32 Q100 48 114 32" />
          <path d="M60 212 H140 M28 204 L46 206 M154 206 L172 204" />
          <path d="M120 70 h10 v10 h-10 z" />
        </>
      );
    case 'hoodie':
    case 'set':
      return (
        <>
          <path d={LONG_BODY} />
          <path d="M80 40 Q78 8 100 8 Q122 8 120 40 Q100 60 80 40 Z" />
          <path d="M94 50 V74 M106 50 V74" />
          <path d="M72 160 H128 L136 196 H64 Z" />
          <path d="M60 212 H140" />
        </>
      );
    case 'pants':
      return (
        <>
          <path d="M64 22 H136 L148 230 H110 L100 92 L90 230 H52 Z" />
          <path d="M64 36 H136" />
          <path d="M100 36 V70" />
          <path d="M70 36 Q76 58 66 64 M130 36 Q124 58 134 64" />
        </>
      );
  }
}

export function GarmentSketch({ kind, className }: { kind: Silhouette; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <Parts kind={kind} />
    </svg>
  );
}
