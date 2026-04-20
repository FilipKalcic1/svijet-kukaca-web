import fs from "fs";
import path from "path";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const dir = path.resolve("public/qr-codes");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const png = PNG.sync.read(fs.readFileSync(path.join(dir, f)));
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  console.log(f.padEnd(30), "->", code ? code.data : "(no code)");
}
