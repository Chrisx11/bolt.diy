import type { MetaFunction } from '@remix-run/cloudflare';
import { useMemo, useState } from 'react';

type CaptureDiscipline = 'amp' | 'pedal' | 'experimental';
type CaptureFilter = 'all' | CaptureDiscipline;

type Capture = {
  id: string;
  title: string;
  type: CaptureDiscipline;
  brand: string;
  year: number;
  mood: string;
  capsule: string;
  chain: string[];
  tags: string[];
  stats: {
    gain: number;
    clarity: number;
    punch: number;
  };
  sampleRate: string;
  fileSize: string;
  notes: string;
  color: string;
  featured?: boolean;
};

const captureVault: Capture[] = [
  {
    id: 'neon-plexi-78',
    title: 'Neon Plexi 78',
    type: 'amp',
    brand: 'Marshall',
    year: 1978,
    mood: 'Edge of Breakup',
    capsule: 'NAM v1.4 · 32-bit float',
    chain: ['JMP 2203', 'TS10 Silver Mod', 'Captor X', 'SM57 + M160'],
    tags: ['Crunch britânico', 'Stereo', 'Hi Cut 6.5k'],
    stats: { gain: 64, clarity: 72, punch: 58 },
    sampleRate: '96 kHz',
    fileSize: '41 MB',
    notes: 'Les Paul + P90; presence em 4.2; master quase no talo.',
    color: '#d946ef',
    featured: true,
  },
  {
    id: 'subzero-bloom-89',
    title: 'Subzero Bloom 89',
    type: 'pedal',
    brand: 'Boss',
    year: 1989,
    mood: 'Velvet Gain',
    capsule: 'NAM v1.4 · Dual DI',
    chain: ['HM-2 Black Mod', 'Neve 1073 DPX', 'Two Notes PI-101'],
    tags: ['Swedish chainsaw', 'Mix-ready', 'Tight Gate'],
    stats: { gain: 88, clarity: 44, punch: 70 },
    sampleRate: '48 kHz',
    fileSize: '22 MB',
    notes: 'Blend com blend paralelo filtrado em 200 Hz.',
    color: '#22d3ee',
  },
  {
    id: 'atlantic-hifi-65',
    title: 'Atlantic Hi-Fi 65',
    type: 'amp',
    brand: 'Fender',
    year: 1965,
    mood: 'Crystal Clean',
    capsule: 'NAM v1.4 · IR custom',
    chain: ['Twin Reverb', 'King of Tone', 'OX Box', 'SM7B + Sphere DLX'],
    tags: ['Stereo wide', 'Spring verb', 'Hi-Headroom'],
    stats: { gain: 32, clarity: 90, punch: 54 },
    sampleRate: '96 kHz',
    fileSize: '37 MB',
    notes: 'Captura dupla para stacking com modulações.',
    color: '#a855f7',
  },
  {
    id: 'doom-pillar-13',
    title: 'Doom Pillar 13',
    type: 'amp',
    brand: 'Matamp',
    year: 2013,
    mood: 'Doom Bloom',
    capsule: 'NAM v1.4 · Ribbon focus',
    chain: ['Matamp GT120', 'Sunface BC108', 'OX Stomp', 'R121 + KU-5A'],
    tags: ['Octave fuzz', 'Low tuned', 'Mono'],
    stats: { gain: 92, clarity: 36, punch: 84 },
    sampleRate: '44.1 kHz',
    fileSize: '48 MB',
    notes: 'Afinado em Drop B com Jazzmaster barítono.',
    color: '#fb7185',
  },
  {
    id: 'hologram-phase-20',
    title: 'Hologram Phase 20',
    type: 'pedal',
    brand: 'Chase Bliss',
    year: 2020,
    mood: 'Liquid Motion',
    capsule: 'NAM v1.5 beta',
    chain: ['Habit', 'CxM 1978', 'Apollo X6', 'IRIDUM'],
    tags: ['Stereo ping-pong', 'Modulação granular', 'Auto-swell'],
    stats: { gain: 18, clarity: 80, punch: 34 },
    sampleRate: '48 kHz',
    fileSize: '18 MB',
    notes: 'Perfeito para camadas ambiente e trilhas etéreas.',
    color: '#34d399',
  },
  {
    id: 'particle-spill-07',
    title: 'Particle Spill 07',
    type: 'experimental',
    brand: 'Future Sound Lab',
    year: 2007,
    mood: 'Broken Air',
    capsule: 'NAM Lab build',
    chain: ['No input mixer', 'Chase Bliss Mood', 'Spectral Freeze'],
    tags: ['Granular', 'Micro loops', 'Texturas'],
    stats: { gain: 12, clarity: 48, punch: 20 },
    sampleRate: '192 kHz',
    fileSize: '11 MB',
    notes: 'Texturas infinitas para camadas pós-rock.',
    color: '#f97316',
  },
];

