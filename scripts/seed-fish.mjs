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
    description:
      "Grgeč (Perca fluviatilis) – europski slatkovodni grabežljivac prepoznatljiv po okomitim prugama i crvenim perajama. Naseljava rijeke, jezera i bare gotovo cijele Europe. Hrskavičaste pruge duž tijela služe kao kamuflaža među vodenim biljkama, a oštri šiljci leđne peraje odvraćaju predatore.\n\nGrgeč je izuzetno prilagodljiva vrsta — podjednako dobro živi u hladnim alpskim jezerima i toplim nizinskim ribnjacima. Poznato je da voli boraviti u malim jatima (5-20 primjeraka) blizu potopljenog drveća, stijena ili mostova, gdje čeka plijen.",
    price: 18,
    category: "predator",
    image_url: null,
    size: "15–50 cm",
    food: "Sitne ribe, račići, ličinke",
    habitat: "Rijeke, jezera, bare – cijela Europa",
    creature_type: "fish",
    fun_facts: [
      "Grgeč je jedan od najproždrljivijih slatkovodnih grabežljivaca — odrasli primjerak može pojesti i do 10 manjih riba dnevno.",
      "Crvene peraje grgeča nisu samo dekoracija — boja služi kao upozorenje predatorima da ima oštru bodljikavu leđnu peraju.",
      "Grgeč je poznati kanibal — veći primjerci redovito jedu manje pripadnike vlastite vrste, pogotovo u prenapučenim vodama.",
      "Pruge na tijelu grgeča funkcioniraju poput barkoda — svaka jedinka ima unikatan uzorak, baš kao ljudski otisak prsta.",
      "Grgeč može živjeti do 22 godine u divljini, što ga čini jednom od najdugovječnijih europskih slatkovodnih riba.",
      "Ženka grgeča polaže jaja u dugačkim vrpcama nalik na čipku — jedna vrpca može sadržavati i do 300.000 jaja.",
      "Grgeč je toliko rasprostranjen da ga možemo naći od Irske do Sibira, i od Skandinavije do Mediterana.",
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
    description:
      "Potočna pastrva (Salmo trutta) — jedna od najikoničnijih europskih slatkovodnih riba. Prepoznatljiva po tijelu posutom crnim i crvenim točkicama okruženim svijetlim oreolom. Živi u hladnim, čistim potocima i rijekama bogatim kisikom.\n\nOva vrsta je izuzetno važan bioindikator — prisutnost potočne pastrve u vodotoku siguran je znak čiste i zdrave vode. Poznata je i po svojoj morskoj formi (sea trout) koja migrira u more na hranjenje, a vraća se u slatke vode na mrijest, slično lososima.",
    price: 18,
    category: "predator",
    image_url: null,
    size: "25–80 cm",
    food: "Kukci, ličinke, sitne ribe",
    habitat: "Hladni potoci i rijeke – Europa",
    creature_type: "fish",
    fun_facts: [
      "Potočna pastrva ima morsku formu poznatu kao 'sea trout' — ista vrsta, ali naraste duplo veća jer se hrani u moru, a vraća u rijeke samo na mrijest.",
      "Pastrva može detektirati promjene u tlaku vode kroz bočnu liniju — osjetilni organ koji joj omogućuje 'osjećanje' kretanja plijena čak i u potpunom mraku.",
      "Crvene točke na tijelu pastrve sadrže pigment astaksantin — isti pigment koji daje boju flamingosima i kuhani rakovi dobivaju kuhanjem.",
      "Potočna pastrva se intenzivno uzgaja diljem svijeta — ona je jedna od prvih riba koje je čovjek počeo umjetno razmnožavati, još u 14. stoljeću u Francuskoj.",
      "Pastrva može skočiti iz vode do 1.5 metra visoko — ova sposobnost joj omogućuje prelazak malih vodopada tijekom migracije na mrijest.",
      "U Hrvatskoj, potočna pastrva je zaštićena vrsta u mnogim vodotocima — njezina prisutnost služi kao dokaz čistoće vode.",
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
