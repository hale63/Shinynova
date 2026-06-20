/* ============================================================
   js.js  –  Shinynove  (shared across all pages)
   Every getElementById is null-guarded so this file works
   safely on index.html, services.html, about.html, contact.html
   ============================================================ */


/* ─────────────────────────────────────────────
   1.  NAVBAR  –  mobile hamburger toggle
   (exposed on window so inline onclick= works)
───────────────────────────────────────────── */
window.toggleMenu = function () {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  if (!menu || !btn) return;
  menu.classList.toggle('open');
  btn.classList.toggle('open');
};


/* ─────────────────────────────────────────────
   1b. LANGUAGE SWITCHER  –  dropdown toggle + set + translate (AJAX loaded)
───────────────────────────────────────────── */
const fallbackTranslations = {
  nl: {
    // Top-bar / Navbar / Common
    "Creative. Ambitious. Ready to clean and excel.": "Creatief. Ambitieus. Klaar om schoon te maken en uit te blinken.",
    "Hire Us!": "Huur ons in!",
    "Home": "Home",
    "About": "Over ons",
    "Services": "Diensten",
    "Contact": "Contact",
    "Contact Us": "Contact",
    "Book A Free Consultation": "Boek Een Gratis Consultatie",
    "Get Started": "Aan de slag",

    // Footer
    "Company": "Bedrijf",
    "Service": "Diensten",
    "Residential Building": "Residentieel Gebouw",
    "Office CleaningOffice Cleaning": "Kantoorreiniging",
    "Hotel & Resort": "Hotel & Resort",
    "Sterilization": "Sterilisatie",
    "Furniture & Upholstery": "Meubels & Bekleding",
    "Outdoor Space": "Buitenruimte",
    "Working Hours": "Werktijden",
    "Help Center": "Helpcentrum",
    "Our Services": "Onze Diensten",
    "Mon - Fri:": "Ma - Vr:",
    "Saturday:": "Zaterdag:",
    "Sunday:": "Zondag:",
    "Facebook": "Facebook",
    "Instagram": "Instagram",
    "Copyright 2026 by": "Auteursrecht 2026 door",

    // Document Titles
    "About Us | Shinynova Cleaning Company": "Over ons | Shinynova Schoonmaakbedrijf",
    "Services – Shinynove": "Diensten – Shinynove",

    // Hero Section (index.html)
    "#1 Cleaning Service": "#1 Schoonmaakdienst",
    "A Cleaner": "Een schonere",
    "A Cleaner Space": "Een Schonere Ruimte",
    "Space": "Ruimte",
    "Starts": "Begint",
    "Here": "Hier",
    "Professional home & office cleaning services tailored to your schedule. Eco-friendly products, trained staff, and guaranteed results every time.": "Professionele schoonmaakdiensten voor thuis & kantoor, afgestemd op uw planning. Milieuvriendelijke producten, getraind personeel en gegarandeerde resultaten.",
    "Contact with us": "Neem contact op",
    "Support": "Ondersteuning",
    "Commitment": "Toewijding",
    "Our Rating": "Onze Beoordeling",
    "Just Completed": "Zojuist Voltooid",
    "Deep Cleaning ✓": "Grondige Reiniging ✓",

    // About Section (index.html)
    "About Us": "Over ons",
    "Redefining Clean for": "Schoonmaken Opnieuw Gedefinieerd voor",
    "Homes and Businesses": "Woningen en Bedrijven",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a morelt is a reader will be distracted by the readable": "Het is een vaststaand feit dat een lezer wordt afgeleid door de leesbare inhoud van een pagina wanneer hij naar de lay-out kijkt. Het doel van het gebruik van Lorem Ipsum is dat het meer structuur heeft.",
    "Clean Spaces": "Schone Ruimtes",
    "Happy clients": "Tevreden klanten",
    "Certified clean": "Gecertificeerd schoon",
    "Eco-friendly": "Milieuvriendelijk",
    "Washed windows": "Gewassen ramen",
    "Experienced crew": "Ervaren team",
    "Explore About Us": "Ontdek Meer Over Ons",
    "Discover More": "Ontdek Meer",
    "Based on 204 Reviews": "Gebaseerd op 204 Beoordelingen",
    "Clients Satisfied": "Tevreden Klanten",
    "and Repeating": "en Terugkerend",
    "Years of Work": "Jaren Werk",
    "Experience": "Ervaring",

    // Services strip (index.html)
    "WHAT WE": "WAT WIJ",
    "PROVIDE": "BIEDEN",
    "Residential Building Cleaning": "Residentiële Gebouwreiniging",
    "Hotel & Resort Cleaning": "Hotel & Resort Reiniging",
    "Sterilization & Germ Control": "Sterilisatie & Kiembestrijding",
    "Furniture Washing & Upholstery Cleaning": "Meubelwas & Bekledingreiniging",
    "Outdoor Space Cleaning": "Buitenruimte Reiniging",

    // Before/After (index.html)
    "Before & After": "Voor & Na",
    "Visual Proof of Our Perfection": "Visueel Bewijs van Onze Perfectie",
    "Take a slider to see our real magic.": "Gebruik de schuifregelaar om onze echte magie te zien.",
    "Before": "Voor",
    "After": "Na",
    "before": "voor",
    "after": "na",
    "Transforming Spaces,": "Ruimtes Transformeren,",
    "One Clean at a Time": "Eén Schoonmaakbeurt Tegelijk",
    "Let us take the stress out of cleaning, so you can focus on what matters most.": "Laat ons de stress van het schoonmaken wegnemen, zodat u zich kunt richten op wat het belangrijkst is.",
    "Deep & Detailed Cleaning": "Diepe & Gedetailleerde Reiniging",
    "Eco-Friendly Products": "Milieuvriendelijke Producten",
    "Flexible Scheduling": "Flexibele Planning",
    "Try Yours Now": "Probeer Het Nu",

    // Why Choose Us (index.html)
    "Why Choose Us": "Waarom Voor Ons Kiezen",
    "Making Your Spaces Feel Fresh Again": "Uw Ruimtes Weer Fris Laten Voelen",
    "We are a creative and ambitious cleaning company that is ready to clean and excel.": "Wij zijn een creatief en ambitieus schoonmaakbedrijf dat klaar staat om schoon te maken en uit te blinken.",
    "Premium Cleaning": "Premium Schoonmaak",
    "Our premium cleaning solutions are tailored to your needs.": "Onze premium schoonmaakoplossingen zijn afgestemd op uw behoeften.",
    "Experienced Staff": "Ervaren Personeel",
    "Our cleaning staff is experienced, certified, and friendly.": "Ons schoonmaakpersoneel is ervaren, gecertificeerd en vriendelijk.",
    "We use eco-friendly and organic cleaning products.": "Wij gebruiken milieuvriendelijke en biologische schoonmaakproducten.",
    "Satisfied Customers": "Tevreden Klanten",
    "We have hundreds of satisfied customers who trust us.": "We hebben honderden tevreden klanten die ons vertrouwen.",

    // Counters (index.html)
    "Happy Clients": "Tevreden Klanten",
    "Cleans Done": "Schoonmaakbeurten Gedaan",
    "Satisfaction": "Klanttevredenheid",
    "Years Active": "Jaren Actief",

    // Testimonials (index.html)
    "Testimonials": "Testimonials",
    "What Our Clients Say About Us": "Wat Onze Klanten Over Ons Zeggen",
    "The Best Customers Says About Our Action": "Onze Beste Klanten Over Onze Aanpak",
    "Here's what happy customers are saying about our top-rated cleaning service": "Dit is wat tevreden klanten zeggen over onze topgewaardeerde schoonmaakdienst",
    "Businesses Using Our Platform": "Bedrijven Die Ons Platform Gebruiken",
    "Rated 4.8 / by 1300+ Happy Customers": "Beoordeeld met 4.8 / door 1300+ Tevreden Klanten",
    "I'm beyond impressed with cleaning service! The team arrived right on time, worked efficiently, and left my apartment spotless. I've tried other companies before, but none matched their attention to detail.": "Ik ben meer dan onder de indruk van de schoonmaakdienst! Het team kwam precies op tijd, werkte efficiënt en liet mijn appartement vlekkeloos achter. Ik heb al eerdere bedrijven geprobeerd, maar geen enkele evenaarde hun oog voor detail.",
    "James Parker": "James Parker",
    "Operations Lead at Agency": "Operations Lead bij Agency",
    "Rated 4.9 / by 850+ Office Managers": "Beoordeeld met 4.9 / door 850+ Kantoormanagers",
    "Our office workspaces have never looked better. They are consistently punctual, follow safety rules perfectly, and leave the corporate floors pristine. Absolute game changers for our workspace hygiene.": "Onze kantoorwerkplekken hebben er nog nooit zo goed uitgezien. Ze zijn consistent punctueel, volgen de veiligheidsregels perfect op en laten de bedrijfsvloeren onberispelijk achter. Absolute game changers voor onze werkplekhygiëne.",
    "Sarah Jenkins": "Sarah Jenkins",
    "Facilities Coordinator at TechGlobal": "Facilitair Coördinator bij TechGlobal",
    "Rated 5.0 / by 500+ Luxury Clients": "Beoordeeld met 5.0 / door 500+ Luxe Klanten",
    "Incredible white-glove treatment! They clean fine upholstery and delicate countertops with absolute caution. The organic products smell crisp and fresh without any chemical irritation.": "Ongelooflijke white-glove behandeling! Ze reinigen fijne bekleding en delicate aanrechten met absolute voorzichtigheid. De biologische producten ruiken fris en schoon zonder chemische irritatie.",
    "Michael Chang": "Michael Chang",
    "Founder, Residence Properties": "Oprichter, Residence Properties",

    // Pricing / CTA Banner (index.html / about.html / services.html)
    "Special Cleaning Services": "Speciale Schoonmaakdiensten",
    "Ready to book your clean?": "Klaar om uw schoonmaak te boeken?",
    "Contact our support team or book a service online today.": "Neem vandaag nog contact op met ons supportteam of boek online een dienst.",
    "Book Now": "Nu Boeken",
    "Spaces That Work For You": "Ruimtes Die Voor U Werken",
    "Book Your": "Boek Uw",
    "Cleaning Service": "Schoonmaakdienst",
    "Today for Pristine Results.": "Vandaag voor Onberispelijke Resultaten.",
    "HIRE US NOW": "HUUR ONS NU IN",

    // About Page (about.html)
    "About Shinynova": "Over Shinynova",
    "Our stories have experience cleaning in this service.": "Onze geschiedenis is rijk aan ervaring in deze schoonmaakdienst.",
    "We help homes, offices, and shared spaces feel fresh again with trained staff, reliable tools, and simple service plans.": "Wij helpen huizen, kantoren en gedeelde ruimtes weer fris te voelen met getraind personeel, betrouwbaar gereedschap en eenvoudige serviceplannen.",
    "Best Equipment": "Beste Apparatuur",
    "Reliable tools and careful product choices for a cleaner, safer finish.": "Betrouwbaar gereedschap en zorgvuldige productkeuzes voor een schoner, veiliger resultaat.",
    "Friendly cleaners trained for homes, offices, and detailed service routines.": "Vriendelijke schoonmakers getraind voor woningen, kantoren en gedetailleerde serviceroutines.",
    "Who We Are": "Wie We Zijn",
    "Complete Home & Office Cleaning Solutions": "Complete Schoonmaakoplossingen voor Thuis & Kantoor",
    "Dependable cleaning for busy homes, offices, and commercial spaces. Book easily, relax, and enjoy a fresher space.": "Betrouwbare schoonmaak voor drukke gezinnen, kantoren en commerciële ruimtes. Boek eenvoudig, ontspan en geniet van een frissere ruimte.",
    "Easy Booking": "Eenvoudig Boeken",
    "Trained Cleaners": "Getrainde Schoonmakers",
    "24/7 Support": "24/7 Ondersteuning",
    "Instant Confirmation": "Directe Bevestiging",
    "Cleaning is the key to": "Schoonmaken is de sleutel tot",
    "freshness, health, and a": "frisheid, gezondheid, en een",
    "welcoming space.": "verwelkomende ruimte.",
    "We are committed to delivering spotless spaces and healthy environments through professional cleaning solutions tailored to your unique requirements.": "We zijn toegewijd aan het leveren van vlekkeloze ruimtes en gezonde omgevingen door middel van professionele schoonmaakoplossingen die zijn afgestemd op uw unieke vereisten.",
    "Cleans Completed": "Schoonmaken Voltooid",
    "Active Staff": "Actief Personeel",
    "Awards Won": "Gewonnen Awards",
    "Proof that trust grows one clean at a time.": "Het bewijs dat vertrouwen groeit met elke schoonmaak.",
    "Meet Our Team": "Ontmoet Ons Team",
    "Our professional cleaners are fully background checked, trained to the highest industry standards, and dedicated to making your space shine.": "Onze professionele schoonmakers zijn volledig gecontroleerd, getraind volgens de hoogste industrienormen en toegewijd om uw ruimte te laten glanzen.",
    "Founder & CEO": "Oprichter & CEO",
    "Operations Manager": "Operationeel Manager",
    "Lead Specialist": "Lead Specialist",
    "Ready for a Cleaner Space?": "Klaar voor een Schonere Ruimte?",
    "Reach out today to schedule your clean or ask any questions. We're here for you.": "Neem vandaag nog contact op om uw schoonmaak in te plannen of vragen te stellen. We staan voor u klaar.",
    "Team Standards": "Team Normen",
    "People who treat your space with care.": "Mensen die met zorg met uw ruimte omgaan.",
    "Every visit is handled by cleaners trained to work carefully, communicate clearly, and leave rooms ready to use.": "Elk bezoek wordt afgehandeld door schoonmakers die zijn getraind om zorgvuldig te werken, duidelijk te communiceren en kamers klaar voor gebruik achter te laten.",
    "Clients Served": "Klanten Bediend",
    "Cleaned Spaces": "Schone Ruimtes",
    "Quote Response": "Offerte Reactie",
    "On-time arrivals": "Tijdige aankomsten",
    "Teams show up prepared, briefed, and ready to work.": "Teams verschijnen voorbereid, gebriefd en klaar om te werken.",
    "Clear checklists": "Duidelijke checklists",
    "Important surfaces, rooms, and details are covered.": "Belangrijke oppervlakken, kamers en details worden behandeld.",
    "Respectful finish": "Respectvolle afwerking",
    "We reset spaces neatly and review the result before leaving.": "We richten ruimtes netjes in en beoordelen het resultaat voordat we vertrekken.",
    "Let our team take care of the cleaning so you can focus on what matters most.": "Laat ons team de schoonmaak regelen, zodat u zich kunt concentreren op wat het belangrijkste is.",
    "Book Your Cleaning Today": "Boek Vandaag Nog Uw Schoonmaak",

    // Services Page (services.html)
    "Services We Provide": "Diensten Die Wij Leveren",
    "We Provide Best Services": "Wij Leveren de Beste Diensten",
    "We offer comprehensive cleaning solutions tailored to meet the needs of homes, offices, and commercial spaces.": "Wij bieden uitgebreide schoonmaakoplossingen die zijn afgestemd op de behoeften van woningen, kantoren en commerciële ruimtes.",
    "House Cleaning": "Huis Schoonmaken",
    "Keep your home immaculate with our detailed dusting, vacuuming, and sanitizing.": "Houd uw huis onberispelijk met ons gedetailleerde afstoffen, stofzuigen en ontsmetten.",
    "Office Cleaning": "Kantoorreiniging",
    "Boost productivity and health in your workplace with our reliable commercial cleaning.": "Verhoog de productiviteit en gezondheid op uw werkplek met onze betrouwbare commerciële reiniging.",
    "Kitchen Cleaning": "Keuken Schoonmaken",
    "Thorough degreasing, sanitizing, and deep scrubbing for sparkling clean kitchens.": "Grondig ontvetten, desinfecteren en diep schrobben voor glanzend schone keukens.",
    "Deep Cleaning": "Grondige Reiniging",
    "Detailed cleaning targeting accumulated dirt in corners, baseboards, and hard-to-reach areas.": "Gedetailleerde reiniging gericht op opgehoopt vuil in hoeken, plinten en moeilijk bereikbare plekken.",
    "Carpet Cleaning": "Tapijt Reinigen",
    "Steam cleaning and stain removal to restore the freshness of your carpets and rugs.": "Stoomreiniging en vlekverwijdering om de frisheid van uw tapijten en kleden te herstellen.",
    "Window Cleaning": "Ramen Wassen",
    "Streak-free cleaning for crystal clear windows, frames, and sills inside and out.": "Streeploos reinigen voor kristalheldere ramen, kozijnen en vensterbanken, zowel binnen als buiten.",
    "How We Work": "Hoe Wij Werken",
    "Our Simple Process": "Ons Eenvoudige Proces",
    "From booking to completion, we make the cleaning experience smooth and hassle-free.": "Van boeking tot afronding maken we de schoonmaakervaring soepel en zorgeloos.",
    "Book Online": "Online Boeken",
    "Choose a service, select a date and time, and book in just a few clicks.": "Kies een dienst, selecteer een datum en tijd, en boek in slechts een paar klikken.",
    "We Clean": "Wij Maken Schoon",
    "Our professional team arrives on time and cleans according to your custom plan.": "Ons professionele team arriveert op tijd en maakt schoon volgens uw aangepaste plan.",
    "Enjoy Freshness": "Geniet van Frisheid",
    "Step into your spotless, fresh space and enjoy the comfort of a clean home.": "Stap binnen in uw vlekkeloze, frisse ruimte en geniet van het comfort van een schoon huis.",
    "Quality Cleaning Services": "Kwaliteits Schoonmaakdiensten",
    "Designed for You": "Speciaal voor U Ontworpen",
    "Whether it is your home, office, or local store, we have a specialized team and modern equipment to make every corner shine.": "Of het nu gaat om uw huis, kantoor of lokale winkel, we hebben een gespecialiseerd team en moderne apparatuur om elke hoek te laten stralen.",
    "Learn More": "Meer Informatie",
    "Book a Cleaner": "Boek een Schoonmaker",
    "Outdoor Spaces": "Buitenruimtes",
    "Spotless Results,": "Vlekkeloze resultaten,",
    "Every Single Time": "Iedere Keer Weer",
    "Comprehensive cleaning for residential buildings and complexes. We ensure hallways, elevators, lobbies, and communal spaces remain pristine and welcoming for all residents.": "Uitgebreide reiniging voor woongebouwen en complexen. Wij zorgen ervoor dat gangen, liften, lobby's en gemeenschappelijke ruimtes onberispelijk en gastvrij blijven voor alle bewoners.",
    "Common Area Maintenance": "Onderhoud van Gemeenschappelijke Ruimtes",
    "Floor & Hallway Care": "Vloer- & Gangonderhoud",
    "Scheduled Routine Cleaning": "Periodieke Schoonmaak",
    "Keep your workplace hygienic and productive. We clean desks, meeting rooms, restrooms, kitchens, and communal areas on a schedule that suits your business.": "Houd uw werkplek hygiënisch en productief. Wij reinigen bureaus, vergaderruimtes, toiletten, keukens en gemeenschappelijke ruimtes op een schema dat bij uw bedrijf past.",
    "Daily / Weekly Plans": "Dagelijkse / Wekelijkse Plannen",
    "After-Hours Service": "Buiten Kantoortijden Schoonmaak",
    "Dedicated Account Manager": "Vaste Accountmanager",
    "Top-tier housekeeping and maintenance for hospitality venues. We ensure guest rooms, lobbies, and resort amenities meet the highest standards of luxury and cleanliness.": "Eersteklas huishouding en onderhoud voor horecagelegenheden. Wij zorgen ervoor dat gastenkamers, lobby's en resortvoorzieningen voldoen aan de hoogste normen van luxe en netheid.",
    "Guest Room Turnovers": "Gastenkamers Schoonmaken",
    "Lobby & Amenity Upkeep": "Onderhoud van Lobby & Voorzieningen",
    "High-Standard Hygiene": "Hoge Hygiënestandaard",
    "Advanced sanitization services designed to eliminate harmful bacteria and viruses. Ideal for clinics, schools, and high-traffic commercial environments requiring strict hygiene.": "Geavanceerde desinfectiediensten die zijn ontworpen om schadelijke bacteriën en virussen te elimineren. Ideaal voor klinieken, scholen en drukke commerciële omgevingen die strikte hygiëne vereisen.",
    "Hospital-Grade Disinfectants": "Desinfectiemiddelen van Ziekenhuiskwaliteit",
    "Advanced Fogging Technology": "Geavanceerde Vernevelingstechnologie",
    "99.9% Pathogen Removal": "99.9% Pathogenen Verwijderen",
    "Deep extraction cleaning for all types of furniture and upholstery. We safely remove stubborn stains, embedded dirt, and allergens, extending the life of your assets.": "Dieptereiniging voor alle soorten meubels en bekleding. We verwijderen veilig hardnekkige vlekken, diepliggend vuil en allergenen, waardoor de levensduur van uw eigendommen wordt verlengd.",
    "Deep Stain & Spot Removal": "Diepe Vlekken & Vlekverwijdering",
    "Fabric & Leather Safe": "Veilig voor Stof & Leer",
    "Odor Neutralization": "Geurneutralisatie",
    "Professional pressure washing and sweeping for exterior areas. We rejuvenate parking lots, walkways, patios, and building facades to boost curb appeal.": "Professionele hogedrukreiniging en vegen van buitenruimtes. We verjongen parkeerplaatsen, trottoirs, patio's en gevels om de uitstraling te verbeteren.",
    "High-Pressure Washing": "Hogedrukreiniging",
    "Debris & Moss Removal": "Vuil- & Mosverwijdering",
    "Facade & Walkway Care": "Gevel- & Trottoironderhoud",

    // Services page marquee
    "Home Cleaning": "Huis Schoonmaken",
    "First Cleaning": "Eerste Schoonmaak",
    "Carpet Washing": "Tapijt Reinigen",
    "Post-Construction": "Na de Bouw",
    "Eco-Friendly": "Milieuvriendelijk",
    "Move-In Cleaning": "Verhuis Schoonmaak",
    "Pressure Washing": "Hogedrukreiniging",

    // Contact Page (contact.html)
    "— Get In Touch —": "— Neem contact met ons op —",
    "We're Here to": "We Zijn Er Om",
    "Help You": "U Te Helpen",
    "Reach out any time — by phone, email, or just drop by. Our team is ready to get your space spotless.": "Neem op elk gewenst moment contact op — per telefoon, e-mail of loop gewoon even binnen. Ons team staat klaar om uw ruimte vlekkeloos schoon te krijgen.",
    "Call Us": "Bel Ons",
    "Mon–Sat, 9am–8pm": "Ma–Za, 9:00 - 20:00",
    "Call Now": "Nu Bellen",
    "Email Us": "Mail Ons",
    "Reply within 2 hours": "Reactie binnen 2 uur",
    "Send Email": "E-mail Sturen",
    "Our Location": "Onze Locatie",
    "Open to walk-ins": "Open voor inloop",
    "Get Directions": "Routebeschrijving",
    "Mon – Fri": "Ma – Vr",
    "9am – 8pm": "9:00 - 20:00",
    "Saturday": "Zaterdag",
    "10am – 8pm": "10:00 - 20:00",
    "Sunday": "Zondag",
    "9am – 3pm": "9:00 - 15:00",
    "9.00 am - 8.00pm": "9.00 - 20.00",
    "10.00 am - 8.00pm": "10.00 - 20.00",
    "9.00 am - 3.00pm": "9.00 - 15.00",
    "Book a Cleaning": "Boek een Schoonmaak",
    "Ready for a Spotless Space?": "Klaar voor een Vlekkeloze Ruimte?",
    "Call us or drop an email — we'll get you scheduled same day.": "Bel ons of stuur een e-mail — we plannen u dezelfde dag nog in.",
    "— Find Us —": "— Vind Ons —",
    "Our": "Onze",
    "Location": "Locatie",
    "Visit us at our office or let us come to you — we serve the entire Santa Ana area and beyond.": "Bezoek ons op ons kantoor of laat ons naar u toe komen — we bedienen de hele regio en daarbuiten.",

    // How It Works section
    "We're Professionally Committed to Give You the": "Wij Zijn Professioneel Toegewijd Om U De",
    "Best Cleaning": "Beste Schoonmaak",
    "— See How It Works": "— Bekijk Hoe Het Werkt",
    "Get Service": "Ontvang Service",
    "Enjoy Service": "Geniet van de Service",

    // Emergency Call / Features (fast-help) section
    "Emergency Call": "Noodoproep",
    "Need Help Fast?": "Snel Hulp Nodig?",
    "We're One Call Away": "We Zijn Één Telefoontje Verwijderd",
    "Urgent clean-up needed? We prioritize emergency bookings and dispatch a trained team to your location as quickly as possible.": "Dringend schoonmaak nodig? Wij geven prioriteit aan spoedboekingen en sturen zo snel mogelijk een getraind team naar uw locatie.",
    "Prefer to chat?": "Liever chatten?",
    "Contact an Advisor →": "Neem Contact Op met een Adviseur →",
    "Features": "Kenmerken",
    "Your Space Deserves": "Uw Ruimte Verdient",
    "the Best — Here's Why": "Het Beste — Hierom",
    "Eco-Friendly Products Only": "Alleen Milieuvriendelijke Producten",
    "Background-Checked Staff": "Gescreend Personeel",
    "100% Satisfaction Guarantee": "100% Tevredenheidsgarantie",

    // Why Choose Us (dark variant, services/about pages)
    "Cleaning that feels organized from the first call.": "Schoonmaak die vanaf het eerste telefoontje georganiseerd aanvoelt.",
    "Customers choose Shinynova because we combine trained people, practical scheduling, clear pricing, and quality checks that make professional cleaning easier to trust.": "Klanten kiezen voor Shinynova omdat wij getraind personeel, praktische planning, duidelijke prijzen en kwaliteitscontroles combineren, waardoor professionele schoonmaak makkelijker te vertrouwen is.",
    "Experienced cleaning team": "Ervaren Schoonmaakteam",
    "Practical training, clear roles, and careful walkthroughs keep every visit consistent.": "Praktische training, duidelijke rollen en zorgvuldige inspecties zorgen voor consistentie bij elk bezoek.",
    "Flexible scheduling": "Flexibele planning",
    "One-time, weekly, biweekly, monthly, and commercial cleaning plans fit your routine.": "Eenmalige, wekelijkse, tweewekelijkse, maandelijkse en zakelijke schoonmaakplannen passen bij uw routine.",
    "Eco-friendly options": "Milieuvriendelijke opties",
    "Safer product choices are available for families, teams, pets, and sensitive spaces.": "Veiligere productkeuzes zijn beschikbaar voor gezinnen, teams, huisdieren en gevoelige ruimtes.",
    "Transparent pricing": "Transparante prijzen",
    "You get a clear quote before work begins, with no vague add-ons or surprise fees.": "U ontvangt een duidelijke offerte voordat het werk begint, zonder vage extra's of verrassende kosten.",
    "Satisfaction guarantee": "Tevredenheidsgarantie",
    "If a cleaned area needs attention, we review it and make it right.": "Als een schoongemaakt gebied aandacht nodig heeft, beoordelen we het en maken we het goed.",

    // Contact page hero
    "Contact US": "Contact Ons",
  }
};

