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
  {
    slug: "grgec-prozdljivost",
    title: "Grgeč — Proždrljivac Europskih Voda",
    summary:
      "Zašto je grgeč jedan od najuspješnijih slatkovodnih grabežljivaca i kako njegova proždrljivost utječe na ekosustav.",
    body: `Grgeč (Perca fluviatilis) je jedna od najrasprostranjenijih slatkovodnih riba u Europi. Njegov uspjeh kao vrste u velikoj mjeri duguje upravo svojoj nevjerojatnoj proždrljivosti i prilagodljivosti.

Odrasli grgeč je oportunistički grabežljivac — jede gotovo sve što stane u njegova usta. Dnevno može konzumirati količinu hrane jednaku 10-15% svoje tjelesne mase. Za usporedbu, to bi bilo kao da čovjek od 80 kg pojede 8-12 kg hrane dnevno.

Zanimljivo je da grgeč mijenja prehranu kako raste. Mladi primjerci hrane se zooplanktonom i ličinkama kukaca. Kada narastu na 10-15 cm, prelaze na sitne ribe, uključujući i manje primjerke vlastite vrste. Kanibalizam je čest i igra važnu ulogu u regulaciji populacije.

Grgeč lovi u malim jatima, koristeći koordiniranu taktiku okruživanja plijena. Pruge na tijelu služe kao kamuflaža — razbijaju obris tijela među vodenim biljkama i stvaraju zbunjujući vizualni efekt za plijen.

Njegova prilagodljivost na različite uvjete — od hladnih skandinavskih jezera do toplih mediteranskih rijeka — čini ga jednom od najuspješnijih slatkovodnih riba na svijetu.`,
    category: "zanimljivosti",
    sort_order: 20,
  },
  {
    slug: "pastrvka-morska-forma",
    title: "Potočna Pastrva i Njezina Morska Forma",
    summary:
      "Kako ista vrsta ribe može živjeti i u potoku i u moru, i zašto se vraća na mjesto rođenja.",
    body: `Potočna pastrva (Salmo trutta) jedna je od najfascinantnijih europskih riba upravo zbog svoje sposobnosti da živi u dva potpuno različita svijeta — slatkoj i slanoj vodi.

Dok većina potočnih pastrva cijeli život provede u hladnim potocima i rijekama, neke jedinke razviju posebnu fiziološku sposobnost prilagodbe na morsku vodu. Te jedinke migriraju nizvodno u more, gdje se hrane i rastu. Morska forma (sea trout) može narasti i do 10 kg, dok slatkovodne sestre rijetko prelaze 2 kg.

Najfascinantniji dio priče je povratak. Morske pastrve se vraćaju točno u onu rijeku, čak i u onaj potok, gdje su se izlegle. Koriste kombinaciju osjetila mirisa, magnetskog polja Zemlje i memorije struja za navigaciju. Točnost im je zapanjujuća — studije pokazuju da se više od 95% riba vrati na pravo mjesto.

Tijekom mrijesta, ženke repom kopaju plitke jame u šljunčanom dnu (tzv. mrijesne legla), polažu jaja i prekrivaju ih šljunkom. Temperatura vode mora biti između 4-10°C da jaja prežive.

U Hrvatskoj, potočna pastrva je zaštićena u mnogim vodotocima jer je osjetljiva na zagađenje i promjene u staništu. Njezina prisutnost u vodotoku služi kao siguran znak čiste i zdrave vode.`,
    category: "zanimljivosti",
    sort_order: 21,
  },
  {
    slug: "uzgoj-pastrve",
    title: "Uzgoj Pastrve — Od Srednjeg Vijeka do Danas",
    summary:
      "Povijest i razvoj uzgoja pastrve, jedne od prvih riba koje je čovjek počeo umjetno razmnožavati.",
    body: `Potočna pastrva drži neobičan rekord — ona je jedna od prvih riba u povijesti koju je čovjek počeo sustavno uzgajati. Prvi poznati zapisi o uzgoju pastrve potječu iz 14. stoljeća u Francuskoj, kada su redovnici u samostanima počeli sakupljati ikru i uzgajati mlađ.

Revolucija u uzgoju dogodila se 1842. godine kada su dva francuska ribara, Joseph Remy i Antoine Géhin, razvili prvu uspješnu tehniku umjetnog mrijesta. Otkrili su da se jaja mogu oploditi izvan tijela ribe, što je omogućilo masovnu proizvodnju mlađi.

Danas se pastrva uzgaja na svim kontinentima osim Antarktike. Globalna proizvodnja premašuje 800.000 tona godišnje. Uzgoj pastrve je posebno razvijen u Skandinaviji, Čileu, Turskoj i Hrvatskoj.

Hrvatska ima dugu tradiciju uzgoja pastrve — prvi ribnjaci osnovani su krajem 19. stoljeća na izvorima rijeka Like i Gacke. Čista, hladna voda iz krških izvora pruža idealne uvjete za uzgoj.

Moderna akvakultura pastrve koristi recirkulacijske sustave koji štede vodu i smanjuju utjecaj na okoliš. Neki napredni sustavi koriste do 99% manje vode od tradicionalnih protočnih ribnjaka.

Zanimljivost: boja mesa pastrve ovisi o prehrani — divlje pastrve imaju ružičasto meso zbog rakova koje jedu (astaksantin pigment), dok uzgojene mogu biti bijele ili ružičaste ovisno o hrani.`,
    category: "edukacija",
    sort_order: 22,
  },
];

async function seed() {
  console.log("Seeding fish articles...");

  const { data, error } = await supabase
    .from("articles")
    .upsert(articles, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("Error seeding fish articles:", error);
    process.exit(1);
  }

  console.log(
    "Successfully seeded fish articles:",
    data.map((d) => d.slug)
  );
}

seed();
