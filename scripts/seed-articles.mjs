import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  // ─────────────────────────────────────────────────
  // 1. O KUKCIMA (uvod)
  // ─────────────────────────────────────────────────
  {
    slug: "o-kukcima",
    title: "O kukcima",
    summary: "Zašto su kukci najvažnija skupina životinja na Zemlji i zašto bez njih ne bismo preživjeli.",
    category: "uvod",
    sort_order: 1,
    body: `Kukci spadaju u člankonošce, odnosno jedna su od podskupina člankonožaca. Skupina Insecta (Kukci) najbrojnija je i najraznolikija u cijelom životinjskom svijetu. Smatra se da broj vrsta insekata prelazi milion vrsta.

Kukci su svuda oko nas. Najčešće ih ne doživljavamo pozitivno, vidimo ih kao smetnju, „zujeću dosadu" ili potencijalno opasna bića koja grizu, bodu i iritiraju. Neka od spomenutih nelagoda zaista je moguća, ali ono što se previđa i svjesno potiskuje su svi pozitivni aspekti kojima kukci djeluju na naše živote. Kukci su jedna od ključnih karika našeg „preživljavanja", štoviše — bez kukaca danas na Zemlji ne bi bilo život u ovakvom obliku. Život bi možda postojao, ali zasigurno ni približno nalik današnjem.

Spomenimo samo neke blagodati koje dugujemo kukcima:

• Razgrađuju organsku materiju / biljnu masu (te uginule životinje i biljke)
• Imaju ključnu ulogu u generiranju tla — rahle Zemlju i prozračuju je, obnavljajući je i čineći je pogodnom za poljoprivredu
• Pomažu kod osjemenjivanja i širenja biljaka
• Važnu ulogu u generiranju i transferiranju mineralnih tvari, mineraliziraju tlo
• Oprašuju biljke — ključni su za poljoprivrednu proizvodnju hrane
• Skupljaju med
• Ključne su karike u hranidbenim lancima (hrana su za biljke i životinje)

Možemo reći doslovno, da bi kukci vrlo lako opstali na Zemlji bez postojanja čovjeka!
I isto tako — da bi ljudi vrlo teško opstali na planeti bez djelovanja kukaca!
Stoga definitivno zaslužuju da ih upoznamo i posvetimo im više pažnje.`,
  },

  // ─────────────────────────────────────────────────
  // 2. PODJELA I KLASIFIKACIJA KUKACA
  // ─────────────────────────────────────────────────
  {
    slug: "podjela-kukaca",
    title: "Podjela i klasifikacija kukaca",
    summary: "Kako biolozi dijele više od milijun vrsta kukaca — prema krilima, metamorfozi i \"Velika četvorka\" najbrojnijih redova.",
    category: "edukacija",
    sort_order: 2,
    body: `Podjela kukaca je ogroman pothvat jer ih postoji više od milijun opisanih vrsta. Ipak, biolozi ih primarno dijele prema dva ključna kriterija: razvoju krila i načinu preobrazbe (metamorfozi).

1. Podjela prema krilima (Podrazredi)

Kukci se dijele na dvije osnovne skupine:

• Beskrilci (Apterygota): Primitivni kukci koji kroz cijelu evoluciju nikada nisu imali krila (npr. šećerna četina koju viđaš u kupaonicama).
• Krilati kukci (Pterygota): Skupina u koju spada 99% ostalih kukaca. Čak i ako neki danas nemaju krila (poput mrava radnika ili buha), njihovi su ih preci imali, pa su ih tijekom evolucije izgubili.

2. Podjela prema preobrazbi (Metamorfozi)

Ovo je najvažnija podjela u biologiji jer opisuje kako kukac odrasta:

A) Potpuna preobrazba (Holometabola)
Ovi kukci prolaze kroz četiri faze: jaje → ličinka → kukuljica → odrasla jedinka.
Ličinka (npr. gusjenica) uopće ne sliči odrasloj jedinki (leptir).

Glavni redovi:
• Kornjaši (Coleoptera): Tvrdokrilci (bubamare, trčci).
• Dvokrilci (Diptera): Muhe, komarci.
• Opnokrilci (Hymenoptera): Pčele, ose, mravi.
• Leptiri (Lepidoptera): Danji i noćni leptiri.

B) Nepotpuna preobrazba (Hemimetabola)
Ovi kukci preskaču fazu kukuljice. Iz jajeta izlazi nimfa koja izgleda kao minijaturna verzija odraslog kukca (samo bez krila).

Glavni redovi:
• Ravnokrilci (Orthoptera): Skakavci, cvrčci.
• Ribeži/Polukrilci (Hemiptera): Stjenice, lisne uši.
• Vretenca (Odonata): Vilinski konjici.
• Žohari (Blattodea): Žohari i termiti.

3. "Velika četvorka" (Najbrojniji redovi)

Ako želiš znati koji su najuspješniji, zapamti ova četiri reda koji čine većinu svih kukaca na svijetu:

• Kornjaši — Prednja krila su tvrdi oklop (elitre). Primjeri: Jelenak, krumpirova zlatica.
• Leptiri — Krila su prekrivena sitnim ljuskicama. Primjeri: Lastin rep, moljac.
• Dvokrilci — Imaju samo 1 par krila za let (drugi par su "njihalice"). Primjeri: Kućna muha, obad.
• Opnokrilci — Često žive u zadrugama i imaju prozirna krila. Primjeri: Bumbar, mrav, osa.

Zanimljivost: Kornjaši su toliko brojni da je svaki četvrti životinjski organizam na planetu Zemlji (uključujući sve sisavce, ribe i ptice) — zapravo neka vrsta kornjaša!`,
  },

  // ─────────────────────────────────────────────────
  // 3. ČLANKONOŠCI (Arthropoda)
  // ─────────────────────────────────────────────────
  {
    slug: "clankonosci",
    title: "Člankonošci (Arthropoda)",
    summary: "Kukci, paučnjaci, rakovi i stonoge — četiri glavne podskupine najbrojnije životinjske skupine na Zemlji.",
    category: "edukacija",
    sort_order: 3,
    body: `Člankonošci (Arthropoda) su najbrojnija i najuspješnija skupina životinja na Zemlji. Njihova osnovna podjela temelji se na građi tijela, broju nogu i broju ticala.

Sve člankonošce dijelimo u četiri glavne podskupine:

1. Šesteronošci (Hexapoda) — Kukci
Ovo je najbrojnija skupina. Kao što im ime kaže, glavni im je zaštitni znak šest nogu.
• Tijelo: Podijeljeno na 3 dijela (glava, prsište, zadak).
• Dodaci: 1 par ticala i najčešće 2 para krila.
• Primjeri: Pčele, mravi, leptiri, kornjaši, žohari.

2. Paučnjaci (Chelicerata)
U ovu skupinu spadaju životinja koje umjesto ticala imaju helice (čeljusne nožice) za hvatanje plijena.
• Tijelo: Podijeljeno na 2 dijela (glavopršnjak i zadak).
• Dodaci: 8 nogu i nula ticala.
• Primjeri: Pauci, škorpioni, krpelji, grinje.

3. Rakovi (Crustacea)
Većinom žive u vodi, iako postoje i kopnene vrste (poput onih malih "mokrica" koje nalaziš ispod kamenja).
• Tijelo: Najčešće podijeljeno na glavopršnjak i zadak.
• Dodaci: 2 para ticala (jedini ih oni imaju toliko) i promjenjiv broj nogu (često 10 ili više).
• Primjeri: Jastog, riječni rak, škampi, babure.

4. Myriapoda — Stonoge
Prepoznatljivi su po izduženom tijelu sastavljenom od mnogo sličnih kolutića.
• Tijelo: Glava i dugi trup.
• Dodaci: Veliki broj nogu (od desetak do nekoliko stotina, ovisno o vrsti) i 1 par ticala.
• Primjeri: Obična stonoga, striga.

Brza tablica za razlikovanje:

Kukci — 6 nogu, 1 par ticala, 3 dijela tijela (glava, prsište, zadak)
Paučnjaci — 8 nogu, 0 ticala, 2 dijela tijela (glavopršnjak, zadak)
Rakovi — 10+ nogu, 2 para ticala, 2 dijela tijela (glavopršnjak, zadak)
Stonoge — mnogo nogu, 1 par ticala, glava + trup

Zanimljivost: Nekada su u ovu podjelu spadali i izumrli Trilobiti, koji su vladali oceanima stotinama milijuna godina prije nego što su se pojavili prvi dinosauri.`,
  },

  // ─────────────────────────────────────────────────
  // 4. JESU LI PUŽEVI KUKCI?
  // ─────────────────────────────────────────────────
  {
    slug: "jesu-li-puzevi-kukci",
    title: "Jesu li puževi kukci?",
    summary: "Ne! Puževi su mekušci — udaljeniji od kukaca nego što su to čak i pauci. Evo ključnih razlika.",
    category: "zanimljivosti",
    sort_order: 4,
    body: `Ne, puževi nisu kukci.

Zapravo, puževi su još udaljeniji od kukaca nego što su to pauci. Dok su pauci i kukci barem daleki rođaci unutar skupine člankonožaca, puževi pripadaju potpuno drugom carstvu oblika i građe.

1. Klasifikacija (Tko su oni?)
• Puževi su mekušci (Mollusca). U istoj su skupini s dagnjama, kamenicama, pa čak i hobotnicama i lignjama.
• Kukci su člankonošci (Arthropoda).

2. Anatomija (Kako su građeni?)

Kostur:
• Puževi nemaju vanjski kostur. Mnogi imaju kućicu od kalcijeva karbonata.
• Kukci imaju čvrsti vanjski kostur (egzoskelet) od hitina.

Noge:
• Puževi imaju samo jedno mišićavo "stopalo" na kojem pužu.
• Kukci imaju 6 zglobnih nogu.

Ticala:
• Puževi imaju ticala na kojima su često oči, ali ona su mekana i uvlačiva.
• Kukci imaju čvrsta, segmentirana ticala (antene).

Kretanje:
• Puževi se kreću pomoću valova mišićnih kontrakcija i sluzi.
• Kukci hodaju, trče, skaču ili lete (većina ima krila).

3. Zanimljive specifičnosti puževa
• Radula: Puževi nemaju čeljusti kao kukci, već poseban organ nalik jeziku s tisućama mikroskopskih "zubića" kojim stružu hranu.
• Disanje: Kopneni puževi imaju jedno jednostavno plućno krilo (otvor na boku), dok morski puževi koriste škrge.
• Hermafroditi: Većina kopnenih puževa ima i muške i ženske reproduktivne organe.

Zabavna činjenica: Iako su spori, puževi su nevjerojatno izdržljivi. Neke vrste mogu prespavati (hibernirati) nekoliko godina ako su uvjeti previše suhi ili nepovoljni!`,
  },

  // ─────────────────────────────────────────────────
  // 5. KOJI JE NAJVEĆI KUKAC?
  // ─────────────────────────────────────────────────
  {
    slug: "najveci-kukac",
    title: "Koji je najveći kukac na planeti Zemlji?",
    summary: "Ovisno o kriteriju — težina, duljina ili raspon krila — odgovor se razlikuje. Upoznaj rekordere!",
    category: "zanimljivosti",
    sort_order: 5,
    body: `Na to pitanje nije lako odgovoriti. Ovisno o kriteriju koji je primaran — da li je to težina, dužina ili površina krila? Pojednostavljeno, rekorderi su:

• Težina — Divovska veta: Teža od nekih ptica i miševa.
• Duljina — Kineski paličnjak: Dug preko pola metra.
• Površina krila — Hercules moljac: Izgleda kao leteći tanjur u svijetu kukaca.
• Veličina tijela — Titan kornjaš: Može narasti do 17 cm i čeljustima lomiti olovke.

1. Najteži: Divovska veta (Deinacrida heteracantha)
Ako pod "najveći" mislimo na masu, pobjedu odnosi Divovska veta s Novog Zelanda.
• Ženke mogu težiti i do 70 grama (teže su od vrapca!).
• Budući da žive na otocima gdje nije bilo malih sisavaca, evolucijski su zauzele njihovu ulogu. Ne mogu letjeti, ali su masivni "tenkovi" među kukcima.

2. Najduži: Kukac paličnjak (Phryganistria chinensis)
Ako mjerimo duljinu od glave do repa, rekorder je vrsta paličnjaka otkrivena u Kini.
• Može doseći nevjerojatnih 64 centimetra s ispruženim nogama.
• Izgleda doslovno kao dugačka, tanka grana i savršeno se kamuflira u prirodi.

3. Najveća površina krila: Leptiri Hercules i Atlas
Ako gledamo raspon krila i ukupnu površinu:
• Hercules moljac (Coscinocera hercules): Ima najveću ukupnu površinu krila od svih kukaca.
• Atlas moljac (Attacus atlas): Često se navodi kao najveći zbog raspona krila koji može biti preko 25 centimetara.

Zabavna činjenica: Srećom po nas, kukci danas ne mogu biti puno veći od ovoga zbog načina na koji dišu (preko dušnica). Da u atmosferi ima više kisika, kao u doba dinosaura, vilinski konjici bi vjerojatno bili veličine jastreba!`,
  },

  // ─────────────────────────────────────────────────
  // 6. JESU LI PAUCI KUKCI?
  // ─────────────────────────────────────────────────
  {
    slug: "jesu-li-pauci-kukci",
    title: "Jesu li pauci kukci?",
    summary: "Ne — pauci imaju 8 nogu, 2 dijela tijela i nemaju ticala. Evo kako ih razlikovati od kukaca.",
    category: "zanimljivosti",
    sort_order: 6,
    body: `Ne, pauci nisu kukci.

Iako ih često trpamo u isti koš (zajedno s bubama i ostalim malim stvorenjima), oni pripadaju potpuno drugoj skupini životinja. Evo kako ih najlakše razlikovati i zašto je to važno:

Glavne razlike:

Broj nogu:
• Kukci imaju 6 nogu (3 para).
• Pauci imaju 8 nogu (4 para).

Dijelovi tijela:
• Kukci — tijelo se sastoji od 3 dijela (glava, prsište, zadak).
• Pauci — tijelo se sastoji od 2 dijela (glavopršnjak i zadak).

Antene:
• Kukci — gotovo svi imaju ticala (antene).
• Pauci — nemaju ticala.

Krila:
• Kukci — mnogi imaju krila (muhe, pčele, kornjaši).
• Pauci — nijedan pauk nema krila.

Oči:
• Kukci — imaju složene (fasetirane) oči.
• Pauci — obično imaju 8 jednostavnih očiju.

Što su oni zapravo?
Pauci spadaju u razred paučnjaka (Arachnida). U tu skupinu, osim njih, spadaju i štipavci (škorpioni), krpelji i grinje.

Zajedničko im je s kukcima to što su oboje člankonošci (imaju egzoskelet i noge sa zglobovima), ali tu njihova bliska rodbinska veza prestaje. To je otprilike kao razlika između ptica i sisavaca — oboje su kralježnjaci, ali su potpuno različite kategorije.

Zanimljivost: Pauci su zapravo jedni od najboljih prijatelja vrtlara (i nas u kućama) jer se hrane upravo — kukcima! Bez pauka, populacija muha i komaraca bila bi nepodnošljiva.`,
  },

  // ─────────────────────────────────────────────────
  // 7. NAJSMRTONOSNIJA ŽIVOTINJA
  // ─────────────────────────────────────────────────
  {
    slug: "najsmrtonosnija-zivotinja",
    title: "Koja je najsmrtonosnija životinja na planeti?",
    summary: "Nije lav, ni morski pas — nego komarac. Evo poretka prema broju ljudskih smrti godišnje.",
    category: "zanimljivosti",
    sort_order: 7,
    body: `Na pitanje koja je najsmrtonosnija životinja na planeti Zemlji, odgovor nije niti lav, nit kobra, morski pas ili vodenkonj. Možda će te iznenaditi ali to je komarac.

Evo poretka prema broju ljudskih smrti koje uzrokuju godišnje:

1. Komarac (oko 750.000 do 1.000.000 smrti godišnje)
Komarci sami po sebi nisu ti koji ubijaju, već su oni vektori (prijenosnici) smrtonosnih bolesti.
• Malarija: Odnosi najviše života, posebno u supsaharskoj Africi.
• Denga groznica, Zika virus, Žuta groznica i West Nile virus: Također se prenose ubodom komarca.

2. Čovjek (oko 400.000 do 450.000 smrti godišnje)
Nažalost, ljudi su na drugom mjestu. Ova brojka uključuje ubojstva i smrti uzrokovane ratovima i oružanim sukobima.

3. Zmije (oko 100.000 smrti godišnje)
Iako su mnoge zmije otrovne, problem je što se većina smrtnih slučajeva događa u ruralnim dijelovima svijeta gdje protuotrov nije brzo dostupan.

4. Psi (oko 25.000 do 35.000 smrti godišnje)
Ovdje nije riječ o napadima agresivnih pasa u parku, već prvenstveno o bijesnoći (rabijesu). U zemljama u razvoju, ugrizi zaraženih pasa lutalica su glavni uzrok ove smrtonosne bolesti.

Zašto "velike zvijeri" nisu na vrhu?
Morski psi, vukovi i lavovi, koje često doživljavamo kao najopasnije, godišnje ubiju zanemariv broj ljudi (morski psi npr. manje od 10 ljudi godišnje). Oni nas se uglavnom boje i izbjegavaju kontakt, dok su insekti i paraziti evolucijski prilagođeni životu uz čovjeka.

"Ubojica iz sjene": Vrijedi spomenuti i puževe (one vodene, tropske). Oni prenose bolest zvanu shistosomijaza (pužna groznica) koja godišnje ubije preko 20.000 ljudi, što ih stavlja visoko na listu najopasnijih stvorenja, odmah iza pasa.`,
  },

  // ─────────────────────────────────────────────────
  // 8. NAJOPASNIJA ŽIVOTINJA HRVATSKE
  // ─────────────────────────────────────────────────
  {
    slug: "najopasnija-zivotinja-hrvatske",
    title: "Koja je najopasnija životinja Hrvatske i Balkana?",
    summary: "Zaboravi na vukove i medvjede — pravi \"vladari opasnosti\" su krpelj, poskok i crna udovica.",
    category: "zanimljivosti",
    sort_order: 8,
    body: `Iako na našim prostorima nemamo lavove ili otrovne morske zmije, priroda u Hrvatskoj i okolici krije nekoliko stvorenja koja su, statistički gledano, najopasnija za ljude. Zaboravi na vukove i medvjede — oni su zapravo vrlo nisko na listi.

1. Krpelj (Najopasniji po zdravlje)
Slično kao i komarac na globalnoj razini, krpelj je u Hrvatskoj najopasnija životinja jer je prijenosnik ozbiljnih bolesti.
• Bolesti: Lyme borelioza i Krpeljni meningoencefalitis (KME).
• Gdje: Najviše ih ima u sjevernoj i središnjoj Hrvatskoj (šume, visoka trava).
• Zašto je opasan: Ugriz ne boli, pa ga često primijetimo prekasno, a posljedice na živčani sustav mogu biti trajne.

2. Poskok (Vipera ammodytes)
Ovo je najotrovnija zmija u Europi i najopasnija u našoj regiji.
• Prepoznavanje: Prepoznatljiv "roščić" na vrhu nosa i cik-cak šara na leđima.
• Opasnost: Njegov otrov je hemotoksičan (razara tkivo i krv), a ugriz može biti smrtonosan ako se ne primi protuotrov na vrijeme.
• Gdje: Krševiti predjeli Dalmacije, Like, Gorskog kotara, ali i unutrašnjost (npr. Medvednica, Kalnik).

3. Crna udovica (Latrodectus tredecimguttatus)
Naš najotrovniji pauk. Iako je mala, njezin je otrov izuzetno snažan.
• Prepoznavanje: Crni pauk s crvenim točkicama na zadku (obično ih ima 13).
• Opasnost: Njezin otrov je neurotoksičan. Ugriz uzrokuje nepodnošljive bolove u mišićima, grčeve i probleme s disanjem. Smrtni ishodi su danas rijetki zbog dostupne terapije, ali oporavak je dug i bolan.
• Gdje: Najčešće u priobalju, Istri i Dalmaciji (ispod kamenja, u žitu, u starim šupama).

Posebna kategorija: "Skrivene" opasnosti

Postoje i životinje koje ne smatramo agresivnima, ali uzrokuju najviše hitnih intervencija:
• Pčele, ose i stršljeni: Za osobu koja je alergična, jedan ubod obične pčele može biti smrtonosniji od ugriza poskoka (zbog anafilaktičkog šoka). Stršljen je posebno opasan zbog veće količine otrova.
• Vatreni crv i morski pauk (pauk žutac): U moru su ovo najčešći uzročnici bolnih uboda. Pauk žutac se skriva u pijesku i ima otrovne bodlje na leđima — bol nakon uboda je toliko jaka da ljudi ponekad gube svijest.

Što je s medvjedima i vukovima?
U Hrvatskoj živi oko 1.000 smeđih medvjeda. Napadi na ljude su izuzetno rijetki (obično samo ako se radi o majci s mladunčadi koju iznenadite). Statistički — radi se o samo jednom napadu sa težim fizičkim posljedicama svakih nekoliko godina. Statistika kaže da je u Hrvatskoj veća šansa da nastradate u prometnoj nesreći zbog sudara sa srnom ili divljom svinjom nego od napada predatora.`,
  },

  // ─────────────────────────────────────────────────
  // 9. IMA LI MALARIJE U HRVATSKOJ?
  // ─────────────────────────────────────────────────
  {
    slug: "malarija-u-hrvatskoj",
    title: "Ima li malarije u Hrvatskoj?",
    summary: "Danas ne, ali prije je bilo — i to u izobilju. Povijest \"neretvanske bolesti\" i kako smo je pobijedili.",
    category: "zanimljivosti",
    sort_order: 9,
    body: `Danas ne, ali prije je bilo — i to u izobilju.

Da, malarija je stoljećima bila jedna od najtežih i najraširenijih bolesti u našim krajevima. Iako je danas doživljavamo kao "tropsku bolest", ona je na Balkanu i u Hrvatskoj bila endemska pojava (stalno prisutna) sve do sredine 20. stoljeća.

1. "Neretvanska bolest" i prokletstvo močvara
Dolina Neretve bila je najpoznatije žarište. Bolest je bila toliko česta da se u narodu zvala "neretvanska bolest" ili "močvarna groznica".
• Postojala je poznata uzrečica: "Neretvo od Boga prokleta", jer su čitava sela patila od kronične iscrpljenosti i visoke smrtnosti.
• Kapetani trgovačkih galija s Hvara i Korčule imali su stroge zabrane uplovljavanja u ušće Neretve tijekom ljetnih mjeseci kako im posada ne bi stradala.

2. Pustošenje Istre i Pule
U Istri je situacija bila toliko dramatična da je malarija, uz kugu, bila glavni uzrok depopulacije (izumiranja stanovništva) čitavih područja.
• Pula: Krajem 19. stoljeća (točnije 1879. godine) grad je pogodila strašna epidemija. Pula je tada bila glavna ratna luka Austro-Ugarske, a vojnici i radnici su masovno obolijevali.
• Brijuni: Slavno otočje bilo je potpuno zapušteno i opasno po život zbog malarije sve dok ga nije kupio Paul Kupelwieser. On je doveo čuvenog nobelovca Roberta Kocha, koji je 1901. proveo sustavno liječenje stanovništva kininom i isušivanje močvara, čime su Brijuni postali prvo područje u Europi očišćeno od malarije.

3. Borba u Dalmaciji i Trogiru
Između dva svjetska rata, malarija je i dalje bila ogroman problem.
• U Trogiru je 1922. osnovan Institut za proučavanje i suzbijanje malarije jer su okolna sela bila desetkovana bolešću.
• U Ninu je dr. Rudolf Battara 1902. proveo prvi veliki znanstveni pokus liječenja cijelog mjesta, utvrdivši da je skoro 98% stanovnika Nina tada bolovalo od malarije.

4. Kako smo je pobijedili?
Iskorjenjivanje (eradikacija) nije se dogodilo samo od sebe, već kroz tri ključne metode:
1. Isušivanje močvara (Melioracija): Uništavanje staništa komaraca.
2. Uvođenje ribica (Gambuzija): U stajaće vode uvezene su male ribice (Gambusia holbrooki) koje se hrane ličinkama komaraca. One i danas žive u mnogim našim lokvama.
3. DDT i moderni lijekovi: Nakon Drugog svjetskog rata krenulo je masovno zaprašivanje nastambi insekticidima. (DDT danas strogo zabranjen kao izrazito štetan po prirodu i ljude.)

Kada je službeno nestala? Hrvatska je službeno proglašena slobodnom od malarije 1964. godine, a posljednji autohtoni (domaći) slučaj zabilježen je 1954. godine. Od tada se kod nas pojavljuju samo sporadični "importirani" slučajevi — ljudi koji se zaraze u Africi ili Aziji pa se vrate kući s bolešću.

Zanimljivost: Stare fotografije iscrpljenih težaka iz Dalmacije i Istre s početka 20. stoljeća najbolje svjedoče koliko je ta bolest tada vizualno mijenjala ljude (blijeda lica, natečeni trbusi zbog povećane slezene).`,
  },

  // ─────────────────────────────────────────────────
  // 10. THE SECRET LIFE OF BEES
  // ─────────────────────────────────────────────────
  {
    slug: "tajni-zivot-pcela",
    title: "\"Kada izumru pčele, neće preživjeti ni ljudi\"",
    summary: "Pčele oprašuju trećinu sve hrane koju jedemo. Evo zašto bi njihov nestanak bio katastrofalan.",
    category: "edukacija",
    sort_order: 10,
    body: `Ta poznata rečenica (koja se često pripisuje Einsteinu, iako on to vjerojatno nikada nije izgovorio u tom obliku) nosi u sebi duboku biološku istinu. Pčele nisu samo "proizvođači meda", one su temeljni inženjeri našeg ekosustava.

1. Oprašivanje — Hrana na našem stolu
Ovo je njihova najvažnija uloga. Procjenjuje se da pčele oprašuju oko jednu trećinu (33%) sve hrane koju ljudi konzumiraju.
• Raznolikost prehrane: Bez pčela bismo ostali bez većine voća (jabuke, kruške, jagode, bademi, trešnje), povrća (krastavci, tikvice, rajčice) i orašastih plodova.
• Kvaliteta i prinos: Čak i biljke koje se mogu djelomično oprašiti vjetrom daju puno veće, ljepše i zdravije plodove ako ih posjete pčele.
• Stočarstvo: Pčele oprašuju djetelinu i lucernu — glavnu hranu za stoku. Bez njih bi proizvodnja mesa i mliječnih proizvoda postala ekstremno skupa i neodrživa.

2. Održavanje bioraznolikosti
Pčele ne oprašuju samo naše usjeve, već i tisuće vrsta divljih biljaka.
• Lanac prehrane: Te biljke proizvode sjemenke, bobice i plodove kojima se hrane ptice i mali sisavci. Ako nestane pčela, te biljke se prestaju razmnožavati, što dovodi do izumiranja cijelog niza životinja koje ovise o njima.
• Proizvodnja kisika: Zdrave šume i livade, koje pčele održavaju, ključne su za apsorpciju CO₂ i proizvodnju kisika.

3. Pčelinji proizvodi kao prirodni lijekovi
Osim što nam pomažu da jedemo, pčele proizvode tvari koje su tisućama godina dio narodne (i moderne) medicine:
• Med: Prirodni zaslađivač s antibakterijskim svojstvima.
• Propolis: "Prirodni antibiotik" kojim pčele dezinficiraju košnicu, a ljudi ga koriste za jačanje imuniteta.
• Matična mliječ: Super-hrana bogata vitaminima i aminokiselinama.
• Pčelinji otrov (Apiterapija): Koristi se u liječenju reumatoidnog artritisa i nekih neuroloških stanja.

4. Gospodarska vrijednost
Ekonomska vrijednost usluga koje pčele pružaju svjetskoj poljoprivredi procjenjuje se na stotine milijardi eura godišnje. Bez njihove "besplatne radne snage", troškovi uzgoja hrane bi porasli do razina koje bi izazvale globalnu glad i ekonomsku krizu.

Zašto su pčele danas ugrožene?
Glavni neprijatelji pčela su:
1. Pesticidi (neonikotinoidi): Koji ih dezorijentiraju pa se ne znaju vratiti u košnicu.
2. Gubitak staništa: Monokulture u poljoprivredi (ogromna polja samo jedne kulture) znače da pčele nemaju raznoliku ishranu.
3. Klimatske promjene: Biljke cvjetaju ranije ili kasnije nego što se pčele bude iz zimskog sna.

Mali savjet: Ako imaš balkon ili vrt, možeš im pomoći tako da posadiš medonosno bilje (lavandu, ružmarin, kadulju ili bosiljak) i ljeti im ostaviš plitku posudicu s vodom i nekoliko kamenčića (da se ne utope) kako bi mogle piti.`,
  },
  // ─────────────────────────────────────────────────
  // 11. ČETIRI GLAVNE VRSTE ŽOHARA
  // ─────────────────────────────────────────────────
  {
    slug: "cetiri-vrste-zohara",
    title: "Četiri glavne vrste žohara uz čovjeka",
    summary: "Detaljni profili smeđeg, crnog, smeđe-prugastog i američkog žohara — izgled, stanište, prehrana i suzbijanje.",
    category: "edukacija",
    sort_order: 11,
    body: `Iako postoje stotine vrsta žohara u svijetu, većinu vrsta nastanjenih u prirodnim staništima nikada nećete susresti. Poznato je 4.600 vrsta žohara od kojih samo 20-tak vrsta živi u Europi, a svega nekoliko vrsta je prilagođeno suživotu s ljudima.

Planetarno poznate četiri vrste žohara:

1. SMEĐI ŽOHAR (Blattella germanica)
Najčešći kućni žohar. Smeđeg žohara nalazimo najčešće na toplim i vlažnim mjestima, u kuhinjskim blokovima, električnim aparatima, električnim instalacijama, izolacijskoj masi i ventilacijskom sustavu. Izvrstan je penjač, čak i po glatkim površinama. Odrasle jedinke su duge oko 1,1 do 1,6 cm, prepoznatljive po svijetlosmeđoj boji i dvije tamne uzdužne pruge na štitu iza glave.

2. CRNI ŽOHAR (Blatta orientalis)
Poznat i kao orijentalni žohar. Odrasle jedinke su relativno velike, duge oko 20 do 27 mm, sjajne tamno kestenjaste do potpuno crne boje. Široko, spljošteno i robusno tijelo masnog sjaja.

Stanište: Vole hladnija, tamna i izrazito vlažna mjesta. Najčešće se zadržavaju u podrumima, suterenskim stanovima, skladištima, kanalizacijskim sustavima, šahtovima i odvodima. Vani se mogu naći ispod lišća, kamenja ili kanti za smeće.

Prehrana: Svejedi — preferiraju škrobnu hranu, meso, krv i organske ostatke u raspadanju. Mogu preživjeti i do mjesec dana bez hrane, ali ugibaju nakon otprilike dva tjedna bez vode.

Krila: Mužjaci imaju krila koja pokrivaju oko tri četvrtine zatka, dok ženke imaju samo zakržljale krilne jastučiće. Unatoč prisutnosti krila, nijedan spol ne leti. Sporiji su od smeđih žohara i preferiraju kretanje po tlu.

Ispuštaju karakterističan, vrlo neugodan miris koji se može osjetiti na daljinu u prostorima s jakom infestacijom. Ženka odlaže jajnu kapsulu (ooteku) s oko 16 jaja, a razvoj do odrasle jedinke traje od 6 mjeseci do čak godinu dana.

3. SMEĐE-PRUGASTI ŽOHAR (Supella longipalpa)
Jedna od najmanjih domestificiranih vrsta, obično dug tek oko 10 do 14 mm. Ime je dobio po dvije poprečne, nepravilne i bljeđe trake (pruge) koje se protežu preko baze krila i gornjeg dijela trbuha.

KLJUČNA RAZLIKA: Za razliku od njemačkog žohara koji se drži kuhinja i kupaonica, smeđe-prugasti žohar preferira SUHA i topla mjesta! Može ga se naći u bilo kojoj prostoriji — gnijezdi se u dnevnim sobama, spavaćim sobama, uredima. Vole visoka mjesta: vrhove ormara, okvire slika, viseća rasvjetna tijela i stropove.

Skrivaju se na suhim mjestima: u naborima presvlaka namještaja, iza tapeta, u ormarima s odjećom, te unutar električnih uređaja koji generiraju toplinu. Mužjaci su dobri letači, dok ženke ne lete.

Prehrana: Pokazuju veću sklonost prema stvarima s visokim sadržajem škroba i ljepila. Jedu papir (osobito stari papir i knjige), ljepilo s tapeta, korice knjiga, poštanske marke, pa čak i sintetičke tkanine. Zbog toga se često nazivaju i "žoharom koji jede knjige".

2007. godine zabilježen je prvi nalaz Supella longipalpa u Hrvatskoj.

4. AMERIČKI ŽOHAR (Periplaneta americana)
Najveća vrsta žohara koja se uobičajeno nalazi u ljudskim nastambama — odrasle jedinke mogu doseći duljinu od 35 do 40 mm, pa čak i do 50 mm! Unatoč svom imenu, potječe iz tropske Afrike, a u Ameriku je stigao trgovačkim brodovima u 17. stoljeću.

Karakteristične su crvenkasto-smeđe do kestenjaste boje, sa sjajnim pokriljem. Na prsištu (pronotumu) imaju svijetložuti ili prljavobijeli prsten koji uokviruje tamniju sredinu — vrlo prepoznatljiv uzorak.

Oba spola imaju dobro razvijena krila, ali rijetko lete na duge staze. Češće se koriste za jedrenje s povišenih mjesta ili za kratke, nespretne letove kada su uznemireni. Idealna temperatura je oko 29°C s visokom vlagom.

U toplim klimama žive vani — u trulim panjevima, hrpama lišća, ispod kore drveća. U urbanim sredinama nalaze se u kanalizacijskim sustavima, šahtovima, podrumima, tunelima za paru, skladištima hrane, restoranima i bolnicama.

Mogu preživjeti i do mjesec dana bez hrane, ali su iznimno osjetljivi na nedostatak vode. U Hrvatskoj su prisutni, posebno u kanalizacijskim sustavima i urbanim sredinama.`,
  },

  // ─────────────────────────────────────────────────
  // 12. TREBA LI SE DRUŽITI SA ŽOHARIMA?
  // ─────────────────────────────────────────────────
  {
    slug: "treba-li-se-druziti-sa-zoharima",
    title: "Treba li se \"družiti\" sa žoharima?",
    summary: "Tri glavna načina na koje žohari ugrožavaju ljudsko zdravlje — i kako se zaštititi.",
    category: "zanimljivosti",
    sort_order: 12,
    body: `Naravno — ne.

Iako žohari ne ujedaju (barem ne u uobičajenim okolnostima) i nisu otrovni, njihova opasnost proizlazi iz njihovog načina života. Oni su, biološki gledano, "pokretni rezervoari" prljavštine i alergena.

Evo tri glavna načina na koje žohari ugrožavaju ljudsko zdravlje:

1. Prijenosnici patogenih klica (Mehanički vektori)
Žohari se hrane svime — od ostataka hrane u tvojoj kuhinji do izmeta životinja i truleži u kanalizaciji. Dok hodaju po tim prljavim mjestima, na svoje noge i tijelo skupljaju bakterije, viruse i jajašca parazita.
• Bakterije: Dokazano je da prenose preko 30 vrsta bakterija, uključujući Salmonellu, E. coli, Staphylococcus i uzročnike kolere i tifusa.
• Kontaminacija: Čim pređu preko tvog tanjura, radne plohe ili četkice za zube, oni te mikrobe ostavljaju tamo. Također, oni povraćaju i ostavljaju izmet po hrani, čime šire zarazu.

2. Izvor snažnih alergena i uzročnik astme
Ovo je možda i najozbiljnija opasnost, posebno za djecu. Žohari luče proteine u svom izmetu, slini i oklopu (koji odbacuju dok rastu).
• Alergijske reakcije: Kod mnogih ljudi ti proteini uzrokuju kihanje, suzenje očiju i kožni osip.
• Astma: Dugotrajna izloženost ostacima žohara u stanu jedan je od glavnih okidača za razvoj kronične astme kod djece koja žive u urbanim sredinama. Čak i nakon što ih istrijebite, njihovi mikroskopski ostaci u prašini mogu godinama izazivati napade.

KAKO SE ZAŠTITITI?
Generalno gledano — higijenom. No kao i kod većine drugih stvari u životu — u ničemu ne treba pretjerivati. Dovoljno je uglavnom prostore za život redovno čistiti i uređivati — što drastično smanjuje potencijalnu mogućnost da postanu "interesantni" za žohare. U slučaju da to u nekom prostoru ipak nije dovoljno, postoje jasne procedure na koji način i kako se zaštiti.`,
  },
];

async function seed() {
  console.log("Započinjem umetanje članaka u Supabase...\n");

  for (const article of articles) {
    const { error } = await supabase
      .from("articles")
      .upsert(article, { onConflict: "slug" });

    if (error) {
      console.error(`✗ GREŠKA za "${article.title}":`, error.message);
    } else {
      console.log(`✓ ${article.title}`);
      console.log(`  → slug: ${article.slug}`);
      console.log(`  → body: ${article.body.length} znakova`);
      console.log(`  → category: ${article.category}`);
      console.log();
    }
  }

  console.log("Gotovo! Provjeri podatke na: https://supabase.com/dashboard");
}

seed();
