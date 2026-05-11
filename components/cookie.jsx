// Cookie / Consent banner — DSGVO/TTDSG-konform vorbereitet

const { useState: useStateCookie, useEffect: useEffectCookie } = React;

const STORAGE_KEY = "rs_consent_v1";

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function writeConsent(c) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, ts: Date.now() })); } catch (e) {}
  window.dispatchEvent(new CustomEvent("rs-consent-changed", { detail: c }));
}

function CookieBanner({ enabled }) {
  const [open, setOpen] = useStateCookie(false);
  const [details, setDetails] = useStateCookie(false);
  const [statistik, setStatistik] = useStateCookie(false);
  const [marketing, setMarketing] = useStateCookie(false);

  useEffectCookie(() => {
    if (!enabled) { setOpen(false); return; }
    const existing = readConsent();
    if (!existing) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener("rs-open-consent", onOpen);
    return () => window.removeEventListener("rs-open-consent", onOpen);
  }, [enabled]);

  if (!enabled || !open) return null;

  const accept = (cfg) => { writeConsent(cfg); setOpen(false); setDetails(false); };

  return (
    <div className="consent-overlay" role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <div className="consent-card">
        <div className="consent-header">
          <span className="eyebrow">Datenschutz</span>
        </div>
        <h3 id="consent-title" style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.15, fontWeight: 380, marginBottom: 14 }}>
          Wir respektieren Ihre Privatsphäre.
        </h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>
          Diese Webseite verwendet ausschließlich technisch notwendige Speicher (z.&nbsp;B. für die Bedienung von Formularen). Optional erlauben Sie uns, anonyme Statistiken zur Verbesserung des Angebots zu erheben. Sie können Ihre Auswahl jederzeit über den Link „Cookie-Einstellungen" im Fußbereich anpassen. Mehr in der <a href="#/datenschutz" style={{ color: "var(--brand)", textDecoration: "underline" }}>Datenschutzerklärung</a>.
        </p>

        {details && (
          <div className="consent-details">
            <div className="consent-row">
              <div>
                <strong>Notwendig</strong>
                <p>Erforderlich für den Betrieb der Seite. Speichert nur Ihre Consent-Auswahl im Browser.</p>
              </div>
              <span className="consent-toggle disabled" aria-label="Immer aktiv">Immer aktiv</span>
            </div>
            <div className="consent-row">
              <div>
                <strong>Statistik</strong>
                <p>Anonyme Reichweiten­messung (z.&nbsp;B. Plausible, Matomo) — keine personen­bezogenen Daten, keine US-Übertragung.</p>
              </div>
              <button
                className={"consent-toggle " + (statistik ? "on" : "")}
                onClick={() => setStatistik(!statistik)}
                aria-pressed={statistik}
              ><span /></button>
            </div>
            <div className="consent-row">
              <div>
                <strong>Marketing</strong>
                <p>Aktuell nicht im Einsatz. Wird nur geladen, wenn künftig externe Inhalte (z.&nbsp;B. Karten, Videos) eingebunden werden.</p>
              </div>
              <button
                className={"consent-toggle " + (marketing ? "on" : "")}
                onClick={() => setMarketing(!marketing)}
                aria-pressed={marketing}
              ><span /></button>
            </div>
          </div>
        )}

        <div className="consent-actions">
          {!details && (
            <button className="btn ghost" onClick={() => setDetails(true)}>Einstellungen</button>
          )}
          <button className="btn ghost" onClick={() => accept({ notwendig: true, statistik: false, marketing: false })}>
            Nur Notwendige
          </button>
          {details ? (
            <button className="btn" onClick={() => accept({ notwendig: true, statistik, marketing })}>
              Auswahl speichern <Arrow />
            </button>
          ) : (
            <button className="btn" onClick={() => accept({ notwendig: true, statistik: true, marketing: true })}>
              Alle akzeptieren <Arrow />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

window.CookieBanner = CookieBanner;
window.openConsent = () => window.dispatchEvent(new CustomEvent("rs-open-consent"));
