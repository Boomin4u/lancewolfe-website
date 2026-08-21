export type TimelineSection = {
  kind: "check-in" | "hosted";
  year: number;
  entries: string[];
};

export const timelineSections: TimelineSection[] = [
  {
    kind: "check-in",
    year: 2026,
    entries: [
      "May 24, 2026 — Seminole Hard Rock Hotel & Casino Tampa — Tampa, Florida",
      "May 17, 2026 — Electric Daisy Carnival (EDC) — Las Vegas, Nevada",
      "February 12, 2026 — West Palm Beach, Florida",
    ],
  },
  {
    kind: "check-in",
    year: 2025,
    entries: [
      "October 30, 2025 — Suwannee Hulaween — Live Oak, Florida",
      "October 26, 2025 — Mullberry Mountain — United States",
      "October 25, 2025 — Red Rocks Park and Amphitheatre — location not shown",
      "October 15, 2025 — Austin, Texas",
      "October 1, 2025 — Mulberry Mountain — Ozone, Arkansas",
      "September 22, 2025 — New York — United States",
      "September 10, 2025 — Louisville, Kentucky",
      "August 17, 2025 — Buena Vista, Colorado",
      "May 26, 2025 — Movement Electronic Music Festival — location not shown",
    ],
  },
  {
    kind: "check-in",
    year: 2024,
    entries: [
      "May 26, 2024 — Orlando, Florida",
      "May 5, 2024 — Coachella Polo Field — United States",
      "March 31, 2024 — Rome, Italy — Lazio",
      "January 16, 2024 — Barcelona, Spain — Catalonia, Spain",
    ],
  },
  {
    kind: "check-in",
    year: 2023,
    entries: [
      "December 27, 2023 — Harpefossen Skisenter — Nordfjordeid",
      "December 15, 2023 — Musée du Louvre, Paris — Paris, France",
      "October 26, 2023 — Orlando, Florida",
      "October 26, 2023 — Orlando, Florida",
      "October 19, 2023 — Trump National Doral Miami — Miami, Florida",
      "September 23, 2023 — Rich Harvest Farms — Big Rock, Illinois",
      "September 21, 2023 — Sugar Grove, Illinois",
      "September 12, 2023 — Louisville, Kentucky",
      "August 23, 2023 — Tampa, Florida",
      "August 5, 2023 — San Diego Water Front Park — San Diego, California",
      "July 27, 2023 — Portland, Oregon",
      "July 24, 2023 — Seattle, Washington",
      "January 28, 2023 — Shipwrecked Music Festival — location not shown",
      "January 15, 2023 — Seminole Hard Rock — location not shown",
    ],
  },
  {
    kind: "hosted",
    year: 2020,
    entries: [
      "May 9, 2020 — Lance's Ginnie Springs Bday Bash! — Ginnie Springs, High Springs — Event by Heather Wilson",
    ],
  },
  {
    kind: "hosted",
    year: 2018,
    entries: [
      "July 19, 2018 — Pop Up Party w/ KTRL — Elixir Orlando, Orlando — Event by Lighthouse Entertainment",
      "July 19, 2018 — An Industry Affair Ft. KTRL — The Rooftop, Orlando — Event by Music Made",
      "July 10, 2018 — Music Made Meet Up — 480 N Orange Ave, Orlando, FL 32801-1692, United States — Event by Lance Wolfe",
      "June 26, 2018 — Music Made Meet-Up — 480 N Orange Ave, Orlando — Event by Lance Wolfe",
      "May 31, 2018 — Pizza & Champagne w/ Holly Woods — Blackstar, Orlando",
      "March 1, 2018 — Pizza & Champagne ATX! — location not shown — Event by NoizeyxFLO",
      "January 11, 2018 — Pizza & Champagne At Simon's - Jan 11th — Simons, Gainesville — Event by Lucid Nightlife",
    ],
  },
  {
    kind: "hosted",
    year: 2017,
    entries: [
      "October 4, 2017 — PIZZA & CHAMPAGNE: #BASSNIGHT TAKEOVER! — Tier Nightclub, Orlando — Event by Bass Night",
      "October 1, 2017 — Curbi at Elixir - Free Show — Elixir Orlando, Orlando — Event by Vizion 1",
      "July 28, 2017 — Trippy Bash — 4478 Maidenhair Cove, Oviedo — Event by Jared Cherrnay",
      "May 19, 2017 — Mustafa's Birthday Party — Orlando, Orlando — Event by Lance Wolfe",
      "March 23, 2017 — Mango x Tango's Yacht Adventure w/ D3V & Zion Selassie — Biscayne Lady Yacht Charters, Miami — Event by Mazin Amadi",
      "March 9, 2017 — Lance's Secret Party — location not shown — Event by Lance Wolfe",
      "March 2, 2017 — Road to Chobee- Caravan to campsite! — Okeechobee, Okeechobee — Event by Kayla Nunez",
      "February 26, 2017 — Save it for Sunday — location not shown — Event by DNA Muzik Group",
      "February 24, 2017 — Lance's Secret Party #3 — location not shown — Event by Lance Wolfe",
      "February 19, 2017 — Lance's Secret Party — location not shown — Event by Lance Wolfe",
      "February 5, 2017 — Lance's Secret Party — Euclid Ave orlando, Orlando — Event by Lance Wolfe",
    ],
  },
  {
    kind: "hosted",
    year: 2016,
    entries: [
      "December 4, 2016 — Beach Bar After Party Ft. Golden Child — location not shown — Event by Golden Child",
      "December 4, 2016 — Surprise Party! — Beach Bar Restaurant, Tampa — Event by Torrie Lysenko",
      "December 4, 2016 — Orlando's Party Bus To Beach: Robin Schulz — location not shown",
    ],
  },
];