const toneFilters: Array<{ id: CaptureFilter; label: string; meta: string }> = [
  { id: 'all', label: 'Vault Completo', meta: '26 capturas curadas' },
  { id: 'amp', label: 'Amplificadores', meta: 'Stacks, combos e rigs híbridos' },
  { id: 'pedal', label: 'Pedais/Drives', meta: 'Preamp, fuzz, saturadores' },
  { id: 'experimental', label: 'Experimentais', meta: 'Texturas e camadas NAM' },
];

const captureCollections = [
  {
    id: 'collection-highgain',
    title: 'Stacks de Alto Ganho',
    descriptor: 'Dual Rectifier 92, Diezel VH4 e EVH 5150 Iconic',
    updated: 'NOV · 2025',
    files: 18,
    vibe: 'Tight/Doom',
    accent: '#f472b6',
    focus: ['Mesa 4x12 V30', 'Dual mic blend', 'NAM v1.4'],
  },
  {
    id: 'collection-clean',
    title: 'Hi-Fi Clean Atlas',
    descriptor: 'Drip verb + Choruses cristalinos em estéreo',
    updated: 'OUT · 2025',
    files: 11,
    vibe: 'Crystal Clean',
    accent: '#38bdf8',
    focus: ['Fender Twin', 'Roland JC-120', 'Strymon CXM'],
  },
  {
    id: 'collection-pedal',
    title: 'Pedais Mutantes',
    descriptor: 'Fuzzes germanium, preamps modernos e texturas glitch',
    updated: 'SET · 2025',
    files: 9,
    vibe: 'Liquid Motion',
    accent: '#facc15',
    focus: ['Analog heat', 'Parallel blend', 'Granular spill'],
  },
];

const captureLog = [
  {
    id: 'log-042',
    date: '16 · NOV · 2025',
    session: 'Sessão 042 — Atlantic Clean DI',
    rig: 'Fender Twin · Reactive load + IR custom',
    highlight: '+1.5 dB em 120 Hz para corpo',
    status: 'Publicado',
  },
  {
    id: 'log-041',
    date: '09 · NOV · 2025',
    session: 'Sessão 041 — Doom Pillar 13',
    rig: 'Matamp GT120 · Ribbon dual mic',
    highlight: 'Filtro passa-altas em 55 Hz',
    status: 'Mix-Ready',
  },
  {
    id: 'log-040',
    date: '02 · NOV · 2025',
    session: 'Sessão 040 — Pedais Mutantes',
    rig: 'Chase Bliss Habit + CXM 1978',
    highlight: 'Oversampling 8x · Noise floor -118 dBFS',
    status: 'Beta',
  },
];

const heroMetrics = {
  analog: 68,
  digital: 32,
  sampleRate: '96 kHz',
  oversampling: '8×',
  noiseFloor: '-114 dBFS',
};

const signalStacks = [
  {
    id: 'stack-01',
    label: 'CADEIA 03 · Crunch',
    value: 'JCM 2203 → TS10 → Captor X',
    spec: 'Blend SM57 + M160',
  },
  {
    id: 'stack-02',
    label: 'CADEIA 07 · Clean Wide',
    value: 'Twin 65 → King of Tone → OX Box',
    spec: 'Ambiente Sphere DLX',
  },
  {
    id: 'stack-03',
    label: 'CADEIA 11 · Doom Bloom',
    value: 'Matamp GT120 → Sunface → Ribbon stack',
    spec: 'Afinado em Drop B',
  },
];

