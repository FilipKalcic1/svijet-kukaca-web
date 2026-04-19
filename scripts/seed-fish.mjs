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
// RIBE - kompletni podaci
// =====================================================

const fish = [
  // ─────────────────────────────────────────────────
  // 1. GRGEČ (Perca fluviatilis)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Grgeč",
    name_science: "Perca fluviatilis",
    slug: "grgec",
    description: `Grgeč (Perca fluviatilis) — europski slatkovodni grabežljivac prepoznatljiv po okomitim tamnim prugama i živopisnim crveno-narančastim perajama. Naseljava rijeke, jezera i bare gotovo cijele Europe, od Irske do Sibira. Hrskavičaste pruge duž tijela služe kao kamuflaža među vodenim biljkama i sjenkama, a oštri šiljci bodljikave leđne peraje odvraćaju čak i veće predatore.

Grgeč je izuzetno prilagodljiva vrsta — podjednako dobro živi u hladnim alpskim jezerima, toplim nizinskim ribnjacima, pa čak i u bočatim vodama Baltika. Poznato je da voli boraviti u malim jatima (5–20 primjeraka) blizu potopljenog drveća, stijena ili mostova, gdje strpljivo čeka plijen iz zasjede.

U Hrvatskoj, grgeč je jedan od najpopularnijih sportskih ulova — ribolovci ga cijene zbog borbenosti na udici i izvrsnog bijelog mesa. Naseljava gotovo sve nizinske rijeke (Sava, Drava, Dunav, Kupa) te brojne akumulacije i šljunčare. U akvaristici, mladi grgeči su omiljeni jer su aktivni, znatiželjni i lako se promatraju.

Grgeč igra ključnu ulogu u ekosustavu slatkih voda kao "srednji predator" — kontrolira populacije sitnih riba i beskralježnjaka, a istovremeno služi kao plijen većim grabežljivcima poput soma i štuke. Bez grgeča, mnogi slatkovodni ekosustavi bi izgubili ravnotežu.`,
    price: 18,
    category: "predator",
    image_url: "/assets/mockups/grgec-front.png",
    size: "15–50 cm (rekord: 60 cm, 4.75 kg)",
    food: "Sitne ribe, račići, ličinke kukaca, zooplankton (mladi)",
    habitat: "Rijeke, jezera, bare, akumulacije — cijela Europa",
    creature_type: "fish",
    fun_facts: [
      "Grgeč je jedan od najproždrljivijih slatkovodnih grabežljivaca — odrasli primjerak može pojesti i do 10 manjih riba dnevno. U jesen pojačano jede kako bi nakupio masne rezerve za zimu, kada mu metabolizam značajno usporava.",

      "Crvene peraje grgeča nisu samo dekoracija — boja služi kao upozorenje predatorima da ima oštru bodljikavu leđnu peraju. Ova strategija se zove aposematizam, ista koju koriste otrovna stvorenja poput otrovnih žaba.",

      "Grgeč je poznati kanibal — veći primjerci redovito jedu manje pripadnike vlastite vrste, pogotovo u prenapučenim vodama. Ovo samoreguliranje populacije je zapravo korisno jer sprečava prenapučenost i osigurava da preživljavaju najjači primjerci.",

      "Pruge na tijelu grgeča funkcioniraju poput barkoda — svaka jedinka ima unikatan uzorak, baš kao ljudski otisak prsta. Znanstvenici koriste ovu osobinu za praćenje pojedinačnih riba u populacijskim studijama bez potrebe za fizičkim označavanjem.",

      "Grgeč može živjeti do 22 godine u divljini, što ga čini jednom od najdugovječnijih europskih slatkovodnih riba. Prosječni životni vijek u prirodi je 7–10 godina, ali u idealnim uvjetima hladnih sjevernih jezera može dosegnuti i dva desetljeća.",

      "Ženka grgeča polaže jaja u dugačkim vrpcama nalik na čipku — jedna vrpca može sadržavati i do 300.000 jaja koja lijepi za potopljene grane i vodeno bilje. Jajašca su prozirna i ljepljiva, a izgledaju poput miniaturne ogrlice od bisera.",

      "Grgeč je toliko rasprostranjen da ga možemo naći od Irske do Sibira, i od Skandinavije do Mediterana. Čovjek ga je introducirao i u Australiju, Južnu Afriku i Novi Zeland, gdje je ponegdje postao invazivna vrsta.",

      "Mladi grgeči (do 10 cm) žive u velikim jatima i hrane se zooplanktonom. Kad narastu iznad 15 cm, prelaze na prehranu ribom — ovaj prijelaz se zove 'ontogenetski pomak prehrane' i ključan je trenutak u životu svakog grgeča.",

      "Grgeč ima izvanredan vid — njegove oči su prilagođene za lov u uvjetima slabe vidljivosti. Poseban reflektirajući sloj iza mrežnice (tapetum lucidum), sličan onome kod mačaka, pojačava raspoloživu svjetlost i omogućuje lov u sumraku i zoru.",

      "U hrvatskim vodama, grgeč je jedna od prvih riba koje mladi ribolovci ulov — njegova radoznalost i sklonost napadanju mamaca čine ga idealnom 'učiteljicom' za početnike. Mnogi ribički veterani kažu: 'Tko nauči loviti grgeča, može loviti bilo što.'",

      "Grgeč je bio jedna od prvih europskih riba koja je znanstveno opisana — sam Carl Linnaeus ga je klasificirao 1758. godine u svom djelu Systema Naturae, dajući mu ime koje nosi do danas: Perca fluviatilis.",

      "Temperatura vode drastično utječe na aktivnost grgeča — najaktivniji je pri 18–22°C. Ispod 4°C gotovo prestaje jesti i ulazi u stanje smanjene aktivnosti, skupljajući se u dublje dijelove jezera ili rijeke.",
    ],
    gallery_images: [],
    related_slugs: ["pastrvka"],
  },

  // ─────────────────────────────────────────────────
  // 2. POTOČNA PASTRVA (Salmo trutta)
  // ─────────────────────────────────────────────────
  {
    name_hr: "Potočna Pastrva",
    name_science: "Salmo trutta",
    slug: "pastrvka",
    description: `Potočna pastrva (Salmo trutta) — jedna od najikoničnijih europskih slatkovodnih riba. Prepoznatljiva po vitkom, torpedastom tijelu posutom crnim i crvenim točkicama okruženim svijetlim oreolom. Živi u hladnim, čistim potocima i rijekama bogatim kisikom.

Ova vrsta je izuzetno važan bioindikator — prisutnost potočne pastrve u vodotoku siguran je znak čiste i zdrave vode. Osjetljiva je na zagađenje, povišenu temperaturu i smanjeni protok, pa njezino nestajanje iz vodotoka obično znači da nešto nije u redu s kvalitetom vode.

Poznata je i po svojoj morskoj formi (sea trout) koja migrira u more na hranjenje, a vraća se u slatke vode na mrijest, slično lososima. Ista vrsta može proizvesti potočnu, jezersku ili morsku formu — sve ovisi o uvjetima okoliša u kojem riba odrasta.

U Hrvatskoj, potočna pastrva je zaštićena vrsta u mnogim vodotocima. Naseljava gornje tokove jadranskih i podunavskih rijeka — Gacku, Koranu, Dobru, Mrežnicu, te mnoge planinske potoke Gorskog kotara, Like i Dalmacije. Hrvatska populacija spada među genetski najčistije u Europi jer nije bila izložena masovnom poribljavanju stranim sojevima.`,
    price: 18,
    category: "predator",
    image_url: null,
    size: "25–80 cm (morska forma do 140 cm)",
    food: "Kukci, ličinke, sitne ribe, rakovi",
    habitat: "Hladni potoci i rijeke — Europa, sjeverozapadna Afrika",
    creature_type: "fish",
    fun_facts: [
      "Potočna pastrva ima morsku formu poznatu kao 'sea trout' — ista vrsta, ali naraste duplo veća jer se hrani u moru, a vraća u rijeke samo na mrijest. Morska forma može narasti i preko 20 kg, dok potočna rijetko prelazi 5 kg.",

      "Pastrva može detektirati promjene u tlaku vode kroz bočnu liniju — osjetilni organ koji joj omogućuje 'osjećanje' kretanja plijena čak i u potpunom mraku. Ovaj 'šesti osjet' toliko je precizan da pastrva može odrediti veličinu i brzinu objekta na udaljenosti od nekoliko metara.",

      "Crvene točke na tijelu pastrve sadrže pigment astaksantin — isti pigment koji daje boju flamingosima i koji rakovi dobivaju kuhanjem. Intenzitet boje točaka ovisi o prehrani i kvaliteti vode — što je voda čistija i hrana bogatija, točke su jače crvene.",

      "Potočna pastrva se intenzivno uzgaja diljem svijeta — ona je jedna od prvih riba koje je čovjek počeo umjetno razmnožavati, još u 14. stoljeću u Francuskoj. Danas se uzgaja na svim kontinentima osim Antarktike.",

      "Pastrva može skočiti iz vode do 1.5 metra visoko — ova sposobnost joj omogućuje prelazak malih vodopada tijekom migracije na mrijest. Riblje staze (fish ladders) na branama dizajnirane su upravo s ovom sposobnošću na umu.",

      "U Hrvatskoj, potočna pastrva je zaštićena vrsta u mnogim vodotocima — njezina prisutnost služi kao dokaz čistoće vode. Gacka, Kupa i mnogi gorski potoci Gorskog kotara dom su nekim od genetski najčišćih populacija u cijeloj Europi.",

      "Pastrva je izuzetno teritorijalna — svaka odrasla jedinka brani svoj dio potoka (feeding station) od drugih pastrva. Dominantne ribe zauzimaju najbolje pozicije s jakom strujom koja donosi najviše hrane, dok su slabije ribe gurnute na rubove.",

      "Mrijest potočne pastrve događa se u kasnu jesen i zimu (studeni-prosinac) u plitkim šljunkovitim dijelovima potoka. Ženka repom iskopa 'gnijezdo' (redd) u šljunku, položi jaja, a mužjak ih oplodi. Cijeli proces traje tek nekoliko sekundi.",

      "Potočna pastrva je omiljena vrsta u mušičarenju (fly fishing) — sportu koji datira iz 2. stoljeća. Umjetne mušice imitiraju kukce kojima se pastrva hrani, a izbor prave mušice zahtijeva poznavanje lokalne entomofaune — znanje o kukcima koji žive uz vodotok.",
    ],
    gallery_images: [],
    related_slugs: ["grgec"],
  },
];

async function seed() {
  console.log("Seeding fish data...");

  const { data, error } = await supabase
    .from("creatures")
    .upsert(fish, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("Error seeding fish:", error);
    process.exit(1);
  }

  console.log(
    "Successfully seeded fish:",
    data.map((d) => d.slug)
  );
}

seed();
