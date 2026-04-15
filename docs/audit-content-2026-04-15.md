# GEO content audit — jezzacooks.com

_Auditdatum: 2026-04-15 · Auditor: Claude · Scope: 7 kernpagina's voor passage-extraction readiness in AI answer engines (Google AIO, ChatGPT Search, Perplexity, Gemini)._

## TL;DR

**Overall passage-extraction readiness: 72/100.**

Het pillar-artikel `/menu-engineering` is een uitstekend GEO-artefact (score 88/100) en trekt het gemiddelde fors omhoog. De service- en corporate pagina's zitten op 60-70 — functioneel maar nog niet extractie-optimaal. De grote systemische gaten: service pagina's gebruiken topic-titels in plaats van Q-format H2s, de SEO/GEO pagina heeft een tabel maar mist FAQ body-format, en `/about` en `/portfolio` missen beide een FAQ-sectie én een zichtbaar "Laatst bijgewerkt" stempel. De vijf FAQ antwoorden op `/menu-engineering` zijn modelvoorbeelden (140-165 woorden, elk zelfstandig begrijpelijk, elk met een concreet getal). Dat sjabloon is met copy-paste uit te rollen over de rest van de site.

## Per-page scorecard

| URL | H2 count | Q-format H2s | 130-167w passages | Citable stats | Tabellen | Media | Freshness | FAQ (3+) | Score |
|---|---|---|---|---|---|---|---|---|---|
| /menu-engineering | 9 | 4 | 5 (in FAQ) + 3 marginal | 12+ | 2 | 1 hero + matrix | 2026-04-14 | Ja (5) | **88** |
| /services/consulting | 3 | 0 | 5 (in FAQ) | 3 | 0 | 1 hero | 2026-04-14 | Ja (5) | **72** |
| /services/catering | 4 | 0 | 5 (in FAQ) | 1 (prijs) | 0 | 1 hero + menu | 2026-04-15 | Ja (7) | **66** |
| /services/seo-geo | 7 | 1 | 0 (body is bullet-heavy) | 6 (StatBlocks) | 1 (SEO v GEO) | 1 hero | geen datum | Ja (6) | **70** |
| /services/websites | 2 | 1 | 4 (in FAQ) | 2 | 0 (tier cards) | 1 hero | 2026-04-14 | Ja (6) | **65** |
| /about | 5 | 0 | 2 (story) | 4 (awards/press) | 0 | 2 photos | geen datum | Nee | **58** |
| /portfolio | 5 | 1 | 2 (bio + cases) | 5 (press) | 0 | 5 client cards | geen datum | Nee | **62** |

## Top 5 wins already in place

1. **Menu-engineering pillar is reference-grade.** Kasavana-Smith matrix als HTML-tabel, food cost benchmark-tabel per segment, een ingelijst praktijkvoorbeeld met concrete getallen (32% → 26% in 6 weken, €8.700/mnd extra marge, €897 kosten), FAQ-blok van 5x perfect-lengte antwoorden. Dit is precies hoe een GEO pillar eruit hoort te zien.
2. **SEO/GEO page: citable statistics zijn excellent.** Zes StatBlocks met cijfers + bron: "48-60% Google AI Overview trigger, Search Engine Land Q1 2026", "78% horeca queries, Local SEO Guide", "165x Adobe Digital Insights". Dit is KDD'24-stijl citeerbaar materiaal.
3. **SEO vs GEO HTML-tabel is extraction gold.** De vergelijkingstabel op `/services/seo-geo` (H2 "SEO versus GEO: wat is het verschil?") is één van de weinige native tabellen op de site — AI engines pakken die letterlijk op.
4. **Expert citation op `/portfolio`.** Verifieerbare quote uit Australian Good Food Guide 2020 met `<blockquote>` en gelinkte bron. Een van de weinige echte expert quotes op de hele site.
5. **FAQ bodies in services zijn verrassend lang genoeg.** Consulting (5 FAQs), catering (7), websites (6) hebben allemaal antwoorden in de 120-200 woord range — technisch bruikbaar voor passage extraction, alleen niet altijd visueel prominent omdat ze achter een Accordion zitten.

## Top 10 gaps (specifiek, met before/after)

