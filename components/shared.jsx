// Shared layout components: Header, Footer, BrandMark, Placeholder

const { useState, useEffect } = React;

function BrandMark() {
  return (
    <a href="#/" className="brand-mark" aria-label="R+S Ingenieurbüro">
      <span>R</span><span className="plus">+</span><span>S</span>
      <span className="sub">Ingenieurbüro</span>
    </a>
  );
}

function Header({ route }) {
  const items = [
    { href: "#/energieberatung", label: "Energieberatung" },
    { href: "#/heizung", label: "Heizung" },
    { href: "#/pv-batteriespeicher", label: "PV & Batteriespeicher" },
    { href: "#/wissen", label: "Wissen" },
    { href: "#/termin", label: "Termin" },
  ];
  return (
    <header className="site-header">
      <div className="container row">
        <BrandMark />
        <nav className="primary">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className={route === it.href ? "active" : ""}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <a href="#/kontakt" className="header-cta">
          Kontakt
          <Arrow />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h3>Lassen Sie uns über Ihr Projekt sprechen — persönlich und auf Augenhöhe.</h3>
        <div className="footer-grid">
          <div>
            <h4>R+S Ingenieurbüro</h4>
            <p>M. Eng. Florian Roth<br/>Merlin Stellwag</p>
            <p style={{ marginTop: 16, opacity: 0.7, fontSize: 13 }}>
              Ganzheitliche Energieberatung, Wärmepumpen­planung und Photovoltaik-Konzepte für Wohn- und Nichtwohngebäude.
            </p>
          </div>
          <div>
            <h4>Anschrift</h4>
            <p>Philipp-Schnell-Str. 45<br/>60437 Frankfurt am Main</p>
          </div>
          <div>
            <h4>Kontakt</h4>
            <p><a href="mailto:info@rsingenieure.com">info@rsingenieure.com</a></p>
            <p><a href="#/termin">Beratungstermin buchen</a></p>
            <p><a href="#/kontakt">Kontaktformular</a></p>
          </div>
          <div>
            <h4>Leistungen</h4>
            <p><a href="#/energieberatung">Energieberatung</a></p>
            <p><a href="#/heizung">Heizung & Wärmepumpen</a></p>
            <p><a href="#/pv-batteriespeicher">PV & Batteriespeicher</a></p>
            <p><a href="#/wissen">Wissen</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} R+S Ingenieurbüro</span>
          <span>
            <a href="#/impressum">Impressum</a> ·{" "}
            <a href="#/datenschutz">Datenschutz</a> ·{" "}
            <button className="footer-link-btn" onClick={() => window.openConsent && window.openConsent()}>Cookie-Einstellungen</button>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Arrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Placeholder({ label, ratio = "16:9", style = {}, src }) {
  const [w, h] = ratio.split(":").map(Number);
  if (src) {
    return (
      <div style={{ aspectRatio: `${w}/${h}`, overflow: "hidden", borderRadius: "var(--radius)", border: "1px solid var(--line)", ...style }}>
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div className="ph" style={{ aspectRatio: `${w}/${h}`, ...style }}>
      <span className="label">{label}</span>
      <span className="ratio">{ratio}</span>
    </div>
  );
}

// Subtle line-art icons
function Icon({ name, size = 20 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "check":
      return <svg {...props}><path d="M4 7h12M4 12h10M4 17h14M19 5l1.5 1.5L23 4"/></svg>;
    case "doc":
      return <svg {...props}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 13h7M9 17h5"/></svg>;
    case "plan":
      return <svg {...props}><path d="M3 5h18v14H3z"/><path d="M9 5v14M3 12h18"/></svg>;
    case "house":
      return <svg {...props}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>;
    case "tools":
      return <svg {...props}><path d="M14 6l4-4 3 3-4 4M14 6L4 16v4h4L18 9M14 6l4 3"/></svg>;
    case "coin":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9 9c0-1 1.5-2 3-2s3 .8 3 2-1.5 2-3 2-3 .8-3 2 1.5 2 3 2 3-1 3-2M12 5v14"/></svg>;
    case "sun":
      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>;
    case "battery":
      return <svg {...props}><path d="M3 8h15v8H3zM18 11v2h2v-2z"/><path d="M7 10v4M10 10v4"/></svg>;
    case "thermo":
      return <svg {...props}><path d="M10 14V4a2 2 0 1 1 4 0v10a4 4 0 1 1-4 0z"/><path d="M12 8v8"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

window.BrandMark = BrandMark;
window.Header = Header;
window.Footer = Footer;
window.Arrow = Arrow;
window.Placeholder = Placeholder;
window.Icon = Icon;
