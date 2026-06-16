// Note technique : Les coordonnées sont structurées au format [latitude, longitude] (standard Leaflet / React-Simple-Maps).
// Si votre librairie (ex: Mapbox / MapLibre) requiert [longitude, latitude], il suffira d'inverser les valeurs.

export const australiaItinerary: Array<{
  name: string;
  date: string;
  location: string;
  coords: [number, number];
  anchor?: string;
  details?: string;
}> = [
  {
    name: "Arrivée - Brisbane Roma Street",
    date: "2005-07-03",
    location: "Aéroport de Brisbane / City Backpacker, Roma Street, QLD, Australie",
    coords: [-27.393815745042602, 153.1235950281586],
    anchor: "dimanche-3-juillet",
    details:
      "J'arrive à Brisbane sous 20°C, retrouve Rémy à l'auberge City Backpacker, et rencontre d'autres voyageurs.",
  },
  {
    name: "Recherche d'emploi - Brisbane",
    date: "Courant Juillet 2005",
    location: "Brisbane (Centre-ville et Stade), QLD, Australie",
    coords: [-27.4698, 153.0251],
    anchor: "apres-quelques-jours",
    details:
      "Je cherche un logement et un travail à Brisbane, mais échoue à décrocher un job au stade. Je commence à chercher un van.",
  },
  {
    name: "Achat du Van & Premier Job - Brisbane",
    date: "Courant Juillet 2005 (Premier week-end)",
    location: "Brisbane (The Valley et Tivoli Theater Restaurant), QLD, Australie",
    coords: [-27.4565, 153.0347],
    anchor: "bientot-prets-pour-laventure",
    details:
      "J'achète un van Toyota à Brisbane, retrouve Kristy, et commence mon premier job comme aide-cuisinier au Tivoli Theater Restaurant.",
  },
  {
    name: "Premier Road-Test - Gold Coast",
    date: "Courant Juillet 2005",
    location: "Gold Coast (Southport, Main Beach, Burleigh, Surfers Paradise), QLD, Australie",
    coords: [-28.0876, 153.4504],
    details:
      "Je teste le van sur la Gold Coast, découvre quelques soucis mécaniques et profite des plages et de l'ambiance festive de Surfers Paradise.",
  },
  {
    name: "Visite - Lone Pine Koala Sanctuary",
    date: "Courant Juillet 2005",
    location: "Lone Pine Koala Sanctuary, Fig Tree Pocket, QLD, Australie",
    coords: [-27.5332, 152.9688],
    details:
      "Je visite le Lone Pine Koala Sanctuary, approche des kangourous en liberté et observe les koalas.",
  },
  {
    name: "Début de la remontée - Maroochydore",
    date: "Courant Juillet 2005",
    location: "Maroochydore, Sunshine Coast, QLD, Australie",
    coords: [-26.6622, 153.1022],
    anchor: "cest-parti-direction-cairns-1-600-km",
    details:
      "Je commence la remontée vers Cairns malgré des soucis mécaniques, profite d'un barbecue en montagne et dors à Maroochydore.",
  },
  {
    name: "Randonnée - Noosa National Park",
    date: "2005-07-19",
    location: "Noosa National Park, Sunshine Coast, QLD, Australie",
    coords: [-26.3802, 153.1118],
    details:
      "Je fais une randonnée au Noosa National Park, traversant forêt tropicale et plages, et admire le coucher de soleil sur l'océan.",
  },
  {
    name: "Étape Fraser Island - Hervey Bay",
    date: "Fin Juillet 2005",
    location: "Hervey Bay, QLD, Australie",
    coords: [-25.2986, 152.8535],
    details:
      "Je fais étape à Hervey Bay pour préparer l'excursion à Fraser Island, rencontre des voyageurs et assiste à un briefing 4x4.",
  },
  {
    name: "Expédition 4x4 - Fraser Island",
    date: "Fin Juillet 2005 (Excursion de 3 jours)",
    location: "Fraser Island, QLD, Australie",
    coords: [-25.2393, 153.1324],
    anchor: "3-jours-de-bonheur-sur-fraser-island",
    details:
      "Je pars trois jours en 4x4 sur Fraser Island, explore la jungle et les plages, visite le lac McKenzie et l'épave du Maheno, et observe les baleines.",
  },
  {
    name: "Transit Nord - Bruce Highway",
    date: "Début Août 2005",
    location: "Bruce Highway (Mackay / Airlie Beach), QLD, Australie",
    coords: [-21.1424, 149.1868],
    details:
      "Je traverse le Queensland en convoi, tente de trouver du travail, campe souvent et arrive à Airlie Beach.",
  },
  {
    name: "Panne & Échec - Bowen",
    date: "Courant Août 2005",
    location: "Bowen, QLD, Australie",
    coords: [-20.0135, 148.2475],
    details:
      "Je tente ma chance à Bowen pour du fruit picking, mais rencontre des problèmes mécaniques et aucun travail n'est disponible.",
  },
  {
    name: "Job stable - Airlie Beach",
    date: "Fin Août 2005",
    location: "Airlie Beach (Beaches Backpacker et Paddy's Pub), QLD, Australie",
    coords: [-20.2678, 148.7153],
    anchor: "la-1ere-semaine-a-airlie-beach",
    details:
      "Je décroche un emploi stable comme kitchen hand à Airlie Beach, me fais des amis et profite de la vie locale.",
  },
  {
    name: "Licenciement & Autonomie - Airlie Beach",
    date: "2005-09-03",
    location: "Airlie Beach (Magnums Backpacker et Coral Beach), QLD, Australie",
    coords: [-20.2671, 148.7161],
    details:
      "Je perds mon emploi à Airlie Beach, dors dans mon van, puis profite d'une soirée guitare et camping à Coral Beach.",
  },
  {
    name: "Excursion - Whitsunday Island",
    date: "Début Septembre 2005",
    location: "Whitsunday Island, QLD, Australie",
    coords: [-20.2811, 149.0437],
    details:
      "J'explore Whitsunday Island en zodiac, nage avec les poissons tropicaux, observe baleines et tortues, et marche sur une plage de silice.",
  },
  {
    name: "Transit Critique - El Arish",
    date: "Mi-Septembre 2005",
    location: "Bruce Highway (Townsville, Ingham, El Arish), QLD, Australie",
    coords: [-17.8239, 145.9839],
    details:
      "Je découvre que mon van est en mauvais état, mais poursuis vers Cairns en covoiturant un couple d'Anglais et campe à El Arish.",
  },
  {
    name: "Arrivée & Détente - Josephine Falls",
    date: "Mi-Septembre 2005",
    location: "Josephine Falls / Holloways Beach, Cairns, QLD, Australie",
    coords: [-17.4332, 145.8584],
    details:
      "J'arrive près de Cairns, me baigne à Josephine Falls, puis m'installe à Holloways Beach. Mon van a tenu tout le trajet depuis Brisbane.",
  },
  {
    name: "Installation - Cairns",
    date: "Mi-Septembre 2005",
    location: "Cairns (Lagon municipal et Sun Land Camping), QLD, Australie",
    coords: [-16.9203, 145.771],
    details:
      "Je découvre Cairns, profite du lagon artificiel, m'installe au camping Sun Land et repère Johno's Blues Bar.",
  },
  {
    name: "Autarcie - Irvinebank (Rainbow Gathering)",
    date: "Fin Septembre 2005 (Pleine lune et 10 jours suivants)",
    location: "Irvinebank (Rainbow Gathering), Région d'Atherton, QLD, Australie",
    coords: [-17.4281, 145.2036],
    details:
      "Je rejoins le Rainbow Gathering à Irvinebank, vis 10 jours en autarcie et compose mon morceau 'Rainbow'.",
  },
  {
    name: "Camping Sauvage - Noah Beach (Cape Tribulation)",
    date: "Début Octobre 2005",
    location: "Noah Beach, Cap Tribulation (Daintree Rainforest), QLD, Australie",
    coords: [-16.1419, 145.4491],
    details:
      "Je pars camper à Noah Beach dans la forêt de Daintree, partage le trajet avec d'autres voyageurs et alterne surf, frisbee et musique.",
  },
  {
    name: "Job de Luxe - Thala Beach Lodge",
    date: "Courant Octobre 2005",
    location: "Cairns / Thala Beach Lodge, Port Douglas Road, QLD, Australie",
    coords: [-16.5915, 145.5165],
    details:
      "Je retourne à Cairns, improvise avec un guitariste, tombe à sec, puis trouve un emploi de kitchen hand au Thala Beach Lodge.",
  },
  {
    name: "Fin du travail - Thala Beach Lodge",
    date: "2005-11-07",
    location: "Thala Beach Lodge, Port Douglas Road, QLD, Australie",
    coords: [-16.5915, 145.5165],
    details: "Je termine mon travail au Thala Beach Lodge et fais mes adieux à l'équipe.",
  },
  {
    name: "Retour à Cairns - Esplanade",
    date: "2005-11-08",
    location: "Cairns Esplanade, Cairns, QLD, Australie",
    coords: [-16.9186, 145.7761],
    details:
      "Je reviens à Cairns, retrouve des amis et dors sur l'Esplanade où je reçois un avertissement pour camping.",
  },
  {
    name: "Préparation de la vente - Sun Land Camping",
    date: "Début Novembre 2005",
    location: "Sun Land Leisure Park, Cairns, QLD, Australie",
    coords: [-16.9382, 145.7422],
    details:
      "Je prépare la vente de mon van à Cairns, nettoie et affiche l'annonce, mais le premier acheteur refuse.",
  },
  {
    name: "Vente de Big Banana - Leo's Backpacker",
    date: "Mi-Novembre 2005",
    location: "Leo's Backpacker, Cairns, QLD, Australie",
    coords: [-16.9304, 145.7681],
    details:
      "Je vends mon van à Cairns à un Anglais au prix demandé, la transaction est rapide et simple.",
  },
  {
    name: "Retour à Brisbane - Bulk Backpacker",
    date: "Mi-Novembre 2005",
    location: "Bulk Backpacker, Brisbane, QLD, Australie",
    coords: [-27.4675, 153.015],
    details:
      "Je vole de Cairns à Brisbane, change de look et retrouve une auberge où je rencontre de nouveaux amis.",
  },
  {
    name: "Soirée et lagon - Down Under Pub & Riverside",
    date: "Mi-Novembre 2005",
    location: "Down Under Bar / South Bank Parklands, Brisbane, QLD, Australie",
    coords: [-27.477, 153.0211],
    details:
      "Je passe une soirée au Down Under Bar, puis me détends au lagon de Riverside avant de partir pour Lismore.",
  },
  {
    name: "Arrivée dans le NSW - Lismore & The Channon",
    date: "2005-11-17",
    location: "The Channon, Lismore, NSW, Australie",
    coords: [-28.6754, 153.2286],
    details:
      "J'arrive à The Channon chez Adam pour une semaine de repos avec balades en Gator, moto et guitare.",
  },
  {
    name: "Immersion alternative - Arts Factory",
    date: "Fin Novembre 2005",
    location: "The Arts Factory Backpackers, Byron Bay, NSW, Australie",
    coords: [-28.649, 153.6152],
    details:
      "Je séjourne à l'Arts Factory de Byron Bay, découvre l'ambiance musicale et monte pour la première fois sur scène lors d'un Talent Show.",
  },
  {
    name: "Étape et transit - Marché de Channon",
    date: "Début Décembre 2005",
    location: "The Channon Craft Market, The Channon, NSW, Australie",
    coords: [-28.6678, 153.2619],
    details:
      "Je me rends au Rainbow Temple avec Alex, fais halte au marché de Channon et profite des cascades locales.",
  },
  {
    name: "Chantier participatif - Rainbow Temple",
    date: "Mi-Décembre 2005",
    location: "Rainbow Temple, Rosebank, NSW, Australie",
    coords: [-28.6185, 153.3855],
    details:
      "Je passe trois jours au Rainbow Temple, aide à un chantier et découvre ce lieu caché.",
  },
  {
    name: "Noël sous les tropiques - Brisbane",
    date: "2005-12-15",
    location: "City Backpacker / Maison de Kristy et Jess, Brisbane, QLD, Australie",
    coords: [-27.4668, 153.0178],
    details:
      "Je retourne à Brisbane pour Noël, retrouve Jess et Kristy, et fête le 25 décembre en famille sous la chaleur.",
  },
  {
    name: "Festival - Woodford Folk Festival",
    date: "2005-12-27",
    location: "Woodford Folk Festival, Woodford, QLD, Australie",
    coords: [-26.9602, 152.7606],
    details:
      "J'assiste au Woodford Folk Festival, campe sur place et profite de nombreux concerts dont Éric Bibb et Ash Grunwald.",
  },
  {
    name: "Blocage bancaire - Brisbane",
    date: "Début Janvier 2006",
    location: "City Backpacker / Agence Western Union, Brisbane, QLD, Australie",
    coords: [-27.4668, 153.0178],
    details:
      "Ma carte bancaire est bloquée à Brisbane, je suis sauvé par un virement familial et loge chez Jess avant de partir pour Sydney.",
  },
  {
    name: "Arrivée à Sydney & Étape à Manly",
    date: "Début Janvier 2006",
    location: "Manly, Sydney, NSW, Australie",
    coords: [-33.7971, 151.2872],
    anchor: "sydney",
    details:
      "J'arrive à Manly près de Sydney, retrouve Adam, mais suis déçu par l'ambiance du quartier.",
  },
  {
    name: "Séjour alternatif - Bondi Beach",
    date: "Début Janvier 2006",
    location: "Bondi Beach, Sydney, NSW, Australie",
    coords: [-33.8915, 151.2767],
    details:
      "Je séjourne à Bondi Beach chez une amie, profite de l'ambiance détendue et fais une randonnée côtière.",
  },
  {
    name: "Exploration urbaine - Sydney Centre",
    date: "Courant Janvier 2006",
    location: "Chinatown / Jardin Botanique, Sydney, NSW, Australie",
    coords: [-33.8732, 151.2071],
    details:
      "Je découvre Sydney centre, retrouve Verena, visite Chinatown, le Jardin Botanique et assiste à des concerts gratuits.",
  },
  {
    name: "Vie culturelle - The Rocks",
    date: "Mi-Janvier 2006",
    location: "The Rocks, Sydney, NSW, Australie",
    coords: [-33.8599, 151.209],
    details:
      "Je visite le quartier The Rocks à Sydney, sors dans les pubs et reste bloqué quatre jours de plus à cause d'un bug informatique.",
  },
  {
    name: "Arrivée à Melbourne & Busking express",
    date: "Fin Janvier 2006",
    location: "Flinders Hotel / Elizabeth Street, Melbourne, VIC, Australie",
    coords: [-37.8174, 144.9657],
    anchor: "melbourne-les-reves-qui-senvolent",
    details:
      "J'arrive à Melbourne, trouve un emploi dans un cybercafé et joue de la musique dans la rue avec Alija.",
  },
  {
    name: "Tensions & Instabilité - Cybercafé",
    date: "Fin Janvier / Début Février 2006",
    location: "Cybercafé, Elizabeth Street, Melbourne, VIC, Australie",
    coords: [-37.814, 144.9642],
    details:
      "Je travaille au cybercafé à Melbourne, fais face à des difficultés et à un contrat réduit, ce qui me décourage.",
  },
  {
    name: "Resquille & Tennis - Melbourne Park",
    date: "Fin Janvier 2006 (Australia Day)",
    location: "Melbourne Park / Sidney Myer Music Bowl, Melbourne, VIC, Australie",
    coords: [-37.8226, 144.98],
    details:
      "Je joue sur la scène ouverte du Bowl Stage, assiste gratuitement à l'Open d'Australie et profite du feu d'artifice de l'Australia Day.",
  },
  {
    name: "Scène alternative - Bar Open",
    date: "Début Février 2006",
    location: "Bar Open, Brunswick Street, Fitzroy, VIC, Australie",
    coords: [-37.8011, 144.9778],
    details:
      "Je retrouve Rachel à Melbourne, découvre Brunswick Street et le Bar Open, et cherche des musiciens pour jammer.",
  },
  {
    name: "Idylle balnéaire - St Kilda",
    date: "Courant Février 2006",
    location: "St Kilda Beach / Cinéma, Melbourne, VIC, Australie",
    coords: [-37.868, 144.9739],
    details:
      "Je passe une journée à St Kilda avec Nicola, profite de la plage et partage un moment complice.",
  },
  {
    name: "Résidence - Backpack Hostel",
    date: "Mi-Février 2006",
    location: "Backpack Hostel, Melbourne, VIC, Australie",
    coords: [-37.8136, 144.9631],
    details:
      "Je m'installe au Backpack Hostel à Melbourne, partage une chambre avec Thomas et poursuis mes sessions musicales.",
  },
  {
    name: "Rupture professionnelle - Cybercafé",
    date: "Fin Février 2006",
    location: "Cybercafé, Elizabeth Street, Melbourne, VIC, Australie",
    coords: [-37.814, 144.9642],
    details:
      "Je perds mon emploi au cybercafé à Melbourne malgré une situation qui semblait stable.",
  },
  {
    name: "Sessions musicales - Hotel Backpack",
    date: "Début Mars 2006",
    location: "Hotel Backpack / The Night Cat, Brunswick Street, Melbourne, VIC, Australie",
    coords: [-37.7968, 144.9793],
    details:
      "Simon rejoint notre colocation à Melbourne, on partage des sessions musicales et assistons à un concert au Night Cat.",
  },
  {
    name: "Embauche et désillusion - Red Tongue Restaurant",
    date: "Mars 2006",
    location: "Red Tongue Restaurant, Brunswick Street, Fitzroy, VIC, Australie",
    coords: [-37.7993, 144.9784],
    details:
      "Je trouve un travail au Red Tongue Restaurant à Melbourne, mais il s'arrête après seulement deux services.",
  },
  {
    name: "Crise de subsistance - Melbourne",
    date: "Mi-Mars 2006",
    location: "Hotel Backpack, Melbourne, VIC, Australie",
    coords: [-37.8136, 144.9631],
    details:
      "Je n'arrive plus à trouver de travail à Melbourne, m'épuise physiquement et prépare mon retour à Brisbane.",
  },
  {
    name: "Reprise de la route - Péninsule d'Eyre",
    date: "Fin Mars / Avril 2006",
    location: "Péninsule d'Eyre, SA, Australie",
    coords: [-34.2, 135.5],
    anchor: "australie-occidentale",
    details:
      "Je quitte Melbourne avec Thomas et Chloé pour traverser la péninsule d'Eyre en van et chercher du fruit picking.",
  },
  {
    name: "Étape Ouest-Australienne & Plan de transit - Margaret River",
    date: "Mai / Juin 2006",
    location: "Margaret River, WA, Australie",
    coords: [-33.955, 115.075],
    anchor: "this-is-the-end",
    details:
      "J'arrive à Margaret River, prépare la fin de mon voyage : Darwin, Alice Springs, puis retour à Brisbane.",
  },
  {
    name: "Transit dans le Centre Rouge - Alice Springs",
    date: "Juin 2006",
    location: "Alice Springs, NT, Australie",
    coords: [-23.698, 133.8807],
    details:
      "Je traverse l'Outback en bus jusqu'à Alice Springs, suivant mon itinéraire de retour.",
  },
  {
    name: "Dernière étape septentrionale - Darwin",
    date: "Fin Juin / Début Juillet 2006",
    location: "Darwin, NT, Australie",
    coords: [-12.4634, 130.8456],
    details:
      "Je fais halte à Darwin, dresse le bilan de mon année de voyage, puis me prépare à rentrer à Brisbane.",
  },
  {
    name: "Fin du Grand Tour & Retour - Brisbane & France",
    date: "Juillet 2006",
    location: "Aéroport de Brisbane, QLD, Australie / France",
    coords: [-27.4668, 153.0178],
    details:
      "Je termine mon aventure australienne par un passage à Brisbane pour saluer Jess et Kristy avant de rentrer en France.",
  },
];
