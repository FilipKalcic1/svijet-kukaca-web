export type LegalSection = {
  title: string;
  content: string;
};

export type LegalPage = {
  slug: string;
  heading: string;
  intro?: string;
  sections: LegalSection[];
};

export const legalPages: Record<string, LegalPage> = {
  "o-projektu": {
    slug: "o-projektu",
    heading: "O Projektu",
    intro:
      "KAYAHA je modni brend, ali i puno više od toga — ona je dio velikog STEM projekta kojemu je cilj skretanje pozornosti javnosti na važnost očuvanja kukaca u prirodi.",
    sections: [
      {
        title: "Zašto kukci?",
        content:
          "Svi ste vjerojatno čuli za tvrdnju: \"Ako izumru pčele, izumrijet će i ljudi.\" Nitko se ne usudi decidirano tvrditi je li tome zaista tako, ali nitko ni najmanje ne osporava činjenicu da su kukci nezaobilazni u svim biološkim karikama funkcioniranja svijeta — od oprašivanja bilja, utjecaja na tlo, biljni svijet pa nadalje, preva žna karika u hranidbenim lancima i ostalom.",
      },
      {
        title: "Prijetnje koje kukci lice",
        content:
          "Kukci su danas izloženi nemilosrdnim okolnostima koje mnoge vrste desetkuju i dovode na rub izumiranja. Pesticidi, zaprašivanja, moderna monokulturna poljoprivreda, zagađenja zraka, tla i vode, urbanizacija, sječa šuma i uništenje livada i močvara, betonizacija, promet — sve to drastično utječe na brojnost i raširenost vrsta.",
      },
      {
        title: "Naša misija",
        content:
          "Ovaj projekt pokušava ojačati svjesnost ljudi, educirati ljude o kukcima i dati jednu novu perspektivu — da se ne radi samo o štetnicima i nametnicima, naprotiv — radi se o našim ekološkim suputnicima, presudno bitnim za eko sustav. Svaki QR kod na leđima naše majice vodi na wiki stranicu s pričom o kukcu kojeg nosiš.",
      },
    ],
  },

  uvjeti: {
    slug: "uvjeti",
    heading: "Opći uvjeti poslovanja",
    intro:
      "Ovim uvjetima utvrđuje se odnos između modne marke KAYAHA i kupca. Korištenjem webshopa, kupac prihvaća ove uvjete.",
    sections: [
      {
        title: "1. Karakteristike proizvoda",
        content:
          "Nastojimo što vjernije prikazati boje artikala. Ipak, zbog različitih postavki monitora i osvjetljenja, ne možemo jamčiti da će prikaz na vašem ekranu biti 100% identičan boji isporučenog artikla.\n\nSlikovni prikazi na majicama mogu kod pojedinih osoba izazvati iznenađenje, neugodu ili strah. Kupci kupovinom ove majice prihvaćaju da su upoznati s navedenim te samom kupnjom na sebe preuzimaju odgovornost zbog eventualnih neugodnosti koje bi mogle proizaći iz samog slikovnog prikaza.\n\nUz svaki artikl priložena je tablica veličina. Odstupanja od ±2 cm u dimenzijama smatraju se uobičajenim u tekstilnoj industriji i ne smatraju se greškom.\n\nKupac je dužan pridržavati se uputa o pranju i održavanju na ušivnoj etiketi. Ne odgovaramo za oštećenja nastala nepravilnim održavanjem (npr. peglanje preko printa). Postoji vrlo mala mogućnost da materijali sadrže sintetičke tvari koje kod pojedinih osoba mogu izazvati manju alergijsku reakciju — budući da nismo proizvođači samih majica, za navedeno ne odgovaramo.",
      },
      {
        title: "2. Cijene i plaćanje",
        content:
          "Sve cijene su izražene u Eurima i ne uključuju PDV (prodavatelj nije u sustavu PDV-a). Prodavatelj zadržava pravo promjene cijena bez prethodne najave, ali se naručena roba naplaćuje po cijeni koja je vrijedila u trenutku narudžbe.",
      },
      {
        title: "3. Dostava i isporuka",
        content:
          "Rok isporuke je obično 3–7 radnih dana putem GLS dostavne službe. Prodavatelj nije odgovoran za kašnjenja uzrokovana radom dostavnih službi ili višom silom. Kupac je dužan prilikom preuzimanja provjeriti paket i prijaviti vidljiva oštećenja ambalaže dostavljaču.",
      },
      {
        title: "4. Pravo na povrat robe",
        content:
          "Sukladno zakonu, kupac ima pravo na povrat robe u roku od 14 dana od primitka, bez navođenja razloga. Artikl mora biti nenošen, neoštećen, s originalnim etiketama i u originalnoj ambalaži. Troškove povrata robe snosi kupac.\n\nPersonalizirane majice (tisak po želji kupca) nije moguće vratiti niti zamijeniti, osim u slučaju tvorničke greške.",
      },
      {
        title: "5. Reklamacije i prigovori",
        content:
          "U slučaju materijalnog nedostatka na proizvodu, kupac je dužan poslati fotografiju oštećenja na kontakt email. Opravdane reklamacije rješavamo popravkom, zamjenom ili povratom sredstava.",
      },
    ],
  },

  privatnost: {
    slug: "privatnost",
    heading: "Politika privatnosti",
    intro:
      "Zaštita vaših osobnih podataka nam je važna. Ova politika objašnjava koje podatke prikupljamo, zašto i kako ih štitimo — u skladu s GDPR uredbom.",
    sections: [
      {
        title: "1. Voditelj obrade podataka",
        content:
          "Voditelj obrade vaših podataka je KAYAHA / Svijet Kukaca. Za sva pitanja vezana uz vaše osobne podatke možete nas kontaktirati putem emaila navedenog na stranici.",
      },
      {
        title: "2. Koje podatke prikupljamo i zašto?",
        content:
          "Prikupljamo samo one podatke koji su nam nužni da bismo vam isporučili vašu novu omiljenu majicu:\n\n• Ime i prezime — kako bismo znali na koga nasloviti paket.\n• Adresa dostave — da bi dostavna služba znala kamo doći.\n• Broj telefona — isključivo za potrebe dostave.\n• Email adresa — za potvrdu narudžbe i slanje računa. Ako se prijavite na newsletter, koristimo ga i za obavijesti o popustima.\n• IP adresa — prikuplja se automatski putem kolačića radi sigurnosti i analitike posjeta.",
      },
      {
        title: "3. Pravna osnova za obradu",
        content:
          "Vaše podatke obrađujemo na temelju izvršenja ugovora (moramo imati vaše podatke da bismo vam poslali robu), zakonske obveze (čuvanje računa radi knjigovodstva) i privole (ako ste označili da želite primati naš newsletter).",
      },
      {
        title: "4. Tko još vidi vaše podatke?",
        content:
          "Vaši podaci su kod nas sigurni, ali ih moramo podijeliti s pouzdanim partnerima bez kojih webshop ne funkcionira:\n\n• Dostavne službe (GLS) — dobivaju vaše ime, adresu i broj telefona.\n• IT partneri — tvrtka koja održava naš webshop i hosting.\n• Servis za plaćanje — ako plaćate karticom, te podatke obrađuje procesor plaćanja (mi ne vidimo broj vaše kartice).",
      },
      {
        title: "5. Koliko dugo čuvamo podatke?",
        content:
          "Podatke o narudžbama čuvamo 11 godina sukladno Zakonu o računovodstvu. Podatke za newsletter čuvamo dok se ne odlučite odjaviti klikom na \"Unsubscribe\" u mailu.",
      },
      {
        title: "6. Vaša prava",
        content:
          "U svakom trenutku imate pravo na pristup svojim podacima, ispravak netočnih podataka, brisanje podataka (\"pravo na zaborav\") osim onih koje moramo čuvati po zakonu, te povlačenje privole za newsletter. Za bilo koji od ovih zahtjeva, samo nam pošaljite mail.",
      },
      {
        title: "7. Kolačići",
        content:
          "Naša stranica koristi kolačiće kako bi vam omogućila bolje korisničko iskustvo (npr. da vam majica ostane u košarici dok pregledavate dalje). Više o tome možete pročitati u našoj politici kolačića.",
      },
    ],
  },

  kolacici: {
    slug: "kolacici",
    heading: "Politika kolačića",
    intro:
      "Ova stranica koristi isključivo tehnički nužne kolačiće bez kojih webshop ne može funkcionirati. Ne koristimo analitičke, marketinške niti kolačiće za praćenje posjetitelja.",
    sections: [
      {
        title: "Što zapravo koristimo?",
        content:
          "Košarica i odabrane veličine pohranjuju se u localStorage vašeg preglednika — to je lokalna memorija na vašem uređaju, ne kolačić koji se šalje na naše servere.\n\nSupabase (naša baza podataka) može postaviti session kolačić radi sigurne komunikacije s poslužiteljem.\n\nStripe (platni sustav) postavlja vlastite kolačiće isključivo tijekom procesa plaćanja, u skladu sa svojom politikom privatnosti.",
      },
      {
        title: "Što NE koristimo",
        content:
          "Ne koristimo Google Analytics ni bilo koji drugi alat za praćenje ponašanja posjetitelja. Ne postavljamo marketinške kolačiće. Ne dijelimo podatke o vašem posjetu s oglašivačkim platformama.",
      },
      {
        title: "Vaša kontrola",
        content:
          "Budući da koristimo samo tehnički nužne kolačiće, prema GDPR-u nije potreban vaš aktivni pristanak za njihovo korištenje. Možete ih obrisati u bilo kojem trenutku putem postavki preglednika — jedina posljedica je da će se sadržaj košarice resetirati.",
      },
    ],
  },
};
