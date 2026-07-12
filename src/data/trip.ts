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

export type DayTag = { text: string; variant?: "highlight" | "family" };

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
  driveFrom: { time: string; from: string };
  coord: Coord; // city center, used for weather
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
  title: { normal: "Brünn · ", em: "Wien", rest: " · Pardubitz" },
  subtitle: "Eine Rundreise durch Tschechien und Österreich",
  eyebrow: "Familienreise · 1. August – 10. August 2026",
  route: ["Löbau", "Brünn", "Wien", "Pardubitz", "Löbau"],
  overview: [
    { num: "10", label: "Tage" },
    { num: "3", label: "Städte" },
    { num: "2", label: "Länder" },
    { num: "∞", label: "Erlebnisse" },
  ],
  footer:
    "Rundreise · 1. August – 10. August 2026 · Löbau → Brünn → Wien → Pardubitz → Löbau · 10 Tage, 3 Städte, 2 Länder",
  budget: {
    cards: [
      {
        label: "Hotels (inkl. Frühstück)",
        rows: [
          { label: "Hotel Botanica, Brünn (2 Nächte)", value: "€ 284,95" },
          {
            label: "Garner Hotel Prinz Eugen, Wien (5 Nächte)",
            value: "€ 864,00",
          },
          { label: "Hotel Euro, Pardubitz (2 Nächte)", value: "€ 351,00" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "€ 1.499,95",
        note: "Alle Hotels bestätigt",
        accent: "rust",
      },
      {
        label: "Verpflegung (Mittag + Abend, 3 Personen)",
        rows: [
          { label: "Tschechien ~4 Tage (günstig)", value: "~€ 200" },
          { label: "Wien ~6 Tage (gehobener)", value: "~€ 480" },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 680",
        note: "Frühstück in Hotels inklusive",
        accent: "gold",
      },
      {
        label: "Eintritte (3 Personen)",
        rows: [
          { label: "Burg Špilberk + Ossuar", value: "~€ 51" },
          { label: "Schönbrunn + Hofburg + Belvedere", value: "~€ 144" },
          { label: "Prater Riesenrad", value: "~€ 45" },
          {
            label: "Aquacentrum + Lebkuchenhaus + Schloss Pardubitz",
            value: "~€ 75",
          },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 315",
        note: "Schönbrunn/Hofburg/Belvedere online vorbuchen!",
        accent: "sage",
      },
      {
        label: "ÖPNV Wien & Benzin",
        rows: [
          { label: "Wien City Card 5 Tage × 3 Pers.", value: "~€ 255" },
          {
            label: "Benzin ~940 km (8L/100km, 1,70€/L)",
            value: "~€ 128",
          },
        ],
        subtotalLabel: "Zwischensumme",
        subtotalValue: "~€ 383",
        note: "Löbau→Brünn→Wien→Pardubitz→Löbau",
        accent: "muted",
      },
    ] as BudgetCard[],
    totalLabel: "Geschätzte Gesamtkosten",
    totalNote: "Hotels bestätigt · übrige Posten Schätzwerte",
    total: "~€ 2.878",
    totalPP: "~€ 959 / Person",
  },
  tips: [
    {
      title: "Währung",
      text: "In Tschechien gilt die Krone (CZK), nicht der Euro. Bargeld wechseln empfohlen — besser als Wechselstuben an Touristenorten.",
    },
    {
      title: "Tickets vorbuchen",
      text: "Schönbrunn, Hofburg und Belvedere unbedingt online im Voraus buchen. Im Sommer sonst sehr lange Warteschlangen.",
    },
    {
      title: "Wien City Card",
      text: "Ab ~17 €/Tag: Unlimitierte Öffi-Nutzung (U-Bahn, Tram, Bus) plus Rabatte auf viele Attraktionen — lohnt sich für 5 Tage.",
    },
    {
      title: "Ossuar Brünn",
      text: "Für Kinder ab ca. 10 Jahren geeignet. Mo & Do geschlossen. Tickets besser vorab online reservieren.",
    },
    {
      title: "Schloss Pardubice",
      text: "Montags geschlossen! Interaktive Kinderausstellung und Aussichtsturm besonders empfehlenswert.",
    },
    {
      title: "Sommer-Tipp",
      text: "Früh starten vermeidet Hitze und Menschenmassen. Wasserflaschen immer dabei — Trinkbrunnen gibt es in Wien überall.",
    },
  ] as Tip[],
  cities: [
    {
      id: "bruenn",
      number: "01",
      name: "Brünn",
      nativeName: "Brno",
      nights: 2,
      region: "Mähren · Tschechien",
      hotel: {
        name: "Hotel Botanica by goodnite cz",
        price: "€ 284,95",
        dateRange: "01.–03.08.",
        confirmed: true,
      },
      driveFrom: { time: "~2,5 Std.", from: "Löbau" },
      coord: { lat: 49.1951, lon: 16.6068 },
      pins: [
        {
          label: "Hotel Botanica (Ausgangspunkt)",
          type: "hotel",
          coord: { lat: 49.1985, lon: 16.6115 },
          url: "https://www.openstreetmap.org/?mlat=49.1985&mlon=16.6115#map=17/49.1985/16.6115",
        },
        {
          label: "Burg Špilberk",
          type: "sight",
          coord: { lat: 49.1945, lon: 16.5992 },
          url: "https://www.openstreetmap.org/?mlat=49.1945&mlon=16.5992#map=17/49.1945/16.5992",
        },
        {
          label: "Dom St. Peter & Paul",
          type: "sight",
          coord: { lat: 49.191, lon: 16.6074 },
          url: "https://www.openstreetmap.org/?mlat=49.1910&mlon=16.6074#map=17/49.1910/16.6074",
        },
        {
          label: "Astronomische Uhr",
          type: "sight",
          coord: { lat: 49.1948, lon: 16.6086 },
          url: "https://www.openstreetmap.org/?mlat=49.1948&mlon=16.6086#map=17/49.1948/16.6086",
        },
        {
          label: "Altes Rathaus",
          type: "sight",
          coord: { lat: 49.1931, lon: 16.6087 },
          url: "https://www.openstreetmap.org/?mlat=49.1931&mlon=16.6087#map=17/49.1931/16.6087",
        },
        {
          label: "Ossuar St. Jakob",
          type: "sight",
          coord: { lat: 49.1963, lon: 16.608 },
          url: "https://www.openstreetmap.org/?mlat=49.1963&mlon=16.6080#map=17/49.1963/16.6080",
        },
      ],
      routes: [
        {
          label: "Hotel → Špilberk",
          from: { lat: 49.1985, lon: 16.6115 },
          to: { lat: 49.1945, lon: 16.5992 },
          mode: "foot",
        },
        {
          label: "Hotel → Altstadt",
          from: { lat: 49.1985, lon: 16.6115 },
          to: { lat: 49.1948, lon: 16.6086 },
          mode: "foot",
        },
      ],
      days: [
        {
          day: 1,
          date: "2026-08-01",
          weekdayShort: "Sa",
          title: "Anreise & erster Nachmittag",
          description:
            "Nach der ca. 2,5-stündigen Fahrt ab Löbau Ankunft in Brünn gegen Mittag. Einchecken, kurze Pause — dann nachmittags direkt zur Burg Špilberk: Die unterirdischen Kasematten sind für Kinder ein echtes Abenteuer, das Museum gut 2 Stunden wert. Abends gemütlicher Spaziergang durch die Altstadt und Abendessen auf dem náměstí Svobody.",
          tags: [
            { text: "~2,5 Std. Fahrt ab Löbau" },
            { text: "Burg Špilberk (Nachmittag)", variant: "highlight" },
            { text: "Kasematten (Kinder!)", variant: "family" },
            { text: "Abendessen Altstadt" },
          ],
          links: [
            { label: "Burg Špilberk", url: "https://www.spilberk.cz/de/" },
            { label: "Touristinfo Brünn", url: "https://www.ticbrno.cz/de" },
          ],
        },
        {
          day: 2,
          date: "2026-08-02",
          weekdayShort: "So",
          title: "Ganzer Tag Brünn",
          description:
            "Der volle Brünn-Tag! Vormittags: Altes Rathaus mit Turmbesteigung — schaut nach dem legendären Krokodil im Eingangsgewölbe. Um 11 Uhr auf dem Freiheitsplatz an der Astronomischen Uhr stehen und versuchen, eine der Glaskugeln zu fangen. Mittags Pause im Café. Nachmittags: Ossuar bei St. Jakob — zweitgrößtes in Europa, beeindruckend inszeniert (ab ca. 10 Jahren). Abends hoch zum Dom St. Peter und Paul für den Blick über die Stadt beim Sonnenuntergang. ⚠ Rathaus nur Fr–So · Ossuar geschlossen Mo & Do",
          tags: [
            { text: "Astronomische Uhr (11 Uhr!)", variant: "highlight" },
            { text: "Altes Rathaus + Turm" },
            { text: "Ossuar St. Jakob", variant: "highlight" },
            { text: "Dom St. Peter & Paul" },
            { text: "náměstí Svobody" },
          ],
          links: [
            {
              label: "Astronomische Uhr",
              url: "https://www.gotobrno.cz/de/ort/astronomische-uhr/",
            },
            {
              label: "Altes Rathaus",
              url: "https://www.gotobrno.cz/de/ort/altes-rathaus-stara-radnice/",
            },
            {
              label: "Ossuar St. Jakob",
              url: "https://podzemibrno.cz/de/mista-v-podzemi/kostnice-u-sv-jakuba/",
            },
            {
              label: "Dom St. Peter & Paul",
              url: "https://www.katedrala-brno.cz/",
            },
          ],
        },
      ],
    },
    {
      id: "wien",
      number: "02",
      name: "Wien",
      nights: 5,
      region: "Österreich · Kaiserliche Metropole",
      hotel: {
        name: "Garner Hotel Vienna Prinz Eugen",
        price: "€ 864",
        dateRange: "03.–08.08.",
        confirmed: true,
      },
      driveFrom: { time: "~1,5 Std.", from: "Brünn" },
      coord: { lat: 48.2082, lon: 16.3738 },
      pins: [
        {
          label: "Garner Hotel Prinz Eugen (Ausgangspunkt)",
          type: "hotel",
          coord: { lat: 48.1927, lon: 16.3784 },
          url: "https://www.openstreetmap.org/?mlat=48.1927&mlon=16.3784#map=17/48.1927/16.3784",
        },
        {
          label: "Schloss Schönbrunn",
          type: "sight",
          coord: { lat: 48.1858, lon: 16.3128 },
          url: "https://www.openstreetmap.org/?mlat=48.1858&mlon=16.3128#map=16/48.1858/16.3128",
        },
        {
          label: "Hofburg / Sisi-Museum",
          type: "sight",
          coord: { lat: 48.2057, lon: 16.3648 },
          url: "https://www.openstreetmap.org/?mlat=48.2057&mlon=16.3648#map=16/48.2057/16.3648",
        },
        {
          label: "Hundertwasserhaus",
          type: "sight",
          coord: { lat: 48.2073, lon: 16.3943 },
          url: "https://www.openstreetmap.org/?mlat=48.2073&mlon=16.3943#map=17/48.2073/16.3943",
        },
        {
          label: "Prater / Riesenrad",
          type: "sight",
          coord: { lat: 48.2155, lon: 16.4002 },
          url: "https://www.openstreetmap.org/?mlat=48.2155&mlon=16.4002#map=16/48.2155/16.4002",
        },
        {
          label: "Belvedere",
          type: "sight",
          coord: { lat: 48.1915, lon: 16.3809 },
          url: "https://www.openstreetmap.org/?mlat=48.1915&mlon=16.3809#map=16/48.1915/16.3809",
        },
        {
          label: "Naschmarkt",
          type: "sight",
          coord: { lat: 48.1993, lon: 16.3639 },
          url: "https://www.openstreetmap.org/?mlat=48.1993&mlon=16.3639#map=16/48.1993/16.3639",
        },
      ],
      routes: [
        {
          label: "Hotel → Belvedere",
          from: { lat: 48.1927, lon: 16.3784 },
          to: { lat: 48.1915, lon: 16.3809 },
          mode: "foot",
        },
        {
          label: "Hotel → Hundertwasserhaus",
          from: { lat: 48.1927, lon: 16.3784 },
          to: { lat: 48.2073, lon: 16.3943 },
          mode: "foot",
        },
      ],
      days: [
        {
          day: 3,
          date: "2026-08-03",
          weekdayShort: "Mo",
          title: "Brünn Vormittag → Anreise Wien → Schönbrunn",
          description:
            "Letzter Brünn-Vormittag bis ca. 12 Uhr: entspanntes Frühstück, letzter Bummel über den Farmer's Market oder durch die Gassen der Altstadt. Gegen 12 Uhr Abfahrt nach Wien — Ankunft ca. 13:30 Uhr. Einchecken, kurze Mittagspause, dann noch nachmittags zu Schloss Schönbrunn: Der Park ist kostenlos, für die Innenräume Onlineticket kaufen. Tipp: Gleich nebenan liegt der älteste Zoo der Welt!",
          tags: [
            { text: "Brünn Abfahrt ~12 Uhr" },
            { text: "~1,5 Std. nach Wien" },
            { text: "Schloss Schönbrunn", variant: "highlight" },
            { text: "Tiergarten Schönbrunn", variant: "family" },
            { text: "Park kostenlos" },
          ],
          links: [
            { label: "Schloss Schönbrunn", url: "https://www.schoenbrunn.at/" },
            { label: "Tiergarten Schönbrunn", url: "https://www.zoovienna.at/" },
          ],
        },
        {
          day: 4,
          date: "2026-08-04",
          weekdayShort: "Di",
          title: "Hofburg & Hundertwasserhaus",
          description:
            "Vormittags in der Hofburg: Das Sisi-Museum und die Kaiserappartements sind lebendig inszeniert — besonders für Kinder sehr anschaulich, 2–3 Stunden einplanen. Nachmittags mit der Straßenbahn zum farbenprächtigen Hundertwasserhaus — Souvenirlädchen gegenüber nicht verpassen.",
          tags: [
            { text: "Hofburg / Sisi-Museum", variant: "highlight" },
            { text: "Kaiserappartements", variant: "family" },
            { text: "Hundertwasserhaus" },
            { text: "Straßenbahn-Tour" },
          ],
          links: [
            {
              label: "Sisi-Museum & Hofburg",
              url: "https://www.sisimuseum-hofburg.at/",
            },
            {
              label: "Hundertwasserhaus",
              url: "https://www.hundertwasser-village.com/",
            },
          ],
        },
        {
          day: 5,
          date: "2026-08-05",
          weekdayShort: "Mi",
          title: "Prater & Belvedere",
          description:
            "Vormittags im Wurstelprater — das Riesenrad ist absolutes Pflichtprogramm (ca. 15 € p.P.), der Park selbst ist kostenlos zu betreten. Nachmittags Schloss Belvedere: Der Garten ist gratis, drinnen wartet Klimts Original-„Kuss“ — ein Moment fürs Leben.",
          tags: [
            { text: "Riesenrad (Pflicht!)", variant: "family" },
            { text: "Prater Wurstelprater", variant: "highlight" },
            { text: "Belvedere — Klimts Kuss", variant: "highlight" },
            { text: "Garten kostenlos" },
          ],
          links: [
            { label: "Wiener Riesenrad", url: "https://www.wienerriesenrad.com/" },
            { label: "Wurstelprater", url: "https://www.prater.at/" },
            { label: "Belvedere", url: "https://www.belvedere.at/" },
          ],
        },
        {
          day: 6,
          date: "2026-08-06",
          weekdayShort: "Do",
          title: "Freier Tag & Naschmarkt",
          description:
            "Entspannter Morgen auf dem Naschmarkt — Wiens größtem Freiluftmarkt, ideal zum Frühstücken und Schlendern. Nachmittags nach Lust: Naturhistorisches Museum (sehr kindgerecht mit Dinosauriern!), Stadtpark mit Straußdenkmal, oder einfach Kaffeehaus und Apfelstrudel genießen.",
          tags: [
            { text: "Naschmarkt" },
            { text: "Naturhistorisches Museum", variant: "family" },
            { text: "Stadtpark" },
            { text: "Kaffeehaus-Kultur" },
          ],
          links: [
            {
              label: "Naturhistorisches Museum",
              url: "https://www.nhm-wien.ac.at/",
            },
            {
              label: "Naschmarkt",
              url: "https://www.wien.info/de/sehen-erleben/einkaufen/naschmarkt",
            },
          ],
        },
        {
          day: 7,
          date: "2026-08-07",
          weekdayShort: "Fr",
          title: "Wien-Abschluss & Abreise nach Pardubitz",
          description:
            "Letzter Wien-Morgen: Souvenirs auf der Mariahilfer Straße, vielleicht nochmal ein Eis im Prater. Dann Aufbruch Richtung Pardubitz — Ankunft nachmittags, direkt zum Renaissanceschloss. Hinweis: Schlossmuseum ist montags geschlossen.",
          tags: [
            { text: "Mariahilfer Straße" },
            { text: "Schloss Pardubice", variant: "highlight" },
            { text: "Pfauen im Schlosspark", variant: "family" },
          ],
          links: [
            {
              label: "Schloss Pardubice",
              url: "https://www.zamek-pardubice.cz/de",
            },
          ],
        },
      ],
    },
    {
      id: "pardubice",
      number: "03",
      name: "Pardubitz",
      nativeName: "Pardubice",
      nights: 2,
      region: "Ostböhmen · Tschechien",
      hotel: {
        name: "Hotel Euro",
        price: "€ 351",
        dateRange: "08.–10.08.",
        confirmed: true,
      },
      driveFrom: { time: "~2,5 Std.", from: "Wien" },
      coord: { lat: 50.0343, lon: 15.7812 },
      pins: [
        {
          label: "Hotel Euro (Ausgangspunkt)",
          type: "hotel",
          coord: { lat: 50.0368, lon: 15.7796 },
          url: "https://www.openstreetmap.org/?mlat=50.0368&mlon=15.7796#map=17/50.0368/15.7796",
        },
        {
          label: "Schloss Pardubice",
          type: "sight",
          coord: { lat: 50.0414, lon: 15.7765 },
          url: "https://www.openstreetmap.org/?mlat=50.0414&mlon=15.7765#map=17/50.0414/15.7765",
        },
        {
          label: "Aquacentrum Pardubice",
          type: "sight",
          coord: { lat: 50.0337, lon: 15.7825 },
          url: "https://www.openstreetmap.org/?mlat=50.0337&mlon=15.7825#map=17/50.0337/15.7825",
        },
        {
          label: "Lebkuchenhaus Ráby",
          type: "sight",
          coord: { lat: 50.0783, lon: 15.8067 },
          url: "https://www.openstreetmap.org/?mlat=50.0783&mlon=15.8067#map=15/50.0783/15.8067",
        },
        {
          label: "Altstadt / Marktplatz",
          type: "sight",
          coord: { lat: 50.0397, lon: 15.7758 },
          url: "https://www.openstreetmap.org/?mlat=50.0397&mlon=15.7758#map=17/50.0397/15.7758",
        },
      ],
      routes: [
        {
          label: "Hotel → Schloss",
          from: { lat: 50.0368, lon: 15.7796 },
          to: { lat: 50.0414, lon: 15.7765 },
          mode: "foot",
        },
        {
          label: "Hotel → Lebkuchenhaus",
          from: { lat: 50.0368, lon: 15.7796 },
          to: { lat: 50.0783, lon: 15.8067 },
          mode: "car",
        },
      ],
      days: [
        {
          day: 8,
          date: "2026-08-08",
          weekdayShort: "Sa",
          title: "Lebkuchenhaus & Aquacentrum",
          description:
            "Vormittags zum märchenhaften Perníková chaloupka (Lebkuchenhaus) bei Ráby — ein eigenes Königreich mit eigener Währung, Pässen und viel Staunen für Kinder. Nachmittags perfekter Sommerabschluss im Aquacentrum Pardubice mit Rutschen und olympischem Becken.",
          tags: [
            { text: "Lebkuchenhaus Ráby", variant: "family" },
            { text: "Aquacentrum Pardubice", variant: "family" },
            { text: "Wasserrutschen" },
            { text: "Entspannung" },
          ],
          links: [
            {
              label: "Lebkuchenhaus Ráby",
              url: "https://www.pernikovachaloupka.cz/",
            },
            {
              label: "Aquacentrum Pardubice",
              url: "https://www.aquacentrum.cz/",
            },
          ],
        },
        {
          day: 9,
          date: "2026-08-09",
          weekdayShort: "So",
          title: "Schloss Pardubice & Altstadt",
          description:
            "Vormittags das Renaissanceschloss erkunden — interaktive Kinderausstellung, Aussichtsturm und Pfauen im Park. Nachmittags Bummel durch die hübsche Pardubitzer Altstadt mit ihren bunten Renaissancehäusern am Marktplatz. Hinweis: Das Schlossmuseum ist montags geschlossen — heute ist Sonntag, also kein Problem.",
          tags: [
            { text: "Schloss Pardubice", variant: "highlight" },
            { text: "Kinderausstellung", variant: "family" },
            { text: "Aussichtsturm" },
            { text: "Altstadt-Bummel" },
          ],
          links: [
            {
              label: "Schloss Pardubice",
              url: "https://www.zamek-pardubice.cz/de",
            },
            {
              label: "Touristinfo Pardubitz",
              url: "https://www.visitpardubice.cz/de/",
            },
          ],
        },
        {
          day: 10,
          date: "2026-08-10",
          weekdayShort: "Mo",
          title: "Heimreise nach Löbau",
          description:
            "Frühzeitig aufbrechen für die ca. 3-stündige Fahrt zurück nach Löbau. Vielleicht noch ein kurzer Stopp in der Pardubitzer Altstadt für ein letztes tschechisches Frühstück — die Innenstadt ist charmant und fußläufig.",
          tags: [
            { text: "Altstadtspaziergang" },
            { text: "~3 Std. Fahrt nach Löbau" },
          ],
          links: [],
        },
      ],
    },
  ] as City[],
};

export type Trip = typeof trip;
