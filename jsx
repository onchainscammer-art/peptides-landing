import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white: #FFFFFF;
    --black: #0A0A0A;
    --blue: #0047FF;
    --red: #FF2020;
    --grey: #F2F2F2;
    --mid: #888888;
    --border: #E0E0E0;
  }

  body { background: var(--white); color: var(--black); font-family: 'IBM Plex Mono', monospace; overflow-x: hidden; }

  .bebas { font-family: 'Bebas Neue', sans-serif; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 60px;
  }
  .nav-logo { font-family: 'Bebas Neue'; font-size: 26px; letter-spacing: 2px; color: var(--black); }
  .nav-logo span { color: var(--blue); }
  .nav-links { display: flex; gap: 32px; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }
  .nav-links a { color: var(--mid); text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .nav-links a:hover { color: var(--black); }
  .nav-cta {
    background: var(--black); color: var(--white);
    border: none; padding: 10px 20px; font-family: 'IBM Plex Mono'; font-size: 11px;
    font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--blue); }

  /* TICKER */
  .ticker-wrap {
    position: fixed; top: 60px; left: 0; right: 0; z-index: 99;
    background: var(--blue); color: var(--white);
    height: 32px; overflow: hidden; display: flex; align-items: center;
  }
  .ticker-track {
    display: flex; white-space: nowrap;
    animation: ticker 30s linear infinite;
  }
  .ticker-item { font-size: 11px; font-weight: 700; letter-spacing: 3px; padding: 0 40px; text-transform: uppercase; }
  .ticker-sep { opacity: 0.4; }
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* SECTIONS */
  section { padding: 120px 40px; max-width: 1200px; margin: 0 auto; }

  /* HERO */
  .hero-section {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; padding-top: 140px; padding-bottom: 80px;
    max-width: 100%; position: relative; overflow: hidden;
  }
  .hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; width: 100%; }
  .hero-label {
    font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
    color: var(--blue); margin-bottom: 24px;
    opacity: 0; animation: fadeUp 0.6s 0.1s ease forwards;
  }
  .hero-title {
    font-family: 'Bebas Neue'; font-size: clamp(80px, 14vw, 200px);
    line-height: 0.9; letter-spacing: -2px; color: var(--black);
    opacity: 0; animation: fadeUp 0.7s 0.3s ease forwards;
  }
  .hero-title .accent { color: var(--blue); }
  .hero-title .red { color: var(--red); }
  .hero-sub {
    font-size: 13px; line-height: 1.8; color: var(--mid); max-width: 480px;
    margin-top: 32px;
    opacity: 0; animation: fadeUp 0.7s 0.5s ease forwards;
  }
  .hero-actions {
    display: flex; gap: 16px; margin-top: 48px; flex-wrap: wrap;
    opacity: 0; animation: fadeUp 0.7s 0.7s ease forwards;
  }
  .btn-primary {
    background: var(--black); color: var(--white);
    border: 2px solid var(--black); padding: 16px 36px;
    font-family: 'IBM Plex Mono'; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--blue); border-color: var(--blue); }
  .btn-outline {
    background: transparent; color: var(--black);
    border: 2px solid var(--black); padding: 16px 36px;
    font-family: 'IBM Plex Mono'; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--black); color: var(--white); }
  .hero-stats {
    display: flex; gap: 60px; margin-top: 80px; padding-top: 40px;
    border-top: 1px solid var(--border);
    opacity: 0; animation: fadeUp 0.7s 0.9s ease forwards;
  }
  .hero-stat-val { font-family: 'Bebas Neue'; font-size: 40px; color: var(--black); }
  .hero-stat-val span { color: var(--blue); }
  .hero-stat-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--mid); margin-top: 4px; }

  .hero-bg-text {
    position: absolute; right: -20px; top: 50%; transform: translateY(-50%);
    font-family: 'Bebas Neue'; font-size: clamp(140px, 20vw, 320px);
    color: transparent; -webkit-text-stroke: 1px var(--border);
    user-select: none; pointer-events: none; white-space: nowrap; line-height: 1;
    z-index: -1;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  /* DIVIDER */
  .divider { width: 100%; height: 1px; background: var(--border); }
  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 4px;
    text-transform: uppercase; color: var(--blue); margin-bottom: 20px;
  }

  /* WHAT IS */
  .what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 60px; }
  .what-card {
    background: var(--grey); padding: 48px 40px;
    transition: background 0.2s;
  }
  .what-card:hover { background: var(--black); color: var(--white); }
  .what-card:hover .what-num { color: var(--blue); }
  .what-card:hover .what-body { color: #aaa; }
  .what-num { font-family: 'Bebas Neue'; font-size: 72px; color: var(--border); line-height: 1; margin-bottom: 16px; transition: color 0.2s; }
  .what-title { font-family: 'Bebas Neue'; font-size: 32px; letter-spacing: 1px; margin-bottom: 12px; }
  .what-body { font-size: 12px; line-height: 1.9; color: var(--mid); transition: color 0.2s; }
  .what-tag {
    display: inline-block; margin-top: 20px;
    background: var(--blue); color: var(--white);
    font-size: 10px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; padding: 6px 14px;
  }
  .what-card:hover .what-tag { background: var(--red); }

  /* PROTOCOL / TOKENOMICS */
  .protocol-section { background: var(--black); color: var(--white); max-width: 100%; }
  .protocol-inner { max-width: 1200px; margin: 0 auto; padding: 120px 40px; }
  .protocol-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 80px; }
  .protocol-title { font-family: 'Bebas Neue'; font-size: clamp(48px, 6vw, 96px); line-height: 1; }
  .protocol-title span { color: var(--blue); }
  .protocol-note { font-size: 11px; color: #555; max-width: 220px; text-align: right; line-height: 1.7; }
  .protocol-rows { display: flex; flex-direction: column; gap: 2px; }
  .protocol-row {
    display: grid; grid-template-columns: 60px 1fr auto;
    align-items: center; gap: 40px;
    padding: 28px 32px; background: #111;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }
  .protocol-row:hover { background: #161616; border-left-color: var(--blue); }
  .protocol-row.featured { border-left-color: var(--red); background: #130000; }
  .protocol-idx { font-family: 'Bebas Neue'; font-size: 28px; color: #333; }
  .protocol-name { font-family: 'Bebas Neue'; font-size: 22px; letter-spacing: 1px; }
  .protocol-desc { font-size: 11px; color: #555; margin-top: 4px; }
  .protocol-pct { font-family: 'Bebas Neue'; font-size: 48px; color: var(--blue); }
  .protocol-row.featured .protocol-pct { color: var(--red); }

  /* MANIFESTO */
  .manifesto-section { position: relative; overflow: hidden; }
  .manifesto-section::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 39px, var(--border) 40px);
    opacity: 0.3; pointer-events: none;
  }
  .manifesto-inner { position: relative; z-index: 1; }
  .manifesto-quote {
    font-family: 'Bebas Neue'; font-size: clamp(40px, 6vw, 80px);
    line-height: 1.05; max-width: 900px;
  }
  .manifesto-quote .blue { color: var(--blue); }
  .manifesto-quote .red { color: var(--red); }
  .manifesto-creed { margin-top: 60px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
  .creed-item { padding: 32px; border: 1px solid var(--border); }
  .creed-num { font-family: 'Bebas Neue'; font-size: 48px; color: var(--border); line-height: 1; }
  .creed-text { font-size: 12px; line-height: 1.8; color: var(--mid); margin-top: 8px; }
  .creed-text strong { color: var(--black); font-weight: 700; }

  /* BUY */
  .buy-section { background: var(--blue); color: var(--white); max-width: 100%; }
  .buy-inner { max-width: 1200px; margin: 0 auto; padding: 120px 40px; }
  .buy-title { font-family: 'Bebas Neue'; font-size: clamp(60px, 10vw, 140px); line-height: 0.9; }
  .buy-sub { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 24px; opacity: 0.7; }
  .buy-actions { display: flex; gap: 16px; margin-top: 48px; flex-wrap: wrap; }
  .buy-btn-white {
    background: var(--white); color: var(--blue);
    border: 2px solid var(--white); padding: 16px 40px;
    font-family: 'IBM Plex Mono'; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .buy-btn-white:hover { background: var(--black); color: var(--white); border-color: var(--black); }
  .buy-btn-ghost {
    background: transparent; color: var(--white);
    border: 2px solid rgba(255,255,255,0.4); padding: 16px 40px;
    font-family: 'IBM Plex Mono'; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .buy-btn-ghost:hover { border-color: var(--white); }
  .ca-box {
    display: inline-flex; align-items: center; gap: 16px;
    background: rgba(255,255,255,0.1); padding: 16px 24px; margin-top: 40px;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .ca-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.6; }
  .ca-addr { font-size: 12px; letter-spacing: 1px; font-weight: 500; opacity: 0.9; }
  .ca-copy {
    background: var(--white); color: var(--blue); border: none;
    font-family: 'IBM Plex Mono'; font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; padding: 8px 14px; cursor: pointer;
    transition: all 0.2s;
  }
  .ca-copy:hover { background: var(--black); color: var(--white); }

  /* FOOTER */
  footer {
    background: var(--black); color: #333;
    padding: 40px; display: flex; justify-content: space-between; align-items: center;
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  }
  footer span { font-family: 'Bebas Neue'; font-size: 20px; color: #222; }

  @media (max-width: 768px) {
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero-inner { padding: 0 20px; }
    .hero-stats { gap: 30px; flex-wrap: wrap; }
    .what-grid { grid-template-columns: 1fr; }
    .protocol-header { flex-direction: column; align-items: flex-start; gap: 20px; }
    .protocol-note { text-align: left; }
    .manifesto-creed { grid-template-columns: 1fr; }
    section { padding: 80px 20px; }
    .buy-inner, .protocol-inner { padding: 80px 20px; }
  }
`;

const tickerItems = [
  "HELP WITH RECOVERY", "MUSCLE GROWTH", "FAT LOSS", "NUMBER GO UP",
  "YOUR GIRLFRIEND DOESN'T UNDERSTAND", "MOM SAID NO", "INJECT ANYWAY",
  "$PEPTIDES", "HELP WITH RECOVERY", "MUSCLE GROWTH", "FAT LOSS", "NUMBER GO UP",
  "YOUR GIRLFRIEND DOESN'T UNDERSTAND", "MOM SAID NO", "INJECT ANYWAY", "$PEPTIDES"
];

const CA = "PEPTiDESXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

export default function PeptidesLanding() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CA).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo bebas">$<span>PEPTIDES</span></div>
        <div className="nav-links">
          <a>Protocol</a>
          <a>Lore</a>
          <a>Community</a>
          <a>Buy</a>
        </div>
        <button className="nav-cta">Inject Now</button>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
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
            <button className="btn-primary">Buy $PEPTIDES</button>
            <button className="btn-outline">Read the Protocol</button>
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
      <section>
        <p className="section-label">Clinical Overview — v1.0</p>
        <h2 className="bebas" style={{fontSize: "clamp(40px,5vw,72px)", lineHeight: 1}}>
          WHAT DO PEPTIDES DO?
        </h2>
        <div className="what-grid">
          {[
            { n: "01", title: "Help With Recovery", body: "Your body has been through a lot. The morning gym session. The fight with your girlfriend. The trading loss. Peptides ask no questions. They just heal.", tag: "Clinically Lored" },
            { n: "02", title: "Muscle Growth", body: "The whiteboard said gym. The whiteboard said peptides. The whiteboard does not lie. Your gains are on-chain and immutable.", tag: "Based & Jacked" },
            { n: "03", title: "Fat Loss", body: "The fat leaves the body. The tokens accumulate. This is the way. Mom does not need to understand the mechanism of action.", tag: "Protocol Approved" },
            { n: "04", title: "Number Go Up", body: "The fourth bullet point was not on the whiteboard. But it was always there, implied. Every injection is a buy order. Every vial is a prayer.", tag: "Ser, This Is Real" },
          ].map((c) => (
            <div className="what-card" key={c.n}>
              <div className="what-num bebas">{c.n}</div>
              <div className="what-title bebas">{c.title}</div>
              <div className="what-body">{c.body}</div>
              <div className="what-tag">{c.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* TOKENOMICS */}
      <div className="protocol-section">
        <div className="protocol-inner">
          <div className="protocol-header">
            <h2 className="protocol-title bebas">
              THE<br /><span>DOSING</span><br />PROTOCOL
            </h2>
            <p className="protocol-note">Supply allocation. Administered subcutaneously. Non-negotiable.</p>
          </div>
          <div className="protocol-rows">
            {[
              { idx: "01", name: "Liquidity Pool", desc: "Pinned. Locked. Like my morning routine.", pct: "50%", featured: false },
              { idx: "02", name: "Community Airdrop", desc: "For the injected. You know who you are.", pct: "20%", featured: false },
              { idx: "03", name: "Dev Treasury", desc: "For legal fees. Mom called again.", pct: "15%", featured: true },
              { idx: "04", name: "Marketing", desc: "Teaching more children about peptides.", pct: "10%", featured: false },
              { idx: "05", name: "Burn Reserve", desc: "Sometimes you just need to cry and burn tokens.", pct: "5%", featured: false },
            ].map((r) => (
              <div className={`protocol-row${r.featured ? " featured" : ""}`} key={r.idx}>
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
      <section className="manifesto-section">
        <div className="manifesto-inner">
          <p className="section-label">The Creed — Recite Daily</p>
          <div className="manifesto-quote bebas">
            "The peptides do not care about your<br />
            <span className="blue">trading losses.</span> They do not care about<br />
            your girlfriend's opinion. They do not care<br />
            that it is <span className="red">9am</span> and you are crying.<br />
            They only care about <span className="blue">the protocol.</span>"
          </div>
          <div className="manifesto-creed">
            {[
              { n: "I", text: <><strong>You will complete the morning routine.</strong> Gym. Cold shower. Peptides. Grind. In that order. Every day. Without exception. The whiteboard is the law.</> },
              { n: "II", text: <><strong>You will not skip the injection</strong> because she said you don't need it. She does not have a whiteboard. She does not have a chain. She is not the protocol.</> },
              { n: "III", text: <><strong>The account balance does not define you.</strong> It is $0. The total loss is $14,271. This is fine. Peptides were administered. Recovery is underway.</> },
            ].map((c) => (
              <div className="creed-item" key={c.n}>
                <div className="creed-num bebas">{c.n}</div>
                <div className="creed-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUY */}
      <div className="buy-section">
        <div className="buy-inner">
          <p style={{fontSize:11, letterSpacing:4, textTransform:"uppercase", opacity:0.6, marginBottom:16}}>Step 01 — Acquire</p>
          <h2 className="buy-title bebas">
            BUY.<br />INJECT.<br />REPEAT.
          </h2>
          <p className="buy-sub">Available on Raydium & Jupiter — Solana Network</p>
          <div className="buy-actions">
            <button className="buy-btn-white">Buy on Jupiter</button>
            <button className="buy-btn-ghost">View Chart</button>
            <button className="buy-btn-ghost">Join Telegram</button>
          </div>
          <div className="ca-box">
            <div>
              <div className="ca-label">Contract Address</div>
              <div className="ca-addr">{CA.slice(0, 20)}...{CA.slice(-6)}</div>
            </div>
            <button className="ca-copy" onClick={handleCopy}>
              {copied ? "Copied ✓" : "Copy CA"}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span className="bebas">$PEPTIDES — 2025</span>
        <div>Not financial advice. Not medical advice. Just vibes.</div>
      </footer>
    </>
  );
}
