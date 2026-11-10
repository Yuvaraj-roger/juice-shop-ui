// Zestly juice shop UI - React (loaded via CDN, no build step)
const { useState, useEffect } = React;

// ---------- Sidebar ----------
const links = ["Black Friday", "The Menu", "Our Story", "Gifting & Offers"];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h1 className="logo">zestly</h1>
        <p className="tagline">Cold-pressed, slowly.</p>
      </div>

      <nav className="nav" aria-label="Main">
        {links.map((l, i) => (
          <a key={l} href="#" className="nav-link">
            <span className="nav-num">0{i + 1}</span>
            {l}
          </a>
        ))}
      </nav>

      <a href="#" className="shop-all">
        Shop all juices <span aria-hidden="true">↗</span>
      </a>

      <blockquote className="side-quote">
        Black Friday,
        <br />
        the fresh-squeezed way.
        <cite>27–30 November 2026</cite>
      </blockquote>

      <button className="bag" type="button">
        <span>Your bag</span>
        <span>00</span>
      </button>
    </aside>
  );
}

// ---------- PromoBar ----------

function PromoBar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("FRESH20");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="promo-bar">
      <span>Black Friday · 27–30 November · Up to 30% off</span>
      <span className="promo-code">
        Code
        <button type="button" onClick={copy} className="code-chip">
          {copied ? "Copied" : "FRESH20"}
        </button>
      </span>
    </div>
  );
}

// ---------- Countdown ----------

const TARGET = new Date("2026-11-27T00:00:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

function Countdown() {
  const [t, setT] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown">
      <p className="count-label">Black Friday begins in</p>
      <div className="count-row">
        {Object.entries(t).map(([label, v]) => (
          <div className="count-box" key={label}>
            <strong>{String(v).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Hero ----------

function Hero() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("FRESH20");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Black Friday / 27–30 November</p>
        <h2 className="headline">
          A brighter sip.
          <br />
          A bolder <em>season.</em>
        </h2>
        <p className="lede">
          Cold-pressed juices, wellness shots and gift boxes, squeezed fresh
          every morning from fruit picked at its peak.
        </p>

        <div className="cta-row">
          <a href="#" className="btn">Explore the sale ↗</a>
          <a href="#" className="link">Find your blend ↓</a>
        </div>

        <div className="coupon">
          <div>
            <p className="coupon-kicker">Black Friday · sitewide</p>
            <p className="coupon-big"><em>20% off</em> every bottle.*</p>
          </div>
          <button type="button" className="coupon-code" onClick={copy}>
            <strong>FRESH20</strong>
            <span>{copied ? "Copied!" : "Copy code"}</span>
          </button>
        </div>

        <Countdown />
        <p className="fine">*Planned offers · activation pending</p>
      </div>

      <div className="hero-art" role="img" aria-label="A halved orange beside a glass of fresh juice">
        <div className="badge">
          <small>Black Friday</small>
          <p>Up to <em>30%</em></p>
          <small>Spend more, save more.</small>
        </div>
        <div className="citrus" />
        <div className="glass"><div className="juice" /></div>
        <p className="art-caption">Small rituals. Beautifully squeezed.</p>
      </div>
    </section>
  );
}

// ---------- CookieNotice ----------

function CookieNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="cookies" role="dialog" aria-label="Cookie preferences">
      <div>
        <strong>A little about cookies</strong>
        <p>Essential cookies keep your bag and checkout working. Optional cookies help us understand visits.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => setOpen(false)}>Essential only</button>
        <button type="button" onClick={() => setOpen(false)}>Accept all</button>
      </div>
    </div>
  );
}

// ---------- App ----------
function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <PromoBar />
        <Hero />
      </main>
      <CookieNotice />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