export const meta: MetaFunction = () => [
  { title: 'TONE3000 · NAM Capture Vault' },
  {
    name: 'description',
    content:
      'Site pessoal inspirado no TONE3000 para catalogar capturas NAM de amplificadores, pedais e rigs experimentais.',
  },
];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<CaptureFilter>('all');
  const [highlightedId, setHighlightedId] = useState(
    captureVault.find((capture) => capture.featured)?.id ?? captureVault[0].id,
  );

  const filteredCaptures = useMemo(() => {
    if (activeFilter === 'all') return captureVault;
    return captureVault.filter((capture) => capture.type === activeFilter);
  }, [activeFilter]);

  const highlightedCapture = useMemo(() => {
    return captureVault.find((capture) => capture.id === highlightedId) ?? captureVault[0];
  }, [highlightedId]);

  return (
    <div className="tone-shell">
      <div className="tone-grid tone-grid--primary" aria-hidden />
      <div className="tone-grid tone-grid--secondary" aria-hidden />

      <nav className="tone-nav">
        <div className="tone-logo">
          <span>TONE3000</span>
          <small>CAPTURE VAULT</small>
        </div>

        <div className="tone-nav__links">
          <button className="tone-nav__chip">Vault</button>
          <button className="tone-nav__chip">Chains</button>
          <button className="tone-nav__chip">NAM Lab</button>
        </div>

        <button className="tone-cta">Upload Nova Captura</button>
      </nav>

      <main className="tone-main">
        <section className="tone-hero">
          <div className="tone-hero__copy">
            <p className="tone-eyebrow">Arquivo privado · NAM</p>
            <h1>
              Arquivo sonoro inspirado no <span>TONE3000</span> para guardar capturas de amps, pedais e texturas híbridas.
            </h1>
            <p>
              Cada captura NAM é tratada como hardware vivo: calibrada, documentada e pronta para performance ou mix.
              Amplificadores boutique, pedais mutantes e rigs experimentais coexistem em uma mesma prateleira digital.
            </p>

            <div className="tone-hero__actions">
              <button className="tone-cta tone-cta--solid">Soltar nova captura</button>
              <button className="tone-cta tone-cta--ghost">Baixar bundle selecionado</button>
            </div>
          </div>

          <div className="tone-hero__widgets">
            <div className="tone-metric-card">
              <header>
                <p>Blend Analógico/Digital</p>
                <span>Live Calibração</span>
              </header>
              <div className="tone-metric-card__bars">
                <div className="tone-metric-card__bar">
                  <span>Analógico</span>
                  <div>
                    <em style={{ width: `${heroMetrics.analog}%` }} />
                  </div>
                  <strong>{heroMetrics.analog}%</strong>
                </div>
                <div className="tone-metric-card__bar">
                  <span>Digital</span>
                  <div>
                    <em style={{ width: `${heroMetrics.digital}%` }} />
                  </div>
                  <strong>{heroMetrics.digital}%</strong>
                </div>
              </div>
              <footer>
                <span>{heroMetrics.sampleRate}</span>
                <span>{heroMetrics.oversampling} oversampling</span>
                <span>{heroMetrics.noiseFloor} noise floor</span>
              </footer>
            </div>

            <div className="tone-stack">
              <p>Stacks prontos</p>
              <ul>
                {signalStacks.map((stack) => (
                  <li key={stack.id}>
                    <small>{stack.label}</small>
                    <strong>{stack.value}</strong>
                    <span>{stack.spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="tone-panel tone-panel--filters">
          <div className="tone-panel__filters">
            {toneFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`tone-filter ${activeFilter === filter.id ? 'tone-filter--active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span>{filter.label}</span>
                <small>{filter.meta}</small>
              </button>
            ))}
          </div>
          <div className="tone-panel__status">
            <p>Capturas selecionadas</p>
            <strong>{filteredCaptures.length}</strong>
            <span>Filtrando por {toneFilters.find((filter) => filter.id === activeFilter)?.label}</span>
          </div>
        </section>

        <section className="tone-content-grid">
          <div className="tone-cards">
            {filteredCaptures.map((capture) => (
              <button
                key={capture.id}
                type="button"
                className={`tone-card ${highlightedId === capture.id ? 'tone-card--active' : ''}`}
                onClick={() => setHighlightedId(capture.id)}
                onMouseEnter={() => setHighlightedId(capture.id)}
                aria-pressed={highlightedId === capture.id}
                style={{ borderColor: capture.color }}
              >
                <header>
                  <div>
                    <span>{capture.type === 'amp' ? 'Amplificador' : capture.type === 'pedal' ? 'Pedal' : 'Experimental'}</span>
                    <small>
                      {capture.brand} · {capture.year}
                    </small>
                  </div>
                  <strong>{capture.title}</strong>
                </header>

                <p className="tone-card__mood">{capture.mood}</p>

                <div className="tone-card__chain">
                  {capture.chain.map((stage, index) => (
                    <span key={stage}>
                      {stage}
                      {index < capture.chain.length - 1 && <em>→</em>}
                    </span>
                  ))}
                </div>

                <div className="tone-card__stats">
                  <article>
                    <small>Drive</small>
                    <strong>{capture.stats.gain}%</strong>
                  </article>
                  <article>
                    <small>Clareza</small>
                    <strong>{capture.stats.clarity}%</strong>
                  </article>
                  <article>
                    <small>Impacto</small>
                    <strong>{capture.stats.punch}%</strong>
                  </article>
                </div>

                <footer>
                  <div>
                    <small>{capture.sampleRate}</small>
                    <small>{capture.capsule}</small>
                  </div>
                  <span>{capture.fileSize}</span>
                </footer>

                <ul className="tone-card__tags">
                  {capture.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <aside className="tone-detail" aria-live="polite">
            <p className="tone-eyebrow">Detalhes da captura</p>
            <h2>{highlightedCapture.title}</h2>
            <p>{highlightedCapture.notes}</p>

            <div className="tone-detail__grid">
              <article>
                <small>Cápsula</small>
                <strong>{highlightedCapture.capsule}</strong>
              </article>
              <article>
                <small>Sample rate</small>
                <strong>{highlightedCapture.sampleRate}</strong>
              </article>
              <article>
                <small>Arquivo</small>
                <strong>{highlightedCapture.fileSize}</strong>
              </article>
            </div>

            <div className="tone-detail__chain">
              {highlightedCapture.chain.map((stage) => (
                <span key={stage}>{stage}</span>
              ))}
            </div>

            <div className="tone-detail__cta">
              <button className="tone-cta tone-cta--solid">Exportar preset NAM</button>
              <button className="tone-cta tone-cta--ghost">Compartilhar cadeia</button>
            </div>
          </aside>
        </section>

        <section className="tone-collections">
          {captureCollections.map((collection) => (
            <article key={collection.id} className="tone-collection">
              <header>
                <p style={{ color: collection.accent }}>{collection.updated}</p>
                <strong>{collection.title}</strong>
                <span>{collection.descriptor}</span>
              </header>
              <div className="tone-collection__row">
                <div>
                  <small>Arquivos</small>
                  <strong>{collection.files}</strong>
                </div>
                <div>
                  <small>Vibe</small>
                  <strong>{collection.vibe}</strong>
                </div>
                <div>
                  <small>Focus</small>
                  <strong>{collection.focus.join(' · ')}</strong>
                </div>
              </div>
              <button className="tone-cta tone-cta--ghost">Abrir pasta</button>
            </article>
          ))}
        </section>

        <section className="tone-timeline">
          <header>
            <div>
              <p className="tone-eyebrow">NAM Lab</p>
              <h3>Log de capturas</h3>
            </div>
            <button className="tone-cta tone-cta--solid tone-cta--small">Sincronizar com NAM</button>
          </header>

          <div className="tone-timeline__track">
            {captureLog.map((entry) => (
              <article key={entry.id}>
                <span>{entry.date}</span>
                <strong>{entry.session}</strong>
                <p>{entry.rig}</p>
                <em>{entry.highlight}</em>
                <button className="tone-chip tone-chip--status">{entry.status}</button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