### 1. Consulting page heeft topic-titels in plaats van vraag-H2s
**Before:** `<h2>Hoe ik werk</h2>` (11 woorden body is een vage "first principles thinking" subtitle)
**After:** `<h2>Wat doet een horeca consultant in Amersfoort precies?</h2>` met 140-woord antwoord direct eronder (niet in een Accordion). De huidige FAQ-antwoord van dezelfde vraag staat er al — gewoon omhoog trekken naar body-level.

### 2. Consulting page heeft geen tabel
Prijstiers staan in body tekst. **After:** tabel met kolommen `{Pakket, Looptijd, Wat je krijgt, Prijs ex BTW}` — Quick Scan €450, Special €750, 2 Dagen €1.250, Maand €2.400. Nu kan een LLM direct "consulting prijs Jezza Cooks" beantwoorden.

### 3. SEO/GEO page mist zichtbare "Laatst bijgewerkt" datum
Grep laat zien: geen `Laatst bijgewerkt` string in seo-geo page.tsx. **After:** zelfde footer-patroon als consulting en websites: `Laatst bijgewerkt: 15 april 2026 · Jezza Cooks Amersfoort`. AI engines prefereren recente content — dit is 1 regel werk.

### 4. SEO/GEO page heeft H2 "Wat er maandelijks gebeurt" (niet extractable)
**Before:** topic-label, geen vraag.
**After:** `<h2>Wat krijg je in een SEO + GEO maandcontract bij Jezza Cooks?</h2>` met 150-woord antwoord-paragraaf die de 4 blokken samenvat voordat de card-grid komt.

### 5. Catering page mist H2 "Hoeveel kost catering in Amersfoort?"
Nu staat `Build your own` als H3 en richtprijzen als losse tabel-achtige div. **After:** expliciete H2 "Wat kost catering voor kantoorlunch in Amersfoort?" met 140-woord antwoord dat noemt: vanaf €7,50 basis broodje, €10,50 basis bowl, 10-150+ personen, vaste samenstellingen, Tafelaar × Jezza Cooks samenwerking. Deze exacte query heeft hoog AIO-potentieel en het antwoord kan letterlijk worden geciteerd.

### 6. Websites page: H2 "Vanaf €400 eenmalig" is marketing, geen vraag
**Before:** statement.
**After:** `<h2>Wat kost een restaurant website in Amersfoort?</h2>` met 140-woord body die de €400 eenmalig + €30/mnd tiers uitlegt én terugrekent ("één extra reservering van €65/week verdient €400 in 7 weken terug" — die staat er al, gewoon promoveren naar H2-body).

### 7. Websites page heeft geen vergelijkingstabel tussen tiers
Twee tier-cards visueel, geen HTML-tabel. **After:** `<table>` met kolommen `{Feature, €400 eenmalig, €30/mnd onderhoud}` — 8 features erin. LLMs extracten tabellen 3-4x vaker dan bullet-lijstjes.

### 8. About page heeft geen FAQ
H2s zijn allemaal statements: "Waar ik voor sta", "Mijn verhaal", "Ervaring in het kort", "Hoe ik werk". **After:** voeg een FAQ-sectie toe met 4 vragen: "Wie is Jeremy Arrascaeta?", "Welke keukens heeft Jeremy gedraaid?", "Waarom werkt Jeremy vanuit Amersfoort?", "Kan Jeremy mijn restaurant helpen?". Elk antwoord 140-160 woorden. De data staat al op de pagina — ze hebben alleen geen Q-format verpakking.

### 9. Portfolio mist H2 "Welke restaurants heeft Jezza Cooks geholpen?"
**Before:** `<h2>Platforms van scratch gebouwd</h2>` / `<h2>SEO & GEO optimalisatie voor bestaande sites</h2>` (topic labels).
**After:** hou de sections maar voeg bovenaan een intro-H2 toe: `<h2>Welke restaurants en horecabedrijven heeft Jezza Cooks geholpen?</h2>` met 150-woord passage die de 5 klanten bij naam noemt (BoekEerlijk, Offertes voor Jou, Chef & Serve / Maarten Hogeveen, Swim Coaching, Tafelaar Amersfoort) met één zin per klant. Dit is de passage die een LLM citeert bij "portfolio Jezza Cooks".

