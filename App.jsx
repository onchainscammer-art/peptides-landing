import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');`;

const css = `
* { box-sizing: border-box; margin: 0; padding: 0; cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ctext y='40' font-size='40'%3E%F0%9F%92%89%3C/text%3E%3C/svg%3E"), auto; }
:root {
  --ink: #0a0a0a;
  --paper: #f8f6f1;
  --white: #ffffff;
  --blue: #0033cc;
  --rule: #c8c4bc;
  --mid: #6b6760;
  --cormorant: 'Cormorant Garamond', serif;
  --barlow: 'Barlow Condensed', sans-serif;
  --barlow-reg: 'Barlow', sans-serif;
}
body { background: #111; font-family: var(--barlow-reg); }

.stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  background: #111 url('/peptard.jpg') center center / cover no-repeat;
  background-attachment: fixed;
}

.magazine {
  width: 100%;
  max-width: 900px;
  height: 100svh;
  position: relative;
  box-shadow: 0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
  overflow: hidden;
  background: transparent;
}

.spread {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: transparent;
  transition: transform 0.5s cubic-bezier(0.77,0,0.175,1), opacity 0.4s ease;
}
.spread.active  { transform: translateX(0);     opacity: 1; pointer-events: all; }
.spread.prev    { transform: translateX(-100%);  opacity: 0; pointer-events: none; }
.spread.next    { transform: translateX(100%);   opacity: 0; pointer-events: none; }

/* ── SHARED FURNITURE ── */
.rule-h { width: 100%; height: 1px; background: var(--rule); }
.rule-h.thick { height: 2px; background: var(--ink); }
.rule-h.blue  { background: var(--blue); }

.label {
  font-family: var(--barlow);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--mid);
}
.label.blue { color: var(--blue); }

/* ── SPREAD 1: COVER ── */
.cover {
  background: rgba(248,246,241,0.6);
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}
.cover-header {
  padding: 20px 28px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cover-meta { display: flex; flex-direction: column; gap: 2px; }
.cover-issue {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--mid);
}
.cover-masthead {
  font-family: var(--barlow);
  font-weight: 900;
  font-size: clamp(48px, 9vw, 88px);
  letter-spacing: -2px;
  line-height: 1;
  color: var(--ink);
  text-align: center;
  padding: 12px 28px 0;
  text-transform: uppercase;
}
.cover-masthead span { color: var(--blue); }

.cover-body {
  display: grid;
  grid-template-columns: 1fr 2.2fr 1fr;
  gap: 0;
  padding: 0 0 0;
  flex: 1;
  overflow: hidden;
}

.cover-col-left {
  padding: 16px 12px;
  border-right: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cover-col-right {
  padding: 16px 12px;
  border-left: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cover-kicker {
  font-family: var(--barlow);
  font-size: 8.5px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
}
.cover-hl {
  font-family: var(--cormorant);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--ink);
}
.cover-byline {
  font-family: var(--barlow);
  font-size: 8px;
  color: var(--mid);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cover-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.cover-hero-img {
  width: 100%;
  flex: 1;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.cover-hero-img::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(255,255,255,0.015) 3px,
      rgba(255,255,255,0.015) 4px
    );
}

.cover-hero-text {
  font-family: var(--barlow);
  font-weight: 900;
  font-size: clamp(64px, 13vw, 130px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.15);
  letter-spacing: -4px;
  line-height: 1;
  user-select: none;
  position: absolute;
}

.cover-quote-block {
  background: var(--blue);
  color: var(--white);
  padding: 14px 16px;
  width: 100%;
}
.cover-quote-text {
  font-family: var(--cormorant);
  font-size: clamp(16px, 3.5vw, 26px);
  font-weight: 500;
  font-style: italic;
  line-height: 1.2;
  color: var(--white);
}
.cover-quote-attr {
  font-family: var(--barlow);
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-top: 6px;
}

.cover-footer {
  padding: 10px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid var(--ink);
}
.cover-price {
  font-family: var(--barlow);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--mid);
}
.barcode {
  display: flex;
  gap: 1.5px;
  align-items: flex-end;
  height: 20px;
}
.barcode-bar {
  background: var(--ink);
  width: 1.5px;
}

/* ── SPREAD 2: FEATURE ARTICLE ── */
.feature {
  background: rgba(248,246,241,0.6);
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}
.feature-header {
  padding: 20px 28px 14px;
  border-bottom: 2px solid var(--ink);
}
.feature-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.feature-section-label {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
}
.feature-pg {
  font-family: var(--barlow);
  font-size: 9px;
  color: var(--mid);
  letter-spacing: 1px;
}

.feature-body {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0;
  overflow: hidden;
}
.feature-col {
  padding: 20px 24px;
  overflow: hidden;
}
.feature-col-div { background: var(--rule); }

.feature-headline {
  font-family: var(--cormorant);
  font-size: clamp(28px, 5vw, 46px);
  font-weight: 300;
  line-height: 1.05;
  color: var(--ink);
  margin-bottom: 10px;
}
.feature-headline em { font-style: italic; color: var(--blue); }
.feature-deck {
  font-family: var(--cormorant);
  font-size: clamp(13px, 2vw, 16px);
  font-style: italic;
  color: var(--mid);
  line-height: 1.5;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--rule);
}
.feature-byline-block {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.feature-byline-name {
  font-family: var(--barlow);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--ink);
}
.feature-byline-role {
  font-family: var(--barlow);
  font-size: 8px;
  color: var(--mid);
  letter-spacing: 1px;
}

.dropcap-p {
  font-family: var(--cormorant);
  font-size: clamp(11px, 1.8vw, 13.5px);
  line-height: 1.7;
  color: var(--ink);
  margin-bottom: 12px;
}
.dropcap-p::first-letter {
  font-size: 3.5em;
  font-weight: 600;
  float: left;
  line-height: 0.75;
  margin-right: 6px;
  margin-top: 4px;
  color: var(--blue);
  font-family: var(--barlow);
}

.body-p {
  font-family: var(--cormorant);
  font-size: clamp(11px, 1.8vw, 13.5px);
  line-height: 1.7;
  color: var(--ink);
  margin-bottom: 12px;
}

.pull-quote {
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  padding: 14px 0;
  margin: 18px 0;
}
.pull-quote-text {
  font-family: var(--cormorant);
  font-size: clamp(16px, 2.8vw, 22px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.25;
  color: var(--ink);
}
.pull-quote-text span { color: var(--blue); }

.img-placeholder {
  width: 100%;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
}
.img-placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 4px,
    rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 5px
  );
}
.img-caption {
  font-family: var(--barlow);
  font-size: 8px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  font-style: italic;
}

/* ── SPREAD 3: PROTOCOL / WELLNESS ── */
.protocol-spread {
  background: rgba(248,246,241,0.6);
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}
.protocol-header {
  padding: 20px 28px 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--ink);
}
.protocol-header-title {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--mid);
}
.protocol-section-name {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
}

.protocol-body {
  display: grid;
  grid-template-columns: 2fr 1px 1fr;
  overflow: hidden;
}

.protocol-main { padding: 20px 24px; }
.protocol-sidebar { padding: 20px 20px; background: rgba(10,10,10,0.75); color: var(--white); }
.protocol-div { background: var(--rule); }

.protocol-title {
  font-family: var(--barlow);
  font-weight: 900;
  font-size: clamp(32px, 6vw, 58px);
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--ink);
  letter-spacing: -1px;
  margin-bottom: 14px;
}
.protocol-title span { color: var(--blue); }

.routine-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
}
.routine-num {
  font-family: var(--barlow);
  font-size: 9px;
  color: var(--blue);
  font-weight: 700;
  letter-spacing: 2px;
  min-width: 20px;
}
.routine-name {
  font-family: var(--barlow);
  font-weight: 700;
  font-size: clamp(13px, 2.2vw, 17px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ink);
  flex: 1;
}
.routine-note {
  font-family: var(--cormorant);
  font-size: 11px;
  font-style: italic;
  color: var(--mid);
}

.sidebar-label {
  font-family: var(--barlow);
  font-size: 8px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 10px;
  display: block;
}
.sidebar-hl {
  font-family: var(--cormorant);
  font-size: clamp(16px, 2.8vw, 22px);
  font-style: italic;
  font-weight: 400;
  color: var(--white);
  line-height: 1.3;
  margin-bottom: 16px;
}
.sidebar-stat {
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.sidebar-stat-val {
  font-family: var(--barlow);
  font-weight: 800;
  font-size: clamp(24px, 4vw, 36px);
  color: var(--blue);
  line-height: 1;
}
.sidebar-stat-val.white { color: var(--white); }
.sidebar-stat-label {
  font-family: var(--barlow);
  font-size: 8px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 2px;
}

/* ── SPREAD 4: BUY ── */
.buy-spread {
  background: rgba(0,51,204,0.75);
  color: var(--white);
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}
.buy-header {
  padding: 20px 28px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.buy-header-label {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.buy-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 40px;
  text-align: center;
  gap: 20px;
}
.buy-eyebrow {
  font-family: var(--barlow);
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.buy-headline {
  font-family: var(--cormorant);
  font-size: clamp(42px, 9vw, 86px);
  font-weight: 300;
  font-style: italic;
  line-height: 1;
  color: var(--white);
}
.buy-subhead {
  font-family: var(--barlow);
  font-size: clamp(11px, 2vw, 15px);
  letter-spacing: 1px;
  color: rgba(255,255,255,0.6);
  max-width: 400px;
  line-height: 1.6;
  font-weight: 300;
}
.buy-divider {
  width: 40px;
  height: 1px;
  background: rgba(255,255,255,0.3);
}
.buy-ca {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}
.buy-ca-label {
  font-family: var(--barlow);
  font-size: 8px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}
.buy-ca-addr {
  font-family: var(--barlow);
  font-size: 11px;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.5px;
}
.buy-ca-btn {
  background: var(--white);
  color: var(--blue);
  border: none;
  font-family: var(--barlow);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.buy-ca-btn:hover { background: var(--ink); color: var(--white); }
.buy-ca-btn.done { background: rgba(255,255,255,0.2); color: var(--white); }

.buy-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.buy-link {
  border: 1px solid rgba(255,255,255,0.3);
  color: var(--white);
  background: transparent;
  font-family: var(--barlow);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s;
}
.buy-link:hover { background: rgba(255,255,255,0.1); }
.buy-link.primary { background: var(--white); color: var(--blue); }
.buy-link.primary:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }

.buy-footer {
  padding: 14px 28px;
  border-top: 1px solid rgba(255,255,255,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buy-footer-text {
  font-family: var(--barlow);
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}

/* ── NAVIGATION ── */
.nav-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 14px 0 6px;
  width: 100%;
  background: #111;
}

.nav-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  font-family: var(--barlow);
}
.nav-btn:hover { background: rgba(255,255,255,0.15); color: white; }
.nav-btn:disabled { opacity: 0.2; cursor: default; }

.page-indicators {
  display: flex;
  gap: 6px;
  align-items: center;
}
.page-dot {
  width: 5px; height: 5px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
}
.page-dot.active {
  background: white;
  width: 18px;
  border-radius: 3px;
}

.page-label {
  font-family: var(--barlow);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  text-align: center;
  padding-bottom: 10px;
  background: #111;
  width: 100%;
}
`;

