// Wissen / Blog, Termin, Kontakt, Impressum, Datenschutz

const { useState: useStateMisc } = React;

function WissenPage() {
  const posts = [
    { tag: "Klimatisierung", date: "Juli 2026", title: "Kühlen mit der Wärmepumpe: So funktioniert es.", excerpt: "Viele Wärmepumpen können im Sommer auch kühlen — was reversible Systeme leisten, welche Voraussetzungen gelten und wann sich ein Split-Gerät eher lohnt.", read: "6 min" },
    { tag: "Förderung", date: "März 2026", title: "BEG-Förderung 2026: Was sich für Eigentümer:innen ändert.", excerpt: "Ein Überblick über die aktuellen Konditionen der Bundes­förderung für effiziente Gebäude — und wie Sie den iSFP-Bonus optimal nutzen.", read: "6 min" },
    { tag: "Wärmepumpe", date: "Februar 2026", title: "Wärmepumpe im Bestand: Voraussetzungen prüfen.", excerpt: "Hydraulischer Abgleich, Vor­lauftemperatur, Heizflächen — die wichtigsten Hebel für einen wirtschaftlichen Betrieb im Altbau.", read: "8 min" },
    { tag: "PV & Speicher", date: "Januar 2026", title: "Eigenverbrauch optimieren: Speicher richtig dimensionieren.", excerpt: "Warum der größte Speicher selten der wirtschaftlichste ist — und wie Sie Lastprofil, PV-Ertrag und Förder­logik zusammendenken.", read: "5 min" },
    { tag: "GEG", date: "Dezember 2025", title: "GEG-Nachweise verständlich erklärt.", excerpt: "Was Energieausweis, GEG-Nachweis und iSFP unterscheidet — und wann Sie welches Dokument tatsächlich benötigen.", read: "7 min" },
  ];
  return (
    <>
      <PageIntro
        crumbs="Wissen"
        title="Wissen."
        lead="Notizen aus der Praxis — kurze, fundierte Beiträge zu Förderung, Anlagentechnik und energetischer Sanierung. Geschrieben für Eigentümer:innen, die fundiert entscheiden wollen."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="blog-grid">
            {posts.map((p, i) => (
              <a key={i} href="#/wissen" className="blog-card">
                <div className="meta"><span>{p.tag}</span><span>{p.date}</span><span>{p.read}</span></div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="read">Beitrag lesen →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TerminPage() {
  const [month, setMonth] = useStateMisc(0); // 0 = current
  const [selDay, setSelDay] = useStateMisc(null);
  const [selSlot, setSelSlot] = useStateMisc(null);
  const [topic, setTopic] = useStateMisc("Energieberatung");
  const [done, setDone] = useStateMisc(false);
  const [submitting, setSubmitting] = useStateMisc(false);
  const [error, setError] = useStateMisc(null);

  const today = new Date();
  const view = new Date(today.getFullYear(), today.getMonth() + month, 1);
  const monthName = view.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  const firstDay = (view.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ empty: true, key: "e" + i });
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(view.getFullYear(), view.getMonth(), d);
    const isPast = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dow = (dt.getDay() + 6) % 7;
    const isWeekend = dow >= 5;
    const available = !isPast && !isWeekend;
    cells.push({ d, available, disabled: !available, key: "d" + d });
  }

  const slots = ["09:00", "10:00", "11:00", "13:30", "15:00", "16:30"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((v, k) => { data[k] = v; });
    data["termin"] = `${selDay}. ${monthName} um ${selSlot} Uhr`;
    setSubmitting(true);
    setError(null);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": "termin", ...data }),
    })
      .then((r) => { if (!r.ok) throw new Error(); setDone(true); })
      .catch(() => setError("Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns an info@rsingenieure.com."))
      .finally(() => setSubmitting(false));
  };

  if (done) {
    return (
      <PageIntro
        crumbs="Termin"
        title="Vielen Dank."
        lead={`Ihre Anfrage für den ${selDay}. ${monthName} um ${selSlot} Uhr ist eingegangen. Wir bestätigen den Termin innerhalb von 24 Stunden per E-Mail.`}
      />
    );
  }

  return (
    <>
      <PageIntro
        crumbs="Termin"
        title="Beratungs­termin buchen."
        lead="30-minütiges Erstgespräch — kostenfrei und unverbindlich. Wählen Sie Datum und Uhrzeit; wir bestätigen den Termin per E-Mail."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <button className="btn ghost" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => setMonth(Math.max(0, month - 1))} disabled={month === 0}>← Zurück</button>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{monthName}</span>
                <button className="btn ghost" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => setMonth(Math.min(3, month + 1))}>Weiter →</button>
              </div>
              <div className="calendar">
                {["Mo","Di","Mi","Do","Fr","Sa","So"].map((h) => <div key={h} className="head">{h}</div>)}
                {cells.map((c) => (
                  c.empty
                    ? <div key={c.key} className="day empty"></div>
                    : <div key={c.key}
                        className={"day " + (c.disabled ? "disabled" : "") + (selDay === c.d ? " selected" : "")}
                        onClick={() => !c.disabled && setSelDay(c.d)}
                      >
                        {c.d}
                        {!c.disabled && <span className="dot"></span>}
                      </div>
                ))}
              </div>
              {selDay && (
                <>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 32, marginBottom: 4, fontWeight: 400 }}>Verfügbare Zeiten</h4>
                  <div className="slots">
                    {slots.map((s) => (
                      <div key={s} className={"slot " + (selSlot === s ? "selected" : "")} onClick={() => setSelSlot(s)}>{s}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div>
              <span className="eyebrow">Ihre Angaben</span>
              <h2 style={{ marginTop: 20, fontSize: "clamp(28px, 3vw, 38px)", marginBottom: 32 }}>Termin­details.</h2>
              <form
                name="termin"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="termin" />
                <input type="hidden" name="termin" value={selDay && selSlot ? `${selDay}. ${monthName} um ${selSlot} Uhr` : ""} />
                <p style={{ display: "none" }}>
                  <label>Nicht ausfüllen: <input name="bot-field" /></label>
                </p>
                <div className="form-grid">
                  <div className="field"><label>Vorname</label><input type="text" name="vorname" required /></div>
                  <div className="field"><label>Nachname</label><input type="text" name="nachname" required /></div>
                  <div className="field full"><label>E-Mail</label><input type="email" name="email" required /></div>
                  <div className="field full"><label>Telefon (optional)</label><input type="tel" name="telefon" /></div>
                  <div className="field full">
                    <label>Anliegen</label>
                    <select name="anliegen" value={topic} onChange={(e) => setTopic(e.target.value)}>
                      <option>Energieberatung</option>
                      <option>Heizung & Wärmepumpe</option>
                      <option>PV & Batteriespeicher</option>
                      <option>Klimatisierung</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                  <div className="field full"><label>Nachricht</label><textarea name="nachricht" rows="4"></textarea></div>
                  {error && <div className="full" style={{ color: "#a04040", fontSize: 14 }}>{error}</div>}
                  <div className="full" style={{ marginTop: 8 }}>
                    <button type="submit" className="btn"
                      disabled={!selDay || !selSlot || submitting}
                      style={{ opacity: (!selDay || !selSlot || submitting) ? 0.4 : 1, pointerEvents: (!selDay || !selSlot || submitting) ? "none" : "auto" }}
                    >
                      {submitting ? "Wird gesendet …" : selDay && selSlot ? `${selDay}. ${monthName} · ${selSlot} Uhr buchen` : "Datum & Zeit auswählen"}
                      <Arrow />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function encodeForm(data) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

function KontaktPage() {
  const [sent, setSent] = useStateMisc(false);
  const [submitting, setSubmitting] = useStateMisc(false);
  const [error, setError] = useStateMisc(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((v, k) => { data[k] = v; });
    setSubmitting(true);
    setError(null);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": "kontakt", ...data }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Netzwerkfehler");
        setSent(true);
      })
      .catch((err) => setError("Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an info@rsingenieure.com."))
      .finally(() => setSubmitting(false));
  };

  if (sent) {
    return (
      <PageIntro
        crumbs="Kontakt"
        title="Vielen Dank."
        lead="Ihre Nachricht ist bei uns angekommen. Wir melden uns innerhalb eines Werktags zurück."
      />
    );
  }
  return (
    <>
      <PageIntro
        crumbs="Kontakt"
        title="Kontakt."
        lead="Schreiben Sie uns kurz, worum es geht — wir melden uns innerhalb eines Werktags mit konkreten nächsten Schritten."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 8, fontWeight: 400 }}>E-Mail</h4>
              <p style={{ marginTop: 0 }}><a href="mailto:info@rsingenieure.com" style={{ color: "var(--brand)" }}>info@rsingenieure.com</a></p>

              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 32, marginBottom: 8, fontWeight: 400 }}>Anschrift</h4>
              <p style={{ marginTop: 0 }}>Philipp-Schnell-Str. 45<br/>60437 Frankfurt am Main</p>

              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 32, marginBottom: 8, fontWeight: 400 }}>Sprechzeiten</h4>
              <p style={{ marginTop: 0 }}>Mo–Fr · 9:00 – 17:00 Uhr<br/>Termine nach Vereinbarung</p>
            </div>
            <div>
              <form
                name="kontakt"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="kontakt" />
                <p style={{ display: "none" }}>
                  <label>Nicht ausfüllen: <input name="bot-field" /></label>
                </p>
                <div className="form-grid">
                  <div className="field"><label>Vorname</label><input type="text" name="vorname" required /></div>
                  <div className="field"><label>Nachname</label><input type="text" name="nachname" required /></div>
                  <div className="field full"><label>E-Mail</label><input type="email" name="email" required /></div>
                  <div className="field full"><label>Telefon (optional)</label><input type="tel" name="telefon" /></div>
                  <div className="field full">
                    <label>Worum geht es?</label>
                    <select name="anliegen">
                      <option>Energieberatung & Förderung</option>
                      <option>Heizungstausch / Wärmepumpe</option>
                      <option>PV & Batteriespeicher</option>
                      <option>Klimatisierung / Kühlung</option>
                      <option>Allgemeine Anfrage</option>
                    </select>
                  </div>
                  <div className="field full"><label>Nachricht</label><textarea name="nachricht" rows="6" required></textarea></div>
                  {error && <div className="full" style={{ color: "#a04040", fontSize: 14 }}>{error}</div>}
                  <div className="full">
                    <button type="submit" className="btn" disabled={submitting} style={{ opacity: submitting ? 0.5 : 1 }}>
                      {submitting ? "Wird gesendet …" : "Nachricht senden"} <Arrow />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ImpressumPage() {
  return (
    <>
      <PageIntro crumbs="Impressum" title="Impressum." lead="Angaben gemäß § 5 TMG." />
      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
            <h3 style={{ marginTop: 32 }}>Anbieter</h3>
            <p>R+S Ingenieurbüro<br/>M. Eng. Florian Roth · Merlin Stellwag<br/>Philipp-Schnell-Str. 45<br/>60437 Frankfurt am Main</p>
            <h3 style={{ marginTop: 32 }}>Kontakt</h3>
            <p>E-Mail: <a href="mailto:info@rsingenieure.com" style={{ color: "var(--brand)" }}>info@rsingenieure.com</a></p>
            <h3 style={{ marginTop: 32 }}>Verantwortlich für den Inhalt</h3>
            <p>Florian Roth, Merlin Stellwag (Anschrift wie oben).</p>
            <h3 style={{ marginTop: 32 }}>Haftungsausschluss</h3>
            <p>Die Inhalte dieser Webseite werden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function DatenschutzPage() {
  return (
    <>
      <PageIntro crumbs="Datenschutz" title="Datenschutz." lead="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO." />
      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
            <p>Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten innerhalb unseres Online-Angebots.</p>
            <h3 style={{ marginTop: 32 }}>Verantwortlich</h3>
            <p>R+S Ingenieurbüro · Philipp-Schnell-Str. 45 · 60437 Frankfurt am Main · info@rsingenieure.com</p>
            <h3 style={{ marginTop: 32 }}>Hosting</h3>
            <p>Diese Webseite wird auf Servern in Deutschland gehostet. Es findet keine Übertragung personenbezogener Daten in Drittländer statt.</p>
            <h3 style={{ marginTop: 32 }}>Cookies & lokaler Speicher</h3>
            <p>Wir verwenden ausschließlich technisch notwendige Speicher­einträge (z.&nbsp;B. zur Speicherung Ihrer Cookie-Einwilligung). Es werden keine Tracking- oder Marketing-Cookies gesetzt.</p>
            <h3 style={{ marginTop: 32 }}>Schriftarten</h3>
            <p>Die verwendeten Schriftarten werden lokal vom selben Server ausgeliefert. Es findet keine Verbindung zu Drittanbietern (z.&nbsp;B. Google Fonts) statt.</p>
            <h3 style={{ marginTop: 32 }}>Kontaktaufnahme</h3>
            <p>Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren, werden Ihre Angaben zur Bearbeitung Ihrer Anfrage gespeichert.</p>
            <p style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 48 }}>Platzhaltertext — bitte vor Veröffentlichung durch eine vollständige, anwaltlich geprüfte Fassung ersetzen.</p>
          </div>
        </div>
      </section>
    </>
  );
}

window.WissenPage = WissenPage;
window.TerminPage = TerminPage;
window.KontaktPage = KontaktPage;
window.ImpressumPage = ImpressumPage;
window.DatenschutzPage = DatenschutzPage;
