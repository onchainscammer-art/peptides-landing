import { useState } from 'react'
import './App.css'

// ── REPLACE THESE WITH YOUR REAL VALUES ──
const CONTRACT_ADDRESS = 'PASTE_YOUR_CA_HERE'
const JUPITER_LINK     = 'https://jup.ag'
const DEXSCREENER_LINK = 'https://dexscreener.com'
const TELEGRAM_LINK    = 'https://t.me'
// ─────────────────────────────────────────

const TICKER_ITEMS = [
  'HELP WITH RECOVERY', 'MUSCLE GROWTH', 'FAT LOSS', 'NUMBER GO UP',
  'YOUR GIRLFRIEND DOESN\'T UNDERSTAND', 'MOM SAID NO', 'INJECT ANYWAY', '$PEPTIDES',
  'HELP WITH RECOVERY', 'MUSCLE GROWTH', 'FAT LOSS', 'NUMBER GO UP',
  'YOUR GIRLFRIEND DOESN\'T UNDERSTAND', 'MOM SAID NO', 'INJECT ANYWAY', '$PEPTIDES',
]

const WHAT_CARDS = [
  {
    n: '01',
    title: 'Help With Recovery',
    body: 'Your body has been through a lot. The morning gym session. The fight with your girlfriend. The trading loss. Peptides ask no questions. They just heal.',
    tag: 'Clinically Lored',
  },
  {
    n: '02',
    title: 'Muscle Growth',
    body: 'The whiteboard said gym. The whiteboard said peptides. The whiteboard does not lie. Your gains are on-chain and immutable.',
    tag: 'Based & Jacked',
  },
  {
    n: '03',
    title: 'Fat Loss',
    body: 'The fat leaves the body. The tokens accumulate. This is the way. Mom does not need to understand the mechanism of action.',
    tag: 'Protocol Approved',
  },
  {
    n: '04',
    title: 'Number Go Up',
    body: 'The fourth bullet point was not on the whiteboard. But it was always there, implied. Every injection is a buy order. Every vial is a prayer.',
    tag: 'Ser, This Is Real',
  },
]

const TOKENOMICS = [
  { idx: '01', name: 'Liquidity Pool',    desc: 'Pinned. Locked. Like my morning routine.',       pct: '50%', featured: false },
  { idx: '02', name: 'Community Airdrop', desc: 'For the injected. You know who you are.',         pct: '20%', featured: false },
  { idx: '03', name: 'Dev Treasury',      desc: 'For legal fees. Mom called again.',               pct: '15%', featured: true  },
  { idx: '04', name: 'Marketing',         desc: 'Teaching more children about peptides.',          pct: '10%', featured: false },
  { idx: '05', name: 'Burn Reserve',      desc: 'Sometimes you just need to cry and burn tokens.', pct: '5%',  featured: false },
]

