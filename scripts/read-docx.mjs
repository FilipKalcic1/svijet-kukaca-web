import AdmZip from "adm-zip";
import { readdirSync } from "fs";

const files = readdirSync(".").filter(f => f.endsWith(".docx") && !f.startsWith("~"));
const targets = files.filter(f => f.startsWith("01") || f.startsWith("03"));

for (const f of targets) {
  const zip = new AdmZip(f);
  const xml = zip.readAsText("word/document.xml");
  const matches = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
  const text = matches.map(m => m[1]).join("");
  console.log(`===== ${f} =====`);
  console.log(text);
  console.log();
}
