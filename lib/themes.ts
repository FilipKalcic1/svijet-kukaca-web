export type WorldTheme = "insect" | "fish";

export interface ThemeConfig {
  creatureType: WorldTheme;
  dataTheme: string | undefined; // undefined = default (green), "fish" = blue
  label: string;
  shopTitle: string;
  shopSubtitle: string;
  heroTitle: [string, string]; // [line1, gradient line2]
  heroCta: string;
  searchPlaceholder: string;
  categories: { id: string; label: string }[];
  icon: "bug" | "fish";
  basePath: string; // "/kukci" or "/ribe"
}

export const INSECT_THEME: ThemeConfig = {
  creatureType: "insect",
  dataTheme: undefined,
  label: "Svijet Kukaca",
  shopTitle: "Istraži Kolekciju",
  shopSubtitle:
    "Majice s edukativnom pričom. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.",
  heroTitle: ["Maleni junaci.", "Velike priče."],
  heroCta: "Pronađi Svog Kukca",
  searchPlaceholder: "Traži kukca (npr. Jelenak, Lucanus...)",
  categories: [
    { id: "all", label: "Svi" },
    { id: "flying", label: "Letači" },
    { id: "crawling", label: "Puzači" },
    { id: "spiders", label: "Pauci" },
  ],
  icon: "bug",
  basePath: "/kukci",
};

export const FISH_THEME: ThemeConfig = {
  creatureType: "fish",
  dataTheme: "fish",
  label: "Svijet Riba",
  shopTitle: "Istraži Kolekciju",
  shopSubtitle:
    "Majice s edukativnom pričom. Skeniraj QR kod na leđima i otkrij tajni život ribe koju nosiš.",
  heroTitle: ["Ispod površine.", "Cijeli jedan svijet."],
  heroCta: "Pronađi Svoju Ribu",
  searchPlaceholder: "Traži ribu (npr. Grgeč, Pastrva...)",
  categories: [
    { id: "all", label: "Sve" },
    { id: "predator", label: "Grabežljivci" },
    { id: "peaceful", label: "Mirne ribe" },
  ],
  icon: "fish",
  basePath: "/ribe",
};

export function getThemeByCreatureType(type: string): ThemeConfig {
  return type === "fish" ? FISH_THEME : INSECT_THEME;
}