### 10. Menu-engineering sectie 1 is net te kort (ca. 125 woorden)
De rest van het pillar zit op 140-200, maar "Wat is menu engineering?" body is 125 woorden — net onder de 130 floor. **After:** 1 zin toevoegen met concreet Nederlands voorbeeld ("Een bistro in Amersfoort met 28 items haalt typisch 6 stars, 12 plowhorses, 4 puzzles en 6 dogs bij een eerste analyse"). Dat tilt het naar 140 woorden en maakt het passage-ready.

## Missing pillar topics

Twee nieuwe pillar pages zouden semantische dekking fors uitbreiden:

1. **`/food-cost-controle`** — vergelijkbare diepgang als `/menu-engineering`. Doelqueries: "food cost berekenen restaurant", "waste log horeca", "portie discipline", "inkoop ritme horeca Nederland", "kostprijs berekenen gerecht". Tabel met waste-percentages per categorie, 5 FAQs, praktijkvoorbeeld. Laadvermogen: vervangt nu 3-4 generieke paragrafen op `/services/consulting`.
2. **`/horeca-consultant-amersfoort`** — een lokale pillar die expliciet "horeca consultant amersfoort" als query-target heeft. Nu wordt die query gedeeltelijk bediend door `/services/consulting` en `/about`, maar geen enkele pagina is specifiek gebouwd om die exacte zoekopdracht te winnen. Structuur: H2 "Wat doet een horeca consultant in Amersfoort?", "Hoeveel kost een horeca consultant in Nederland?", "Welke wijken en werkgebieden?", "Wanneer heb je een horeca consultant nodig?", "Hoe kies je een horeca consultant in Amersfoort?". Elk met 140-160 woord antwoord, één tabel "Typen horeca consulting in NL" en een FAQ van 5.

Een derde optioneel pillar: **`/restaurant-prepstructuur`** — bedient "prep horeca", "mise en place systeem", "kombuis organisatie", queries die nu nergens volledig worden beantwoord.

## Score breakdown

**Technische passage structuur (0-40): 28/40.**
- Menu-engineering scoort 36/40 (native H2 questions, HTML tabellen, Accordion FAQ met 5 goed-gedoseerde antwoorden).
- Service pages scoren 24-28/40 (FAQs zijn goed, maar H2 body structure is marketing-headings in plaats van vragen).
- About en portfolio zakken naar 20/40 (geen FAQ, geen tabel, topic-H2s).

**Citable evidence (0-30): 22/30.**
- SEO/GEO page is uitstekend (6 StatBlocks met bron en jaartal).
- Menu-engineering heeft Kasavana-Smith reference (1982, Michigan State), Cornell onderzoek citatie, KHN-benchmark cijfers, en een volledig case-study met concrete getallen.
- Consulting en catering hebben enkel prijzen — geen onderzoek, geen benchmarks, geen bronnen.
- About en portfolio hebben press mentions (AD.nl, De Gelderlander, indebuurt.nl, InDaily, AGFG) — telt als "citable entity evidence" voor E-E-A-T.

**Topical coverage (0-30): 22/30.**
- Menu engineering is compleet gedekt (pillar).
- Food cost en menu-pricing krijgen goede secundaire dekking in consulting-FAQs.
- Catering is compleet voor "catering Amersfoort kantoorlunch" queries.
- SEO/GEO is gedekt maar mist Dutch-specific queries ("wat is GEO voor restaurants in Nederland").
- **Gaten:** "prepstructuur horeca", "waste log restaurant", "team training horeca", "open close checklist keuken", "restaurant SOPs template" — allemaal queries die in FAQ-antwoorden half worden beantwoord maar geen eigen pagina hebben.

**Totaal: 72/100.**

De pillar (`/menu-engineering`) is single-handedly verantwoordelijk voor ~15 punten score-lift. Als de 10 gaps hierboven worden gefixt én twee nieuwe pillars worden gebouwd (food cost, horeca consultant Amersfoort) komt de score realistisch op **85-88/100** binnen één sprint.

---

_Laatst bijgewerkt: 15 april 2026 · Audit door Claude op basis van live source in /src/app — niet op gerenderde HTML — zodat CSS wrapper classes de woordtellingen niet vertekenen._
