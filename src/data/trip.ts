export type Coord = { lat: number; lon: number };

export type MapPin = {
  label: string;
  type: "hotel" | "sight";
  coord: Coord;
  url: string;
};

export type WalkRoute = {
  label: string;
  from: Coord;
  to: Coord;
  mode: "foot" | "car";
};

export type DayTag = {
  text: string;
  variant?: "highlight" | "family" | "outdoor";
};

export type DayEntry = {
  day: number;
  date: string; // ISO yyyy-mm-dd
  weekdayShort: string; // Fr, Sa, ...
  title: string;
  description: string;
  tags: DayTag[];
  links: { label: string; url: string }[];
};

export type City = {
  id: string;
  number: string;
  name: string;
  nativeName?: string;
  nights: number;
  region: string;
  hotel: { name: string; price: string; dateRange: string; confirmed: boolean };
  driveFrom: { time: string; from: string; mapsUrl?: string };
  coord: Coord; // city center, used for weather
  weatherUrl?: string;
  weatherWidget?: { id: string; location: string };
  pins: MapPin[];
  routes: WalkRoute[];
  days: DayEntry[];
};

export type BudgetRow = { label: string; value: string };
export type BudgetCard = {
  label: string;
  rows: BudgetRow[];
  subtotalLabel: string;
  subtotalValue: string;
  note?: string;
  accent: "rust" | "gold" | "sage" | "muted";
};

export type Tip = { title: string; text: string };

