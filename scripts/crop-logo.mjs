import sharp from "sharp";
import { resolve } from "path";

const original = resolve("public/images/kayaha-logo-original.png");
const dst = resolve("public/images/kayaha-logo.png");

const trimmed = await sharp(original).trim({ threshold: 10 }).toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("after trim:", meta.width, "x", meta.height);

const topHeight = Math.round(meta.height * 0.70);
const tight = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: meta.width, height: topHeight })
  .trim({ threshold: 10 })
  .toBuffer();

const tightMeta = await sharp(tight).metadata();
const vpad = Math.round(tightMeta.height * 0.12);

await sharp(tight)
  .extend({
    top: vpad,
    bottom: vpad,
    left: 0,
    right: 0,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .toFile(dst);

const finalMeta = await sharp(dst).metadata();
console.log("final:", finalMeta.width, "x", finalMeta.height);
