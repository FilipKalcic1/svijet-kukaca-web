-- ===========================================
-- 3 nova kukca za Svijet Kukaca wiki + shop
-- Pokreni u Supabase SQL Editor-u
-- ===========================================

-- 1. JELENAK ROGAC
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Jelenak Rogac',
  'Lucanus cervus',
  'jelenak-rogac',
  'Najveci europski kukac i pravi vitez medu insektima! Muzjaci imaju ogromne celjusti koje izgledaju poput rogova jelena - otud i ime. Koriste ih u borbama za zenke, poput pravog viteškog turnira. Unatoc zastrašujucem izgledu, potpuno su bezopasni za ljude.',
  'crawling',
  25.00,
  '/placeholder-bug.png',
  'Stare hrastove i bukove sume',
  'Sokovi drveca i prezrelo voce',
  'Muzjaci do 9 cm (s celjustima)',
  ARRAY['Najveci je kukac u Europi i moze narasti do 9 centimetara.', 'Licinka zivi u trulem drvu cijelih 5 do 7 godina prije nego postane odrasli kukac.', 'Muzjaci se bore celjustima poput sumo-rvaca - pokušavaju protivnika podici i baciti s grane.'],
  NULL,
  NULL
);

-- 2. BOZJA OVCICA (Bubamara)
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Bozja Ovcica',
  'Coccinella septempunctata',
  'bozja-ovcica',
  'Svi je znamo i svi je volimo! Bozja ovcica sa svojih 7 crnih tocaka na crvenim krilima je najprepoznatljiviji kukac na svijetu. Ali ona nije samo slatka - ona je pravi predator! Jedna bubamara moze pojesti i do 5000 lisnih usi u svom zivotu.',
  'flying',
  25.00,
  '/placeholder-bug.png',
  'Vrtovi, livade, parkovi i polja',
  'Lisne usi (do 5000 u zivotu!)',
  'Mala (5-8 mm)',
  ARRAY['Kad se osjecaju ugrozeno, iz zglobova nogu ispuštaju žuckasti sok koji smrdi i ima gorak okus.', 'Broj tocaka NEMA veze s dobi - sedmotocka bubamara uvijek ima 7 tocaka.', 'Zimi se skupljaju u velike grupe i spavaju zajedno kako bi se grijale - ponekad i po tisucu na jednom mjestu!'],
  NULL,
  NULL
);

-- 3. ZEMNI BUMBAR
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Zemni Bumbar',
  'Bombus terrestris',
  'bumblebee-zemni-bumbar',
  'Cupavi div medu pcelama! Zemni bumbar je jedan od najvaznijih oprašivaca u Europi. Njegovo debelo cupavo tijelo savršeno sakuplja pelud dok leti od cvijeta do cvijeta. Za razliku od pcela, bumbari mogu letjeti i po hladnom i kiševnom vremenu.',
  'flying',
  25.00,
  '/placeholder-bug.png',
  'Livade, vrtovi, rubovi suma',
  'Nektar i pelud cvjetova',
  'Srednji (15-22 mm)',
  ARRAY['Prema zakonima aerodinamike, bumbar ne bi trebao moci letjeti - ali on to ne zna, pa svejedno leti!', 'Bumbari mogu zagrijati svoje tijelo na 30 stupnjeva tresuci mišicima, pa mogu letjeti i kad je vani samo 5 stupnjeva.', 'Kraljica bumbara zivi sama pod zemljom cijelu zimu i u proljeće sama osniva novu koloniju.'],
  NULL,
  NULL
);