let loadedTranslations = {
  en: {}
};

window.toggleLangDropdown = function () {
  const switcher = document.getElementById('lang-switcher');
  if (!switcher) return;
  switcher.classList.toggle('open');
};

const excludedTags = ['SCRIPT', 'STYLE', 'SVG', 'NOSCRIPT', 'IFRAME'];

function translatePage(lang, dict) {
  // Translate Document Title
  if (!window._originalTitle) {
    window._originalTitle = document.title;
  }
  if (dict && dict[window._originalTitle]) {
    document.title = dict[window._originalTitle];
  } else {
    document.title = window._originalTitle;
  }

  // Walk and translate DOM Text Nodes
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      const trimmed = text.trim().replace(/\s+/g, ' ');

      if (trimmed) {
        if (node._originalText === undefined) {
          node._originalText = text;
        }

        const origTrimmed = node._originalText.trim().replace(/\s+/g, ' ');
        if (origTrimmed) {
          let newText = null;
          if (dict && dict[origTrimmed]) {
            newText = dict[origTrimmed];
          } else {
            newText = origTrimmed;
          }

          if (newText !== null && newText !== undefined) {
            const matchLead = node._originalText.match(/^\s*/)[0];
            const matchTrail = node._originalText.match(/\s*$/)[0];
            node.nodeValue = matchLead + newText + matchTrail;
          }
        }
      }
    } else {
      if (node.nodeName && !excludedTags.includes(node.nodeName.toUpperCase())) {
        for (let child of node.childNodes) {
          walk(child);
        }
      }
    }
  }

  walk(document.body);
}

