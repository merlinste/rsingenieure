# R+S Ingenieurbüro — Webseite

Statische Webseite für das R+S Ingenieurbüro (Frankfurt am Main).
Gebaut mit React (CDN), Babel-Standalone (im Browser kompiliert) und vanilla CSS — **kein Build-Step nötig**.

## Lokale Entwicklung

Einfach `index.html` in einem lokalen HTTP-Server öffnen (nicht direkt per `file://`, sonst werden die `.jsx`-Dateien blockiert).

```bash
# Variante 1: Python
python3 -m http.server 8000

# Variante 2: Node.js
npx serve .

# Dann im Browser:
# http://localhost:8000
```

## Deployment auf Netlify

### Einmalige Einrichtung

1. **GitHub-Repo anlegen** — neues Repo auf [github.com/new](https://github.com/new), z. B. `rs-ingenieure-website`
2. **Code hochladen** — diese Dateien in das Repo pushen:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin git@github.com:<user>/rs-ingenieure-website.git
   git push -u origin main
   ```
3. **Netlify mit GitHub verbinden** — auf [app.netlify.com](https://app.netlify.com) → „Add new site" → „Import an existing project" → GitHub-Repo auswählen
4. **Build-Settings:** _keine Änderungen_ — `Build command` leer lassen, `Publish directory` auf `.` setzen (steht schon in `netlify.toml`)
5. **Deploy** drücken — fertig in ~30 Sekunden

### Domain umstellen

1. In Netlify: Site → Domain management → „Add custom domain" → `rsingenieure.com` eintragen
2. Bei Ihrem Domain-Registrar (z. B. United Domains / Squarespace) die DNS-Einträge auf Netlify zeigen lassen:
   - `A` Record für `@` → `75.2.60.5`
   - `CNAME` für `www` → `<dein-site-name>.netlify.app`
3. Let's-Encrypt-HTTPS wird automatisch angelegt (~10 Min.)

### Region auf EU stellen (DSGVO)

Netlify → Site settings → Build & deploy → Asset hosting → **Region: Frankfurt** wählen.
Für Forms: Site settings → Forms → **Form storage region: EU**.

## Formulare

Kontakt- und Termin-Formular nutzen **Netlify Forms** — keine externe API, kein Backend nötig.

- Einsendungen sind im Netlify-Dashboard unter „Forms" einsehbar
- Für E-Mail-Weiterleitung an `info@rsingenieure.com`:
  Site settings → Forms → Form notifications → „Add notification" → Email → Empfänger eintragen
- Honeypot-Spamschutz ist eingebaut (`bot-field`-Input)
- 100 Einsendungen/Monat im Free-Tier inkludiert

**Wichtig:** Beim ersten Deploy crawlt Netlify die `index.html` und registriert die Formulare automatisch — dazu muss die statische Form-Definition im HTML vorhanden sein (ist in `index.html` als versteckter `<form>`-Block bereits eingebaut).

## Projektstruktur

```
.
├── index.html               # Einstiegspunkt
├── styles.css               # Designsystem & Komponenten-Styles
├── app.jsx                  # Routing, Tweaks, Default-Werte
├── tweaks-panel.jsx         # Tweaks-Panel-Helpers
├── components/
│   ├── shared.jsx           # Header, Footer, BrandMark, Icon, Placeholder
│   ├── home.jsx             # Startseite
│   ├── services.jsx         # Energieberatung / Heizung / PV / Klimatisierung
│   ├── misc.jsx             # Wissen / Termin / Kontakt / Impressum / Datenschutz
│   └── cookie.jsx           # DSGVO-Consent-Banner
├── images/                  # Hero- und Header-Bilder
├── netlify.toml             # Netlify-Konfiguration
├── README.md                # Diese Datei
└── .gitignore
```

## Inhalte anpassen

| Was | Wo |
|---|---|
| Texte auf der Startseite | `components/home.jsx` |
| Leistungsbeschreibungen | `components/services.jsx` |
| Blog-Beiträge, Kontaktdaten, Impressum | `components/misc.jsx` |
| Navigation, Footer | `components/shared.jsx` |
| Farben, Schriftgrößen | `styles.css` (oben unter `:root`) |
| Default-Theme | `app.jsx` → `TWEAK_DEFAULTS` |

## Tweaks-Panel

Über das Zahnrad-Symbol oben rechts können Theme, Schrift und Dichte umgeschaltet werden. Für den finalen Live-Auftritt einfach in `app.jsx` das `TweaksPanel` auskommentieren oder die `TWEAK_DEFAULTS` auf die gewünschten Werte setzen.

## Vor dem Live-Gang noch zu erledigen

- [ ] Google Fonts lokal einbinden statt von Google laden (DSGVO)
- [ ] Bilder in JPG/WebP komprimieren (`squoosh.app` o. Ä.)
- [ ] Datenschutzerklärung anwaltlich prüfen lassen
- [ ] Team-Portrait einsetzen (siehe Briefing)
- [ ] Header-Bild für die Klimatisierungs-Seite ergänzen (`images/klimatisierung.png`, dann in `services.jsx` als `src` eintragen)
- [ ] OG-Image für Social Sharing (1200×630)
- [ ] Domain `rsingenieure.com` auf Netlify umlenken
- [ ] Formular-Test mit echter E-Mail-Adresse

## Kontakt

R+S Ingenieurbüro · info@rsingenieure.com
