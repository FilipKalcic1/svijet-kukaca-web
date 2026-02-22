-- ===========================================
-- 3 NOVA kukca (batch 2) za Svijet Kukaca
-- Pokreni u Supabase SQL Editor-u
-- ===========================================

-- 4. BOGOMOLJKA
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Bogomoljka',
  'Mantis religiosa',
  'bogomoljka',
  'Elegantni lovac iz zasjede! Bogomoljka je jedini kukac koji moze okrenuti glavu za punih 180 stupnjeva. Poznata je po svom jedinstvenom nacinu lova - satima nepomicno ceka plijen, a onda munjevitim pokretom hvata ga prednjim nogama u djelicu sekunde.',
  'crawling',
  25.00,
  '/placeholder-bug.png',
  'Topla polja, livade i vrtovi',
  'Drugi kukci, pa cak i mali gušteri',
  'Velika (6-7.5 cm)',
  ARRAY['Jedini je kukac na svijetu koji moze okrenuti glavu i pogledati preko ramena.', 'Zenka ponekad pojede muzjaka nakon parenja - ali to se dogadja puno rjede nego sto ljudi misle.', 'Ima samo jedno uho, smješteno na trbuhu izmedu stražnjih nogu!'],
  NULL,
  NULL
);

-- 5. KRIZNI PAUK
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Krizni Pauk',
  'Araneus diadematus',
  'krizni-pauk',
  'Majstor arhitekture! Krizni pauk je najpoznatiji europski pauk, prepoznatljiv po bijelom kriznom uzorku na ledjima. Svake veceri gradi savršenu mrezu od svilenih niti koje su, za svoju debljinu, pet puta cvršce od celika.',
  'spiders',
  25.00,
  '/placeholder-bug.png',
  'Vrtovi, šume, parkovi, prozori',
  'Muhe, komarci, mali kukci',
  'Srednji (10-13 mm tijelo)',
  ARRAY['Svaku vecer pojede staru mrezu i ispreda potpuno novu - recikliranje na djelu!', 'Svilena nit pauka je za svoju debljinu 5 puta cvršca od celika i 3 puta elasticnija od kevlara.', 'Moze osjetiti vibracije na mrezi tako precizno da tocno zna velicinu uhvacenog plijena.'],
  NULL,
  NULL
);

-- 6. VRETENCE
INSERT INTO insects (
  name_hr, name_science, slug, description, category, price, image_url,
  habitat, food, size, fun_facts, illustration_url, gallery_images
) VALUES (
  'Vretence',
  'Anax imperator',
  'vretence',
  'Nebesni as medu kukcima! Vretence je jedan od najbržih letaca u svijetu kukaca - moze letjeti brzinom do 50 km/h. S ocima koje pokrivaju gotovo cijelu glavu i daju mu 360-stupanjski vid, ovo je ultimativni predator neba.',
  'flying',
  25.00,
  '/placeholder-bug.png',
  'Jezera, bare, rijeke i mocvare',
  'Komarci, muhe, mali leptiri',
  'Veliko (raspon krila do 11 cm)',
  ARRAY['Moze letjeti u svim smjerovima - naprijed, nazad, bočno, pa cak i lebdjeti na mjestu poput helikoptera.', 'Ima najslozenije oci u svijetu kukaca - svako oko ima oko 30.000 leca!', 'Vretenice postoje vec 300 milijuna godina - letjele su nebom 100 milijuna godina prije dinosaura.'],
  NULL,
  NULL
);
