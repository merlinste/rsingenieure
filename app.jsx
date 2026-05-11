// Main app: routing + tweaks panel

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "green",
  "density": "default",
  "displayFont": "Söhne",
  "cookieBanner": true
}/*EDITMODE-END*/;

const ROUTES = {
  "#/": { Comp: HomePage, title: "R+S Ingenieurbüro" },
  "#/energieberatung": { Comp: EnergieberatungPage, title: "Energieberatung — R+S" },
  "#/heizung": { Comp: HeizungPage, title: "Heizung — R+S" },
  "#/pv-batteriespeicher": { Comp: PvPage, title: "PV & Batteriespeicher — R+S" },
  "#/wissen": { Comp: WissenPage, title: "Wissen — R+S" },
  "#/termin": { Comp: TerminPage, title: "Termin buchen — R+S" },
  "#/kontakt": { Comp: KontaktPage, title: "Kontakt — R+S" },
  "#/impressum": { Comp: ImpressumPage, title: "Impressum — R+S" },
  "#/datenschutz": { Comp: DatenschutzPage, title: "Datenschutz — R+S" },
};

function App() {
  const [route, setRoute] = useStateApp(window.location.hash || "#/");
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    const onHash = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffectApp(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme === "green" ? "" : tweaks.theme);
    document.documentElement.setAttribute("data-density", tweaks.density);
    const fontMap = {
      Fraunces: "'Fraunces', serif",
      "GT Sectra": "'Cormorant Garamond', 'Times New Roman', serif",
      Söhne: "'Inter Tight', -apple-system, sans-serif",
    };
    document.documentElement.style.setProperty("--font-display", fontMap[tweaks.displayFont] || fontMap["Söhne"]);
    const r = ROUTES[route] || ROUTES["#/"];
    document.title = r.title;
  }, [tweaks, route]);

  const { Comp } = ROUTES[route] || ROUTES["#/"];

  return (
    <>
      <Header route={route} />
      <main>
        <Comp />
      </main>
      <Footer />
      <CookieBanner enabled={tweaks.cookieBanner} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Theme">
          <window.TweakRadio
            label="Farbwelt"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "green", label: "Forest" },
              { value: "petrol", label: "Petrol" },
              { value: "graphite", label: "Graphit" },
              { value: "sand", label: "Sand" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Typografie">
          <window.TweakSelect
            label="Display-Schrift"
            value={tweaks.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={[
              { value: "Fraunces", label: "Fraunces (Serif, warm)" },
              { value: "GT Sectra", label: "Cormorant (Serif, schmal)" },
              { value: "Söhne", label: "Inter Tight (Sans)" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Layout">
          <window.TweakRadio
            label="Dichte"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "cozy", label: "Kompakt" },
              { value: "default", label: "Standard" },
              { value: "airy", label: "Luftig" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Datenschutz">
          <window.TweakToggle
            label="Cookie-Banner anzeigen"
            value={tweaks.cookieBanner}
            onChange={(v) => setTweak("cookieBanner", v)}
          />
          <window.TweakButton
            label="Consent zurücksetzen & Banner öffnen"
            onClick={() => { localStorage.removeItem("rs_consent_v1"); window.openConsent(); }}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