export const trip = {
  title: { normal: "", em: "Karlsbad", rest: "" },
  subtitle: "Kurstadt · Kultur · Natur · UNESCO-Welterbe · 3 Personen",
  eyebrow: "Sommerurlaub · 1.–9. August 2026",
  route: ["Löbau", "Karlsbad", "Löbau"],
  footer:
    "Karlsbad Sommerurlaub · 1.–9. August 2026 · Löbau → Karlsbad → Löbau · 9 Tage, UNESCO-Welterbe",
  budget: {
    cards: [
      {
        label: "Hotel (inkl. Frühstück)",
        rows: [
          { label: "Hotel Bristol Palace (8 Nächte)", value: "€ 1.300,00" },
          { label: "Parkplatz (8 Nächte)", value: "€ 160,00" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "€ 1.460,00",
        note: "Hotel & Parken bestätigt",
        accent: "rust",
      },
      {
        label: "Verpflegung (Mittag + Abend, 3 Personen)",
        rows: [
          { label: "9 Tage × 2 Mahlzeiten × 22 €", value: "~€ 396" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 396",
        note: "Tschechien günstig (~20–25 €/Mahlzeit) · Frühstück inkl. · Kurhotels teurer als normale Restaurants",
        accent: "gold",
      },
      {
        label: "Eintritte (3 Personen)",
        rows: [
          { label: "Jan-Becher-Museum", value: "~€ 30" },
          { label: "Karlsbader Museum", value: "~€ 18" },
          { label: "Kunstgalerie", value: "~€ 15" },
          { label: "Moser Glasmanufaktur", value: "~€ 24" },
          { label: "Diana-Turm + Standseilbahn", value: "~€ 18" },
          { label: "SOOS Naturschutzgebiet", value: "~€ 15" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 120",
        note: "Viele Highlights kostenlos: Kolonnaden, Quellen, Kirchen, Stadtwald",
        accent: "sage",
      },
      {
        label: "Benzin & Vignette",
        rows: [
          {
            label: "Benzin ~280 km × 2 (8L/100km, 1,55€/L)",
            value: "~€ 70",
          },
          { label: "Tagesausflüge (~200 km gesamt)", value: "~€ 25" },
          { label: "Tschechien Vignette 10 Tage", value: "~€ 18" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 113",
        note: "Kein ÖPNV nötig — Karlsbad ist gut zu Fuß erkundbar",
        accent: "muted",
      },
    ] as BudgetCard[],
    totalLabel: "Geschätzte Gesamtkosten",
    totalNote: "Hotel & Parken bestätigt · übrige Posten Schätzwerte",
    total: "~€ 2.089",
    totalEUR: 2089,
    totalPP: "~€ 696 / Person",
  },
  tips: [
    {
      title: "Trinkkurbecher",
      text: "Unbedingt einen Karlsbader Kurbecher (Lázeňský pohárek) kaufen — es gibt ihn für ~3–8 € an vielen Ständen. Ohne ihn ist das Heilwasser-Trinken nicht dasselbe!",
    },
    {
      title: "Währung",
      text: "Tschechische Krone (CZK). Karte wird viel akzeptiert, aber etwas Bargeld für kleinere Läden und Oblaten-Stände empfohlen.",
    },
    {
      title: "Becherovka vorbuchen",
      text: "Reservierung für das Jan-Becher-Museum im Voraus unbedingt nötig — im Sommer oft ausgebucht. Online auf der offiziellen Website buchen.",
    },
    {
      title: "SOOS & Wandern",
      text: "Für SOOS festes Schuhwerk empfohlen — Holzbohlen, aber das Gelände ist moorig. Wasser und Snacks mitnehmen, da kein Restaurant direkt am Naturschutzgebiet.",
    },
    {
      title: "Parken in Karlsbad",
      text: "Kurviertel = eingeschränkte Parkzonen. Am besten Parkhaus am Hotel nutzen oder am Stadtrand parken und zu Fuß gehen — Karlsbad ist perfekt zu Fuß erkundbar.",
    },
    {
      title: "Hitze",
      text: "Das enge Teplá-Tal speichert Wärme. Früh morgens oder abends wandern, mittags Museen besuchen. Der Stadtwald bietet auch bei Hitze kühlen Schatten.",
    },
  ] as Tip[],
  cities: [
    {
      id: "karlsbad",
      number: "01",
      name: "Karlsbad",
      nativeName: "Karlovy Vary",
      nights: 8,
      region: "Westböhmen · Tschechien",
      hotel: {
        name: "Hotel Bristol Palace",
        price: "€ 1.300,00",
        dateRange: "01.–09.08.",
        confirmed: true,
      },
      driveFrom: {
        time: "~1,5 Std.",
        from: "Löbau",
        mapsUrl:
          "https://www.google.com/maps/dir/?api=1&origin=51.0962292,14.6701781&destination=50.2268,12.8712&travelmode=driving",
      },
      coord: { lat: 50.2272, lon: 12.871 },
      pins: [
        {
          label: "Hotel Bristol Palace (Ausgangspunkt)",
          type: "hotel",
          coord: { lat: 50.2268, lon: 12.8712 },
          url: "https://www.openstreetmap.org/?mlat=50.2268&mlon=12.8712#map=17/50.2268/12.8712",
        },
        {
          label: "Sprudelkolonnade (Vřídlo)",
          type: "sight",
          coord: { lat: 50.2279, lon: 12.871 },
          url: "https://www.openstreetmap.org/?mlat=50.2279&mlon=12.8710#map=17/50.2279/12.8710",
        },
        {
          label: "Mühlbrunnkolonnade",
          type: "sight",
          coord: { lat: 50.2274, lon: 12.8724 },
          url: "https://www.openstreetmap.org/?mlat=50.2274&mlon=12.8724#map=17/50.2274/12.8724",
        },
        {
          label: "Marktkolonnade",
          type: "sight",
          coord: { lat: 50.2262, lon: 12.873 },
          url: "https://www.openstreetmap.org/?mlat=50.2262&mlon=12.8730#map=17/50.2262/12.8730",
        },
        {
          label: "Grandhotel Pupp",
          type: "sight",
          coord: { lat: 50.2248, lon: 12.8717 },
          url: "https://www.openstreetmap.org/?mlat=50.2248&mlon=12.8717#map=17/50.2248/12.8717",
        },
        {
          label: "Kirche St. Maria Magdalena",
          type: "sight",
          coord: { lat: 50.2296, lon: 12.8721 },
          url: "https://www.openstreetmap.org/?mlat=50.2296&mlon=12.8721#map=17/50.2296/12.8721",
        },
        {
          label: "Russisch-orthodoxe Kirche",
          type: "sight",
          coord: { lat: 50.2305, lon: 12.8744 },
          url: "https://www.openstreetmap.org/?mlat=50.2305&mlon=12.8744#map=17/50.2305/12.8744",
        },
        {
          label: "Jan-Becher-Museum",
          type: "sight",
          coord: { lat: 50.2258, lon: 12.8696 },
          url: "https://www.openstreetmap.org/?mlat=50.2258&mlon=12.8696#map=17/50.2258/12.8696",
        },
        {
          label: "Kunstgalerie Karlsbad",
          type: "sight",
          coord: { lat: 50.2282, lon: 12.8693 },
          url: "https://www.openstreetmap.org/?mlat=50.2282&mlon=12.8693#map=17/50.2282/12.8693",
        },
        {
          label: "Moser Glasmanufaktur",
          type: "sight",
          coord: { lat: 50.224, lon: 12.8664 },
          url: "https://www.openstreetmap.org/?mlat=50.2240&mlon=12.8664#map=15/50.2240/12.8664",
        },
        {
          label: "Diana-Turm (Standseilbahn)",
          type: "sight",
          coord: { lat: 50.2245, lon: 12.8733 },
          url: "https://www.openstreetmap.org/?mlat=50.2245&mlon=12.8733#map=17/50.2245/12.8733",
        },
      ],
      routes: [
        {
          label: "Hotel → Sprudelkolonnade",
          from: { lat: 50.2268, lon: 12.8712 },
          to: { lat: 50.2279, lon: 12.871 },
          mode: "foot",
        },
        {
          label: "Hotel → Diana-Turm",
          from: { lat: 50.2268, lon: 12.8712 },
          to: { lat: 50.2245, lon: 12.8733 },
          mode: "foot",
        },
      ],
      days: [
        {
          day: 1,
          date: "2026-08-01",
          weekdayShort: "Sa",
          title: "Anreise & Kolonnadenspaziergang",
          description:
            "Ca. 1,5 Std. Fahrt ab Löbau, Ankunft gegen Mittag. Da Check-in erst ab 14 Uhr: Koffer am Hotel abgeben und direkt in die Stadt. Erster Pflichtspaziergang entlang der Teplá durch alle Kolonnaden — Mühlbrunnkolonnade, Marktkolonnade, Parkkolonnade bis zur Sprudelkolonnade. Den heißen Sprudel (Vřídlo, 72°C!) bestaunen, der bis 14 m hoch sprudelt. Unbedingt einen Trinkkurbecher kaufen und das Heilwasser probieren — es schmeckt eigenwillig, gehört aber dazu! Abends am Grandhotel Pupp vorbei und erstes tschechisches Abendessen.",
          tags: [
            { text: "~1,5 Std. ab Löbau" },
            { text: "Kolonnadenspaziergang", variant: "highlight" },
            { text: "Sprudelkolonnade / Vřídlo", variant: "highlight" },
            { text: "Trinkkurbecher kaufen!", variant: "family" },
            { text: "Grandhotel Pupp" },
          ],
          links: [
            {
              label: "Kolonnaden & Quellen",
              url: "https://www.karlovyvary.cz/de/kolonnaden-und-quellen",
            },
            {
              label: "Sprudelkolonnade",
              url: "https://www.karlovyvary.cz/de/sprudelkolonnade",
            },
            { label: "Grandhotel Pupp", url: "https://www.pupp.cz/de" },
          ],
        },
        {
          day: 2,
          date: "2026-08-02",
          weekdayShort: "So",
          title: "Stadtführung & Architektur",
          description:
            "Ganzer Tag für die Stadt: Morgens zur barocken Kirche St. Maria Magdalena oberhalb des Sprudels — ein Hauptwerk von Kilian Ignaz Dientzenhofer. Dann zur goldkuppligen russisch-orthodoxen Kirche St. Peter und Paul. Mittags Bummel durch die Lázeňská-Straße mit ihren prachtvollen Kurhotels. Nachmittags hinauf zum Diana-Turm per Standseilbahn ab Grandhotel Pupp — fantastische Aussicht über das enge Teplá-Tal. Abends am Theaterplatz.",
          tags: [
            { text: "Kirche St. Maria Magdalena", variant: "highlight" },
            { text: "Russisch-orthodoxe Kirche" },
            { text: "Lázeňská-Straße" },
            { text: "Diana-Turm", variant: "highlight" },
            { text: "Standseilbahn", variant: "family" },
          ],
          links: [
            {
              label: "Diana-Turm & Standseilbahn",
              url: "https://www.karlovyvary.cz/de/diana-aussichtsturm",
            },
            {
              label: "Kirche St. Maria Magdalena",
              url: "https://www.karlovyvary.cz/de/kirche-st-maria-magdalena",
            },
          ],
        },
        {
          day: 3,
          date: "2026-08-03",
          weekdayShort: "Mo",
          title: "Jan-Becher-Museum & Kunstgalerie",
          description:
            'Kultureller Museumstag: Vormittags das Jan-Becher-Museum (The Home of Becherovka) — Führung durch die originalen Produktionskeller, Kurzfilm, und zum Abschluss die legendäre Degustation der "13. Karlsbader Quelle". Reservierung im Voraus nötig! Nachmittags die Kunstgalerie Karlsbad mit ihrer Sammlung tschechischer und slowakischer Kunst des 20. Jahrhunderts sowie wechselnden Ausstellungen. Abends das prächtige Stadttheater von außen bewundern.',
          tags: [
            { text: "Jan-Becher-Museum", variant: "highlight" },
            { text: "Becherovka-Degustation", variant: "family" },
            { text: "Kunstgalerie Karlsbad", variant: "highlight" },
            { text: "Stadttheater" },
          ],
          links: [
            {
              label: "Becherovka-Museum (Reservierung!)",
              url: "https://www.karlovyvary.cz/de/besucherzentrum-home-becherovka",
            },
            {
              label: "Kunstgalerie Karlsbad",
              url: "https://www.galeriekvary.cz/de/",
            },
            {
              label: "Stadttheater",
              url: "https://www.karlovyvary.cz/de/stadttheater",
            },
          ],
        },
        {
          day: 4,
          date: "2026-08-04",
          weekdayShort: "Di",
          title: "Moser Glasmanufaktur & Hirschsprung",
          description:
            'Vormittags zur weltberühmten Moser Glasmanufaktur — den Glasbläsern direkt bei der Arbeit zusehen und in der Ausstellung die Geschichte des "Königsglases" entdecken. Besichtigung inkl. Museumsshop. Nachmittags hoch zum Hirschsprung (Jelení skok): Ein Aussichtspunkt mit Hirschskulptur über dem Teplá-Tal und Ausblick auf die ganze Kurstadt. Anschließend Spaziergang durch den Stadtwald zurück ins Zentrum.',
          tags: [
            { text: "Moser Glasmanufaktur", variant: "highlight" },
            { text: "Glasbläsern zusehen", variant: "family" },
            { text: "Hirschsprung-Aussicht", variant: "outdoor" },
            { text: "Stadtwald-Spaziergang", variant: "outdoor" },
          ],
          links: [
            {
              label: "Moser Glasmanufaktur",
              url: "https://www.moser-glass.com/de/besuchszentrum",
            },
            {
              label: "Hirschsprung",
              url: "https://www.karlovyvary.cz/de/jeleni-skok-hirschsprung",
            },
          ],
        },
        {
          day: 5,
          date: "2026-08-05",
          weekdayShort: "Mi",
          title: "Tagesausflug SOOS & Franzensbad",
          description:
            "Früh aufbrechen für den Highlight-Ausflug: erst nach Franzensbad (Františkovy Lázně), dem kleinen eleganten Schwester-Kurort (~45 km), kurzer Bummel durch die pastellfarbenen Kurhotels und Parks. Dann weiter zum SOOS-Naturschutzgebiet (~52 km ab Karlsbad) — ein 2-km-Holzbohlenpfad durch ein urzeitliches Hochmoor mit sprudelnden Mofetten (Sumpfvulkanen), Mineralquellen und fast 100 Vogelarten. Geologischer Park und Dinosauriermuseum direkt dabei. Ein absolutes Naturerlebnis!",
          tags: [
            { text: "Franzensbad" },
            { text: "SOOS Naturschutzgebiet", variant: "highlight" },
            { text: "Mofetten / Sumpfvulkane", variant: "outdoor" },
            { text: "2-km-Moorpfad", variant: "outdoor" },
            { text: "Dinosauriermuseum", variant: "family" },
          ],
          links: [
            {
              label: "SOOS Naturschutzgebiet",
              url: "https://www.karlovyvary.cz/de/soos",
            },
            {
              label: "Franzensbad",
              url: "https://www.karlovyvary.cz/de/franzensbad",
            },
          ],
        },
        {
          day: 6,
          date: "2026-08-06",
          weekdayShort: "Do",
          title: "Slavkov-Wald Wanderung",
          description:
            "Wandertag im Slavkov-Wald (Slavkovský les) — Naturschutzgebiet südöstlich von Karlsbad mit stillen Wanderwegen abseits der Touristenmassen. Über 130 km markierte Wanderwege führen durch Mischwälder, an Mooren und kleinen Bächen entlang. Empfohlene Route: ab Karlsbad über den Dreikranzberg (~10 km, mittlere Schwierigkeit). Picknick mitnehmen! Nachmittags zurück in die Stadt, entspannter Abend.",
          tags: [
            { text: "Slavkov-Wald Wanderung", variant: "outdoor" },
            { text: "Dreikranzberg (~10 km)", variant: "outdoor" },
            { text: "Naturschutzgebiet" },
            { text: "Picknick", variant: "family" },
          ],
          links: [
            {
              label: "Slavkov-Wald",
              url: "https://www.karlovyvary.cz/de/slavkov-wald",
            },
            {
              label: "Wanderrouten Karlsbad",
              url: "https://www.karlovyvary.cz/de/routen-und-kurspaziergaenge",
            },
          ],
        },
        {
          day: 7,
          date: "2026-08-07",
          weekdayShort: "Fr",
          title: "Tagesausflug Eger (Cheb)",
          description:
            "Tagesausflug in die nahe Grenzstadt Eger (Cheb, ~40 km) — eine der besterhaltenen mittelalterlichen Altstädte Böhmens mit dem eindrucksvollen Schachbrettmarkt (Špalíček). Cheb-Burg mit schwarzem Turm und romanischer Doppelkapelle besichtigen. Das Cheb-Museum zeigt die Geschichte der Stadt und der Egerer Region. Highlight: hier wurde Wallenstein ermordet — das Museum zeigt den Tatort. Abends zurück nach Karlsbad.",
          tags: [
            { text: "Altstadt Eger / Cheb", variant: "highlight" },
            { text: "Cheb-Burg", variant: "highlight" },
            { text: "Cheb-Museum (Wallenstein!)" },
            { text: "Špalíček-Markt" },
            { text: "~40 km ab Karlsbad" },
          ],
          links: [
            {
              label: "Museum Cheb",
              url: "https://www.karlovyvary.cz/de/museum-cheb",
            },
            { label: "Burg Cheb", url: "https://www.hradcheb.cz/de/" },
          ],
        },
        {
          day: 8,
          date: "2026-08-08",
          weekdayShort: "Sa",
          title: "Karlsbader Museum & Hans-Heiling-Felsen",
          description:
            "Vormittags das Karlsbader Museum — das wichtigste regionalhistorische Museum mit Ausstellungen zu Archäologie, Stadtgeschichte und Kurwesen, direkt hinter dem Stadttheater. Nachmittags Ausflug zu den bizarren Hans-Heiling-Felsen bei Doubí am Ufer der Eger — eine mehrere hundert Meter lange Gruppe von Felsnadeln, die laut Sage eine versteinerte Hochzeitsgesellschaft darstellt. Letzter Abend: Abschlussdinner im Kurviertel.",
          tags: [
            { text: "Karlsbader Museum", variant: "highlight" },
            { text: "Hans-Heiling-Felsen", variant: "outdoor" },
            { text: "Eger-Ufer Spaziergang" },
            { text: "Abschlussdinner", variant: "family" },
          ],
          links: [
            { label: "Karlsbader Museum", url: "https://www.kvmuz.cz/de" },
            {
              label: "Hans-Heiling-Felsen",
              url: "https://www.karlovyvary.cz/de/hans-heiling-felsen",
            },
          ],
        },
        {
          day: 9,
          date: "2026-08-09",
          weekdayShort: "So",
          title: "Letzter Morgen & Heimfahrt",
          description:
            "Letztes Frühstück im Hotel Bristol Palace. Noch einmal letzter Kolonnadenspaziergang und Heilwassertrinken — dann Souvenirs: Karlsbader Oblaten und natürlich eine Flasche Becherovka einpacken! Gegen 11 Uhr Check-out, Heimfahrt nach Löbau. Ca. 1,5 Std. Fahrt — pünktlich zum Mittagessen zuhause.",
          tags: [
            { text: "Letzter Kolonnadengang" },
            { text: "Oblaten & Becherovka als Souvenir", variant: "family" },
            { text: "~1,5 Std. nach Löbau" },
          ],
          links: [
            {
              label: "Karlsbader Oblaten",
              url: "https://www.karlovyvary.cz/de/karlsbader-oblaten",
            },
            {
              label: "Route Karlsbad → Löbau",
              url: "https://www.google.com/maps/dir/?api=1&origin=50.2268,12.8712&destination=51.0962292,14.6701781&travelmode=driving",
            },
          ],
        },
      ],
    },
  ] as City[],
};

export type Trip = typeof trip;