function loadTranslations(lang, callback) {
  if (loadedTranslations[lang]) {
    callback(loadedTranslations[lang]);
    return;
  }

  fetch(lang + '.json')
    .then(res => res.json())
    .then(data => {
      loadedTranslations[lang] = data;
      callback(data);
    })
    .catch(err => {
      console.warn('Could not fetch ' + lang + '.json, falling back to local copy:', err);
      const fallback = fallbackTranslations[lang] || {};
      loadedTranslations[lang] = fallback;
      callback(fallback);
    });
}

window.setLang = function (lang, event) {
  if (event) event.preventDefault();

  const nlFlag = '<svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="160" fill="#AE1C28"/><rect y="160" width="640" height="160" fill="#FFF"/><rect y="320" width="640" height="160" fill="#21468B"/></svg>';
  const enFlag = '<svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="480" fill="#012169"/><path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" fill="#FFF"/><path d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" fill="#C8102E"/><path d="M241 0v480h160V0H241zM0 160v160h640V160H0z" fill="#FFF"/><path d="M273 0v480h96V0h-96zM0 192v96h640v-96H0z" fill="#C8102E"/></svg>';

  // Update desktop switcher button
  const currentFlag = document.getElementById('current-flag');
  const currentLabel = document.getElementById('current-lang-label');
  if (currentFlag) currentFlag.innerHTML = lang === 'nl' ? nlFlag : enFlag;
  if (currentLabel) currentLabel.textContent = lang === 'nl' ? 'NL' : 'EN';

  // Update dropdown active state
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });

  // Update mobile buttons active state
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Close dropdown
  const switcher = document.getElementById('lang-switcher');
  if (switcher) switcher.classList.remove('open');

  // Load translations dynamically and apply
  loadTranslations(lang, (dict) => {
    translatePage(lang, dict);
    // Store preference
    localStorage.setItem('shinynove-lang', lang);

    // Re-render whichever testimonial is currently active so the
    // quote / name / role text updates to the new language too.
    if (document.getElementById('testimonial-content-wrapper') && window.switchTestimonial) {
      window.switchTestimonial(window._activeTestimonialIndex || 0);
    }
  });
};

