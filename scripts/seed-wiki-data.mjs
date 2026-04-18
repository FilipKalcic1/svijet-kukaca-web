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

// =====================================================
// SVE VRSTE - kompletni podaci
// =====================================================

const insects = [
  // ─────────────────────────────────────────────────
  // 1. LEPTIR MONARH (Danaus plexippus)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Leptir Monarh",
    name_science: "Danaus plexippus",
    slug: "leptir-monarh",
    creature_type: "insect",
    category: "flying",
    price: 18,
    image_url: "/placeholder-bug.png",
    habitat: "Livade, polja i vrtovi s biljkama iz porodice Svilenica",
    food: "Nektar cvjetova, biljke iz porodice Svilenica (Asclepias)",
    size: "Raspon krila 89-102 mm",
    description: `Leptir Monarh (Danaus plexippus) veliki je leptir (raspon krila od 89 do 102 mm) iz porodice šarenaca, osnovna boja krila je narančasta. Stražnja krila su nešto svjetlija pa se na njima ističu tamna rebra. Ženke imaju tamnije "vene" na svojim krilima, dok mužjaci imaju tamnu točku na središtu stražnjih krila, tzv. androconium, iz kojega se otpuštaju feromoni. Mužjaci su također i nešto krupniji.

Leptir Monarh je leptir selac, te je najpoznatiji po svojoj osmomjesečnoj seobi na sjever Stjenjaka u istočnoj Kanadi i natrag prema jugu u meksička zimovališta, udaljena oko 4.000 km. Kako pronađu svoj put do zimovališta i natrag u svom epskom putovanju, pri kojemu se smijene četiri generacije leptira, njihova krila stvore zvuk koji podsjeća na padanje kiše, a mnoge grane u rezervatu se oboje u narančasto i doslovno saviju pod težinom velikih skupina leptira, još uvijek ostaje tajnom. Zbog toga je Rezervat biosfere leptira Monarha u Meksiku upisan na UNESCO-ov popis mjesta svjetske baštine u Amerikama 2008. godine.

Leptir Monarh je od 1871. godine zabilježen i u Australiji i Novom Zelandu, gdje ga zovu "Lutalica" (en. Wanderer). Također je udomaćen na Azorima i Madeiri, a ponekad se može pronaći i u Zapadnoj Europi, te ga u Ujedinjenom Kraljevstvu zovu "Mliječni-korov" (Milkweed) po biljci kojom se hrani iz porodice Svilenica.`,
    fun_facts: [
      'Ima li Monarh leptira u Europi? U pravilu nema, iako postoji mogućnost rijetkih zalutalih primjeraka, većinom u zapadnoj Europi. Smatra se da je nedostatak njegove omiljene hrane u prirodi — svilena trava (Asclepias) — najvjerojatnije razlog zašto se monarh ne razmnožava niti trajno obitava u Europi.',

      'Ono što nazivamo Monarh leptirom u Hrvatskoj i mediteranskom dijelu Europe zapravo je Danaus chrysippus ili Afrički Monarh. Bojama je sličan slavnom Američkom Monarhu, ali je izgledom krila i veličinom ipak nešto drugačiji. Raspon krila Američkog Monarha je puno veći i ima izraženije crne "vene" na krilima.',

      'Afrički monarh (Danaus chrysippus) — izgled koji upozorava (Aposematizam): Njegova jarka narančasta boja s crnim rubovima i bijelim točkicama nije tu samo za ukras. U prirodi, ta kombinacija boja vrišti: "Otrovan sam, nemoj me jesti!" Kao gusjenica se hrani biljkama iz porodice svilenica koje sadrže otrovne srčane glikozide. Te otrove skladišti u svom tijelu, pa i kao odrasli leptir ostaje neukusan i opasan za grabežljivce.',

      'Afrički monarh — Kralj mimikrije: On je toliko "uspješan" u svojoj obrani da ga drugi, potpuno jestivi leptiri, kopiraju. To se zove Batesova mimikrija. Druge vrste evolucijski su razvile gotovo identične šare na krilima kako bi prevarile ptice da pomisle da su i oni otrovni.',

      'Razlika mužjak/ženka kod Afričkog monarha: Mužjak na stražnjim krilima ima četiri male crne točkice (jedna od njih je zapravo posebna vrećica koja luči feromone za privlačenje ženki). Ženka ima samo tri točkice na stražnjim krilima.',

      'Afrički monarh — seoba i Hrvatska: Iako mu je glavno stanište Afrika, on redovito "posjećuje" Europu. Posljednjih godina, zbog zatopljenja, sve ga se češće viđa u Dalmaciji i na otocima. Za fotografe u našim krajevima, on je prava "poslastica" jer unosi dašak egzotike u domaće kadrove.',

      'Životni ciklus Afričkog monarha — potpuna preobrazba: 1. Jaje (polaže se na list svilenice) → 2. Ličinka/Gusjenica (prepoznatljiva po crnim, žutim i bijelim prugama) → 3. Kukuljica (prekrasne blijedozelene boje sa zlatnim točkicama) → 4. Imago/Odrasli leptir (živi od nekoliko tjedana do nekoliko mjeseci).',

      'Savjet za fotografiranje: Afrički monarh je poznat po tome što je prilično "flegmatičan". Zbog svog otrova se ne boji previše, pa mu se možeš približiti s makro objektivom puno lakše nego nekim drugim vrstama. Najbolje ga je vrebati rano ujutro dok se "zagrijava" na suncu — tada su mu krila potpuno raširena i miruje.',
    ],
    gallery_images: [
      "ZAMIJENI_URL: monarh-dorzalna-strana-krila.jpg — Mužjak (gore) i ženka (dolje), dorzalna (gornja) strana krila",
      "ZAMIJENI_URL: monarh-ventralna-strana-krila.jpg — Mužjak (gore) i ženka (dolje), ventralna (donja) strana krila, blijeđe boje",
      "ZAMIJENI_URL: monarh-distribucija-karta.jpg — Karta rasprostranjenosti Leptira Monarha u svijetu s godinama kolonizacije",
    ],
  },

  // ─────────────────────────────────────────────────
  // 2. SMEĐI ŽOHAR (Blattella germanica)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Smeđi Žohar",
    name_science: "Blattella germanica",
    slug: "smedji-zohar",
    creature_type: "insect",
    category: "crawling",
    price: 18,
    image_url: "/placeholder-bug.png",
    habitat: "Kuhinje, kupaonice — topla, vlažna i mračna mjesta uz ljude",
    food: "Svejedi — hrana, papir, ljepilo, koža, sapun",
    size: "11-16 mm",
    description: `Smeđi žohar (Blattella germanica), poznat i kao Njemački žohar, jedan je od najčešćih i najomraženijih kućnih nametnika na svijetu. Odrasle jedinke su duge oko 1,1 do 1,6 cm. Prepoznatljivi su po svijetlosmeđoj do tamnosmeđoj boji i dvije tamne, uzdužne pruge na štitu odmah iza glave (pronotum). Iako imaju krila, rijetko lete, već preferiraju brzo trčanje.

Vole topla, vlažna i mračna mjesta, zbog čega se najčešće nastanjuju u kuhinjama i kupaonicama. Skrivaju se u pukotinama, iza elemenata, ispod uređaja (poput hladnjaka ili pećnice) i u odvodima. Nisu izbirljivi u prehrani — jedu gotovo sve organsko: ostatke ljudske hrane (osobito škrob, šećer i masnoću), papir, ljepilo, kožu, pa čak i sapun.

Razmnožavaju se iznimno brzo. Ženka nosi kapsulu s jajima (ooteka) dok se mladi ne izlegu, što povećava stopu preživljavanja. Jedna kapsula može sadržavati 30-40 jaja, a životni ciklus od jajeta do odrasle jedinke traje tek nekoliko mjeseci.

Iako ne grizu, predstavljaju značajan zdravstveni rizik. Mogu kontaminirati hranu i površine patogenima koje prenose na tijelu i nogama, što može uzrokovati bolesti poput salmoneloze ili dizenterije. Također, njihovi izlučevine, odbačeni oklopi i izmet mogu kod mnogih ljudi izazvati alergijske reakcije i astmu.

Najaktivniji su noću. Ako ih vidite tijekom dana, to često ukazuje na veliku prenaseljenost i potrebu za hitnom dezinsekcijom. Pretpostavka je da jedan uočen žohar u nekom prostoru predstavlja još sto skrivenih u zidovima, elementima i odvodima — kada ugledate jednog žohara u svom stanu, vjerojatno ste naišli samo na izvidnicu.`,
    fun_facts: [
      'Na svijetu postoji oko 4.600 opisanih vrsta žohara. Samo 1% (oko 30 vrsta) su "negativci" koji žive uz ljude. Ostalih 99% živi u prirodi (šumama, pećinama, ispod kore drveta) i igraju ključnu ulogu u ekosustavu reciklirajući organski otpad. Neki žohari u tropima su predivnih metalik boja, dok neki, poput madagaskarskog sikćućeg žohara, mogu narasti do 8 cm i biti kućni ljubimci.',

      'Žohari postoje u gotovo nepromijenjenom obliku više od 300 milijuna godina — stariji su od dinosaura! Genetska istraživanja potvrdila su da su i termiti zapravo evolucijska grana žohara, pa ih neki biolozi danas klasificiraju pod isti red (Blattodea).',

      'Balkanski naziv "Buba-švaba" nastao je kao narodna prevedenica imena Njemački žohar (Blattella germanica). Ali Njemački žohar uopće nije originalno iz Njemačke — podrijetlo vuče iz južne Azije, točnije s područja istočne Indije i Bangladeša. Razvio se prije otprilike 2.100 godina od azijskog žohara (Blattella asahinai).',

      'Ime mu je dao švedski biolog Carl Linnaeus 1767. godine, jer su primjerci koje je proučavao prikupljeni u Njemačkoj. Tijekom Sedmogodišnjeg rata (1756.–1763.), neprijateljske vojske su ga nazivale po svojim suparnicima — npr. Rusi su ga zvali "pruski žohar".',

      'U Europu su stigli prije otprilike 270 godina (sredinom 18. stoljeća), vjerojatno trgovačkim putevima ili s vojskama. Većina žohara blizu čovjeka su "doseljenici" — čovjek ih je osvajanjima, putovanjima i trgovinom prenosio sa kontinenta na kontinent.',

      'Planetarno poznate četiri vrste žohara uz čovjeka: Smeđi žohar (Blattella germanica), Crni žohar (Blatta orientalis), Smeđe-prugasti žohar (Supella longipalpa) i Američki žohar (Periplaneta americana). U Hrvatskoj su najčešći smeđi i crni žohar.',

      'Crni žohar (Blatta orientalis) — velik (20-27 mm), sjajne tamno kestenjaste do crne boje. Preferira hladnija, vlažna mjesta: podrume, kanalizaciju, šahtove. Mužjaci imaju krila ali ne lete. Sporiji je od smeđeg žohara. Može preživjeti mjesec dana bez hrane, ali ugiba nakon dva tjedna bez vode.',

      'Američki žohar (Periplaneta americana) — najveća vrsta uz čovjeka (do 50 mm!). Unatoč imenu, potječe iz tropske Afrike, u Ameriku stigao brodovima u 17. st. Prepoznatljiv po crvenkasto-smeđoj boji i svijetložutom prstenu na prsištu. Rijetko leti, ali može "jedriti" s povišenih mjesta.',

      'Smeđe-prugasti žohar (Supella longipalpa) — najmanji (10-14 mm), prvi put zabilježen u Hrvatskoj 2007. godine. Za razliku od drugih žohara, preferira SUHA i topla mjesta! Gnijezdi se u dnevnim sobama, spavaćim sobama, uredima — ne samo u kuhinjama. Poznat kao "žohar koji jede knjige" jer voli papir i ljepilo.',

      'Žohari su organizirani poput vojske — u izvidnicu nepoznatog terena prvo šalju jednog "izviđača". Tek kada se on vrati, kreće invazija. Ako se izviđač ne vrati, šalju sljedećega i tako redom, sve dok ne dobiju dovoljno kvalitetnih informacija s terena.',

      'Žohari prenose preko 30 vrsta bakterija (Salmonella, E. coli, Staphylococcus, uzročnike kolere i tifusa). Njihovi mikroskopski ostaci u prašini (izmet, oklopi, slina) mogu GODINAMA izazivati alergije i astmu, čak i nakon potpunog istrebljenja — jedan od glavnih okidača kronične astme kod djece u urbanim sredinama.',

      'Često se kaže da bi žohari preživjeli nuklearni rat ili pad asteroida. Nevjerojatno su prilagodljivi svejedi koji posjeduju funkcionalnu hijerarhijsku organizaciju unutar grupe. No s druge strane, navikli su na suživot uz ljude — pitanje je kako bi preživjeli bez nas.',

      'Žohari su svejedi i vrlo prilagodljivi. Kada su u podnebljima hladnije klime, jednostavno ne izlaze "van" već se drže grijanih prostora koje im je zagrijao čovjek — stoga su u prednosti pred drugim vrstama.',

      'Žohari ugrožavaju zdravlje na tri načina: 1) Mehanički su vektori — na nogama i tijelu skupljaju bakterije dok hodaju po prljavim mjestima, pa ih ostavljaju na tanjurima i radnim plohama. 2) Izvor su snažnih alergena — proteini u izmetu, slini i oklopu kod mnogih izazivaju alergije i astmu. 3) Njihovi mikroskopski ostaci u prašini mogu GODINAMA izazivati napade astme, čak i nakon potpunog istrebljenja.',

      'Kako se zaštititi? Generalno — higijenom. Dovoljno je prostore redovno čistiti i uređivati, što drastično smanjuje mogućnost da postanu "interesantni" za žohare. U slučaju infestacije, preporučuje se angažiranje profesionalaca za dezinsekciju.',
    ],
    gallery_images: null,
  },

  // ─────────────────────────────────────────────────
  // 3. BUMBAR (Bombus) — ažurira stari "bumbar" zapis
  // ─────────────────────────────────────────────────
  {
    name_hr: "Bumbar",
    name_science: "Bombus",
    slug: "bumbar",
    creature_type: "insect",
    category: "flying",
    price: 18,
    image_url: "/placeholder-bug.png",
    habitat: "Livade, vrtovi, šumski rubovi — gnijezda u napuštenim rupama glodavaca",
    food: "Nektar i pelud cvjetova",
    size: "11-23 mm",
    description: `U svijetu postoji preko 250 vrsta bumbara (rod Bombus). Oni su fascinantni i iznimno korisni kukci, ključni za oprašivanje mnogih biljaka.

Bumbari su prepoznatljivi po svom debelom, zaobljenom tijelu koje je prekriveno gustim, mekanim dlačicama. Ovo "krzno" im služi kao izolacija, omogućujući im da ostanu aktivni i na nižim temperaturama. Najčešće su crni sa žutim, bijelim ili narančastim prugama, što je oblik upozoravajuće obojenosti (aposematizam) koja grabežljivce upozorava na njihov žalac.

Većina vrsta bumbara živi u društvenim zajednicama (kolonijama), ali za razliku od pčela medarica, njihove kolonije su jednogodišnje. Kolonija može brojiti od nekoliko desetaka do nekoliko stotina jedinki — mnogo manje nego kod pčela.`,
    fun_facts: [
      'Za razliku od pčela medarica, ženke bumbara (matice i radilice) mogu ubosti više puta jer njihov žalac nema kukice i ne ostaje u koži nakon uboda. Međutim, bumbari su općenito miroljubivi i ubadaju samo u samoobrani ili ako osjete da im je gnijezdo ugroženo. Mužjaci bumbara (trutovi) nemaju žalac.',

      'Životni ciklus kolonije: U proljeće, mlada oplođena matica koja je prezimila u zemlji izlazi i sama osniva novu koloniju. Pronalazi mjesto za gnijezdo (često napuštene rupe glodavaca, ispod kamenja ili u gustoj travi), gradi prve ćelije od voska i polaže jaja.',

      'Ljeti iz prvih jaja izliježu se radilice (ženke) koje preuzimaju poslove sakupljanja hrane, brige o potomstvu i obrane gnijezda. Kasno ljeto/jesen kolonija počinje proizvoditi nove matice i mužjake koji se pare. Sa zimom, stara matica, radilice i mužjaci ugibaju — samo oplođene mlade matice prezime u zemlji.',

      'Bumbari su izuzetno učinkoviti oprašivači. Zbog svoje veličine i dlakavosti, na njihovom tijelu se nakuplja velika količina peluda.',

      'Zujavo oprašivanje (Buzz pollination): Neke biljke (poput rajčice, paprike, borovnice) zahtijevaju specifičnu vibraciju kako bi otpustile pelud. Bumbari su majstori ove tehnike — uhvate se za cvijet i snažno vibriraju mišićima za letenje, izazivajući "eksploziju" peluda. Pčele medarice to ne mogu.',

      'Zahvaljujući dlakavosti i sposobnosti generiranja topline, bumbari mogu letjeti i oprašivati pri nižim temperaturama (već od 5-10°C), po oblačnom vremenu, pa čak i po laganoj kiši, kada pčele medarice ne izlaze iz košnice.',

      'Postoji posebna skupina bumbara (podrod Psithyrus), poznata kao bumbari kukavice. Oni ne grade vlastita gnijezda niti imaju radilice. Ženka bumbara kukavice ulazi u gnijezdo druge vrste bumbara, ubija ili dominira nad postojećom maticom i polaže svoja jaja, a radilice domaćina nesvjesno brinu o njezinom potomstvu.',
    ],
    gallery_images: null,
  },

  // ─────────────────────────────────────────────────
  // 4. BUBAMARA / BOŽJA OVČICA (Coccinellidae)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Božja Ovčica",
    name_science: "Coccinellidae",
    slug: "bozja-ovcica",
    creature_type: "insect",
    category: "flying",
    price: 18,
    image_url: "/placeholder-bug.png",
    habitat: "Vrtovi, livade, šume — blizu kolonija lisnih ušiju",
    food: "Lisne uši, grinje, štitaste uši, jaja drugih kukaca",
    size: "Do 1 cm",
    description: `Bubamare, poznate i kao božje ovčice, fascinantni su kukci iz porodice Coccinellidae. Širom svijeta postoji preko 5000 vrsta, a na našim prostorima oko 60.

Imaju prepoznatljivo poluloptasto, ovalno tijelo. Većina vrsta je jarkih boja — crvene, narančaste ili žute — s crnim točkicama. Ove boje služe kao upozorenje predatorima da bubamara nije ukusna. Broj točkica varira ovisno o vrsti i ne označava starost kukca. Imaju dva para krila: gornja tvrda krila (pokrilje) štite donja opnasta krila koja služe za letenje.

Većina bubamara, i odrasli kukci i ličinke, su proždrljivi mesožderi. Njihova glavna hrana su lisne uši, sitni nametnici koji uništavaju biljke sišući njihove sokove. Zbog toga su bubamare iznimno korisne u poljoprivredi i vrtlarstvu kao prirodna kontrola štetočina.`,
    fun_facts: [
      'Tijekom svog života, jedna bubamara može pojesti i do 5000 lisnih ušiju! Osim njih, hrane se i grinjama, štitastim ušima i jajima drugih kukaca. Postoje i vrste koje su biljožderi (poput 24-točkaste bubamare) ili se hrane gljivicama poput pepelnice.',

      'Na glavi imaju ticala pomoću kojih osjećaju miris i opip, a nogama također mogu "mirisati" okolinu.',

      'Bubamare prolaze potpunu preobrazbu u četiri stadija: 1. Jaje (mala, ovalna, žuta ili narančasta, položena blizu kolonije lisnih ušiju) → 2. Ličinka (proždrljive, podsjećaju na malene aligatore, tamne s narančastim mrljama, jedu više nego odrasli kukci) → 3. Kukuljica (tjedan-dva nepomična na listu) → 4. Odrasli kukac.',

      'Kad odrasla bubamara izađe iz kukuljice, tijelo joj je mekano i blijedo, bez točkica. Tek nakon nekoliko sati pokrilje očvrsne i dobije svoju karakterističnu boju.',

      'Zimska hibernacija: Bubamare prezimljuju kao odrasli kukci. Često se okupljaju u velikim skupinama na skrovitim mjestima — pukotinama u kori drveća, pod kamenjem, u gustoj travi, pa čak i u pukotinama prozora u kućama.',

      'U mnogim kulturama bubamara se smatra simbolom sreće. Vjeruje se da donosi radost i blagostanje, te da je loš znak ubiti je. U nekim tradicijama, broj točkica na bubamari koja sleti na ruku označava broj sretnih mjeseci ili broj djece koju će osoba imati.',

      'Obrambeni mehanizam: Kad je u opasnosti, bubamara može ispustiti žutu, neugodnu tekućinu (hemolimfu) iz zglobova nogu, koja odbija predatore svojim mirisom i okusom.',

      'U Europu i Sjevernu Ameriku uvezena je azijska bubamara (Harmonia axyridis) radi biološke kontrole štetočina. Međutim, ova vrsta se pokazala invazivnom — često istiskuje domaće vrste bubamara i može predstavljati problem jer u jesen u velikom broju ulazi u kuće.',

      'Bubamare zaslužuju našu zaštitu! Posadite u svom vrtu biljke koje ih privlače (poput kopra, komorača, nevena ili stolisnika) i izbjegavajte korištenje kemijskih pesticida kako biste im osigurali siguran dom.',
    ],
    gallery_images: null,
  },

  // ─────────────────────────────────────────────────
  // 5. BOGOMOLJKA (Mantodea)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Bogomoljka",
    name_science: "Mantodea",
    slug: "bogomoljka",
    creature_type: "insect",
    category: "crawling",
    price: 18,
    image_url: "/placeholder-bug.png",
    habitat: "Livade, grmlje, vrtovi — toplija područja",
    food: "Muhe, skakavci, leptiri — isključivo mesožderi",
    size: "40-80 mm",
    description: `Bogomoljke (Mantodea) su red velikih, grabežljivih kukaca poznatih po svom jedinstvenom izgledu i fascinantnom ponašanju. Širom svijeta postoji preko 2400 vrsta.

Ime su dobile po karakterističnom položaju prednjih nogu koje, dok miruju, drže sklopljene ispred tijela, što podsjeća na sklopljene ruke pri molitvi. No taj pobožni izgled je varka — prednje noge su zapravo smrtonosno oružje, opremljene oštrim bodljama i izuzetno brze, prilagođene za munjevito hvatanje plijena u letu ili zasjedi.

Imaju trokutastu glavu koja se može okretati za gotovo 180 stupnjeva i velike, složene oči koje im daju izvrstan binokularni vid. Tijelo im je često savršeno kamuflirano (bojom i oblikom) kako bi nalikovalo lišću, grančicama ili cvijeću.`,
    fun_facts: [
      'Isključivo su mesožderi. Hrane se drugim kukcima (muhama, skakavcima, leptirima), a veće vrste mogu napasti i manji plijen poput guštera, žaba, pa čak i kolibrića!',

      'Seksualni kanibalizam: Najpoznatija zanimljivost je da ženka ponekad tijekom ili nakon parenja pojede mužjaka. Ovo ponašanje osigurava ženki potrebne nutrijente za razvoj jajašaca.',

      'Bogomoljke su majstorice kamuflaže. Neke tropske vrste toliko vjerno oponašaju cvijeće da ih kukci dolaze "oprašivati" — pravo na tanjur!',

      'Glava bogomoljke može se okretati za gotovo 180 stupnjeva, što je jedinstveno među kukcima. To im daje izvrstan pregled okoline dok čekaju plijen u zasjedi.',

      'Velike, složene oči daju im binokularni vid — mogu točno procijeniti udaljenost plijena, slično kao ljudi. Većina kukaca nema tu sposobnost.',
    ],
    gallery_images: null,
  },
];

async function seed() {
  console.log("Započinjem umetanje podataka u Supabase...\n");

  for (const insect of insects) {
    const { data, error } = await supabase
      .from("creatures")
      .upsert(insect, { onConflict: "slug" })
      .select("id, name_hr, slug");

    if (error) {
      console.error(`✗ GREŠKA za ${insect.name_hr}:`, error.message);
    } else {
      console.log(`✓ ${insect.name_hr} (${insect.name_science}) — slug: ${insect.slug}`);
      console.log(`  → description: ${insect.description.length} znakova`);
      console.log(`  → fun_facts: ${insect.fun_facts.length} stavki`);
      console.log(`  → gallery_images: ${insect.gallery_images ? insect.gallery_images.length + ' slika (placeholder)' : 'nema'}`);
      console.log();
    }
  }

  console.log("Gotovo! Provjeri podatke na: https://supabase.com/dashboard");
}

seed();