const CA = "PASTE_YOUR_CA_HERE";
const JUPITER = "https://jup.ag";
const DEX = "https://dexscreener.com";
const TG = "https://t.me";

const Barcode = () => {
  const bars = [2,1,3,1,2,1,1,2,3,1,2,1,3,2,1,2,1,3,1,2,1,2,3,1];
  return (
    <div className="barcode">
      {bars.map((h, i) => (
        <div key={i} className="barcode-bar" style={{ height: `${h * 6}px` }} />
      ))}
    </div>
  );
};

const PAGES = [
  {
    id: "cover",
    label: "Cover",
    render: () => (
      <div className="cover" style={{height:"100%"}}>
        <div className="cover-header">
          <div className="cover-meta">
            <span className="cover-issue">Vol. 1 — Issue 001 — 2025</span>
          </div>
          <span className="cover-issue">$0.00 / Free on Solana</span>
        </div>
        <div className="rule-h thick" />
        <div className="cover-masthead">PEPT<span>A</span>RD</div>
        <div className="rule-h" />
        <div className="cover-body" style={{flex:1}}>
          <div className="cover-col-left">
            <div>
              <div className="cover-kicker">Also inside</div>
            </div>
            {[
              { kicker: "Health", hl: "Cold shower or cry first? Experts weigh in" },
              { kicker: "Finance", hl: "Account balance: $0. Vial count: 4. Net positive?" },
              { kicker: "Culture", hl: "Teaching the children: a retrospective" },
            ].map((item, i) => (
              <div key={i}>
                <div className="rule-h" style={{marginBottom:8}} />
                <div className="cover-kicker">{item.kicker}</div>
                <div className="cover-hl" style={{marginTop:3}}>{item.hl}</div>
              </div>
            ))}
          </div>
          <div className="cover-center">
            <div className="cover-hero-img" style={{flex:1}}>
              <div className="cover-hero-text">PEPT</div>
            </div>
            <div className="cover-quote-block">
              <div className="cover-quote-text">"I need my peptides."</div>
              <div className="cover-quote-attr">— Patient Zero, kitchen argument, 2024</div>
            </div>
          </div>
          <div className="cover-col-right">
            <div className="cover-kicker">Feature</div>
            <div className="rule-h" style={{margin:"6px 0"}}/>
            <div className="cover-hl" style={{fontSize:"clamp(14px,2.5vw,18px)", fontWeight:500, lineHeight:1.2}}>
              The Man, The Vial, The Whiteboard
            </div>
            <div className="cover-byline" style={{marginTop:4}}>An investigation into peptide consciousness</div>
            <div className="rule-h" style={{margin:"12px 0"}}/>
            <div className="cover-kicker" style={{marginBottom:4}}>Relationships</div>
            <div className="cover-hl">"You don't need peptides." She was wrong.</div>
            <div className="rule-h" style={{margin:"12px 0"}}/>
            <div className="cover-kicker" style={{marginBottom:4}}>Wellness</div>
            <div className="cover-hl">The morning protocol: four steps, zero compromise</div>
          </div>
        </div>
        <div className="rule-h thick" />
        <div className="cover-footer">
          <span className="cover-price">$PEPTARD — Solana Network</span>
          <Barcode />
        </div>
      </div>
    )
  },
  {
    id: "feature",
    label: "Feature",
    render: () => (
      <div className="feature" style={{height:"100%"}}>
        <div className="feature-header">
          <div className="feature-header-inner">
            <span className="feature-section-label">Feature — Peptide Culture</span>
            <span className="feature-pg">Pg. 14</span>
          </div>
        </div>
        <div className="feature-body" style={{flex:1}}>
          <div className="feature-col">
            <div className="feature-headline">
              The Man, The Vial,<br />
              <em>The Whiteboard</em>
            </div>
            <div className="feature-deck">
              An investigation into what happens when a man discovers peptides, loses $14,000 on a trade, and still — somehow — considers the day a win.
            </div>
            <div className="feature-byline-block">
              <div>
                <div className="feature-byline-name">Staff Writer</div>
                <div className="feature-byline-role">PEPTARD Magazine</div>
              </div>
            </div>
            <div className="rule-h" style={{marginBottom:14}}/>
            <p className="dropcap-p">
              He woke up at 5am. Not because an alarm went off — because the protocol demanded it. On a whiteboard above his trading desk, in handwriting that suggested both confidence and mild sleep deprivation: Gym. Cold Shower. Peptides. Grind.
            </p>
            <p className="body-p">
              By 9am, the trading account had lost $13,678. He looked at the chart. He looked at the vial. He injected anyway. This, sources close to the situation confirm, is the peptard difference.
            </p>
            <div className="pull-quote">
              <div className="pull-quote-text">
                "The protocol does not care about <span>your P&L.</span> It only cares about the protocol."
              </div>
            </div>
            <p className="body-p">
              When asked whether the peptides were helping, he held up the vial. When asked whether the trading losses were concerning, he held up the vial. When asked to please put the vial down, he left the room.
            </p>
          </div>
          <div className="feature-col-div" />
          <div className="feature-col">
            <div className="img-placeholder" style={{height:"38%"}}>
              <div className="img-caption">Fig. 1 — Subject at desk. Note: trading chart (red). Vial (present). Tears (visible). Protocol (continuing).</div>
            </div>
            <p className="body-p" style={{marginTop:12}}>
              His girlfriend described the kitchen confrontation as "the peptides thing." He described it as "a philosophical disagreement about recovery science." Neither party could confirm the other's account.
            </p>
            <p className="body-p">
              What is undeniable: the vial was labeled PEPTIDES. It was held at eye level. It was not put down.
            </p>
            <div className="img-placeholder" style={{height:"28%", marginTop:8}}>
              <div className="img-caption">Fig. 2 — The whiteboard. Gym ✓. Cold shower ✓. Peptides ✓. Grind: ongoing.</div>
            </div>
            <p className="body-p" style={{marginTop:10, fontSize:"clamp(9px,1.5vw,11px)", color:"var(--mid)"}}>
              <em>$PEPTARD is a cultural document. Not financial advice. Not medical advice. The editors are not responsible for any injections made in the vicinity of a red trading chart.</em>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "protocol",
    label: "The Protocol",
    render: () => (
      <div className="protocol-spread" style={{height:"100%"}}>
        <div className="protocol-header">
          <span className="protocol-header-title">Wellness & Performance</span>
          <span className="protocol-section-name">The Morning Protocol</span>
          <span style={{fontFamily:"var(--barlow)", fontSize:9, color:"var(--mid)", letterSpacing:1}}>Pg. 28</span>
        </div>
        <div className="protocol-body" style={{flex:1}}>
          <div className="protocol-main">
            <div className="protocol-title">
              The<br /><span>Peptard</span><br />Protocol
            </div>
            <div className="rule-h" style={{marginBottom:14}}/>
            <p className="body-p" style={{marginBottom:16, fontSize:"clamp(11px,1.7vw,13px)"}}>
              Four steps. No exceptions. The whiteboard is not a suggestion — it is constitutional law, self-imposed at 4am in a state of extreme conviction.
            </p>
            {[
              { num:"01", name:"Gym", note:"Non-negotiable. Even crying." },
              { num:"02", name:"Cold Shower", note:"Especially if crying." },
              { num:"03", name:"Peptides", note:"The vial. Always the vial." },
              { num:"04", name:"Grind", note:"Charts, code, or staring." },
            ].map(r => (
              <div className="routine-item" key={r.num}>
                <span className="routine-num">{r.num}</span>
                <span className="routine-name">{r.name}</span>
                <span className="routine-note">{r.note}</span>
              </div>
            ))}
            <div style={{marginTop:16}}>
              <p className="body-p" style={{fontSize:"clamp(10px,1.6vw,12px)"}}>
                Clinical studies on the protocol are pending. The peptard does not wait for clinical studies. The peptard is the clinical study.
              </p>
            </div>
          </div>
          <div className="protocol-div" />
          <div className="protocol-sidebar">
            <span className="sidebar-label">By the numbers</span>
            <div className="sidebar-hl">
              "She said I didn't need them. I have four vials and a whiteboard that disagrees."
            </div>
            <div className="rule-h" style={{background:"rgba(255,255,255,0.1)", margin:"14px 0"}}/>
            {[
              { val:"5AM", white:true, label:"Protocol start time" },
              { val:"4mg", label:"Daily dose. Approx." },
              { val:"$0", label:"Account balance. Post-trade." },
              { val:"100%", white:false, label:"Grind continuation rate" },
            ].map((s,i) => (
              <div className="sidebar-stat" key={i}>
                <div className={`sidebar-stat-val${s.white ? " white" : ""}`}>{s.val}</div>
                <div className="sidebar-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: "buy",
    label: "Acquire",
    render: ({ copied, onCopy }) => (
      <div className="buy-spread" style={{height:"100%"}}>
        <div className="buy-header">
          <span className="buy-header-label">PEPTARD Magazine — Advertisement</span>
          <span className="buy-header-label">Pg. 64</span>
        </div>
        <div className="buy-body">
          <div className="buy-eyebrow">Now available on Solana</div>
          <div className="buy-headline">
            Buy.<br />Inject.<br />Repeat.
          </div>
          <div className="buy-divider" />
          <div className="buy-subhead">
            The protocol extends beyond the body. $PEPTARD is the on-chain expression of peak peptide consciousness. Your girlfriend still doesn't get it. Buy anyway.
          </div>
          <div className="buy-links">
            <button className="buy-link primary" onClick={() => window.open(JUPITER, '_blank')}>Buy on Jupiter</button>
            <button className="buy-link" onClick={() => window.open(DEX, '_blank')}>View Chart</button>
            <button className="buy-link" onClick={() => window.open(TG, '_blank')}>Telegram</button>
          </div>
          <div className="buy-ca">
            <div>
              <div className="buy-ca-label">Contract Address</div>
              <div className="buy-ca-addr">
                {CA.length > 12 ? `${CA.slice(0,10)}...${CA.slice(-6)}` : CA}
              </div>
            </div>
            <button className={`buy-ca-btn${copied ? " done" : ""}`} onClick={onCopy}>
              {copied ? "Copied ✓" : "Copy CA"}
            </button>
          </div>
        </div>
        <div className="buy-footer">
          <span className="buy-footer-text">$PEPTARD — 2025 — Not financial or medical advice</span>
          <span className="buy-footer-text">Solana Network</span>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CA).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getState = (i) => {
    if (i === page) return "active";
    if (i < page)   return "prev";
    return "next";
  };

  return (
    <>
      <style>{FONTS}{css}</style>
      <div className="stage">
        <div className="magazine">
          {PAGES.map((p, i) => (
            <div key={p.id} className={`spread ${getState(i)}`}>
              {p.render({ copied, onCopy: handleCopy })}
            </div>
          ))}
        </div>
        <div className="nav-controls">
          <button className="nav-btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>←</button>
          <div className="page-indicators">
            {PAGES.map((p, i) => (
              <div key={p.id} className={`page-dot${i === page ? " active" : ""}`} onClick={() => setPage(i)} />
            ))}
          </div>
          <button className="nav-btn" onClick={() => setPage(p => p + 1)} disabled={page === PAGES.length - 1}>→</button>
        </div>
        <div className="page-label">{PAGES[page].label} — {page + 1} / {PAGES.length}</div>
      </div>
    </>
  );
}
