// Home page
const { useEffect: useEffectHome } = React;

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow">Ingenieurbüro · Frankfurt am Main</span>
          </div>
          <div className="hero-grid">
            <div>
              <h1>
                Ganzheitliche <span className="accent">Energie­beratung</span> für Wohn- und Nicht­wohn­gebäude.
              </h1>
            </div>
            <div>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: "44ch", lineHeight: 1.55 }}>
                Wir verknüpfen Photovoltaik, Wärmepumpen, Batteriespeicher und Wallboxen zu Konzepten, die ökologisch und wirtschaftlich überzeugen — mit transparenter Kommunikation und Beratung auf Augenhöhe.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <a href="#/kontakt" className="btn">Kontakt aufnehmen <Arrow /></a>
                <a href="#/termin" className="btn ghost">Termin buchen</a>
              </div>
            </div>
          </div>
          <dl className="hero-meta">
            <div><dt>Standort</dt><dd>Frankfurt am Main</dd></div>
            <div><dt>Schwerpunkt</dt><dd>Erneuerbare Energien</dd></div>
            <div><dt>Beratung</dt><dd>BAFA · KfW · GEG</dd></div>
            <div><dt>Team</dt><dd>F. Roth · M. Stellwag</dd></div>
          </dl>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Placeholder label="Hero · Wohngebäude im Sonnenlicht / Wärmepumpe Aussenaufnahme" ratio="21:9" src={(window.__resources && window.__resources.heroImg) || "images/hero.png"} />
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, marginBottom: 64 }}>
            <div>
              <span className="eyebrow">Leistungen</span>
              <h2 style={{ marginTop: 24 }}>Drei Bereiche, ein integriertes Konzept.</h2>
            </div>
            <p style={{ alignSelf: "end", color: "var(--ink-soft)", fontSize: 17, maxWidth: "52ch" }}>
              Von der Energieberatung mit Förder­mittel­optimierung über die Heizungs­modernisierung bis zur Photovoltaik mit Speicher — wir denken Ihre Sanierung als Ganzes.
            </p>
          </div>

          <div className="cards-grid">
            {[
              { num: "01", icon: "doc", title: "Energieberatung", text: "Analyse, GEG-Nachweise, Sanierungs­fahrpläne und Baubegleitung — geprüfte Qualitäts­sicherung mit voller Förder­fähigkeit.", href: "#/energieberatung" },
              { num: "02", icon: "thermo", title: "Heizung & Wärmepumpe", text: "Vom Heizungs­tausch über die Gebäude­optimierung bis zur Förder­mittel­beratung — wirtschaftlich und zukunfts­fähig.", href: "#/heizung" },
              { num: "03", icon: "sun", title: "PV & Batteriespeicher", text: "Photovoltaik, Speicher und Wallbox als Gesamt­system — auf Eigen­verbrauch und Wirtschaft­lichkeit optimiert.", href: "#/pv-batteriespeicher" },
            ].map((c) => (
              <a key={c.num} href={c.href} className="card-svc">
                <span className="num">{c.num} / 03</span>
                <span className="icon-frame"><Icon name={c.icon} size={20} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="more">Mehr erfahren <Arrow size={11} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="split">
            <div className="stick">
              <span className="eyebrow">Ansatz</span>
              <h2 style={{ marginTop: 24 }}>Beratung auf Augenhöhe — technisch fundiert, wirtschaftlich gedacht.</h2>
            </div>
            <div>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 32 }}>
                Unser Fokus liegt auf der Beratung und Planung energie­effizienter Lösungen für Wohn- und Nicht­wohn­gebäude — mit einem Schwerpunkt auf erneuerbaren Energien.
              </p>
              <ol className="detail-list" style={{ paddingLeft: 0 }}>
                {[
                  { n: "01", t: "Bestandsaufnahme", d: "Wir erfassen Gebäude, Anlagentechnik und Verbrauchs­profile vor Ort und identifizieren die wirklich relevanten Hebel." },
                  { n: "02", t: "Konzept & Wirtschaftlichkeit", d: "Wir entwickeln Ihr individuelles Energie­konzept und rechnen Investitions-, Betriebs- und Förder­szenarien transparent durch." },
                  { n: "03", t: "Förderung & Umsetzung", d: "Wir begleiten Antrags­stellung (BAFA / KfW), Ausschreibung und Bau­begleitung bis zur Inbetrieb­nahme." },
                  { n: "04", t: "Qualitätssicherung", d: "Wir prüfen die Aus­führung, dokumentieren und sichern Ihnen die volle Förder­fähigkeit." },
                ].map((s) => (
                  <li key={s.n}><span className="num">{s.n}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.HomePage = HomePage;
