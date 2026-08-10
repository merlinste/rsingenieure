// Service pages: Energieberatung, Heizung, PV, Klimatisierung

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

function KlimatisierungPage() {
  return (
    <>
      <PageIntro
        crumbs="Klimatisierung"
        title="Klimatisierung & Kühlung."
        lead="Heiße Sommer sind längst die Regel — angenehm kühle Räume kein Luxus mehr, sondern Teil eines durchdachten Gebäude­konzepts. Wir planen Kühl­lösungen, die Behaglichkeit, Energie­effizienz und Wirtschaftlichkeit verbinden: von der reversiblen Wärme­pumpe über Split-Klimageräte bis zum passiven Wärme­schutz."
      />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Placeholder label="Klimagerät-Außeneinheit · Flächenkühlung · Verschattung" ratio="21:9" src={window.__resources && window.__resources.klimatisierungImg} />
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="split">
            <div className="stick">
              <span className="eyebrow">Bedeutung</span>
              <h2 style={{ marginTop: 24 }}>Warum Klimatisierung immer wichtiger wird.</h2>
            </div>
            <div>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 32 }}>
                Mit dem Klimawandel nehmen Hitze­tage und Tropen­nächte spürbar zu — gut gedämmte Gebäude halten Wärme im Winter, speichern sie im Sommer aber ebenso. Wer heute saniert oder neu baut, sollte Kühlung von Anfang an mitdenken: technisch, baulich und wirtschaftlich.
              </p>
              <ol className="detail-list" style={{ paddingLeft: 0 }}>
                {[
                  { n: "01", t: "Klimawandel & Hitzeperioden", d: "Die Zahl der heißen Tage steigt von Jahr zu Jahr. Überhitzte Innen­räume beeinträchtigen Schlaf, Konzentration und Gesundheit — eine geplante Kühlung schafft dauerhaft Abhilfe." },
                  { n: "02", t: "Sommerlicher Wärmeschutz & GEG", d: "Für Neubau und viele Sanierungen ist der sommerliche Wärme­schutz (DIN 4108-2) nachzuweisen. Wir integrieren die Anforderungen frühzeitig in Ihr Energie­konzept." },
                  { n: "03", t: "Behaglichkeit & Werterhalt", d: "Konstante Temperaturen und entfeuchtete Luft steigern Wohn- und Arbeits­qualität — und machen Ihre Immobilie fit für kommende Sommer." },
                  { n: "04", t: "Effizient statt Stromfresser", d: "Richtig dimensioniert und mit eigenem PV-Strom betrieben, kühlt moderne Technik überraschend sparsam — als Teil des Gesamt­systems aus Wärme­pumpe, Photovoltaik und Speicher." },
                ].map((s) => (
                  <li key={s.n}><span className="num">{s.n}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="eyebrow">Möglichkeiten</span>
            <h2 style={{ marginTop: 24 }}>Vom passiven Wärmeschutz bis zur aktiven Kühlung.</h2>
          </div>
        </div>
      </section>
      <ServiceList items={[
          { title: "Reversible Wärmepumpe: Heizen & Kühlen", text: "Viele Wärme­pumpen können im Sommer aktiv kühlen — über Flächen­heizung oder Gebläse­konvektoren, ganz ohne separate Klima­anlage. Wir prüfen, ob Ihr System dafür geeignet ist, und planen die Umsetzung." },
          { title: "Split- & Multisplit-Klimaanlagen", text: "Effiziente Klima­geräte für einzelne Räume oder ganze Wohn­einheiten — leise, sparsam und mit Heiz­funktion für die Übergangs­zeit. Wir übernehmen Auslegung, Geräte­auswahl und Ausschreibung." },
          { title: "Flächenkühlung über Boden & Decke", text: "Stille Kühlung ohne Zugluft: Fußboden- oder Decken­systeme temperieren Räume sanft und gleichmäßig — mit Taupunkt­überwachung für einen sicheren Betrieb." },
          { title: "Lüftung mit Wärmerückgewinnung", text: "Kontrollierte Wohnraum­lüftung mit Sommer-Bypass und Nacht­auskühlung — frische Luft ohne Wärme­eintrag, abgestimmt auf Gebäude und Nutzung." },
          { title: "Passiver Wärmeschutz & Verschattung", text: "Außenliegender Sonnen­schutz, geeignete Verglasung und Dämmung senken die Kühl­last, bevor Technik nötig wird — die wirtschaftlichste Kühlung ist die, die Sie nicht brauchen." },
          { title: "PV-gekoppelter Betrieb & Wirtschaftlichkeit", text: "Gekühlt wird, wenn die Sonne scheint — ideal für den Betrieb mit eigenem Photovoltaik-Strom. Wir rechnen Betriebs­kosten, Eigen­verbrauch und Förder­möglichkeiten transparent durch." },
      ]} />
      <CtaBlock />
    </>
  );
}

window.EnergieberatungPage = EnergieberatungPage;
window.HeizungPage = HeizungPage;
window.PvPage = PvPage;
window.KlimatisierungPage = KlimatisierungPage;
