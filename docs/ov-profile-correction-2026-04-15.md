# OffertesVoorJou profile correction — Jezza Cooks

**Date**: 2026-04-15
**Context**: GPT's ChatGPT Search compared the current `jezzacooks.com` deploy against the OffertesVoorJou profile for Jezza Cooks and flagged two data mismatches: (1) "opgericht in 2019" and (2) "7 jaar ervaring". User confirmed the 2019 refers to the OffertesVoorJou platform itself (built by Jeremy), not Jezza Cooks as a business; and the "7 jaar ervaring" should actually say "10+ jaar" because it's referring to Jeremy's cooking career, not the platform age.

**Purpose**: give this document to an AI (or copy-paste into the OV admin panel) to update the OV profile so it matches the canonical source of truth on jezzacooks.com.

---

## 1. Canonical source of truth (jezzacooks.com as of 2026-04-15)

These are the authoritative values. Anything on OffertesVoorJou that doesn't match should be updated to these.

### Business identity

| Field | Canonical value |
|---|---|
| Trade name | **Jezza Cooks** |
| Legal form | Eenmanszaak |
| KvK number | **99547619** |
| KvK registration date | **januari 2026** |
| BTW number | *(niet ingevuld — user moet aanvullen via site-config.ts `vat`)* |
| Owner / founder | **Jeremy Arrascaeta** (alternateName: Chef Jezz) |

### Address (NAP)

| Field | Canonical value |
|---|---|
| Street | **Nijkerkerstraat 3** |
| Postal code | **3821 CD** |
| City | **Amersfoort** |
| Neighborhood / district | Valleipoort |
| Region | Utrecht |
| Country | Nederland |
| Geo | 52.1561°N, 5.3878°E (rough Amersfoort center; replace with exact pin once GBP is verified) |

### Contact