const CREED = [
  {
    n: 'I',
    text: (<><strong>You will complete the morning routine.</strong> Gym. Cold shower. Peptides. Grind. In that order. Every day. Without exception. The whiteboard is the law.</>),
  },
  {
    n: 'II',
    text: (<><strong>You will not skip the injection</strong> because she said you don't need it. She does not have a whiteboard. She does not have a chain. She is not the protocol.</>),
  },
  {
    n: 'III',
    text: (<><strong>The account balance does not define you.</strong> It is $0. The total loss is $14,271. This is fine. Peptides were administered. Recovery is underway.</>),
  },
]

export default function App() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shortCA = CONTRACT_ADDRESS.length > 12
    ? `${CONTRACT_ADDRESS.slice(0, 10)}...${CONTRACT_ADDRESS.slice(-6)}`
    : CONTRACT_ADDRESS

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo bebas">$<span>PEPTIDES</span></div>
        <div className="nav-links">
          <a href="#protocol">Protocol</a>
          <a href="#lore">Lore</a>
          <a href="#buy">Buy</a>
        </div>
        <button className="nav-cta" onClick={() => window.open(JUPITER_LINK, '_blank')}>
          Inject Now
        </button>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="ticker-item">
              {item} <span className="ticker-sep">///</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero-section">
        <div className="hero-bg-text bebas">PEPTIDES</div>
        <div className="hero-inner">
          <p className="hero-label">Solana — The Peptide Standard — 2025</p>
          <h1 className="hero-title bebas">
            YOU<br />
            NEED<br />
            YOUR<br />
            <span className="accent">PEPTIDES.</span>
          </h1>
          <p className="hero-sub">
            Recovery. Growth. Fat Loss. Your girlfriend doesn't understand.
            Your mom said no. The charts are red. None of that matters.
            The protocol doesn't pause. <strong>$PEPTIDES</strong> is non-negotiable.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.open(JUPITER_LINK, '_blank')}>
              Buy $PEPTIDES
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('protocol').scrollIntoView({ behavior: 'smooth' })}>
              Read the Protocol
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val">$<span>13,678</span></div>
              <div className="hero-stat-label">Lost on trades today</div>
            </div>
            <div>
              <div className="hero-stat-val">4<span>mg</span></div>
              <div className="hero-stat-label">Still injected</div>
            </div>
            <div>
              <div className="hero-stat-val">∞<span>%</span></div>
              <div className="hero-stat-label">Grind allocation</div>
            </div>
            <div>
              <div className="hero-stat-val">0<span>fs</span></div>
              <div className="hero-stat-label">Given re: her opinion</div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* WHAT IS */}
      <div id="lore">
        <div className="section-wrap">
          <p className="section-label">Clinical Overview — v1.0</p>
          <h2 className="bebas" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1 }}>
            WHAT DO PEPTIDES DO?
          </h2>
          <div className="what-grid">
            {WHAT_CARDS.map((c) => (
              <div className="what-card" key={c.n}>
                <div className="what-num bebas">{c.n}</div>
                <div className="what-title bebas">{c.title}</div>
                <div className="what-body">{c.body}</div>
                <div className="what-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* TOKENOMICS */}
      <div className="protocol-bg" id="protocol">
        <div className="protocol-inner">
          <div className="protocol-header">
            <h2 className="protocol-title bebas">
              THE<br /><span>DOSING</span><br />PROTOCOL
            </h2>
            <p className="protocol-note">Supply allocation. Administered subcutaneously. Non-negotiable.</p>
          </div>
          <div className="protocol-rows">
            {TOKENOMICS.map((r) => (
              <div className={`protocol-row${r.featured ? ' featured' : ''}`} key={r.idx}>
                <div className="protocol-idx bebas">{r.idx}</div>
                <div>
                  <div className="protocol-name bebas">{r.name}</div>
                  <div className="protocol-desc">{r.desc}</div>
                </div>
                <div className="protocol-pct bebas">{r.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MANIFESTO */}
      <div className="manifesto-section">
        <div className="section-wrap manifesto-inner">
          <p className="section-label">The Creed — Recite Daily</p>
          <div className="manifesto-quote bebas">
            "The peptides do not care about your{' '}
            <span className="blue">trading losses.</span> They do not care about
            your girlfriend's opinion. They do not care
            that it is <span className="red">9am</span> and you are crying.
            They only care about <span className="blue">the protocol.</span>"
          </div>
          <div className="manifesto-creed">
            {CREED.map((c) => (
              <div className="creed-item" key={c.n}>
                <div className="creed-num bebas">{c.n}</div>
                <div className="creed-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUY */}
      <div className="buy-bg" id="buy">
        <div className="buy-inner">
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.6, marginBottom: 16 }}>
            Step 01 — Acquire
          </p>
          <h2 className="buy-title bebas">
            BUY.<br />INJECT.<br />REPEAT.
          </h2>
          <p className="buy-sub">Available on Raydium &amp; Jupiter — Solana Network</p>
          <div className="buy-actions">
            <button className="buy-btn-white" onClick={() => window.open(JUPITER_LINK, '_blank')}>
              Buy on Jupiter
            </button>
            <button className="buy-btn-ghost" onClick={() => window.open(DEXSCREENER_LINK, '_blank')}>
              View Chart
            </button>
            <button className="buy-btn-ghost" onClick={() => window.open(TELEGRAM_LINK, '_blank')}>
              Join Telegram
            </button>
          </div>
          <div className="ca-box">
            <div>
              <div className="ca-label">Contract Address</div>
              <div className="ca-addr">{shortCA}</div>
            </div>
            <button className="ca-copy" onClick={handleCopy}>
              {copied ? 'Copied ✓' : 'Copy CA'}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span className="footer-logo bebas">$PEPTIDES — 2025</span>
        <div>Not financial advice. Not medical advice. Just vibes.</div>
      </footer>
    </>
  )
}