// Close language dropdown on outside click
document.addEventListener('click', function (e) {
  const switcher = document.getElementById('lang-switcher');
  if (switcher && !switcher.contains(e.target)) {
    switcher.classList.remove('open');
  }
});
// Restore saved language preference on load
document.addEventListener('DOMContentLoaded', function () {
  const saved = localStorage.getItem('shinynove-lang') || 'nl';
  window.setLang(saved);
});


/* ─────────────────────────────────────────────
   2.  HERO  –  canvas bubble animation
   (runs immediately; canvas handles its own
    existence check)
───────────────────────────────────────────── */
(function initBubbleCanvas() {
  const canvas = document.getElementById('bubble-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  let bubbles = [];

  function makeBubble(randomY) {
    const r = 5 + Math.random() * 30;
    return {
      x:      Math.random() * canvas.width,
      y:      randomY ? Math.random() * canvas.height : canvas.height + r + Math.random() * 80,
      r,
      speed:  0.25 + Math.random() * 0.85,
      drift:  (Math.random() - 0.5) * 0.4,
      alpha:  0.07 + Math.random() * 0.25,
      phase:  Math.random() * Math.PI * 2,
      wobble: 0.3  + Math.random() * 0.9,
    };
  }

  function init() {
    bubbles = [];
    const count = Math.max(30, Math.floor(canvas.width / 28));
    for (let i = 0; i < count; i++) bubbles.push(makeBubble(true));
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    bubbles.forEach((b, i) => {
      const wx = Math.sin(frame * 0.017 * b.wobble + b.phase) * 16;

      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x + wx, b.y, b.r, 0, Math.PI * 2);

      const g = ctx.createRadialGradient(
        b.x + wx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.05,
        b.x + wx,              b.y,              b.r
      );
      g.addColorStop(0,   `rgba(255,255,255,${b.alpha * 2.4})`);
      g.addColorStop(0.5, `rgba(255,255,255,${b.alpha * 0.55})`);
      g.addColorStop(1,   `rgba(255,255,255,${b.alpha * 0.08})`);

      ctx.fillStyle   = g;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${b.alpha * 1.6})`;
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      // Specular highlight dot
      ctx.beginPath();
      ctx.arc(b.x + wx - b.r * 0.34, b.y - b.r * 0.32, b.r * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${b.alpha * 3.2})`;
      ctx.fill();
      ctx.restore();

      b.y -= b.speed;
      b.x += b.drift;
      if (b.y + b.r < 0) bubbles[i] = makeBubble(false);
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();


/* ─────────────────────────────────────────────
   Everything below needs the DOM to be ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {


  /* ───────────────────────────────────────────
     3.  BEFORE / AFTER  image-comparison slider
  ─────────────────────────────────────────── */
  const sliderContainer = document.getElementById('slider-container');
  const sliderControl   = document.getElementById('slider-control');
  const afterWrapper    = document.getElementById('after-wrapper');
  const afterImg        = document.getElementById('after-img');
  const sliderLine      = document.getElementById('slider-line');

  if (sliderContainer && sliderControl && afterWrapper && afterImg && sliderLine) {

    function updateSliderPosition() {
      const value = sliderControl.value;
      afterWrapper.style.width = `${value}%`;
      sliderLine.style.left    = `${value}%`;
    }

    function syncImageWidth() {
      const bounds = sliderContainer.getBoundingClientRect();
      afterImg.style.width  = `${bounds.width}px`;
      afterImg.style.height = `${bounds.height}px`;
    }

    sliderControl.addEventListener('input', updateSliderPosition);
    window.addEventListener('resize', syncImageWidth);
    syncImageWidth();
    updateSliderPosition();
  }


  /* ───────────────────────────────────────────
     4.  TESTIMONIALS  –  dynamic slide switcher
  ─────────────────────────────────────────── */
  const testimonialDataset = [
    {
      rating: "Rated 4.8 / by 1300+ Happy Customers",
      text:   "I'm beyond impressed with cleaning service! The team arrived right on time, worked efficiently, and left my apartment spotless. I've tried other companies before, but none matched their attention to detail.",
      name:   "James Parker",
      role:   "Operations Lead at Agency"
    },
    {
      rating: "Rated 4.9 / by 850+ Office Managers",
      text:   "Our office workspaces have never looked better. They are consistently punctual, follow safety rules perfectly, and leave the corporate floors pristine. Absolute game changers for our workspace hygiene.",
      name:   "Sarah Jenkins",
      role:   "Facilities Coordinator at TechGlobal"
    },
    {
      rating: "Rated 5.0 / by 500+ Luxury Clients",
      text:   "Incredible white-glove treatment! They clean fine upholstery and delicate countertops with absolute caution. The organic products smell crisp and fresh without any chemical irritation.",
      name:   "Michael Chang",
      role:   "Founder, Residence Properties"
    }
  ];

  let activeTestimonialIndex = 0;

  window.switchTestimonial = function (index) {
    activeTestimonialIndex = index;
    window._activeTestimonialIndex = index;
    const wrapper = document.getElementById('testimonial-content-wrapper');
    if (!wrapper) return;

    wrapper.classList.add('fade-hidden');

    setTimeout(() => {
      const ratingEl = document.getElementById('rating-text');
      const quoteEl  = document.getElementById('quote-text');
      const nameEl   = document.getElementById('author-name');
      const roleEl   = document.getElementById('author-role');

      // FIX: the old code referenced a global `translations` variable that
      // was never defined anywhere, which threw a ReferenceError and left
      // the whole testimonial box stuck at opacity:0 ("fade-hidden").
      // We now pull from the dictionaries that actually exist:
      // whatever was fetched via loadTranslations(), falling back to the
      // hardcoded fallbackTranslations object.
      const getTrans = (str) => {
        const currentLang = localStorage.getItem('shinynove-lang') || 'nl';
        const dict = loadedTranslations[currentLang] || fallbackTranslations[currentLang] || {};
        if (dict[str]) {
          return dict[str];
        }
        return str;
      };

      if (ratingEl) ratingEl.innerText = getTrans(testimonialDataset[index].rating);
      if (quoteEl)  quoteEl.innerText  = getTrans(testimonialDataset[index].text);
      if (nameEl)   nameEl.innerText   = getTrans(testimonialDataset[index].name);
      if (roleEl)   roleEl.innerText   = getTrans(testimonialDataset[index].role);

      for (let i = 0; i < 3; i++) {
        const overlay = document.getElementById(`avatar-overlay-${i}`);
        const card    = document.getElementById(`avatar-card-${i}`);
        const dot     = document.getElementById(`dot-${i}`);

        if (i === index) {
          if (overlay) overlay.style.opacity = '1';
          if (card)    card.classList.add('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          if (dot)     dot.className = 'w-6 h-1.5 rounded-full bg-[#ff6a00] transition-all duration-300';
        } else {
          if (overlay) overlay.style.opacity = '0';
          if (card)    card.classList.remove('border-2', 'border-[#22c55e]', 'scale-[1.03]', 'shadow-xl');
          if (dot)     dot.className = 'w-2.5 h-1.5 rounded-full bg-white/20 transition-all duration-300';
        }
      }

      wrapper.classList.remove('fade-hidden');
    }, 200);
  };

  // Init first testimonial if the section exists
  if (document.getElementById('testimonial-content-wrapper')) {
    window.switchTestimonial(0);
  }


  /* ───────────────────────────────────────────
     5.  HOME SERVICES  –  horizontal auto-scroll
         (#scroll-container on index.html only)
  ─────────────────────────────────────────── */
  const scrollContainer = document.getElementById('scroll-container');

  if (scrollContainer) {
    const scrollSpeed   = 1.5;
    let   scrollPaused  = false;

    // Duplicate content for seamless infinite loop
    scrollContainer.innerHTML += scrollContainer.innerHTML;

    function startAutoScroll() {
      if (!scrollPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(startAutoScroll);
    }

    scrollContainer.addEventListener('mouseenter', () => scrollPaused = true);
    scrollContainer.addEventListener('mouseleave', () => scrollPaused = false);
    scrollContainer.addEventListener('touchstart', () => scrollPaused = true,  { passive: true });
    scrollContainer.addEventListener('touchend',   () => scrollPaused = false, { passive: true });

    startAutoScroll();
  }


  /* ───────────────────────────────────────────
     6.  SCROLL REVEAL  (all pages)
         Powers the data-reveal animation system.
         Observes elements with [data-reveal] and
         adds .revealed class when 15% visible.
  ─────────────────────────────────────────── */

  // Legacy .reveal support
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── New data-reveal animation system ──
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length) {
    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // If this element has stagger children, reveal them too
          if (entry.target.hasAttribute('data-reveal-stagger')) {
            const children = entry.target.children;
            for (let i = 0; i < children.length; i++) {
              children[i].style.opacity = '0';
              children[i].style.transform = 'translateY(25px)';
              children[i].style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07 + 0.1}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07 + 0.1}s`;
              // Trigger reflow then animate
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  children[i].style.opacity = '1';
                  children[i].style.transform = 'translateY(0)';
                });
              });
            }
          }

          // Stop observing once revealed (one-time animation)
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => scrollRevealObserver.observe(el));
  }


  /* ───────────────────────────────────────────
     6b.  COUNTER ANIMATION for stat numbers
          Counts up from 0 when scrolled into view.
  ─────────────────────────────────────────── */
  const statNumbers = document.querySelectorAll('[data-count]');

  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.getAttribute('data-count');
          const suffix = el.getAttribute('data-suffix') || '';
          const numericTarget = parseInt(target, 10);
          const duration = 1800;
          const startTime = performance.now();

          el.classList.add('count-animate');

          function updateCount(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numericTarget);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target + suffix;
            }
          }

          requestAnimationFrame(updateCount);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }


  /* ───────────────────────────────────────────
     6c.  FLOATING PARTICLES for dark sections
  ─────────────────────────────────────────── */
  const testimonialsSection = document.getElementById('testimonials-section');
  if (testimonialsSection) {
    const particleWrapper = document.createElement('div');
    particleWrapper.className = 'absolute inset-0 pointer-events-none overflow-hidden';
    particleWrapper.style.zIndex = '1';

    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 8;
      const dur = 6 + Math.random() * 8;

      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(60, 209, 117, 0.3);
        left: ${left}%;
        top: ${top}%;
        animation: particleFloat ${dur}s ease-in-out ${delay}s infinite;
      `;
      particleWrapper.appendChild(dot);
    }

    testimonialsSection.appendChild(particleWrapper);
  }


  /* ───────────────────────────────────────────
     7.  TICKER / MARQUEE  (services.html)
  ─────────────────────────────────────────── */
  const ticker = document.getElementById('ticker');

  if (ticker) {
    const tickerItems = [
      'Home Cleaning', 'Office Cleaning', 'First Cleaning', 'Deep Cleaning',
      'Carpet Washing', 'Window Cleaning', 'Post-Construction',
      'Eco-Friendly',  'Move-In Cleaning', 'Pressure Washing',
    ];

    function buildTickerSet() {
      const delays = ['', 'animate-star-spin-d1', 'animate-star-spin-d2', 'animate-star-spin-d3'];
      return tickerItems.map((label, i) => `
        <span class="inline-flex items-center gap-5 mx-6">
          <span class="animate-star-spin ${delays[i % delays.length]} inline-block text-[#f5c518] text-2xl leading-none"
                style="filter:drop-shadow(0 0 4px rgba(245,197,24,0.6))">✦</span>
          <span class="text-outline text-3xl sm:text-4xl font-black tracking-tight uppercase">${label}</span>
        </span>
      `).join('');
    }

    const tickerSet  = buildTickerSet();
    ticker.innerHTML = tickerSet + tickerSet; // doubled for seamless loop
  }


  /* ───────────────────────────────────────────
     8.  HOW IT WORKS  –  floating particles
         (#particles on services.html)
  ─────────────────────────────────────────── */
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      const s = Math.random() * 3.5 + 1.5;
      p.style.cssText = `
        position:absolute;
        width:${s}px; height:${s}px;
        border-radius:50%;
        background:rgba(255,255,255,0.35);
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 35}%;
        animation:particleDrift ${4 + Math.random() * 6}s linear ${Math.random() * 5}s infinite;
      `;
      particlesContainer.appendChild(p);
    }
  }


  /* ───────────────────────────────────────────
     9.  HOW IT WORKS  –  mist burst on hover
         (.step-circle elements)
  ─────────────────────────────────────────── */
  document.querySelectorAll('.step-circle').forEach(circle => {
    const group = circle.closest('.step-group');
    if (!group) return;

    group.addEventListener('mouseenter', () => {
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * 360;
        const tx    = Math.cos(angle * Math.PI / 180) * 52;
        const ty    = Math.sin(angle * Math.PI / 180) * 52;

        const m = document.createElement('div');
        m.style.cssText = `
          position:absolute; width:7px; height:7px;
          border-radius:50%; background:rgba(245,197,24,0.65);
          left:50%; top:50%; margin-left:-3.5px; margin-top:-3.5px;
          --tx:${tx}px; --ty:${ty}px;
          animation:mistRise 0.65s ease forwards;
          pointer-events:none; z-index:30;
        `;
        circle.parentElement.appendChild(m);
        setTimeout(() => m.remove(), 650);
      }
    });
  });


  /* ───────────────────────────────────────────
     10.  "HIRE US" button  →  contact.html
  ─────────────────────────────────────────── */
  const hireBtn = document.getElementById('hireUsBtn');
  if (hireBtn) {
    hireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'contact.html';
    });
  }


}); // end DOMContentLoaded