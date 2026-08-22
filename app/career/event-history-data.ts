export type CareerTimelineEntry = {
  name: string;
  location: string;
  dateLabel: string;
  monthLabel?: string;
  href?: string;
  url?: string;
  company?: string;
  employer?: string;
  role?: string;
  note?: string;
};

export type CareerTimelineYear = {
  year: number;
  label?: string;
  summary: string;
  entries: CareerTimelineEntry[];
};

export type CareerTimelineSection = {
  title: string;
  description: string;
  years: CareerTimelineYear[];
};

const rawEventHistorySections: CareerTimelineSection[] = [
  {
    title: "Selected event credits",
    description:
      "A clean year-by-year view of the event work currently shown on the site, with company and role broken into separate chips where available.",
    years: [
      {
        year: 2026,
        label: "20 events",
        summary: "Staffing manager credits followed by staff member assignments.",
        entries: [
          { name: "NHL Winter Classic Tampa", location: "Tampa, FL", dateLabel: "January 2, 2026", monthLabel: "January", role: "Staffing Manager" },
          { name: "Palm Tree Festival", location: "West Palm Beach, FL", dateLabel: "February 12, 2026", monthLabel: "February", role: "Staffing Manager" },
          { name: "We Belong Here Miami", location: "Miami, FL", dateLabel: "February 27-March 1, 2026", monthLabel: "February", role: "Staffing Manager" },
          { name: "James Hardie Pro Football Hall of Fame Invitational", location: "Tampa, FL", dateLabel: "March 6-8, 2026", monthLabel: "March", role: "Staffing Manager", url: "https://jameshardieinvitational.com/" },
          { name: "2026 NFL Draft", location: "Pittsburgh, PA", dateLabel: "April 23-25, 2026", monthLabel: "April", role: "Staffing Manager" },
          { name: "EDC Las Vegas", location: "Las Vegas, NV", dateLabel: "May 15-17, 2026", monthLabel: "May", role: "Staffing Manager" },
          { name: "American Family Insurance Championship", location: "Madison, WI", dateLabel: "June 5-7, 2026", monthLabel: "June", role: "Staffing Manager", url: "https://amfamchampionship.com/" },
          { name: "John Deere Classic", location: "Silvis, IL", dateLabel: "July 2-5, 2026", monthLabel: "July", role: "Staffing Manager" },
          { name: "The Players Championship", location: "Ponte Vedra Beach, FL", dateLabel: "March 10-15, 2026", monthLabel: "March", role: "Staff Member" },
          { name: "Valspar Championship", location: "Palm Harbor, FL", dateLabel: "March 19-22, 2026", monthLabel: "March", role: "Staff Member" },
          { name: "Tortuga Music Festival", location: "Fort Lauderdale, FL", dateLabel: "April 10-12, 2026", monthLabel: "April", role: "Staff Member" },
          { name: "Resonate", location: "Live Oak, FL", dateLabel: "April 16-18, 2026", employer: "Other", role: "Food Vendor", note: "Suwannee Music Park" },
          { name: "Formula 1 Miami Grand Prix", location: "Miami Gardens, FL", dateLabel: "May 1-3, 2026", monthLabel: "May", role: "Staff Member", company: "Sweet & Chili" },
          { name: "Welcome to Rockville", location: "Daytona Beach, FL", dateLabel: "May 7-10, 2026", monthLabel: "May", role: "Staff Member" },
          { name: "U.S. Open (Golf)", location: "Southampton, NY", dateLabel: "June 18-21, 2026", monthLabel: "June", company: "Ridgewells", role: "Staff Member", url: "https://www.usopen.com/" },
          { name: "American Century Championship", location: "South Lake Tahoe, NV", dateLabel: "July 8-12, 2026", monthLabel: "July", role: "Staff Member", url: "https://americancenturychampionship.com/" },
          { name: "Inkcarceration", location: "Mansfield, OH", dateLabel: "July 17-19, 2026", monthLabel: "July", role: "Staff Member" },
          { name: "3M Open", location: "Blaine, MN", dateLabel: "July 23-26, 2026", monthLabel: "July", role: "Staff Member" },
          { name: "Everwild", location: "Thornville, OH", dateLabel: "July 30-August 1, 2026", monthLabel: "July", role: "Staff Member" },
          { name: "Elements", location: "Long Pond, PA", dateLabel: "August 7-9, 2026", monthLabel: "August", role: "Staff Member" },
        ],
      },
      {
        year: 2025,
        label: "30 events",
        summary: "Festival, golf, racing, and staffing credits across a wide run of major live events.",
        entries: [
          { name: "St. Petersburg Seafood & Music Festival", location: "St. Petersburg, FL", dateLabel: "July 18-20, 2025", employer: "Other", url: "https://www.paragonfestivals.com/festival/st-petersburg-seafood-music-festival/" },
          { name: "CRSSD", location: "San Diego, CA", dateLabel: "March 1-2, 2025" },
          { name: "Hoag Classic", location: "Newport Beach, CA", dateLabel: "March 21-23, 2025" },
          { name: "Ultra Music Festival", location: "Miami, FL", dateLabel: "March 28-30, 2025" },
          { name: "Tortuga Music Festival", location: "Fort Lauderdale, FL", dateLabel: "April 4-6, 2025" },
          { name: "Riverbeat Music Festival", location: "Memphis, TN", dateLabel: "May 2-4, 2025" },
          { name: "EDC Las Vegas", location: "Las Vegas, NV", dateLabel: "May 16-18, 2025", role: "Staffing" },
          { name: "Movement Music Festival", location: "Detroit, MI", dateLabel: "May 24-26, 2025", employer: "Other" },
          { name: "Forbidden Kingdom", location: "Orlando, FL", dateLabel: "May 30-31, 2025", role: "Staffing" },
          { name: "U.S. Open (Golf)", location: "Oakmont, PA", dateLabel: "June 12-15, 2025", role: "Staffing", url: "https://www.usopen.com/" },
          { name: "World Pride Parade Concert", location: "Washington, DC", dateLabel: "June 7-8, 2025", role: "Staffing" },
          { name: "Electric Forest", location: "Rothbury, MI", dateLabel: "June 19-22, 2025" },
          { name: "Capitol Groove Music Festival", location: "Hartford, CT", dateLabel: "June 28-29, 2025", role: "Staffing" },
          { name: "Dukes & Boots Music Festival", location: "Atlanta, GA", dateLabel: "July 12, 2025", role: "Staffing", url: "https://www.dukesandbootsfestival.com/" },
          { name: "Back Cove Music Festival", location: "Portland, ME", dateLabel: "August 2-3, 2025", role: "Staffing" },
          { name: "Field of Vision", location: "Buena Vista, CO", dateLabel: "August 15-17, 2025" },
          { name: "LIV Golf Michigan Team Championship", location: "Plymouth, MI", dateLabel: "August 22-24, 2025" },
          { name: "Bourbon & Beyond", location: "Louisville, KY", dateLabel: "September 11-14, 2025" },
          { name: "Louder Than Life", location: "Louisville, KY", dateLabel: "September 18-21, 2025" },
          { name: "Ryder Cup", location: "Farmingdale, NY", dateLabel: "September 26-28, 2025" },
          { name: "Wakaan", location: "Ozark, AR", dateLabel: "October 2-4, 2025", employer: "Other" },
          { name: "Seven Stars", location: "Virginia Beach, VA", dateLabel: "October 9-11, 2025", employer: "SoHo" },
          { name: "Formula 1 United States Grand Prix", location: "Austin, TX", dateLabel: "October 17-19, 2025", company: "Proof of the Pudding" },
          { name: "Hulaween", location: "Live Oak, FL", dateLabel: "October 30-November 2, 2025", employer: "Other" },
          { name: "EDC Orlando", location: "Orlando, FL", dateLabel: "November 7-9, 2025" },
          { name: "Vans Warped Tour", location: "Orlando, FL", dateLabel: "November 15-16, 2025" },
          { name: "Formula 1 Las Vegas Grand Prix", location: "Las Vegas, NV", dateLabel: "November 20-22, 2025", employer: "Sweet & Chili" },
          { name: "We Belong Here St. Petersburg", location: "St. Petersburg, FL", dateLabel: "December 13-14, 2025", role: "Staffing" },
          { name: "We Belong Here Palm Beach", location: "West Palm Beach, FL", dateLabel: "December 27-28, 2025", role: "Staffing" },
          { name: "Eternal NYE", location: "Orlando, FL", dateLabel: "December 30-31, 2025", employer: "Other" },
        ],
      },
      {
        year: 2024,
        label: "19 events",
        summary: "Bartender and staffing-manager credits across festivals, sports, and large live activations.",
        entries: [
          { name: "Shipwrecked", location: "Tampa, FL", dateLabel: "January 26-27, 2024", employer: "Other", role: "Bartender" },
          { name: "CRSSD", location: "San Diego, CA", dateLabel: "March 2-3, 2024", employer: "Event Aces", role: "Bartender" },
          { name: "BNP Paribas Open", location: "Indian Wells, CA", dateLabel: "March 3-17, 2024", employer: "Event Aces", role: "Bartender", url: "https://bnpparibasopen.com/schedule/competition" },
          { name: "Ultra Music Festival", location: "Miami, FL", dateLabel: "March 22-24, 2024", role: "Staffing Manager" },
          { name: "Texas Eclipse Festival", location: "Burnet, TX", dateLabel: "April 5-9, 2024", role: "Staffing Manager" },
          { name: "Coachella", location: "Indio, CA", dateLabel: "April 12-14 & 19-21, 2024", note: "WKND #1 & #2" },
          { name: "Sick New World", location: "Las Vegas, NV", dateLabel: "April 27, 2024", role: "Staffing Manager" },
          { name: "Lovers and Friends", location: "Las Vegas, NV", dateLabel: "May 4, 2024", role: "Staffing Manager" },
          { name: "U.S. Women's Open (Golf)", location: "Lancaster, PA", dateLabel: "May 30-June 2, 2024", role: "Staffing Manager", url: "https://www.uswomensopen.com/" },
          {
            name: "Welcome to Rockville",
            location: "Daytona Beach, FL",
            dateLabel: "May 9-12, 2024",
            company: "SoHo",
            role: "Bartender",
            url: "https://welcometorockville.com/festival-info/",
          },
          { name: "Forbidden Kingdom Music Festival", location: "Orlando, FL", dateLabel: "June 7-8, 2024", note: "First solo event as lead staffer" },
          { name: "Electric Forest", location: "Rothbury, MI", dateLabel: "June 20-23, 2024", role: "Staffing Manager" },
          { name: "Breakaway", location: "Minneapolis, MN", dateLabel: "August 16-17, 2024", employer: "Event Aces", role: "Bartender" },
          { name: "John Deere Classic", location: "Silvis, IL", dateLabel: "July 4-7, 2024", employer: "Event Aces", role: "Bartender" },
          {
            name: "Bourbon & Beyond",
            location: "Louisville, KY",
            dateLabel: "September 19-22, 2024",
            company: "SoHo",
            role: "Bartender",
            url: "https://bourbonandbeyond.com/festival-info/",
          },
          {
            name: "Louder Than Life",
            location: "Louisville, KY",
            dateLabel: "September 26-29, 2024",
            company: "SoHo",
            role: "Bartender",
            url: "https://louderthanlifefestival.com/info/",
          },
          {
            name: "Formula 1 United States Grand Prix",
            location: "Austin, TX",
            dateLabel: "October 18-20, 2024",
            company: "Proof of the Pudding",
            role: "Zone Manager",
          },
          { name: "Hulaween", location: "Live Oak, FL", dateLabel: "October 24-27, 2024", employer: "Other", note: "Worked Autumn's food truck" },
          { name: "EDC Orlando", location: "Orlando, FL", dateLabel: "November 8-10, 2024", employer: "Event Aces", role: "Bartender" },
        ],
      },
      {
        year: 2023,
        label: "16 events",
        summary: "Festival, sports, and brand activations from a busy live-events year.",
        entries: [
          { name: "Shipwrecked (Gasparilla)", location: "Tampa, FL", dateLabel: "January 27-28, 2023", employer: "Other" },
          { name: "Super Bowl LVII", location: "Glendale, AZ", dateLabel: "February 12, 2023" },
          { name: "Innings Festival", location: "Tampa, FL", dateLabel: "March 18-19, 2023" },
          { name: "Ultra Music Festival", location: "Miami, FL", dateLabel: "March 24-26, 2023" },
          { name: "HREC Lincoln Day Dinner", location: "Tampa, FL", dateLabel: "March 31, 2023", monthLabel: "March", employer: "Other", note: "Hillsborough County Republican event; Ron DeSantis spoke" },
          { name: "Tortuga Music Festival", location: "Fort Lauderdale, FL", dateLabel: "April 14-16, 2023" },
          { name: "Barefoot Country Music Festival", location: "Wildwood, NJ", dateLabel: "June 15-18, 2023", employer: "Other" },
          { name: "Electric Forest", location: "Rothbury, MI", dateLabel: "June 22-25, 2023" },
          { name: "Above & Beyond @ The Gorge", location: "Quincy, WA", dateLabel: "July 21-23, 2023" },
          { name: "Bleached!", location: "San Diego, CA", dateLabel: "August 5-6, 2023" },
          { name: "Breakaway", location: "Grand Rapids, MI", dateLabel: "August 18-19, 2023" },
          { name: "Imagine", location: "Hampton, GA", dateLabel: "September 14-17, 2023" },
          { name: "LIV Golf Chicago", location: "Sugar Grove, IL", dateLabel: "September 22-24, 2023" },
          { name: "LIV Golf Miami", location: "Doral, FL", dateLabel: "October 20-22, 2023" },
          { name: "Riptide Music Festival", location: "Fort Lauderdale, FL", dateLabel: "December 2-3, 2023" },
          { name: "Art Basel", location: "Miami Beach, FL", dateLabel: "December 8-10, 2023", employer: "Other" },
        ],
      },
      {
        year: 2022,
        label: "10 events",
        summary: "A focused run of major festival and event work across the country.",
        entries: [
          { name: "Electric Forest", location: "Rothbury, MI", dateLabel: "June 23-26, 2022" },
          { name: "Made In America Festival", location: "Philadelphia, PA", dateLabel: "September 3-4, 2022" },
          { name: "Imagine Music Festival", location: "Hampton, GA", dateLabel: "September 15-18, 2022" },
          { name: "Louder Than Life", location: "Louisville, KY", dateLabel: "September 22-25, 2022" },
          { name: "Shoals Festival", location: "Florence, AL", dateLabel: "October 1-2, 2022" },
          { name: "State Fair of Texas", location: "Dallas, TX", dateLabel: "September 30-October 23, 2022", employer: "Other", url: "https://bigtex.com/" },
          { name: "Formula 1 United States Grand Prix", location: "Austin, TX", dateLabel: "October 21-23, 2022" },
          { name: "Hulaween", location: "Live Oak, FL", dateLabel: "October 27-30, 2022", employer: "Other" },
          { name: "EDC Orlando", location: "Orlando, FL", dateLabel: "November 11-13, 2022" },
          { name: "Audacy Beach Festival", location: "Fort Lauderdale, FL", dateLabel: "December 3-4, 2022", employer: "SoHo" },
        ],
      },
      {
        year: 2021,
        label: "6 events",
        summary: "A compact run of Celine Orlando and Pizza & Champagne producer credits.",
        entries: [
          { name: "Aweminus at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "October 21, 2021", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Trampa's Disrespect Tour", location: "Celine Orlando, Orlando, FL", dateLabel: "September 23, 2021", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "4B at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "August 27, 2021", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Crankdat at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "August 12, 2021", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne presents: Yookie", location: "Celine Orlando, Orlando, FL", dateLabel: "July 29, 2021", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Pixel Terror at Celine Orlando's Pizza & Champagne", location: "Celine Orlando, Orlando, FL", dateLabel: "January 14, 2021", monthLabel: "January", employer: "Self", role: "Producer" },
        ],
      },
      {
        year: 2019,
        label: "4 events",
        summary: "Celine Orlando and Pizza & Champagne producer credits from a later nightlife stretch.",
        entries: [
          { name: "OSKI at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "November 27, 2019", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Figure's Madhouse at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "October 2, 2019", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Sharps & Felmax at Celine Orlando", location: "Celine Orlando, Orlando, FL", dateLabel: "August 21, 2019", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "(Antipasto) Pizza & Champagne Appetizer feat. Brondo", location: "Celine Live, Orlando, FL", dateLabel: "July 10, 2019", monthLabel: "July", employer: "Self", role: "Producer" },
        ],
      },
      {
        year: 2018,
        label: "45 events",
        summary: "A deep Pizza & Champagne run with Taco Tuesday work, club nights, takeovers, and tour stops.",
        entries: [
          { name: "Pizza & Champagne: Florida Supreme", location: "Xhale Hookah Lounge, Miami, FL", dateLabel: "July 20, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Pop Up Party w/ KTRL", location: "Elixir Orlando, Orlando, FL", dateLabel: "July 19, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "An Industry Affair Ft. KTRL", location: "The Rooftop, Orlando, FL", dateLabel: "July 19, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Summer B Kickoff Party feat. The Come Up Tour", location: "Simons, Gainesville, FL", dateLabel: "July 13, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "The Come Up Tour / Innocent Victims / Cazanova / Odysee / Jivea", location: "NEON BEACH, Clearwater Beach, FL", dateLabel: "July 11, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "The Come Up Tour: Jivea, Cazanova, Innocent Victims, and Odysee", location: "ROK BAR, Daytona Beach, FL", dateLabel: "July 7, 2018", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "A Night of Nonsens", location: "Celine Orlando, Orlando, FL", dateLabel: "June 27, 2018", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne: Power House Takeover", location: "Location not shown", dateLabel: "June 21, 2018", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne Presents: The Come Up Tour", location: "Blackstar, Orlando, FL", dateLabel: "June 14, 2018", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ LIZZY JANE", location: "Blackstar, Orlando, FL", dateLabel: "June 7, 2018", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Holly Woods", location: "Blackstar, Orlando, FL", dateLabel: "May 31, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "May 29, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Too Kind", location: "Blackstar, Orlando, FL", dateLabel: "May 24, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "May 22, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Benny Black", location: "Blackstar, Orlando, FL", dateLabel: "May 17, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "May 15, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ BTU", location: "Blackstar, Orlando, FL", dateLabel: "May 10, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "May 8, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ CRWNS", location: "Blackstar, Orlando, FL", dateLabel: "May 3, 2018", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "April 17, 2018", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne at The Kompound", location: "The Kompound, Orlando, FL", dateLabel: "April 11, 2018", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "We The Plug Presents: Pizza & Champagne at Myth Nightclub", location: "Myth Nightclub & Element Bistro, Jacksonville, FL", dateLabel: "April 6, 2018", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne Goes Off The Grid", location: "Location not shown", dateLabel: "April 4, 2018", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne ft. Kyro!", location: "Tier Nightclub, Orlando, FL", dateLabel: "March 28, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ House Keepers", location: "Tier Nightclub, Orlando, FL", dateLabel: "March 21, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Menagerie Records", location: "Tier Nightclub, Orlando, FL", dateLabel: "March 14, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "March 13, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne Hip Hop Edition Ft. 2AM", location: "Tier Nightclub, Orlando, FL", dateLabel: "March 7, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "March 6, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne ATX!", location: "Austin, TX", dateLabel: "March 1, 2018", monthLabel: "March", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ ?", location: "Tier Nightclub, Orlando, FL", dateLabel: "February 28, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "February 27, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Captain", location: "Tier Nightclub, Orlando, FL", dateLabel: "February 21, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "February 20, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Stoplight Party w/ Pizza & Champagne", location: "Tier Nightclub, Orlando, FL", dateLabel: "February 14, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ House Keepers", location: "Tier Nightclub, Orlando, FL", dateLabel: "February 7, 2018", monthLabel: "February", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne: Bassnight Edition", location: "Tier Nightclub, Orlando, FL", dateLabel: "January 31, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Golden Child", location: "Tier Nightclub, Orlando, FL", dateLabel: "January 24, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "January 23, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ GVME BOYS", location: "Tier Nightclub, Orlando, FL", dateLabel: "January 17, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "January 16, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne At Simon's - Jan 11th", location: "Simons, Gainesville, FL", dateLabel: "January 11, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Eric Evolve", location: "Tier Nightclub, Orlando, FL", dateLabel: "January 10, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Taco Tuesday at Elixir", location: "Elixir Orlando, Orlando, FL", dateLabel: "January 9, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Kevin Flum", location: "Tier Nightclub, Orlando, FL", dateLabel: "January 3, 2018", monthLabel: "January", employer: "Self", role: "Producer" },
        ],
      },
      {
        year: 2017,
        label: "52 events",
        summary: "The earliest Pizza & Champagne and party-branded producer run, plus early festival credits.",
        entries: [
          { name: "Pizza & Champagne w/ BTU", location: "Tier Nightclub, Orlando, FL", dateLabel: "December 27, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Kait Clinard & SEB", location: "Tier Nightclub, Orlando, FL", dateLabel: "December 20, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "We The Plug Presents: Pizza & Champagne at Myth Nightclub", location: "Myth Nightclub & Element Bistro, Jacksonville, FL", dateLabel: "December 15, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne San Diego Takeover w/ Purge & Contrvbvnd", location: "Spin San Diego, San Diego, CA", dateLabel: "December 15, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ CaZanova", location: "Tier Nightclub, Orlando, FL", dateLabel: "December 13, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Sloth", location: "Tier Nightclub, Orlando, FL", dateLabel: "December 6, 2017", monthLabel: "December", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Acraze", location: "Tier Nightclub, Orlando, FL", dateLabel: "November 29, 2017", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne: Happy Bass Giving... Bassnight takeover!", location: "Tier Nightclub, Orlando, FL", dateLabel: "November 22, 2017", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne: The EDC Recovery", location: "Tier Nightclub, Orlando, FL", dateLabel: "November 15, 2017", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Nitti Gritti", location: "Tier Nightclub, Orlando, FL", dateLabel: "November 8, 2017", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Audigy, Golden Child and DJ XTA-C", location: "Tier Nightclub, Orlando, FL", dateLabel: "November 1, 2017", monthLabel: "November", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Whipped Cream", location: "Tier Nightclub, Orlando, FL", dateLabel: "October 25, 2017", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne Road to Wynwood Fear Factory", location: "Tier Nightclub, Orlando, FL", dateLabel: "October 18, 2017", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne the Brittanie Brown Takeover", location: "Tier Nightclub, Orlando, FL", dateLabel: "October 11, 2017", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "PIZZA & CHAMPAGNE: #BASSNIGHT TAKEOVER!", location: "Tier Nightclub, Orlando, FL", dateLabel: "October 4, 2017", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Curbi at Elixir - Free Show", location: "Elixir Orlando, Orlando, FL", dateLabel: "October 1, 2017", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne House Keeper Invasion", location: "Tier Nightclub, Orlando, FL", dateLabel: "September 27, 2017", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "Florida Party Bus to Imagine", location: "Orlando, FL", dateLabel: "September 21, 2017", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: 'Pizza & Champagne "Tampa Invasion" Night', location: "Tier Nightclub, Orlando, FL", dateLabel: "September 20, 2017", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: 'Pizza & Champagne "Irmas a Bitch" Edition', location: "Tier Nightclub, Orlando, FL", dateLabel: "September 13, 2017", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne Rain Dance to keep Irma away at Tier", location: "Tier Nightclub, Orlando, FL", dateLabel: "September 6, 2017", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/Dekerakt, Odeeus, Unknown", location: "Tier Nightclub, Orlando, FL", dateLabel: "August 30, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Henry Fong & Bad Royale", location: "Tier Nightclub, Orlando, FL", dateLabel: "August 23, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Open House / 08-22-17 / GILT Nightclub", location: "Wall Street Orlando, Orlando, FL", dateLabel: "August 22, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "UCF Party Bus to Open House (Gilt)", location: "Orlando, FL", dateLabel: "August 22, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "UCF Party Bus to Ekali (Venue 578)", location: "Orlando, FL", dateLabel: "August 17, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Golden Child, Mannymak, & Drewlface", location: "Tier Nightclub, Orlando, FL", dateLabel: "August 16, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Electric Jungle 8/13", location: "RUMjungle, Orlando, FL", dateLabel: "August 13, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Audigy, 21 Cabbage & Vampa", location: "Tier Nightclub, Orlando, FL", dateLabel: "August 9, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Goliath & Evil Cat Twinz", location: "Tier Nightclub, Orlando, FL", dateLabel: "August 2, 2017", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Electric Jungle 7/30", location: "RUMjungle, Orlando, FL", dateLabel: "July 30, 2017", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Sky Hye & Foreign Suspects", location: "Tier Nightclub, Orlando, FL", dateLabel: "July 26, 2017", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Yin & Yvng, Bizkardi", location: "Tier Nightclub, Orlando, FL", dateLabel: "July 19, 2017", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Mhkaz & Sloth", location: "Tier Nightclub, Orlando, FL", dateLabel: "July 5, 2017", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Lîthouse Party Bus to Pizza & Champagne", location: "Orlando, FL", dateLabel: "June 28, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ BIG N Slim and SMGGLR", location: "Tier Nightclub, Orlando, FL", dateLabel: "June 28, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ Part Native & Eazybaked", location: "Tier Nightclub, Orlando, FL", dateLabel: "June 21, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne / Eric's \"Lets Black the f out\" Bday Party!", location: "Tier Nightclub, Orlando, FL", dateLabel: "June 14, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Lîthouse Party Bus to Mija", location: "Orlando, FL", dateLabel: "June 8, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ sfam & Dubkin Gonuts", location: "Tier Nightclub, Orlando, FL", dateLabel: "June 7, 2017", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ CRWNS & ZAV", location: "Tier Nightclub, Orlando, FL", dateLabel: "May 31, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne w/ CRWNS, ZAV and Special Guest!", location: "Tier Nightclub, Orlando, FL", dateLabel: "May 31, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Pizza & Champagne feat Felmax, Clips x Ahoy and Special Guest!", location: "Tier Nightclub, Orlando, FL", dateLabel: "May 24, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "LaidBack Luke & SJ & RM 5.21.17 at Beach Bar", location: "Beach Bar, Tampa, FL", dateLabel: "May 21, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Lîthouse Party Bus to Laidback Luke", location: "Orlando, FL", dateLabel: "May 21, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Lîthouse Party Bus to Mark Knight", location: "Orlando, FL", dateLabel: "May 20, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Party Bus to Crizzly", location: "Orlando, FL", dateLabel: "May 12, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Lîthouse Party Bus from Orlando to Cosmic Gate at Tampa", location: "Orlando, FL", dateLabel: "May 7, 2017", monthLabel: "May", employer: "Self", role: "Producer" },
          { name: "Middlelands Music Festival", location: "Todd Mission, TX", dateLabel: "May 5-7, 2017", monthLabel: "May" },
          { name: "Lîthouse Party Bus from Orlando to Tchami at Tampa Beach Bar", location: "Orlando, FL", dateLabel: "April 23, 2017", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "Asteria Arts & Music Festival", location: "Osteen, FL", dateLabel: "April 21-22, 2017", monthLabel: "April", employer: "Other" },
          { name: "Līthouse Party Bus to Darude @ Aloft", location: "Aloft Orlando Downtown, Orlando, FL", dateLabel: "April 9, 2017", monthLabel: "April", employer: "Self", role: "Producer" },
          { name: "Party Bus to Beach Bar Tampa", location: "Tampa, FL", dateLabel: "April 2, 2017", monthLabel: "April", employer: "Self", role: "Producer" },
        ],
      },
      {
        year: 2016,
        label: "13 events",
        summary: "The earliest event currently shown on the page.",
        entries: [
          { name: "Orlando Party Bus to Tampa Beach Bar: Adventure Club", location: "Orlando, FL", dateLabel: "June 26, 2016", monthLabel: "June", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Marshmello", location: "Orlando, FL", dateLabel: "July 3, 2016", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Slander x NGHTMRE", location: "Orlando, FL", dateLabel: "July 17, 2016", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Getter / Mija", location: "Orlando, FL", dateLabel: "July 24, 2016", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Zomboy with Ookay", location: "Orlando, FL", dateLabel: "July 31, 2016", monthLabel: "July", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Flosstradamus", location: "Orlando, FL", dateLabel: "August 7, 2016", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Tchami & Thomas Jack", location: "Orlando, FL", dateLabel: "August 14, 2016", monthLabel: "August", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Snails, Ghastly, and Lookas", location: "Orlando, FL", dateLabel: "September 18, 2016", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Adventure Club", location: "Orlando, FL", dateLabel: "September 25, 2016", monthLabel: "September", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Golden Child", location: "Orlando, FL", dateLabel: "October 16, 2016", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Diplo", location: "Orlando, FL", dateLabel: "October 23, 2016", monthLabel: "October", employer: "Self", role: "Producer" },
          { name: "Hulaween", location: "Live Oak, FL", dateLabel: "October 28-30, 2016", monthLabel: "October", employer: "Other" },
          { name: "Orlando Party Bus to Tampa Beach Bar: Robin Schulz", location: "Orlando, FL", dateLabel: "December 4, 2016", monthLabel: "December", employer: "Self", role: "Producer" },
        ],
      },
    ],
  },
];

function inferMonthLabel(year: number, entry: CareerTimelineEntry): string | undefined {
  const name = entry.name.toLowerCase();
  const location = entry.location.toLowerCase();

  if (name.includes("hulaween")) return "October";
  if (name.includes("edc orlando")) return "November";
  if (name.includes("edc las vegas")) return "May";
  if (name.includes("ultra")) return "March";
  if (name.includes("coachella")) return "April";
  if (name.includes("sick new world")) return "April";
  if (name.includes("lovers and friends")) return "May";
  if (name.includes("welcome to rockville") || name.includes("rockville")) return "May";
  if (name.includes("electric forest")) return "June";
  if (name.includes("tortuga")) return "April";
  if (name.includes("st. petersburg seafood") || name.includes("st pete seafood") || name.includes("seafood & music festival")) return "July";
  if (name.includes("bnp paribas open") || name.includes("paribas open")) return "March";
  if (name.includes("breakaway")) return "August";
  if (name.includes("bourbon & beyond")) return "September";
  if (name.includes("louder than life")) return "September";
  if (name.includes("made in america")) return "September";
  if (name.includes("imagine music festival") || name === "imagine") return "September";
  if (name.includes("shipwrecked")) return "January";
  if (name.includes("innings festival")) return "March";
  if (name.includes("hoag")) return "March";
  if (name.includes("audacy beach festival")) return "December";
  if (name.includes("art basel")) return "December";
  if (name.includes("riptide")) return "December";
  if (name.includes("barefoot country music festival")) return "June";
  if (name.includes("riverbeat")) return "May";
  if (name.includes("movement music festival")) return "May";
  if (name.includes("capitol groove")) return "June";
  if (name.includes("dukes and boots") || name.includes("dukes & boots")) return "July";
  if (name.includes("back cove")) return "August";
  if (name.includes("field of vision")) return "August";
  if (name.includes("wakaan")) return "October";
  if (name.includes("seven stars")) return "October";
  if (name.includes("eternal nye")) return "December";
  if (name.includes("we belong here")) return "December";
  if (name.includes("super bowl")) return "February";
  if (name.includes("forbidden kingdom")) return year === 2025 ? "May" : "June";
  if (name.includes("hrec lincoln day dinner")) return "January";
  if (name.includes("john deere classic")) return "July";
  if (name.includes("formula one") || name.includes("formula 1") || name.startsWith("f1")) {
    if (location.includes("las vegas")) return "November";
    if (location.includes("miami")) return "May";
    return "October";
  }
  if (name.includes("nfl draft") || name.includes("james hardie pro football hof invitational")) return "April";
  if (name.includes("nhl winter classic")) return "January";
  if (name.includes("palm tree festival")) return "February";
  if (name.includes("valspar") || name === "tpc") return "March";
  if (name.includes("the players championship")) return "March";
  if (name.includes("acc celebrity classic")) return "July";
  if (name.includes("vans warped tour")) return "November";
  if (name.includes("resonate")) return "April";
  if (name.includes("u.s. women's open") || name.includes("us women's open") || name.includes("women's open")) return "May";
  if (name.includes("u.s. open (golf)") || name.includes("us open (golf)") || name.includes("us open")) return "June";
  if (name.includes("inkcarceration")) return "July";
  if (name.includes("3m")) return "August";
  if (name.includes("everwild") || name.includes("elements")) return "August";
  if (name.includes("shoals festival")) return "October";
  if (name.includes("state fair of texas") || name.includes("big tex")) return "September";
  if (name.includes("edclv")) return "May";
  if (name.includes("edc")) return "November";
  if (name.includes("tx eclipse")) return "April";
  if (name.includes("texas eclipse")) return "April";
  if (name.includes("paribus tennis championship")) return "March";
  if (name.includes("crssd")) return "March";
  if (name.includes("hoag")) return "February";
  if (name.includes("st. pete seafood festival")) return "February";
  if (name.includes("world pride")) return "June";
  if (name.includes("ryder cup")) return "September";
  if (name.includes("above & beyond")) return "July";
  if (name.includes("bleached")) return "August";
  if (name.includes("liv golf")) {
    if (name.includes("miami")) return "October";
    if (name.includes("chicago")) return "September";
    if (name.includes("michigan")) return "August";
    if (location.includes("miami")) return "October";
    if (location.includes("chicago")) return "September";
    if (location.includes("michigan")) return "August";
    return "September";
  }
  if (name.includes("lighthouse")) return "July";

  return undefined;
}

function inferHref(entry: CareerTimelineEntry): string | undefined {
  const name = entry.name.toLowerCase();
  const location = entry.location.toLowerCase();

  if (name.includes("hulaween")) return "https://hulaween.com/";
  if (name.includes("ultra")) return "https://ultramusicfestival.com/";
  if (name.includes("electric forest")) return "https://electricforest.com/";
  if (name.includes("edc orlando")) return "https://orlando.edc.com/";
  if (name.includes("edc las vegas") || name.includes("edclv") || name.includes("electric daisy carnival")) return "https://www.edc.com/";
  if (name.includes("tortuga")) return "https://tortugamusicfestival.com/";
  if (name.includes("coachella")) return "https://coachella.com/";
  if (name.includes("sick new world")) return "https://www.sicknewworldfest.com/";
  if (name.includes("forbidden kingdom")) return "https://www.forbiddenkingdomfestival.com/";
  if (name.includes("breakaway")) return "https://www.breakawayfestival.com/";
  if (name.includes("bourbon & beyond")) return "https://bourbonandbeyond.com/festival-info/";
  if (name.includes("louder than life")) return "https://louderthanlifefestival.com/info/";
  if (name.includes("welcome to rockville") || name.includes("rockville")) return "https://welcometorockville.com/festival-info/";
  if (name.includes("made in america")) return "https://madeinamericafest.com/";
  if (name.includes("imagine music festival") || name === "imagine") return "https://www.imaginefestival.com/";
  if (name.includes("movement music festival")) return "https://movementfestival.com/";
  if (name.includes("innings festival")) return "https://inningsfestival.com/";
  if (name.includes("barefoot country music festival")) return "https://barefootcountrymusicfest.com/";
  if (name.includes("riverbeat")) return "https://riverbeat.com/";
  if (name.includes("capitol groove")) return "https://capitolgroovect.com/";
  if (name.includes("wakaan")) return "https://wakaanfestival.com/";
  if (name.includes("we belong here")) return "https://www.webelonghere.com/";
  if (name.includes("john deere classic")) return "https://www.johndeereclassic.com/";
  if (name.includes("the players championship") || name === "tpc") return "https://www.theplayers.com/";
  if (name.includes("valspar championship") || name.includes("valspar")) return "https://www.thevalsparchampionship.com/";
  if (name.includes("nhl winter classic")) return "https://www.nhl.com/events/nhl-winter-classic/2025-26/";
  if (name.includes("james hardie pro football hof invitational")) return "https://jameshardieinvitational.com/";
  if (name.includes("amfam championship") || name.includes("amfam")) return "https://amfamchampionship.com/";
  if (name.includes("dukes and boots")) return "https://www.dukesandbootsfestival.com/";
  if (name.includes("back cove")) return "https://www.backcovefestival.com/info";
  if (name.includes("field of vision")) return "https://fieldofvision.meadowcreekco.com/";
  if (name.includes("seven stars")) return "https://www.sevenstarsfest.com/festival-info";
  if (name.includes("eternal nye")) return "https://www.eternalnye.com/";
  if (name.includes("inkcarceration")) return "https://inkcarceration.com/festival-info/";
  if (name.includes("formula one") || name.includes("formula 1") || name.startsWith("f1")) {
    if (location.includes("las vegas")) return "https://ticketing.formula1.com/las-vegas/";
    return "https://www.formula1.com/";
  }
  if (name.includes("nfl draft")) return "https://www.nfl.com/draft/";
  if (name.includes("super bowl")) return "https://www.nfl.com/super-bowl/";
  if (name.includes("ryder cup")) return "https://www.rydercup.com/";
  if (name.includes("art basel")) return "https://www.artbasel.com/miami-beach";
  if (name.includes("u.s. women's open") || name.includes("us women's open") || name.includes("women's open")) return "https://www.uswomensopen.com/";
  if (name.includes("u.s. open (golf)") || name.includes("us open (golf)") || name.includes("us open")) return "https://www.usopen.com/";
  if (name.includes("3m open") || name.includes("3m")) return "https://3mopen.com/";
  if (name.includes("elements")) return "https://elementsfest.us/";
  if (name.includes("everwild")) return "https://www.everwildfestival.com/";
  if (name.includes("palm tree festival")) return "https://www.palmtreefestival.com/";
  if (name.includes("st. pete seafood festival")) return "https://www.petesseafoodandmusicfestival.com/";
  if (name.includes("hrec lincoln day dinner")) return "https://www.ocrec.org/";
  if (name.includes("audacy beach festival")) return "https://www.audacybeachfestival.com/";
  if (name.includes("riptide")) return "https://www.riptidefest.com/";
  if (name.includes("shoals festival")) return "https://www.shoalsfest.net/";
  if (name.includes("texas state fair")) return "https://bigtex.com/";
  if (name.includes("liv golf")) return "https://www.livgolf.com/";
  if (name.includes("crssd")) return "https://crssdfest.com/";
  if (name.includes("hoag classic") || name.includes("hoag")) return "https://www.thehoagclassic.com/";
  if (name.includes("lovers and friends")) return "https://www.loversandfriendsfest.com/";
  if (name.includes("texas eclipse")) return "https://seetexaseclipse.com/";
  if (name.includes("above & beyond")) return "https://www.aboveandbeyond.nu/gtw/";
  if (name.includes("bleached")) return "https://www.bleachedfest.com/";
  if (name.includes("americancentury") || name.includes("acc celebrity classic")) return "https://www.americancenturychampionship.com/";
  if (name.includes("paribus tennis championship")) return "https://bnpparibasopen.com/";
  if (name.includes("vans warped tour")) return "https://www.vanswarpedtourorlando.com/";
  if (name.includes("middlelands")) return "https://www.middlelands.com/";
  if (name.includes("asteria")) return "https://www.asteriamusicfestival.com/";
  if (name.includes("shipwrecked")) return "https://www.eventbrite.com/e/shipwrecked-music-festival-2023-tampa-fl-tickets-365865683107";
  if (name.includes("world pride")) return "https://www.worldpride2025.org/";
  if (name.includes("resonate")) return "https://resonatesuwannee.com/";

  return undefined;
}

function inferEmployer(year: number, entry: CareerTimelineEntry): string {
  if (entry.employer || entry.company) return entry.employer ?? entry.company ?? "";

  const name = entry.name.toLowerCase();
  const location = entry.location.toLowerCase();

  if (name.includes("hulaween")) {
    if (year === 2016 || year === 2022 || year === 2024 || year === 2025) return "Other";
    return "Other";
  }

  if (name.includes("asteria")) return "Other";
  if (name.includes("middlelands")) return "Other";

  if (
    name.includes("innings festival") ||
    name.includes("riverbeat")
  ) {
    return "Spectrum";
  }

  if (
    name.includes("imagine") ||
    name.includes("bourbon & beyond") ||
    name.includes("louder than life") ||
    name.includes("riptide") ||
    name.includes("rockville") ||
    name.includes("everwild") ||
    name.includes("inkcarceration")
  ) {
    return "SoHo";
  }

  if (name.includes("formula one") || name.includes("formula 1") || name.startsWith("f1")) {
    if (location.includes("austin")) {
      return year === 2022 ? "Event Aces" : "Proof of the Pudding";
    }
    return "Formula 1";
  }

  return "Event Aces";
}

function inferRole(entry: CareerTimelineEntry): string {
  if (!entry.role || entry.role === "Staff Member") {
    return "Bartender";
  }

  return entry.role;
}

function decorateSections(sections: CareerTimelineSection[]): CareerTimelineSection[] {
  return sections.map((section) => ({
    ...section,
    years: section.years.map((year) => ({
      ...year,
      entries: year.entries.map((entry) => ({
        ...entry,
        monthLabel: entry.monthLabel ?? inferMonthLabel(year.year, entry),
        href: entry.href ?? entry.url ?? inferHref(entry),
        employer: inferEmployer(year.year, entry),
        role: inferRole(entry),
      })),
    })),
  }));
}

export const eventHistorySections = decorateSections(rawEventHistorySections);
