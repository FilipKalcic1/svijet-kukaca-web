/**
 * Generira čiste PNG QR kodove za print na majicama.
 *
 * Korištenje:
 *   node scripts/generate-qr.mjs                  -> svi insekti iz baze
 *   node scripts/generate-qr.mjs buba-mara        -> samo taj slug
 *   node scripts/generate-qr.mjs buba-mara leptir -> više slugova
 *
 * Rezultat ide u /public/qr-codes/{slug}.png  (1024x1024, 300 DPI-ready)
 */

import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import { mkdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

config({ path: resolve(root, ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://svijetkukaca.hr";

if (!supabaseUrl || !supabaseKey) {
  console.error("Nedostaju SUPABASE env varijable u .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const outDir = resolve(root, "public", "qr-codes");

async function getSlugs() {
  const args = process.argv.slice(2);
  if (args.length > 0) return args;

  const { data, error } = await supabase
    .from("insects")
    .select("slug")
    .order("slug");

  if (error) {
    console.error("Greška pri dohvatu iz baze:", error.message);
    process.exit(1);
  }
  return data.map((r) => r.slug);
}

async function generateQR(slug) {
  const url = `${baseUrl}/wiki/${slug}`;
  const filePath = resolve(outDir, `${slug}.png`);

  await QRCode.toFile(filePath, url, {
    type: "png",
    width: 1024,
    margin: 2,
    color: { dark: "#1a1a1a", light: "#ffffff" },
    errorCorrectionLevel: "L",
  });

  console.log(`  ${slug}.png  ->  ${url}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const slugs = await getSlugs();
  console.log(`\nGeneriram ${slugs.length} QR kod(ova)...\n`);

  for (const slug of slugs) {
    await generateQR(slug);
  }

  console.log(`\nGotovo! Fajlovi su u: ${outDir}\n`);
}

main();
