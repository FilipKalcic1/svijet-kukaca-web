import sharp from "sharp";
import { resolve } from "path";

const original = resolve("public/images/kayaha-logo-original.png");
const dst = resolve("public/images/kayaha-logo.png");

const trimmed = await sharp(original).trim({ threshold: 10 }).toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("after trim:", meta.width, "x", meta.height);

const raw = await sharp(trimmed).raw().toBuffer({ resolveWithObject: true });
const { width: rw, height: rh, channels } = raw.info;
const data = raw.data;
const rowHasContent = (y) => {
  for (let x = 0; x < rw; x++) {
    if (data[(y * rw + x) * channels + 3] > 30) return true;
  }
  return false;
};
let logoEnd = 0;
for (let y = rh - 1; y >= 0; y--) {
  if (rowHasContent(y)) {
    logoEnd = y;
    break;
  }
}
for (let y = Math.round(rh * 0.45); y < rh; y++) {
  if (!rowHasContent(y)) {
    let gapLength = 0;
    let gy = y;
    while (gy < rh && !rowHasContent(gy)) {
      gapLength++;
      gy++;
    }
    if (gapLength >= 40) {
      logoEnd = y - 1;
      break;
    }
  }
}
const cutHeight = logoEnd + 1;
console.log("logo ends at y=", logoEnd, "cut height:", cutHeight);

const tight = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: rw, height: cutHeight })
  .trim({ threshold: 10 })
  .toBuffer();

const tightMeta = await sharp(tight).metadata();
const padTop = Math.round(tightMeta.height * 0.18);
const padBottom = Math.round(tightMeta.height * 0.22);

await sharp(tight)
  .extend({
    top: padTop,
    bottom: padBottom,
    left: 0,
    right: 0,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .toFile(dst);

const finalMeta = await sharp(dst).metadata();
console.log("final:", finalMeta.width, "x", finalMeta.height);