| Field | Canonical value |
|---|---|
| Phone (display) | **+31 6 34127992** |
| Phone (E.164) | +31634127992 |
| Email | **info@jezzacooks.com** |
| Website | **https://www.jezzacooks.com** (www is canonical) |
| WhatsApp | https://wa.me/31634127992 |
| Instagram | https://instagram.com/chefjezz |
| LinkedIn | *(in SITE.founder.linkedin — verify what's currently there)* |

### Opening hours (availability, not walk-in)

Maandag tot en met vrijdag, 09:00 – 18:00 (op afspraak)

### Services offered

Four services under one chef-led umbrella:

1. **Restaurant consulting** — Menu engineering, food cost controle, prepstructuur, SOPs, teamtraining. **Vanaf €450 / dagdeel** (Quick Scan). Volledig traject €897 excl. BTW (3 dagdelen). Maatwerk €1.500 – €3.500.
2. **Tafelaar × Jezza Cooks Catering** — Joint venture met Jan Molmans (eigenaar De Tafelaar Amersfoort). Kantoorlunch, diners, events. **Vanaf €7,50 p.p.** Diners vanaf €28 p.p., chef op locatie vanaf €45 p.p.
3. **Restaurant websites** — Complete restaurant websites met schema.org, reserveringsflow, AI-klare content. **€400 eenmalig** (optioneel €30/maand onderhoud). Maatwerk tot €2.500.
4. **SEO & GEO optimalisatie** — Horeca-gerichte SEO/GEO, maandelijkse optimalisatie. **€1.300 excl. BTW per jaar** of **€150 per maand**.

### Experience claims (CORRECTED)

| Claim | Canonical value | What OV currently says (to fix) |
|---|---|---|
| Years chef-kok | **10+ jaar** in high-end keukens in Europa en Australië (sinds ~2015) | "7 jaar ervaring" ❌ |
| Years as Jezza Cooks eenmanszaak | **Sinds januari 2026** | "opgericht in 2019" ❌ |
| Years as digital builder / operator | 7+ jaar (offertesvoorjou.nl sinds 2019) | — (OK as separate signal, but should be labeled as "platform" not "ervaring") |

**The correct framing to put on OV**:

> "Chef-kok sinds ~2015 (10+ jaar ervaring in high-end keukens in Europa en Australië). Jezza Cooks eenmanszaak officieel geregistreerd bij de KvK in januari 2026, als opvolging op jarenlange werkzaamheden als chef en digital operator. Gelinkt platform: offertesvoorjou.nl (sinds 2019)."

### Credentials

| Credential | Status | Source |
|---|---|---|
| **Hotelschool Ter Duinen** (Koksijde, BE) | Alumnus | Self-reported, no live verification URL |
| **Euro-Toques Young Chef Award 2018** | **Finalist** namens Restaurant Bougainville Amsterdam | Bougainville Amsterdam, Euro-Toques Nederland |
| **Dry-aging lead Angler Restaurant Stirling** (Adelaide Hills, AU) | 2020-2022 | [InDaily SA](https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on), [AGFG](https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling), [Broadsheet Adelaide](https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021), [Aquna](https://aquna.com/what-does-aquna-murray-cod-actually-taste-like/) |
| **Head chef Hanson Bay Sanctuary + Flinders Chase Café** (Kangaroo Island, AU) | 2019-2020, tijdens bushfires | Self-reported + contextual (bushfire coverage) |
| **Chef-kok Restaurant De Tafelaar Amersfoort** | Sinds 2025 | [AD.nl Amersfoort](https://www.ad.nl/amersfoort/uittip-restaurant-de-tafelaar-organiseert-eerste-gastchef-avond~a88c021a/), [De Gelderlander](https://www.gelderlander.nl/amersfoort/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~a5c0f1d0/265507710/), [indebuurt.nl](https://indebuurt.nl/amersfoort/nieuws/nieuw-in/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~343981/), [Gooische Business Podcast](https://open.spotify.com/episode/67uEJeqkVDtZD6Sryv4RMF) |

### Third-party validation (external, verifiable)

| Platform | Business | Data | URL |
|---|---|---|---|
| **Trustoo.nl** | Tafelaar Amersfoort B.V. (waar Jeremy chef-kok is) | **9.8 / 10 · 96 reviews · TOP PRO 2026 · KHN lid · Leermeester gecertificeerd** | https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/ |
| **KvK Handelsregister** | Jezza Cooks eenmanszaak | KvK 99547619 | https://www.kvk.nl/zoeken/?source=handelsregister&q=99547619 |
| **NL pers** | Jeremy bij De Tafelaar | 4 publicaties sinds 2025 | (zie credentials tabel hierboven) |
| **AU pers** | Jeremy bij Angler Stirling | 4 publicaties 2020-2021 | (zie credentials tabel hierboven) |

### Portfolio (5 live client builds)

1. **BoekEerlijk** (SaaS platform) — https://www.boekeerlijk.nl — built from scratch
2. **OffertesVoorJou** (NL matching platform) — https://offertesvoorjou.nl — built from scratch, live since 2019
3. **Chef & Serve** (private chef + catering, Maarten Hogeveen) — https://chefandserve.nl — website + menu + SEO/GEO
4. **Swimcoaching.nl** (NL zwem-coaching netwerk) — https://www.swimcoaching.nl — SEO voor lokale intents
5. **De Tafelaar Amersfoort** (shared-dining restaurant, Kamp 8) — https://www.tafelaaramersfoort.nl — website + Restaurant schema + reserveringsflow + SEO/GEO. Ook Jeremy's werkgever en catering-partner.

### Service area (20 entries)

**Amersfoort wijken**: Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Hooglanderveen (en bij uitbreiding: Liendert, Schothorst, Zielhorst)

**Buurgemeenten**: Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld

**Regionale steden**: Utrecht, Hilversum

**Buiten het kerngebied** (op afspraak, met reistoeslag): Zwolle, Apeldoorn, Amsterdam, Rotterdam, Eindhoven

---

## 2. Delta: what to update on the OffertesVoorJou profile

Copy-paste this section into the OV admin panel or hand it to an AI that edits OV profiles.

### HIGH PRIORITY — Factual errors

| Field | Currently says (per GPT) | Should say | Reason |
|---|---|---|---|
| **Ervaring / years experience** | "7 jaar ervaring" | **"10+ jaar ervaring"** | De 7 jaar is de platform-leeftijd van OffertesVoorJou zelf (sinds 2019). Jeremy's *chef-ervaring* is 10+ jaar (sinds ~2015). Deze getallen moeten gescheiden worden — "ervaring" op een Jezza Cooks profielpagina hoort over de chef-carrière te gaan. |
| **Opgericht in** | "2019" | **"januari 2026"** (voor Jezza Cooks eenmanszaak) OF **"sinds 2015"** (voor Jeremy's chef-carrière, als het label "actief sinds" is) | "2019" is de bouwdatum van OffertesVoorJou. Jezza Cooks als eenmanszaak is januari 2026 (KvK 99547619). |
| **KvK nummer** | *(verify)* | **99547619** | Jezza Cooks KvK registratie sinds januari 2026. |
| **Adres** | *(verify)* | **Nijkerkerstraat 3, 3821 CD Amersfoort** | NAP canonicalization — moet overal exact identiek zijn. |
| **Telefoon** | *(verify)* | **+31 6 34127992** | |
| **E-mail** | *(verify)* | **info@jezzacooks.com** | |
| **Website** | *(verify — should be www subdomain)* | **https://www.jezzacooks.com** | Apex `jezzacooks.com` 307-redirects naar www. GSC + schema gebruiken www als canonical. |

### MEDIUM PRIORITY — Missing credibility signals

Als het OV profiel deze velden heeft maar ze leeg zijn, invullen:

| Field | Value |
|---|---|
| **Bio / description** (NL) | "Chef-led horeca consultancy, catering (i.s.m. De Tafelaar Amersfoort), restaurant websites en SEO/GEO optimalisatie. Door Jeremy Arrascaeta — chef-kok bij shared-dining restaurant De Tafelaar aan de Kamp 8 in het centrum van Amersfoort, 10+ jaar ervaring in high-end keukens in Europa en Australië, finalist Euro-Toques Young Chef Award 2018, dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills (2020-2022)." |
| **Services / categorieën** | Restaurant consulting · Catering (kantoorlunch, diners, events, private chef) · Restaurant websites · SEO & GEO optimalisatie voor horeca |
| **Prijsindicatie** | Consulting vanaf €450 / dagdeel · Catering vanaf €7,50 p.p. · Websites €400 eenmalig · SEO/GEO €150/mnd of €1.300/jaar |
| **Werkgebied** | Amersfoort (alle wijken) · Utrecht · Hilversum · Soest · Leusden · Baarn · Bunschoten · Nijkerk · Barneveld. Buiten dit gebied op afspraak met reistoeslag. |
| **Ervaring** | 10+ jaar ervaring in high-end keukens in Europa en Australië (sinds ~2015). Jezza Cooks eenmanszaak sinds januari 2026 (KvK 99547619). |
| **Talen** | Nederlands, Engels, Frans |
| **Badges/awards** (als dat veld bestaat) | Finalist Euro-Toques Young Chef Award 2018 (Restaurant Bougainville Amsterdam) · Dry-aging lead Angler Restaurant Stirling · Chef-kok De Tafelaar Amersfoort (het restaurant heeft 9.8/10 op 96 reviews bij Trustoo, TOP PRO 2026 badge) |

### LOW PRIORITY — Polish

| Field | Improvement |
|---|---|
| **Profielfoto** | Zorg dat dit een echte portretfoto is van Jeremy (niet een stock chef). Bestand op `jezzacooks.com/pics/about-jezza.jpg`. |
| **Hoofdafbeelding** | Één van de echte hero shots (hero-home.jpg, service-catering.jpg). |
| **Portfolio links** (als OV dat ondersteunt) | Link door naar de 5 live client builds: boekeerlijk.nl, offertesvoorjou.nl, chefandserve.nl, swimcoaching.nl, tafelaaramersfoort.nl |
| **Social links** | Instagram @chefjezz, eventueel LinkedIn company page zodra aangemaakt |

---

## 3. Consistent story to tell across all platforms

Als er ergens in een profiel een keuze moet worden gemaakt tussen "sinds 2015", "sinds 2019", "sinds 2026" — gebruik deze drie zinnen als canonical tekst en kies de juiste voor de context:

**Voor chef-gerelateerde profielen** (catering platforms, horeca directories):

> "Chef-kok sinds ~2015 met 10+ jaar ervaring in high-end keukens in Europa en Australië. Finalist Euro-Toques Young Chef Award 2018 bij Restaurant Bougainville Amsterdam, dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills. Sinds 2025 terug in Nederland als chef-kok bij shared-dining restaurant De Tafelaar Amersfoort (Kamp 8). Jezza Cooks consultancy eenmanszaak sinds januari 2026."

**Voor digital / webdev / SEO platforms**:

> "Digital builder en horeca-operator. Sinds 2019 bouwt Jezza Cooks (Jeremy Arrascaeta) platforms en websites waaronder offertesvoorjou.nl, boekeerlijk.nl, chefandserve.nl en tafelaaramersfoort.nl. Parallel 10+ jaar als chef-kok in Europa en Australië. Jezza Cooks formeel geregistreerd bij de KvK sinds januari 2026 (KvK 99547619)."

**Voor Amersfoort-lokale platforms** (KvK, lokale directories, Trustoo):

> "Jezza Cooks: horeca consultancy, catering, restaurant websites en SEO/GEO, gevestigd aan de Nijkerkerstraat 3, 3821 CD Amersfoort (Valleipoort). Eenmanszaak, KvK 99547619, sinds januari 2026. Door Jeremy Arrascaeta — 10+ jaar chef-ervaring, chef-kok bij restaurant De Tafelaar aan de Kamp 8 in het centrum van Amersfoort."

---

## 4. Verification checklist (after OV update)

Nadat je de OV profiel hebt bijgewerkt, loop deze checks door:

- [ ] Zoek op OV naar "jezza cooks" en controleer dat het profiel matcht met sectie 1 hierboven
- [ ] Check of "opgericht in 2019" nu iets anders is (gebruik "januari 2026" of "chef-kok sinds 2015")
- [ ] Check of "7 jaar ervaring" nu "10+ jaar" zegt
- [ ] Check of het KvK nummer correct is (99547619)
- [ ] Check of het adres Nijkerkerstraat 3, 3821 CD is
- [ ] Check of de website URL de www-versie is
- [ ] Als je een nieuwe scan laat doen door ChatGPT Search of Perplexity op "jezza cooks amersfoort", zou het geen tegenstrijdige data meer moeten vinden tussen jezzacooks.com en OffertesVoorJou

---

## 5. Bonus — profiles to create elsewhere

Aangezien er nu een grote credibility-gap is ("alles is self-published" per GPT), overweeg deze externe profielen aan te maken met *exact* dezelfde data als in sectie 1:

| Platform | Priority | Why |
|---|---|---|
| **Google Business Profile** (`business.google.com`) | 🔴 high | Biggest local SEO blocker. Verificeer op Nijkerkerstraat 3 (Jezza Cooks consultancy) + overweeg tweede profiel op Kamp 8 voor Tafelaar × Jezza Cooks Catering. |
| **Trustoo.nl** (eigen Jezza Cooks profiel) | 🟡 medium | Apart van De Tafelaar profiel. Voor consulting + website + SEO services waar De Tafelaar Trustoo niet over gaat. |
| **LinkedIn Company Page** | 🟡 medium | Strongest social E-E-A-T backlink. Sociale proof voor consulting B2B. |
| **Euro-Toques Nederland directory** | 🟢 low | Jeremy is finalist Young Chef 2018 — vraag of hij in de directory komt. |
| **KHN (Koninklijke Horeca Nederland) member directory** | 🟢 low | De Tafelaar is al KHN-lid. Overweeg of Jezza Cooks consultancy ook lid kan worden voor eigen directory listing. |
| **Eventplanner.net** + **Meetings.nl** | 🟢 low | De Tafelaar heeft hier al profielen. Catering-tak kan eventueel eigen listing krijgen. |
| **Missethoreca.nl auteur profiel** | 🟢 low | Als je een gastblog pitched (menu engineering pillar), krijg je meteen een author profile + dofollow link. |

---

**End of OV profile correction document.**

Canonical source-of-truth on jezzacooks.com is in `src/lib/site-config.ts` — dat bestand is de single source of truth voor NAP, prijzen en services. Als iets op dit document afwijkt van `site-config.ts`, **wint site-config.ts altijd**.
