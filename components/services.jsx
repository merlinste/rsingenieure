// Service pages: Energieberatung, Heizung, PV

function PageIntro({ crumbs, title, lead }) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="crumbs">
          <a href="#/">Startseite</a>
          <span>/</span>
          <span>{crumbs}</span>
        </div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

function ServiceList({ items }) {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <ol className="detail-list">
          {items.map((it, i) => (
            <li key={i}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CtaBlock() {
  return (
    <section>
      <div className="container">
        <div style={{
          background: "var(--bg-soft)",
          padding: "clamp(40px, 6vw, 72px)",
          borderRadius: "var(--radius-lg)",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          alignItems: "center",
        }}>
          <div>
            <span className="eyebrow">Nächster Schritt</span>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px, 3vw, 40px)" }}>Lassen Sie uns Ihr Projekt besprechen.</h2>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="#/kontakt" className="btn">Kontakt aufnehmen <Arrow /></a>
            <a href="#/termin" className="btn ghost">Termin buchen</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnergieberatungPage() {
  return (
    <>
      <PageIntro
        crumbs="Energieberatung"
        title="Energie­beratung."
        lead="Von der Analyse und Förder­mittel­beratung über GEG-Nachweise und Sanierungs­planung bis zur Bau­begleitung — wir optimieren Energie­effizienz, Wirtschaftlichkeit und Nachhaltigkeit in Neubau und Sanierung."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Placeholder label="Energieausweis · Sanierungs­fahrplan · Plandetails" ratio="21:9" src={(window.__resources && window.__resources.energieberatungImg) || "images/energieberatung.png"} />
        </div>
      </section>
      <ServiceList items={[
        { title: "Energieberatung & Förderung", text: "Analyse des Gebäudes, Identifikation von Einspar­potenzialen und Beratung zu staatlichen Förder­programmen (BAFA, KfW) für Wohn- und Nicht­wohn­gebäude." },
        { title: "Gebäudeenergiegesetz (GEG) & Nachweise", text: "Erstellung von Energie­ausweisen, GEG-Nachweisen und individuellen Sanierungs­fahrplänen (iSFP) zur Einhaltung gesetzlicher Anforderungen." },
        { title: "Sanierungsplanung & Effizienz­haus-Konzepte", text: "Planung energie­effizienter Sanierungen — Auswahl passender Maßnahmen für Dämmung, Heizung und Lüftung zur Erreichung von Effizienz­haus-Standards." },
        { title: "Neubau & nachhaltige Energiekonzepte", text: "Entwicklung ganzheitlicher Energie­konzepte für Neubauten — Optimierung von Wärme­erzeugung, Speicher­technologien und regenerativen Energien." },
        { title: "Baubegleitung & Qualitäts­sicherung", text: "Fachkundige Begleitung von Sanierungs- und Neubau­projekten — Sicherstellung der Förder­fähigkeit und Qualität durch professionelle Kontrollen." },
        { title: "Wirtschaftlichkeit & Amortisation", text: "Bewertung der Investitions­kosten und Betriebs­kosten­optimierung, Berechnung der Wirtschaftlichkeit und Amortisations­zeit für energie­effiziente Maßnahmen." },
      ]} />
      <CtaBlock />
    </>
  );
}

function HeizungPage() {
  return (
    <>
      <PageIntro
        crumbs="Heizung"
        title="Heizung & Wärme­pumpe."
        lead="Wir begleiten den Umstieg auf Wärme­pumpen­technologie — von der Planung über die Gebäude­optimierung bis zur Förder­mittel­beratung. So sichern Sie sich eine zukunfts­fähige, wirtschaft­liche und nach­haltige Heiz­lösung."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Placeholder label="Wärmepumpen-Aussengerät · Hydraulik-Schema" ratio="21:9" src={(window.__resources && window.__resources.heizungImg) || "images/heizung.png"} />
        </div>
      </section>
      <ServiceList items={[
        { title: "Heizungstausch & Wärmepumpen-Integration", text: "Analyse bestehender Heiz­systeme, Planung und Umsetzung des Umstiegs auf effiziente Wärme­pumpen­systeme inklusive optimaler Dimensionierung und Förder­mittel­beratung." },
        { title: "Gebäudehülle & Systemanpassung", text: "Optimierung von Dämmung, Fenstern und Heiz­flächen für eine effiziente Wärme­pumpen­nutzung, einschließlich hydraulischem Abgleich und smarter Steuerungs­technik." },
        { title: "Fördermittel & Wirtschaftlichkeit", text: "Unterstützung bei BAFA/KfW-Förder­anträgen, Wirtschaftlichkeits­berechnungen und Amortisations­analysen — um langfristig Energie­kosten zu senken und den CO₂-Ausstoß zu reduzieren." },
      ]} />
      <CtaBlock />
    </>
  );
}

function PvPage() {
  return (
    <>
      <PageIntro
        crumbs="PV & Batteriespeicher"
        title="Photovoltaik & Batterie­speicher."
        lead="Photovoltaik, Speicher und Wallbox als Gesamt­system gedacht — auf Eigen­verbrauch, Wirtschaftlichkeit und Förder­fähigkeit optimiert. Wir planen, dimensionieren und begleiten die Umsetzung."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Placeholder label="PV-Modulfeld auf Schrägdach / Speicher im Technikraum" ratio="21:9" src={(window.__resources && window.__resources.pvImg) || "images/pv.png"} />
        </div>
      </section>
      <ServiceList items={[
        { title: "Auslegung & Ertragsprognose", text: "Standort­analyse, Verschattungs­simulation und Ertrags­prognose — abgestimmt auf Ihr Verbrauchs­profil und Ihren geplanten Eigen­verbrauch." },
        { title: "Speicher- & Lade­konzept", text: "Dimensionierung des Batterie­speichers und Integration einer Wallbox — als Gesamt­system mit dem PV-Ertrag und dem Wärme­pumpen­betrieb abgestimmt." },
        { title: "Förderung & Wirtschaft­lich­keit", text: "Wir prüfen Förder­möglich­keiten auf Bundes-, Landes- und kommunaler Ebene und stellen die Wirtschaftlichkeit Ihrer Anlage transparent dar." },
        { title: "Umsetzung & Inbetriebnahme", text: "Begleitung der Ausschreibung, Qualitäts­sicherung der Installation und Doku­mentation für Netz­betreiber und Förder­geber." },
      ]} />
      <CtaBlock />
    </>
  );
}

window.EnergieberatungPage = EnergieberatungPage;
window.HeizungPage = HeizungPage;
window.PvPage = PvPage;
